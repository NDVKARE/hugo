+++
title = "5 Device tree design"
weight = 5
+++

 
## 3.5.1 Purpose 
Device Tree (DT) là cơ chế mô tả phần cứng được sử dụng bởi OpenSBI,
U-Boot và Linux kernel để khám phá tài nguyên hệ thống tại runtime. Các thành phần được mô tả trong DTB bao gồm:
- CPU topology
- Memory regions
- Interrupt controllers
- UART
- Ethernet
- DMA controllers
- Accelerator peripherals

## 3.5.2 Device Tree Structure 

![Device Tree: root chứa cpus, memory@80000000, chosen và soc; soc chứa clint, plic, uart, dma, npu, isp và lpu.](/images/device-tree-layout.svg)

## 3.5.3 Interrupt Architecture 
CLINT cung cấp:

- Timer interrupt
- Inter-Processor Interrupt (IPI)

PLIC tiếp nhận interrupt từ peripheral:
- UART
- DMA
- NPU
- ISP
- LPU

## 3.5.4 Accelerator Description 
Các accelerator được mô tả dưới dạng DT nodes riêng biệt.

Mỗi node cung cấp:
- Base address
- Interrupt number
- Clock source
- DMA capability 
