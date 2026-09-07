+++
title = "4.5.1 Purpose"
weight = 1
+++

# 4.5.1 Purpose

Mục tiêu của thiết kế là chuẩn hoá IP NPU theo hướng model-agnostic, trong đó việc thay đổi hoặc cập nhật model AI, ví dụ từ YOLOv8 sang MobileNet, không yêu cầu sửa đổi, biên dịch lại hoặc nạp lại firmware của NPU.

Toàn bộ thông tin đặc thù của model, bao gồm cấu trúc đồ thị tính toán, tham số layer, cấu hình tensor, thứ tự thực thi và metadata liên quan, được quản lý ở phía CPU dưới dạng dữ liệu cấu hình. NPU không chứa logic phụ thuộc vào một model cụ thể, mà chỉ đóng vai trò là một bộ thực thi lệnh tổng quát có khả năng nhận, giải mã và thực thi các command do CPU phát sinh.

Cách tiếp cận này giúp tách biệt rõ ràng giữa:

- **Model representation và scheduling:** được xử lý bởi CPU.
- **Command execution:** được xử lý bởi NPU Rocket.
- **Tensor/matrix computation:** được thực hiện bởi Gemmini.

Nhờ đó, hệ thống có thể hỗ trợ nhiều loại model AI khác nhau mà không làm thay đổi firmware hoặc kiến trúc điều khiển bên trong NPU.