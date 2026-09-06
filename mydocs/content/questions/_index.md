+++
title = "3. Câu hỏi vướng mắc"
weight = 3
+++

<style>
.sovra-questions{margin:-1rem 0 2rem;border:1px solid #7c3aed55;border-radius:28px;padding:clamp(1rem,3vw,2.5rem);color:#e2e8f0;background:radial-gradient(circle at 10% 10%,#7c3aed66 0,transparent 32%),radial-gradient(circle at 90% 15%,#06b6d455 0,transparent 28%),linear-gradient(145deg,#080b1a,#111735 58%,#17102c);box-shadow:0 24px 80px #11182733}
.sovra-questions .sovra-eyebrow{margin:0 0 .5rem;color:#67e8f9;font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:.72rem}
.sovra-questions h2{margin:0 0 1.5rem;color:#fff;font-size:clamp(1.5rem,4vw,2.4rem)}
.sovra-questions .sovra-segments{overflow-x:auto;border:1px solid #475569;border-radius:16px;background:#111827;scrollbar-color:#7c3aed #111827}
.sovra-questions table{display:table;width:100%;table-layout:fixed;margin:0;border-collapse:collapse;font-size:.75rem;line-height:1.45;color:#e2e8f0;background:#111827}
.sovra-questions table th,.sovra-questions table td{padding:.4rem .35rem;border:0;border-bottom:1px solid #334155;text-align:left;vertical-align:top;overflow-wrap:anywhere;color:#e2e8f0;background:transparent}
.sovra-questions table thead tr{background:#1e293b}
.sovra-questions table th{color:#67e8f9;white-space:normal}
.sovra-questions{padding:clamp(.5rem,1.2vw,1rem);border-radius:18px}
.sovra-questions h2{margin-bottom:1rem;font-size:clamp(1.3rem,3vw,1.8rem)}
.sovra-questions table th:nth-child(1){width:9%}
.sovra-questions table th:nth-child(2){width:29%}
.sovra-questions table th:nth-child(3){width:36%}
.sovra-questions table th:nth-child(4){width:17%}
.sovra-questions table th:nth-child(5){width:9%}
.sovra-questions table tbody tr{background:#111827}
.sovra-questions table tbody tr:nth-child(even){background:#1e293b}
.sovra-questions table tbody tr:last-child td{border-bottom:0}
.sovra-questions table td:first-child{color:#67e8f9;font-weight:700;white-space:nowrap}
.sovra-questions table td:last-child{color:#fbbf24;font-weight:700;white-space:nowrap}
.sovra-questions .sovra-segments:focus-visible{outline:2px solid #67e8f9;outline-offset:4px}
@media(max-width:480px){.sovra-questions table th,.sovra-questions table td{padding:.35rem .2rem}.sovra-questions table td:first-child,.sovra-questions table td:last-child{white-space:normal}}
</style>

<section class="sovra-questions">
  <p class="sovra-eyebrow">Question !!!</p>
  <h2 id="questions-title">Các câu hỏi cần làm rõ !</h2>
  <div class="sovra-segments" role="region" aria-labelledby="questions-title" tabindex="0">
    <table>
      <thead>
<tr><th scope="col">M&#227;</th><th scope="col">Nội dung cần l&#224;m r&#245;</th><th scope="col">V&#236; sao cần chốt</th><th scope="col">Đội li&#234;n quan</th><th scope="col">Trạng th&#225;i</th></tr>
      </thead>
      <tbody>
<tr><td>Q-01</td><td>Thiết kế FSM c&#243; cần PMU BootROM kh&#244;ng, hay CSU/RoT chạy trực tiếp sau PoR?</td><td>Quyết định to&#224;n bộ cấu tr&#250;c giai đoạn 1a/1b v&#224; phạm vi c&#244;ng việc của đội Nh&#250;ng.</td><td>Phần cứng + PMU + Nh&#250;ng</td><td>TBD</td></tr>
<tr><td>Q-02</td><td>PMU c&#243; thiết kế local SRAM ri&#234;ng kh&#244;ng?</td><td>Ảnh hưởng đến khả năng chạy PMU Runtime Firmware resident v&#224; đến diện t&#237;ch silicon.</td><td>Phần cứng + PMU</td><td>TBD</td></tr>
<tr><td>Q-03</td><td>C&#243; khối phần cứng độc lập kiểm tra to&#224;n vẹn BootROM kh&#244;ng?</td><td>Mask ROM kh&#244;ng bị phần mềm sửa nhưng vẫn c&#243; thể sai do lỗi chế tạo, aging, nhiễu hoặc fault injection. Nếu c&#243;, khối n&#224;y phải chạy trước khi core fetch lệnh đầu ti&#234;n.</td><td>Phần cứng + Bảo mật</td><td>TBD</td></tr>
<tr><td>Q-04</td><td>V&#249;ng lưu trữ firmware của to&#224;n hệ thống gồm những g&#236;?</td><td>Chỉ eMMC/UFS, hay d&#249;ng cả NOR v&#224; eMMC (v&#237; dụ NOR cho PMU FW, CSU FW v&#224; U-Boot). Ảnh hưởng đến thời gian boot, chi ph&#237; linh kiện v&#224; quy tr&#236;nh cập nhật.</td><td>Phần cứng + Nh&#250;ng</td><td>TBD</td></tr>
<tr><td>Q-05</td><td>Danh s&#225;ch phần cứng m&#224; FSBL phải khởi tạo v&#224; t&#224;i liệu giao thức điều khiển.</td><td>Đặc biệt l&#224; tr&#236;nh tự init v&#224; training của DDR controller. Thiếu phần n&#224;y th&#236; kh&#244;ng ước lượng được khối lượng v&#224; thời gian của giai đoạn 4c.</td><td>Phần cứng + Nh&#250;ng</td><td>TBD</td></tr>
<tr><td>Q-06</td><td>C&#225;c IP v&#224; t&#224;i liệu bring-up cần cho U-Boot (UART, eMMC, Ethernet…).</td><td>Quyết định U-Boot c&#243; t&#236;m v&#224; nạp được Linux hay kh&#244;ng.</td><td>Phần cứng + Nh&#250;ng</td><td>TBD</td></tr>
<tr><td>Q-07</td><td>C&#243; cần Ethernet trong SoC kh&#244;ng, v&#224; c&#243; cho ph&#233;p boot qua Ethernet trong luồng sản xuất kh&#244;ng?</td><td>Ethernet thuận lợi cho nạp v&#224; gỡ lỗi khi ph&#225;t triển. Nếu l&#224; đường nạp firmware th&#236; nằm trong phạm vi Secure Boot v&#224; phải bị kh&#243;a theo lifecycle state.</td><td>Phần cứng + Bảo mật + Sản phẩm</td><td>TBD</td></tr>
<tr><td>Q-08</td><td>Danh s&#225;ch boot mode được hỗ trợ v&#224; nguồn cấu h&#236;nh boot mode.</td><td>Cần chốt danh s&#225;ch v&#224; chọn ch&#226;n strap hay eFuse l&#224;m nguồn cấu h&#236;nh.</td><td>Phần cứng + Nh&#250;ng</td><td>TBD</td></tr>
<tr><td>Q-09</td><td>Firmware của NPU/DSP/LPU thực thi ở SRAM cục bộ hay DDR, dung lượng bao nhi&#234;u?</td><td>Quyết định c&#225;ch khai b&#225;o v&#249;ng nhớ d&#224;nh ri&#234;ng, cấu h&#236;nh bảo vệ truy cập v&#224; thời gian nạp firmware.</td><td>Đội sub-module + Nh&#250;ng</td><td>TBD</td></tr>
<tr><td>Q-10</td><td>U-Boot x&#225;c thực Linux bằng dịch vụ của CSU hay bằng kh&#243;a nh&#250;ng trong U-Boot?</td><td>Nếu d&#249;ng kh&#243;a nh&#250;ng, kh&#243;a đ&#243; phải neo về c&#249;ng gốc tin cậy trong OTP v&#224; U-Boot phải đ&#227; được CSU x&#225;c thực, nếu kh&#244;ng sẽ c&#243; hai gốc kh&#243;a song song.</td><td>Bảo mật + Nh&#250;ng</td><td>TBD</td></tr>
      </tbody>
    </table>
  </div>
</section>
