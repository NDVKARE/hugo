+++
title = "4.5.6 Design Principle"
weight = 6
+++

# 4.5.6 Design Principle

Đây là các ràng buộc bất biến của kiến trúc, mọi thành phần phải tuân thủ:

1. **Firmware NPU tuyệt đối không chứa model.** Không có hàm kiểu `run_yolov8()`, `run_mobilenet()`, mảng trọng số tĩnh, hay danh sách lớp cố định.
2. **CPU runtime sở hữu việc phân tích model và lập lịch đồ thị.** NPU chỉ thực thi các lệnh tổng quát (`CMD_CONV2D`, `CMD_MATMUL`, `CMD_RELU`, `CMD_END`, …).
3. Tham chiếu bộ nhớ chia sẻ dùng **địa chỉ vật lý hoặc offset trong arena**, không dùng con trỏ ảo của CPU.
4. **Command ABI** luôn được đánh phiên bản.
5. **Doorbell qua MMIO** theo cơ chế level và phải được acknowledge.
6. **Cache flush/invalidate** được xử lý đúng trước và sau khi NPU thực thi.
7. **Backend Gemmini** được cô lập phía sau các handler lệnh tổng quát.