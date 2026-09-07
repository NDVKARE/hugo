+++
title = "4.5.4 Communication flow"
weight = 4
+++
 
# 4.5.4 Communication flow

Ở trạng thái ổn định, CPU chỉ giữ vai trò điều phối (rung doorbell, đọc IRQ hoàn thành).
CPU không chạm vào dữ liệu pixel và không duyệt các ứng viên detection — cả hai đều được tăng tốc bằng phần cứng (ISP và NPU/Gemmini).
Mỗi khung hình, công việc của CPU chỉ là một số ít thao tác ghi thanh ghi và đọc một ngắt.

![CPU → NPU: nạp model, dựng command buffer, cập nhật shared queue và rung doorbell. NPU → CPU: ghi trạng thái, phát IRQ, CPU xử lý ngắt và đọc kết quả.](/images/npu-communication-flow.svg)

