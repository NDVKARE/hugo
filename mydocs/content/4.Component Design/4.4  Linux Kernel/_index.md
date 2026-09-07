+++
title = "4.4 Linux Kernel"
weight = 4
+++

## 4.4 Linux Kernel

### 4.4.1  SMP Boot Flow
HART 0 là primary: khởi động đầu tiên, init kernel, mount rootfs, start systemd. HART 1/2/3 là secondary: primary gọi SBI sbi_hart_start() để wakeup từng core. Linux scheduler tự phân phối task sau khi tất cả online.
### 4.4.2 Kernel config
Sử dụng config defaut của kernel version V6.6
### 4.4.4 Userspace Environment (Buildroot)
Buildroot được sử dụng làm Root Filesystem (RootFS) chuẩn cho nền tảng CVA6 trong giai đoạn Linux bring-up và xác thực hệ thống.
Môi trường userspace cung cấp các thành phần cần thiết để Linux hoạt động sau khi hoàn tất quá trình khởi động, bao gồm:
Init system
Shell utilities
System libraries
Debug utilities
Runtime libraries
User applications
