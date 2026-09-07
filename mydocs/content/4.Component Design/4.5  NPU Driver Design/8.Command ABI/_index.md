+++
title = "4.5.8 Command ABI Between CPU and NPU"
weight = 8
+++

# 4.5.8 Command ABI Between CPU and NPU

Phần này đặc tả phía NPU: vai trò firmware, kiến trúc, và toàn bộ Command ABI mà firmware tiêu thụ.

## 4.5.8.1 Command ABI Version

ABI luôn được đánh phiên bản. Firmware phải kiểm tra phiên bản ABI trong job hoặc command buffer trước khi thực thi.

```c
#define SOVRA_NPU_ABI_VERSION_MAJOR 1
#define SOVRA_NPU_ABI_VERSION_MINOR 0
#define SOVRA_NPU_ABI_VERSION \
    ((SOVRA_NPU_ABI_VERSION_MAJOR << 16) | SOVRA_NPU_ABI_VERSION_MINOR)
```

Lệch MAJOR là lỗi không tương thích (hard error). MINOR cao hơn được chấp nhận theo hướng tương thích ngược: firmware bỏ qua các lệnh nó chưa biết.

## 4.5.8.2 Command List

```c
typedef enum {
    SOVRA_CMD_NOP      = 0,
    SOVRA_CMD_CONV2D   = 1,
    SOVRA_CMD_DWCONV2D = 2,
    SOVRA_CMD_MATMUL   = 3,
    SOVRA_CMD_ADD      = 4,
    SOVRA_CMD_RELU     = 5,
    SOVRA_CMD_MAXPOOL  = 6,
    SOVRA_CMD_AVGPOOL  = 7,
    SOVRA_CMD_RESIZE   = 8,
    SOVRA_CMD_END      = 255,
} sovra_cmd_type_t;
```

## 4.5.8.3 Command Header

Mỗi lệnh có kích thước thay đổi và bắt đầu bằng một header chung. Firmware dịch con trỏ lệnh theo trường `size`, và dừng tại `CMD_END`.

```c
typedef struct {
    uint16_t type;
    uint16_t size; /* tổng kích thước lệnh, tính bằng byte */
    uint32_t flags;
} sovra_cmd_header_t;
```

Quy tắc: mọi lệnh mở đầu bằng `sovra_cmd_header_t`; firmware tiến con trỏ theo `hdr.size`, `CMD_END` kết thúc việc thực thi command buffer.
