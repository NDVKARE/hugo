+++
title = "SOVRA System"
weight = 1
+++

<style>
.sovra-home{--violet:#7c3aed;--cyan:#06b6d4;--pink:#ec4899;--amber:#f59e0b;--ink:#eef2ff;position:relative;isolation:isolate;overflow:hidden;margin:-1rem 0 2rem;border:1px solid #7c3aed55;border-radius:28px;padding:clamp(1.25rem,4vw,3.5rem);color:var(--ink);background:radial-gradient(circle at 10% 10%,#7c3aed66 0,transparent 32%),radial-gradient(circle at 90% 15%,#06b6d455 0,transparent 28%),radial-gradient(circle at 65% 90%,#ec489944 0,transparent 32%),linear-gradient(145deg,#080b1a,#111735 58%,#17102c);box-shadow:0 24px 80px #11182733}
.sovra-home::before{content:"";position:absolute;inset:0;z-index:-1;opacity:.16;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(to bottom,#000,transparent 82%)}
.sovra-orb{position:absolute;width:220px;height:220px;right:-85px;top:28%;z-index:-1;border-radius:50%;background:conic-gradient(from 45deg,var(--cyan),var(--violet),var(--pink),var(--amber),var(--cyan));filter:blur(38px);opacity:.32;animation:sovra-spin 14s linear infinite}
@keyframes sovra-spin{to{transform:rotate(360deg) scale(1.15)}}
.sovra-kicker{display:inline-flex;gap:.55rem;align-items:center;margin-bottom:1rem;padding:.45rem .8rem;border:1px solid #a5b4fc66;border-radius:999px;color:#c7d2fe;background:#ffffff0d;font:700 .72rem/1 sans-serif;letter-spacing:.14em;text-transform:uppercase;backdrop-filter:blur(12px)}
.sovra-kicker::before{content:"";width:.55rem;height:.55rem;border-radius:50%;background:#22d3ee;box-shadow:0 0 14px #22d3ee}
.sovra-title{max-width:850px;margin:0!important;color:#fff!important;font-size:clamp(2.7rem,8vw,6.4rem)!important;font-weight:900!important;line-height:.92!important;letter-spacing:-.065em}
.sovra-title span{color:transparent;background:linear-gradient(90deg,#67e8f9,#a78bfa 48%,#f9a8d4);background-clip:text;-webkit-background-clip:text}
.sovra-lead{max-width:680px;margin:1.4rem 0 1.8rem!important;color:#cbd5e1;font-size:clamp(1rem,2vw,1.2rem);line-height:1.75}
.sovra-actions{display:flex;flex-wrap:wrap;gap:.75rem}.sovra-actions a{display:inline-flex;align-items:center;gap:.55rem;padding:.78rem 1.05rem;border-radius:12px;color:#fff!important;font-weight:750;text-decoration:none!important;transition:transform .2s ease,box-shadow .2s ease}.sovra-actions a:first-child{background:linear-gradient(120deg,var(--violet),var(--pink));box-shadow:0 10px 28px #7c3aed55}.sovra-actions a:last-child{border:1px solid #94a3b855;background:#ffffff0d}.sovra-actions a:hover{transform:translateY(-3px);box-shadow:0 14px 34px #06b6d444}
.sovra-section{margin-top:clamp(2.5rem,6vw,5rem)}.sovra-eyebrow{margin:0 0 .4rem!important;color:#67e8f9;font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:.72rem}.sovra-heading{margin:0 0 1.3rem!important;color:#fff!important;font-size:clamp(1.6rem,4vw,2.4rem)!important}
.sovra-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.sovra-card{--card-color:var(--cyan);position:relative;overflow:hidden;min-height:175px;padding:1.25rem;border:1px solid #ffffff1f;border-radius:18px;color:#e2e8f0!important;background:linear-gradient(145deg,#ffffff10,#ffffff06);text-decoration:none!important;backdrop-filter:blur(14px);transition:transform .25s ease,border-color .25s ease,background .25s ease}.sovra-card::after{content:"";position:absolute;width:120px;height:120px;right:-45px;bottom:-55px;border-radius:50%;background:var(--card-color);filter:blur(36px);opacity:.32}.sovra-card:hover{transform:translateY(-6px);border-color:var(--card-color);background:#ffffff14}.sovra-card:nth-child(2){--card-color:var(--violet)}.sovra-card:nth-child(3){--card-color:var(--pink)}
.sovra-icon{display:grid;place-items:center;width:42px;height:42px;margin-bottom:1rem;border-radius:12px;background:#ffffff18;font-size:1.25rem}.sovra-card strong{display:block;margin-bottom:.35rem;color:#fff;font-size:1.05rem}.sovra-card small{color:#94a3b8;line-height:1.55}
.sovra-flow{display:grid;grid-template-columns:repeat(8,minmax(80px,1fr));align-items:center;overflow-x:auto;padding:.6rem .25rem 1rem;scrollbar-color:#7c3aed #ffffff0d}.sovra-node{position:relative;padding-right:1rem;text-align:center;color:#cbd5e1;font-size:.72rem;font-weight:700}.sovra-node::before{content:"";display:block;width:34px;height:34px;margin:0 auto .6rem;border:5px solid #151a35;border-radius:50%;background:var(--node);box-shadow:0 0 20px var(--node)}.sovra-node::after{content:"→";position:absolute;top:7px;right:-.25rem;color:#64748b;font-size:1.1rem}.sovra-node:last-child::after{display:none}.sovra-node:nth-child(4n+1){--node:#22d3ee}.sovra-node:nth-child(4n+2){--node:#8b5cf6}.sovra-node:nth-child(4n+3){--node:#ec4899}.sovra-node:nth-child(4n+4){--node:#f59e0b}
.sovra-footer{margin-top:3.5rem;padding:1.1rem 1.25rem;border:1px solid #ffffff1a;border-radius:16px;color:#94a3b8;background:#02061755;text-align:center}
@media(max-width:800px){.sovra-grid{grid-template-columns:1fr}.sovra-card{min-height:auto}}@media(prefers-reduced-motion:reduce){.sovra-orb{animation:none}.sovra-card,.sovra-actions a{transition:none}}
</style>

<style>
.sovra-image{margin:2rem 0 0}
.sovra-segments{overflow-x:auto;border:1px solid #ffffff1f;border-radius:16px;scrollbar-color:#7c3aed #111735}
.sovra-segments table{display:table;width:100%;min-width:850px;margin:0;border-collapse:collapse;font-size:.85rem;color:#e2e8f0}
.sovra-segments table th,.sovra-segments table td{padding:.9rem 1rem;border:0;border-bottom:1px solid #ffffff1f;text-align:left;vertical-align:top}
.sovra-segments table thead tr{background:#ffffff10;color:#67e8f9}
.sovra-segments table tbody tr{background:transparent}
.sovra-segments table tbody tr:nth-child(even){background:#ffffff05}
.sovra-segments table tbody tr:last-child td{border-bottom:0}
.sovra-segments table td:first-child{white-space:nowrap;font-weight:700;color:#fff}
.sovra-segments .sovra-star{color:#fbbf24}
.sovra-image img{display:block;width:100%;height:auto;border:1px solid #ffffff1f;border-radius:16px}
.sovra-applications{grid-template-columns:repeat(2,minmax(0,1fr))}
.sovra-applications .sovra-card:nth-child(4){--card-color:var(--amber)}
@media(max-width:800px){.sovra-applications{grid-template-columns:1fr}}
</style>

<div class="sovra-home">
  <div class="sovra-orb"></div>
  <section>
    <div class="sovra-kicker">Technical knowledge portal</div>
    <h1 class="sovra-title">SOVRA<br><span>System</span></h1>
    <p class="sovra-lead">Cổng tài liệu kỹ thuật mô tả hành trình của hệ thống từ thời điểm cấp nguồn, qua firmware và Linux, đến khi sản phẩm sẵn sàng vận hành.</p>
    <div class="sovra-actions">
      <a href="bootflow/">Khám phá Boot Flow <span>→</span></a>
      <a href="bootflow/PMU/">Đi thẳng đến PMU <span>↗</span></a>
    </div>
    <figure class="sovra-image">
      <img src="images/VT_SOVRA_CVA6.png" alt="VT SOVRA CVA6" decoding="async">
    </figure>
  </section>
  <section class="sovra-section">
    <p class="sovra-eyebrow">System journey</p>
    <h2 class="sovra-heading">Một luồng, toàn bộ hệ thống</h2>
    <div class="sovra-flow" aria-label="Luồng khởi động hệ thống">
      <div class="sovra-node">Power On</div><div class="sovra-node">BootROM</div><div class="sovra-node">Secure Boot</div><div class="sovra-node">OpenSBI</div><div class="sovra-node">U-Boot</div><div class="sovra-node">Kernel</div><div class="sovra-node">RootFS</div><div class="sovra-node">Apps</div>
    </div>
  </section>
  <section class="sovra-section">
    <p class="sovra-eyebrow">Knowledge map</p>
    <h2 class="sovra-heading">Bắt đầu từ đâu?</h2>
    <div class="sovra-grid">
      <a class="sovra-card" href="bootflow/"><span class="sovra-icon">⚡</span><strong>Boot Flow</strong><small>Theo dõi toàn bộ chuỗi khởi động, từ nguồn điện đến không gian người dùng.</small></a>
      <a class="sovra-card" href="bootflow/PMU/"><span class="sovra-icon">◈</span><strong>Platform Management Unit</strong><small>Điều phối nguồn, reset, clock và trạng thái sống còn của nền tảng.</small></a>
      <a class="sovra-card" href="bootflow/"><span class="sovra-icon">⌁</span><strong>Architecture View</strong><small>Nhìn hệ thống theo lớp để hiểu vai trò và điểm bàn giao giữa các thành phần.</small></a>
    </div>
  </section>
  <section class="sovra-section">
    <p class="sovra-eyebrow">Applications</p>
    <h2 class="sovra-heading">Ứng dụng</h2>
    <div class="sovra-grid sovra-applications">
      <div class="sovra-card"><span class="sovra-icon" aria-hidden="true">✈</span><strong>UAV</strong><small>Điều khiển bay, xử lý dữ liệu cảm biến và thị giác máy tính trên thiết bị bay không người lái.</small></div>
      <div class="sovra-card"><span class="sovra-icon" aria-hidden="true">◉</span><strong>Camera thông minh</strong><small>Xử lý hình ảnh, nhận diện đối tượng và phân tích video ngay tại thiết bị.</small></div>
      <div class="sovra-card"><span class="sovra-icon" aria-hidden="true">⚙</span><strong>Robot</strong><small>Phối hợp cảm biến, điều khiển chuyển động và xử lý tác vụ tự động.</small></div>
      <div class="sovra-card"><span class="sovra-icon" aria-hidden="true">↔</span><strong>5G/RedCap</strong><small>Kết nối và trao đổi dữ liệu cho thiết bị IoT và các hệ thống nhúng.</small></div>
    </div>
  </section>
  <section class="sovra-section">
    <p class="sovra-eyebrow">Product segments</p>
    <h2 class="sovra-heading" id="sovra-segments-title">Các phân khúc SOVRA</h2>
    <div class="sovra-segments" role="region" aria-labelledby="sovra-segments-title" tabindex="0">
      <table>
        <thead>
          <tr><th scope="col">Phân khúc</th><th scope="col">Công nghệ</th><th scope="col">CPU</th><th scope="col">AI</th><th scope="col">DSP</th><th scope="col">Ứng dụng</th><th scope="col">Công suất</th></tr>
        </thead>
        <tbody>
          <tr><td>SOVRA-Lite</td><td>N65</td><td>2× CVA6</td><td>2 TOPS</td><td>1 DSP</td><td>Remote ID, IoT</td><td>~4W</td></tr>
          <tr><td>SOVRA-Sky <span class="sovra-star">★</span></td><td>N28</td><td>4× CVA6</td><td>8 TOPS</td><td>Cluster<br>500–1K tok/s</td><td>Swarm UAV, BBSoC</td><td>~8W</td></tr>
          <tr><td>SOVRA-Eye <span class="sovra-star">★</span></td><td>N28</td><td>4× CVA6</td><td>16 TOPS</td><td>Cluster nhỏ</td><td>Smart / AI Camera</td><td>~12W</td></tr>
          <tr><td>SOVRA-Brain</td><td>N28+</td><td>8× CVA6</td><td>16 TOPS</td><td>Full + 2K tok/s</td><td>Robotic, Edge Server</td><td>~15W</td></tr>
          <tr><td>SOVRA-5G</td><td>N28</td><td>4× CVA6</td><td>2 TOPS</td><td>Cluster + FEC</td><td>5G / RedCap modem</td><td>~4W</td></tr>
          <tr><td>BBSoC</td><td>N28</td><td>sub-class</td><td>8 TOPS</td><td>Sky/Brain + Wideband BB</td><td>UAV Tactical, C2</td><td>~8W</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  <div class="sovra-footer">Designed for engineers · Built around the system · Always evolving</div>
</div>
