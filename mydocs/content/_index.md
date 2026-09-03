+++
title = "RISC-V Embedded System"
weight = 1

+++

# RISC-V Embedded System

Cổng tài liệu kỹ thuật mô tả toàn bộ hệ thống từ kiến trúc silicon đến phần mềm vận hành sản phẩm.

## Luồng hệ thống

~~~mermaid
flowchart LR
    A[Power On] --> B[BootROM]
    B --> C[CSU / Secure Boot]
    C --> D[OpenSBI]
    D --> E[U-Boot]
    E --> F[Linux Kernel]
    F --> G[Root Filesystem]
    G --> H[Applications]
~~~

## Cây tài liệu

1. [RISC-V Architecture](01-architecture/)
2. [Boot Flow](02-boot/)
3. [Interrupt & Timer](03-interrupt-timer/)
4. [Memory System](04-memory/)
5. [Interconnect & DMA](05-interconnect/)
6. [Peripherals](06-peripherals/)
7. [Storage](07-storage/)
8. [Network](08-network/)
9. [Linux Software Stack](09-linux-software/)
10. [Security & Secure Boot](10-security/)
11. [Debug & Test](11-debug-test/)
12. [Firmware, RTOS & IPC](12-rtos-ipc/)
13. [System Management](13-system-management/)

## Phạm vi

- Hardware: CPU, accelerator, memory, bus và peripheral.
- Boot firmware: BootROM, CSU, OpenSBI và U-Boot.
- Operating systems: Linux, bare-metal, FreeRTOS và Zephyr.
- Product lifecycle: secure boot, update, recovery, logging và diagnostics.
