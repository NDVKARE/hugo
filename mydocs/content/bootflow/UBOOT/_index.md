+++
title = "U-boot - Univeral bootloader"
weight = 5
+++

# U-boot - Univeral bootloader
U-Boot là bootloader chạy sau FSBL và OpenSBI, có nhiệm vụ chuẩn bị môi trường rồi nạp Linux kernel, Device Tree và root filesystem.  
## Đặc điểm
- Chạy ở S-mode
- Vị trí thực thi: DDR
- Cần các khối phần cứng phục vụ việc tìm, đọc và khởi động Linux  
## Các câu hỏi
- Đội phần cứng cần cung cấp các IP và tài liệu để bring-up các IP phục vụ việc tìm, đọc và khởi động Linux (ví dụ UART, eMMC, Ethernet). (Q-06)
- Có cần Ethernet trong SoC SOVRA không? Thông thường đội phát triển cần Ethernet để thuận lợi cho việc nạp và gỡ lỗi firmware; sau khi phát hành sản phẩm thì không cần, trừ khi sản phẩm yêu cầu. Nếu có, cần chốt Ethernet chỉ dùng cho phát triển hay được phép dùng làm đường boot trong sản xuất. (Q-07)