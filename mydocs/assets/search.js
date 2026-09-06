{{ $searchDataFile := printf "%s.search-data.json" .Language.Name }}
{{ $searchData := resources.Get "search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}
{{ $searchConfig := i18n "bookSearchConfig" | default "{}" }}

(function () {
  const searchDataURL = '{{ partial "docs/links/resource-precache" $searchData }}';
  const searchEngineURL = '{{ "minisearch.min.js" | relURL }}';

  const indexConfig = Object.assign({
    tokenize: text => text.normalize('NFC').split(/[^\p{L}\p{N}\p{M}]+/u).filter(Boolean),
    processTerm: normalize,
    fields: ['title', 'content'],
    storeFields: ['title', 'content', 'href'],
    searchOptions: {
      boost: { title: 2 },
      prefix: true,
      fuzzy: 0.2,
      combineWith: 'AND'
    }
  }, {{ $searchConfig }});

  const input = document.querySelector('#book-search-input');
  const results = document.querySelector('#book-search-results');

  if (!input) {
    return
  }

  let debounce;
  let loading;
  let ready = false;
  let composing = false;

  input.addEventListener('focus', init);
  input.addEventListener('compositionstart', () => { composing = true; });
  input.addEventListener('compositionend', () => { composing = false; search(); });
  input.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(search, 250);
  });

  document.addEventListener('keydown', focusOnKeyDown);

  /**
   * @param {KeyboardEvent} event
   */
  function focusOnKeyDown(event) {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      input.focus();
      return;
    }

    if (input === document.activeElement) {
      return;
    }

    if (event.target.value !== undefined) {
      return;
    }

    if (event.key === '/') {
      event.preventDefault();
      input.focus();
    }
  }

  function init() {
    if (loading) return loading;
    input.required = true;

    loading = Promise.all([
      import(searchEngineURL),
      fetch(searchDataURL).then(response => {
        if (!response.ok) throw new Error('Search data unavailable');
        return response.json();
      })
    ]).then(([, pages]) => {
      pages.forEach(page => {
        page.title = page.title.normalize('NFC');
        page.content = page.content.normalize('NFC');
      });
      window.bookSearchIndex = new MiniSearch(indexConfig);
      return window.bookSearchIndex.addAllAsync(pages);
    }).then(() => { ready = true; search(); })
      .catch(() => {
        loading = null;
        results.replaceChildren();
        const message = document.createElement('li');
        message.textContent = 'Không tải được dữ liệu tìm kiếm. Hãy thử lại.';
        results.appendChild(message);
      }).finally(() => { input.required = false; });
    return loading;
  }

  function search() {
    if (composing) return;
    results.replaceChildren();

    if (!input.value.trim()) {
      return;
    }
    if (!ready) { init(); return; }

    const searchHits = window.bookSearchIndex.search(input.value).slice(0, 10);
    if (!searchHits.length) {
      const message = document.createElement('li');
      message.textContent = 'Không tìm thấy kết quả.';
      results.appendChild(message);
    }
    searchHits.forEach(function (page) {
      const li = element('<li><a href><span></span></a><small></small></li>');

      const anchor = li.querySelector('a'),
        title = li.querySelector('a > span'),
        content = li.querySelector('small');

      anchor.href = page.href;
      title.append(...highlight(page.title, match(page, 'title')));
      content.append(...highlight(page.content, match(page, 'content'), 16, 32));

      results.appendChild(li);
    });
  }

  /**
   * @param {SearchResult} hit
   * @param {String} field
   * @returns {String|undefined} the search term that matched in the given field
   */
  function match(hit, field) {
    return hit.terms.find(term => hit.match[term].includes(field));
  }

  /**
   * @param {String} text
   * @param {String|undefined} match term to wrap in <mark>, with `before`/`after` characters of context around it
   * @param {Number} before
   * @param {Number} after
   * @returns {Array<Node|String>}
   */
  function highlight(text, match, before = 0, after = text.length) {
    const start = match ? normalize(text).indexOf(normalize(match)) : -1;
    if (start < 0) {
      return [text.slice(0, after)];
    }

    const end = start + match.length;
    const mark = element('<mark></mark>');
    mark.textContent = text.slice(start, end);

    return [
      text.slice(Math.max(0, start - before), start),
      mark,
      text.slice(end, end + after)
    ];
  }

  /**
   * @param {String} content
   * @returns {Node}
   */
  function element(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
  }

  // Shared by indexing, queries and highlighting. Vietnamese đ is not
  // decomposed by Unicode NFD, so it requires an explicit replacement.
  function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd');
  }
})();
