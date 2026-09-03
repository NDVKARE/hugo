+++
title = "BootROM"
description = "Tài liệu kỹ thuật: BootROM."
weight = 30
+++

# BootROM

Mã bất biến tại reset vector chọn boot source và nạp image kế tiếp.

![Sơ đồ luồng khởi động RISC-V](/images/boot-flow.svg "RISC-V Boot Flow")

*Hình 1 — Luồng khởi động từ Power On đến Linux User Space.*

## Nội dung chính

- boot strap.
- image header.
- authentication.
- fallback.
