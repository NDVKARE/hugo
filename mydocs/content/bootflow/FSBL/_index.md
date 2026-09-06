+++
title = "FSBL - First state bootloader"
weight = 3
+++

# FSBL - First Stage Boot Loader

**FSBL** là bootloader có thể cập nhật đầu tiên chạy trên CPU Cluster.  
Với kiến trúc hiện tại, CVA6 core 0 / hart 0 được kích hoạt trước, core 1–3 tiếp tục bị giữ reset.

## Đặc điểm

- Được lưu trữ ở OSPI NOR hoặc eMMC (giả định, xem Q-04).
- Được thực thi trong System SRAM ở giai đoạn trước khi DDR sẵn sàng.
- Chạy ở M-mode; kết thúc vai trò sau khi chuyển quyền cho OpenSBI.

## Trách nhiệm

- Khởi tạo pinmux và cây clock cho miền ứng dụng.
- Khởi tạo DDR controller và thực hiện DDR PHY training.
- Yêu cầu CSU xác thực OpenSBI, U-Boot và firmware của các subsystem.
- Nạp các FW đã xác thực vào vùng nhớ thực thi tương ứng;
- Thiết lập entry-point, device tree và vùng memory reservation;
- Đồng bộ bộ nhớ rồi điều phối trình tự giải phóng reset cho từng subsystem;
- Chuyển quyền điều khiển cho OpenSBI.
