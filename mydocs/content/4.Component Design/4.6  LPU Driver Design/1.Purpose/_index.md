+++
title = "4.6.1 Purpose"
weight = 1
+++

# 4.6.1  Purpose
Mục tiêu của thiết kế là chuẩn hóa IP LPU sao cho việc thay đổi LLM/language model (chuyển đổi model, cập nhật model với độ chính xác cao hơn) không yêu cầu sửa đổi hay nạp lại (flash) firmware của LPU. Toàn bộ thông tin về model được đưa về CPU dưới dạng dữ liệu cấu hình, LPU chỉ đóng vai trò một bộ thực thi lệnh tổng quát.
Khác với việc hard-code từng model trong firmware, LPU bare-metal firmware chỉ cần hiểu các comand tổng quát đã được định nghĩa như CMD_MATMUL, CMD_ATTENTION, CMD_MLP, CMD_SOFTMAX, CMD_DMA_LOAD và CMD_SYNC.
LPU HAL, MMIO interface, doorbell mechanism, bare-metal firmware và compute engine nên giữ nguyên nếu model mới vẫn có thể được compiler chuyển thành tập command và LPU hiện tại hỗ trợ.
4.6.2  Architect Overview
Hệ thống giữa CPU và LPU gồm ba khối chính, chúng giao tiếp qua vùng nhớ chia sẻ (shared DDR/SRAM), kết hợp doorbell qua MMIO và tín hiệu ngắt báo hoàn thành (completion IRQ).
