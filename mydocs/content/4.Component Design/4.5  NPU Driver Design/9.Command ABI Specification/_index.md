+++
title = "4.5.9 Command ABI Specification"
weight = 9
+++

# 4.5.9 Command ABI Specification

## 4.5.9.1 CONV2D

Tích chập 2D có lượng tử hoá. Các trường multiplier/shift cùng ba zero-point thực hiện requantize kết quả tích luỹ int32 về int8.

![Cấu trúc sovra_cmd_conv2d_t: header, các offset, dims, zero_points, multiplier và shift, theo hình mẫu.](/images/npu-conv2d-command-layout.svg)
