+++
title = "4.2  OpenSBI"
weight = 2
+++

## 4.2  OpenSBI

### 4.2.1 Purpose & Responsibility

OpenSBI chạy ở M-mode — tầng firmware đặc quyền cao nhất. Cung cấp SBI (Supervisor Binary Interface) cho Linux kernel dùng để gọi các dịch vụ hardware mà kernel không được phép trực tiếp truy cập.

### 4.2.2 Internal Design

| SBI Extension | Mô tả | Kernel dùng để |
| --- | --- | --- |
| **Timer** (`sbi_set_timer`) | Set timer interrupt cho mỗi HART | Scheduler tick, process timeslice |
| **IPI** (`sbi_send_ipi`) | Gửi inter-processor interrupt | Wakeup HART khác khi có task mới |
| **Remote fence** | Broadcast cache/TLB flush | Sync icache giữa các core |
| **HSM** (`hart_start`) | Khởi động HART đang offline | SMP boot: bring up core 1/2/3 |
| **HSM** (`hart_stop`) | Dừng HART | CPU hotplug, power saving |
| **System Reset** | Reset / poweroff chip | Linux shutdown / reboot |

### 4.2.3 Design Rationale

`PLATFORM=generic`: OpenSBI đọc địa chỉ CLINT/PLIC/UART từ DTB lúc runtime. Lợi ích: cùng binary chạy được trên FPGA (địa chỉ Xilinx MIG) và ASIC (địa chỉ custom) mà không cần rebuild.

   
