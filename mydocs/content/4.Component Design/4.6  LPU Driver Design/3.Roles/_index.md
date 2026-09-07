+++
title = "4.6.3 Roles and Responsibilities"
weight = 3
+++

# 4.6.3 Roles and Responsibilities
 
Bảng bên dưới chia trách nhiệm của các công việc chính trong hệ thống.

| Chức năng | CPU Cluster | LPU Bare-metal FW | Compute Engine |
| --- | --- | --- | --- |
| Receive user prompt / mission request | Có | — | — |
| Tokenization / prompt encoding | Có | — | — |
| LLM runtime scheduling | Có — điều phối decode loop, layer execution, fallback | Có — nhận job, điều khiển mức thấp | — |
| Memory planning / buffer allocation | Có | Có | — |
| Descriptor parsing / validation | — | Có | — |
| MMIO doorbell / launch | Có | Có | — |
| MatMul / tensor computation | — | Có | Có |
| KV cache read/write | Có | Có | Có |
| Output buffer generation | Có | Có | Có |
| Error handling / timeout | Có | Có | Có |
| JSON validation / final command approval | Có | — | — |

Tổng quan, CPU cluster chuẩn bị và quyết định công việc cần giao cho LPU, bao gồm xử lý prompt, chuẩn bị dữ liệu, lập kế hoạch bộ nhớ và tạo job/command. Bare-metal Firmware là lớp điều khiển trung gian, chịu trách nhiệm nhận job từ CPU, phân tích command, cấu hình phần cứng và giám sát quá trình chạy. Compute Engine là khối thực thi chính các phép toán trên phần cứng.