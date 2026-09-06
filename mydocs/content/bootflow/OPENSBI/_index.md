+++
title = "OpenSBI - Open serial binary interface"
weight = 4
+++

# OpenSBI - Open serial binary interface

OpenSBI – phần mềm mã nguồn mở hiện thực giao diện nhị phân cho chế độ Supervisor, là firmware chạy ở Machine Mode (M-mode) – chế độ đặc quyền cao nhất của RISC-V, đứng giữa phần cứng RISC-V và hệ điều hành như Linux.

## Đặc điểm
- Chạy ở M-mode và vẫn thường trú sau khi chuyển quyền cho S-mode; đây là điểm khác biệt so với FSBL.
- Vị trí thực thi: vùng dành riêng trong DDR, được bảo vệ khỏi truy cập từ S-mode;
- Cung cấp dịch vụ SBI cho phần mềm S-mode, gồm quản lý trạng thái hart (HSM), timer, IPI và các dịch vụ nền tảng.
- Là thành phần thích hợp để giải phóng CVA6 core 1–3 theo yêu cầu của hệ điều hành.

~~~text
Machine Mode
    M-mode
    quyền cao nhất
        │
        │ OpenSBI chạy ở đây
        ▼
Supervisor Mode
    S-mode
        │
        │ Linux Kernel chạy ở đây
        ▼
User Mode
    U-mode
        │
        │ Application
        ▼
~~~