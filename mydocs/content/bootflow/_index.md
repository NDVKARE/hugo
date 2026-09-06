+++
title = "1. Boot flow - Quá trình khởi động"
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
.sovra-flow{grid-template-columns:repeat(8,minmax(0,1fr));align-items:start;gap:.35rem}
.sovra-flow .sovra-node{padding-right:.4rem;font-size:.7rem;line-height:1.5;overflow-wrap:break-word}
.sovra-flow .sovra-node::before{width:22px;height:22px;border-width:3px;box-shadow:0 0 12px var(--node)}
.sovra-flow .sovra-node::after{top:0;color:#94a3b8}
.sovra-home > .sovra-section:first-child{margin-top:.5rem}
@media(max-width:600px){.sovra-flow{grid-template-columns:1fr;gap:1rem;overflow:visible}.sovra-flow .sovra-node{padding:0 0 1rem 2rem;text-align:left}.sovra-flow .sovra-node::before{position:absolute;left:0;top:0;margin:0}.sovra-flow .sovra-node::after{content:"↓";top:auto;bottom:-.7rem;left:.3rem;right:auto}.sovra-flow .sovra-flow-link{align-items:flex-start;margin:.5rem 0}.sovra-flow .sovra-flow-child{text-align:left}.sovra-flow .sovra-flow-child::before{display:inline-block;margin:0 .5rem 0 0;vertical-align:middle}}
.sovra-node small{display:block;margin-top:.4rem;color:#cbd5e1;font-size:.72rem;font-weight:400;line-height:1.5}
.sovra-flow-link{display:flex;flex-direction:column;align-items:center;margin:.75rem 0;color:#67e8f9;font-size:.72rem;font-weight:400;line-height:1.5}
.sovra-flow-link::before{content:"";height:12px;border-left:2px solid #22d3ee}
.sovra-flow-link::after{content:"";width:0;height:0;margin-top:4px;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #22d3ee}
.sovra-flow-child{color:#cbd5e1;line-height:1.5;text-align:center}
.sovra-flow-child::before{content:"";display:block;width:22px;height:22px;margin:0 auto .6rem;border:3px solid #151a35;border-radius:50%;background:#22d3ee;box-shadow:0 0 12px #22d3ee}
.sovra-branches{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:1rem}
.sovra-branch{padding:1rem;border:1px solid #475569;border-top:3px solid #22d3ee;border-radius:12px;background:#111827;color:#e2e8f0;font-size:.85rem;line-height:1.6}
.sovra-branch strong{display:block;color:#67e8f9}
.sovra-branch small{display:block;color:#cbd5e1;font-size:.8rem}
.sovra-flow-note{color:#cbd5e1;font-size:.85rem;line-height:1.7}
.sovra-flow:focus-visible{outline:2px solid #67e8f9;outline-offset:4px}
@media(max-width:800px){.sovra-branches{grid-template-columns:1fr}}
.sovra-home .sovra-segments{overflow-x:auto;border:1px solid #475569;border-radius:16px;background:#111827;scrollbar-color:#7c3aed #111827}
.sovra-home .sovra-segments table{display:table;width:100%;table-layout:fixed;margin:0;border-collapse:collapse;font-size:.75rem;line-height:1.45;color:#e2e8f0;background:#111827}
.sovra-home .sovra-segments table th,.sovra-home .sovra-segments table td{padding:.4rem .35rem;border:0;border-bottom:1px solid #334155;text-align:left;vertical-align:top;white-space:normal;overflow-wrap:anywhere;color:#e2e8f0;background:transparent}
.sovra-home .sovra-segments table th:nth-child(1){width:25%}
.sovra-home .sovra-segments table th:nth-child(2){width:10%}
.sovra-home .sovra-segments table th:nth-child(3){width:23%}
.sovra-home .sovra-segments table th:nth-child(4){width:23%}
.sovra-home .sovra-segments table th:nth-child(5){width:19%}
.sovra-home .sovra-segments table thead tr{background:#1e293b}
.sovra-home .sovra-segments table th{color:#67e8f9;font-weight:700}
.sovra-home .sovra-segments table tbody tr{background:#111827}
.sovra-home .sovra-segments table tbody tr:nth-child(even){background:#1e293b}
.sovra-home .sovra-segments table tbody tr:last-child td{border-bottom:0}
.sovra-home .sovra-segments table td:first-child{font-weight:700}
.sovra-home .sovra-segments:focus-visible{outline:2px solid #67e8f9;outline-offset:4px}
</style>

## Tổng quan

<br>
 <div class="sovra-home">
   
  <section class="sovra-section">
    <p class="sovra-eyebrow">Boot flow</p>
    <div class="sovra-flow" role="region" aria-label="Luồng khởi động chính" tabindex="0">
      <div class="sovra-node">Power On</div>
      <div class="sovra-node">PMU BootROM</div>
      <div class="sovra-node">CSU BootROM</div>
      <div class="sovra-node">CSU Runtime FW<div class="sovra-flow-link"></div><div class="sovra-flow-child">PMU Runtime FW</div></div>
      <div class="sovra-node">FSBL</div>
      <div class="sovra-node">OpenSBI</div>
      <div class="sovra-node">U-Boot</div>
      <div class="sovra-node">Linux</div>
    </div>
 
     
  </section>
  
  <section class="sovra-section">
    <p class="sovra-eyebrow">Thành phần firmware</p>
    <div class="sovra-segments" role="region" aria-labelledby="sovra-firmware-title" tabindex="0">
      <table>
        <thead>
          <tr><th scope="col">Thành phần</th><th scope="col">Cố định</th><th scope="col">Lưu trữ</th><th scope="col">Thực thi</th><th scope="col">Đội phụ trách</th></tr>
        </thead>
        <tbody>
          <tr><td>PMU BootROM</td><td>Có</td><td>Mask ROM của PMU</td><td>Tại chỗ (XIP)</td><td>Nhúng + PMU</td></tr>
          <tr><td>PMU Runtime FW</td><td>Không</td><td>OSPI NOR / eMMC</td><td>PMU RAM / TCM</td><td>PMU</td></tr>
          <tr><td>CSU BootROM</td><td>Có</td><td>Mask ROM của CSU</td><td>Tại chỗ (XIP)</td><td>Nhúng</td></tr>
          <tr><td>CSU Runtime FW</td><td>Không</td><td>OSPI NOR / eMMC</td><td>CSU RAM / TCM</td><td>CSU</td></tr>
          <tr><td>FSBL</td><td>Không</td><td>OSPI NOR / eMMC</td><td>System SRAM</td><td>Nhúng + HW</td></tr>
          <tr><td>OpenSBI</td><td>Không</td><td>OSPI NOR / eMMC</td><td>DDR (M-mode)</td><td>Nhúng + HW</td></tr>
          <tr><td>U-Boot</td><td>Không</td><td>OSPI NOR / eMMC</td><td>DDR (S-mode)</td><td>Nhúng + HW</td></tr>
          <tr><td>Linux</td><td>Không</td><td>eMMC</td><td>DDR (S-mode)</td><td>Nhúng</td></tr>
          <tr><td>RPU FW</td><td>Không</td><td>eMMC</td><td>TCM của RPU</td><td>Nhúng + CPU</td></tr>
          <tr><td>NPU / DSP / LPU FW</td><td>Không</td><td>eMMC</td><td>SRAM cục bộ + DDR</td><td>Đội sub-module</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  
</div>
 
## Sơ đồ khởi động và vùng nhớ thực thi

~~~mermaid
flowchart LR
    subgraph HW["HW"]
        POWER["Power On"]
    end
    subgraph PMU["PMU"]
        PMU_ROM["PMU · BootROM"]
        RESET["Power / clock<br/>Reset sequence"]
        PMU_FW["PMU FW<br/>Hoàn thiện power / clock / reset<br/>Watchdog và dịch vụ nền hệ thống"]
    end
    subgraph CSU["CSU / Root of Trust"]
        CSU_ROM["CSU · BootROM"]
        CSU_INIT["Đọc boot mode và eFuse / OTP<br/>Khởi tạo SRAM, xác thực CSU FW"]
        CSU_FW["CSU Runtime FW"]
    end
    subgraph APU["APU · 4× CVA6"]
        FSBL["FSBL · M-mode<br/>Khởi tạo pinmux / clock / DDR controller<br/>DDR PHY training<br/>Yêu cầu CSU xác thực các image<br/>Thiết lập địa chỉ, device tree<br/>Memory reservation và release reset"]
        SBI["APU · OpenSBI<br/>SBI Service<br/>M-mode resident firmware"]
        UBOOT["APU · U-Boot · S-mode<br/>Load kernel, DTB và initramfs"]
        LINUX["APU · Linux OS"]
    end
    subgraph RPU["RPU"]
        RPU_FW["RPU FW<br/>RTOS"]
    end
    subgraph ACCEL["NPU / DSP / LPU"]
        SUB_FW["Subsystem FW<br/>NPU / DSP / LPU"]
    end
    subgraph MEM["Vùng nhớ thực thi"]
        PMU_RAM["PMU RAM"]
        CSU_RAM["CSU RAM"]
        SRAM["System SRAM<br/>Dùng trước khi DDR sẵn sàng"]
        DDR["External DDR"]
        TCM["TCM"]
        SUB_MEM["DDR / System SRAM"]
    end

    POWER -->|"1a"| PMU_ROM
    POWER -->|"1b"| CSU_ROM
    PMU_ROM --> RESET
    RESET -->|"2"| CSU_ROM
    CSU_ROM --> CSU_INIT
    CSU_INIT -->|"3"| CSU_FW
    CSU_FW -->|"4a · Xác thực / nạp PMU FW từ OSPI NOR / eMMC"| PMU_FW
    CSU_FW -->|"4b · Xác thực / nạp FSBL từ OSPI NOR / eMMC"| FSBL
    FSBL -->|"5a · Xác thực / nạp OpenSBI từ OSPI NOR / eMMC"| SBI
    FSBL -->|"5b · Xác thực / nạp U-Boot từ eMMC"| UBOOT
    FSBL -->|"5c · Xác thực / nạp RPU FW từ eMMC"| RPU_FW
    FSBL -->|"5d · Xác thực / nạp subsystem FW từ eMMC"| SUB_FW
    SBI -->|"Chuyển quyền"| UBOOT
    UBOOT -->|"6a · Nạp Linux từ eMMC / Ethernet"| LINUX

    PMU_FW -.-> PMU_RAM
    CSU_FW -.-> CSU_RAM
    FSBL -.-> SRAM
    SBI -.-> DDR
    UBOOT -.-> DDR
    LINUX -.-> DDR
    RPU_FW -.-> TCM
    SUB_FW -.-> SUB_MEM

    classDef power fill:#fff2cc,stroke:#d68b24,color:#302613
    classDef secure fill:#ead0c8,stroke:#c5653e,color:#38251f
    classDef app fill:#c5e5ed,stroke:#d68b24,color:#18333d
    classDef realtime fill:#ddd3cb,stroke:#c5653e,color:#38251f
    classDef accelerator fill:#0bb8dc,stroke:#d68b24,color:#102d36
    classDef memory fill:#f1f5f9,stroke:#64748b,stroke-dasharray:5 5,color:#1e293b
    class POWER,PMU_ROM,RESET,PMU_FW power
    class CSU_ROM,CSU_INIT,CSU_FW secure
    class FSBL,SBI,UBOOT,LINUX app
    class RPU_FW realtime
    class SUB_FW accelerator
    class PMU_RAM,CSU_RAM,SRAM,DDR,TCM,SUB_MEM memory
    style HW fill:#f8fafc,stroke:#64748b,stroke-width:3px,color:#1e293b
    style PMU fill:#fff8db,stroke:#ca8a04,stroke-width:3px,color:#713f12
    style CSU fill:#fff1ed,stroke:#dc6245,stroke-width:3px,color:#7c2d12
    style APU fill:#eaf6ff,stroke:#0284c7,stroke-width:3px,color:#0c4a6e
    style RPU fill:#f4edff,stroke:#9333ea,stroke-width:3px,color:#581c87
    style ACCEL fill:#e0fbf5,stroke:#0d9488,stroke-width:3px,color:#134e4a
    style MEM fill:#f1f5f9,stroke:#64748b,stroke-width:3px,color:#1e293b
~~~

## Flash, eMMC, partition và rootfs

~~~mermaid
flowchart LR
    subgraph FLASH["FLASH · OSPI NOR"]
        NOR_BOOT["Vùng boot image<br/>Header / manifest / chữ ký<br/>CSU FW + PMU FW + FSBL"]
        NOR_NEXT["Vùng firmware tiếp theo<br/>OpenSBI / U-Boot"]
    end
    subgraph EMMC["eMMC"]
          subgraph USER["User area · Bảng phân vùng, ví dụ GPT"]
            FW_PART["Partition firmware<br/>OpenSBI / U-Boot<br/>RPU FW / NPU / DSP / LPU FW"]
            BOOT_PART["Partition boot<br/>Linux kernel + DTB<br/>initramfs nếu sử dụng"]
            ROOT_PART["Partition rootfs<br/>Ví dụ ext4<br/>/sbin/init, thư viện, ứng dụng"]
            DATA_PART["Partition data · Tùy chọn<br/>Cấu hình và dữ liệu ứng dụng"]
        end
    end
    subgraph CSU_LOAD["CSU · Nạp và xác thực giai đoạn đầu"]
        ROM_LOAD["CSU BootROM<br/>Đọc boot image, xác thực CSU FW"]
        CSU_LOAD_FW["CSU Runtime FW<br/>Xác thực / nạp PMU FW và FSBL"]
    end
    subgraph APU_LOAD["APU · Nạp hệ điều hành"]
        FSBL_LOAD["FSBL trong System SRAM<br/>Khởi tạo DDR<br/>Yêu cầu CSU xác thực image"]
        NEXT_LOAD["OpenSBI → U-Boot<br/>Thực thi trong DDR"]
        KERNEL_LOAD["U-Boot nạp kernel + DTB<br/>và initramfs vào DDR"]
        LINUX_MOUNT["Linux · Chọn root theo bootargs<br/>Mount rootfs trên eMMC<br/>Qua initramfs nếu sử dụng"]
        USERSPACE["Userspace<br/>Chạy init và ứng dụng"]
    end
    subgraph SUBSYSTEM["RPU / NPU / DSP / LPU"]
        SUB_LOAD["Firmware đã xác thực<br/>RPU → TCM<br/>NPU / DSP / LPU → SRAM / DDR"]
    end
    NOR_BOOT -->|"Nguồn boot Flash"| ROM_LOAD
 
    ROM_LOAD --> CSU_LOAD_FW
    CSU_LOAD_FW --> FSBL_LOAD
    NOR_NEXT -->|"Nguồn image thay thế"| FSBL_LOAD
    FW_PART -->|"Đọc image firmware"| FSBL_LOAD
    FSBL_LOAD --> NEXT_LOAD
    FSBL_LOAD --> SUB_LOAD
    NEXT_LOAD --> KERNEL_LOAD
    BOOT_PART -->|"Đọc kernel / DTB / initramfs"| KERNEL_LOAD
    KERNEL_LOAD --> LINUX_MOUNT
    ROOT_PART -->|"Mount làm hệ thống tệp gốc"| LINUX_MOUNT
    LINUX_MOUNT --> USERSPACE
    DATA_PART -.->|"Mount khi hệ thống chạy"| USERSPACE
    style FLASH fill:#fff8db,stroke:#ca8a04,stroke-width:3px,color:#713f12
    style EMMC fill:#f4edff,stroke:#9333ea,stroke-width:3px,color:#581c87
    style USER fill:#faf5ff,stroke:#a855f7,color:#581c87
    style CSU_LOAD fill:#fff1ed,stroke:#dc6245,stroke-width:3px,color:#7c2d12
    style APU_LOAD fill:#eaf6ff,stroke:#0284c7,stroke-width:3px,color:#0c4a6e
    style SUBSYSTEM fill:#e0fbf5,stroke:#0d9488,stroke-width:3px,color:#134e4a
~~~

## Khái niệm tổng quát

[**PMU** - (Platform Management Unit – khối quản lý nền tảng)](PMU/) quản lý các trạng thái nguồn nội bộ của SoC bằng phần cứng power-control nằm ngay trong SoC.  
  │                                     
  ├────► Full-Power Domain              
  ├────► Low-Power Domain               
  ├────► clock                          
  ├────► reset                          
  └────► isolation 

[**CSU** - (Control and Security Unit - khối điều khiển và bảo mật)](CSU/) thực hiện các chức năng boot và bảo mật của SoC                                
  │                                     
  ├────► boot controller, boot ROM          
  ├────► DMA (Direct Memory Access – truy cập bộ nhớ trực tiếp)          
  ├────► SHA (Secure Hash Algorithm – thuật toán băm bảo mật)                       
  ├────► AES (Advanced Encryption Standard – chuẩn mã hóa nâng cao)                       
  ├────► Public-key verification như RSA hoặc ECC (Elliptic Curve Cryptography – mật mã đường cong elliptic)
  ├────► Key storage/eFuse, anti-rollback counter  
  ├────► Đọc boot source như QSPI, eMMC, SD hoặc SPI NOR  
  └────► Secure boot state machine 

[**FSBL** - (First Stage Boot Loader - bộ nạp khởi động giai đoạn đầu)](FSBL/) khởi tạo DDR, chuẩn bị nền tảng và phối hợp CSU xác thực các image trước khi chuyển quyền cho OpenSBI.  
  │                                       
  ├────► load OpenSBI ─► handoff to OpenSBI  
  └────► Load U-boot  

[**OpenSBI** - (Open Source Supervisor Binary Interface - firmware cung cấp SBI)](OPENSBI/) chạy ở M-mode, cung cấp dịch vụ nền tảng cho phần mềm S-mode và chuyển quyền cho U-Boot.  
  │  
  ├────► SBI interface                 
  └────► handoff to U-boot  

[**U-Boot** - (Universal Boot Loader - bộ nạp khởi động)](UBOOT/) nạp Linux kernel, device tree và initramfs, chuẩn bị tham số boot rồi chuyển quyền cho kernel.  
  │  
  ├────► load Linux kernel, initramfs, device tree  
  └────► Boot to linux  

[**Linux** - (Hệ điều hành Linux)](Linux/) khởi tạo driver, mount rootfs và chạy các dịch vụ, ứng dụng của hệ thống.  
  │  
  └────► run Application  
 
[**RPU** - (Real-Time Processing Unit - khối xử lý thời gian thực)](RPU/) thực thi firmware hoặc RTOS cho các tác vụ điều khiển cần đáp ứng thời gian thực.  
  │  
  └────► run Realtime function  

  
      
