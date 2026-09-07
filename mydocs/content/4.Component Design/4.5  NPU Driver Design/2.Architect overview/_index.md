+++
title = "4.5.2 Architect overview"
weight = 2
+++

# 4.5.2  Architect overview
Hệ thống gồm ba khối, giao tiếp qua vùng nhớ chia sẻ (shared DDR/SRAM) kết hợp doorbell qua MMIO và ngắt báo hoàn thành (completion IRQ).

![NPU architecture: Model Artifact → CPU Cluster, Shared Memory Region và NPU Subsystem với Rocket firmware và Gemmini backend.](/images/npu-architecture-overview.svg)