+++
title = "RPU - Real time processor unit"
weight = 7
+++

# RPU - Real time processor unit

Firmware của RPU có thể là bare-metal hoặc RTOS (ví dụ uC/OS, Zephyr). 
Core RPU RISC-V.  

**Đặc điểm**  
- Phục vụ các tác vụ thời gian thực
- Vị trí lưu trữ: eMMC
- Vị trí thực thi: TCM riêng của RPU
- Thành phần điều phối: FSBL yêu cầu CSU xác thực, nạp Firmware, thiết lập entry-point, đồng bộ bộ nhớ rồi yêu cầu PMU giải phóng reset.