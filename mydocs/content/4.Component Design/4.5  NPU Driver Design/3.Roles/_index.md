+++
title = "4.5.3 Roles and Responsibilities"
weight = 3
+++

# 4.5.3 Roles and Responsibilities

Bảng dưới là ma trận trách nhiệm chính thức (RACI rút gọn) giữa các khối.

| Chức năng | CPU Cluster | NPU Rocket FW | Gemmini |
| --- | --- | --- | --- |
| Nạp file model | Có | — | — |
| Phân tích đồ thị model | Có | — | — |
| Lưu trọng số | Có (DDR/Flash) | — | — |
| Cấp phát tensor | Có | — | — |
| Nối activation giữa các lớp (`out_offset N = in_offset N+1`) | Có (trong cmd buffer) | — | — |
| Ghi activation vào arena | — | Submit | Có (Gemmini stores) |
| Đọc activation từ arena (input lớp kế) | — | Submit | Có (Gemmini loads) |
| Dựng command buffer | Có | — | — |
| Đọc command buffer | — | Có | — |
| Dispatch operator | — | Có | — |
| Thực thi matmul/conv | — | Gọi backend | Có |
| Fallback operator không hỗ trợ | Có | — | — |
| Cache flush/invalidate | Có | Tuỳ coherency | — |