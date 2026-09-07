+++
title = "2. Layer Decomposition"
weight = 2
+++

## 3.2  Layer Decomposition

| Layer | Software | Privilege | Responsibilities |
| --- | --- | --- | --- |
| **Hardware** | CVA6 CPU ×4, ISP HD, NPU 2T, LPU 2T, DSP, Wideband PHY, NoC TileLink, LPDDR4X/5 | — | Thực thi tính toán, accelerator AI/vision, kết nối mesh peer-to-peer |
| **Firmware** | BootROM → FSBL → OpenSBI → U-Boot | M-mode | Init hardware, load OS, cung cấp SBI services cho kernel |
| **OS core** | Linux kernel | S-mode | Scheduler, memory, DMA-BUF zero-copy, IRQ/PLIC affinity, PMP isolation |
| **Driver** | `/dev/npu0`, `/dev/video0`, `/dev/lpu0`, Ara built-in | S-mode | Hardware abstraction qua `/dev` node + `ioctl`, DMA-BUF export/import |
| **Runtime / HAL** | `npu_runtime.h`, Camera HAL (V4L2), `lpu_runtime.h`, `librvv` | U-mode | High-level API cho application, buffer management, INT8 dispatch |
| **Application** | TFLite/ONNX, Camera app, LLM inference (GPT-2), DSP/media | U-mode | Business logic, AI inference pipeline, BBox overlay, mission text generation |
