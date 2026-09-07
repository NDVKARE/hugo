# Export PDF

Run from the project directory in PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\export-pdf.ps1
```

Default output: `exports/SOVRA-Portal.pdf`. An existing PDF at that path is replaced after printing succeeds.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\export-pdf.ps1 -Output exports/My-Document.pdf
```

Requires Hugo and Microsoft Edge or Google Chrome. The script finds Hugo on PATH or in the parent directory, and checks standard browser installation paths. Use `-HugoPath` and `-BrowserPath` to supply other locations.

The print template includes the home page and published content pages, traversing sections in Hugo's `ByWeight` order. It adds a cover, linked chapter contents, A4 page breaks and page numbers. SVG images and Mermaid diagrams are included. Large tables or diagrams may need manual layout adjustments; inspect the generated PDF before sharing.

Intermediate HTML and an isolated browser profile are kept in a unique `sovra-pdf-*` folder under the Windows temporary directory. Its location is printed for debugging. The export build writes to that temporary directory instead of `public/`.

Implementation references: [Hugo CLI](https://gohugo.io/commands/hugo/) and [Chromium headless PDF printing](https://developer.chrome.com/docs/automation-and-testing/headless-cli).
