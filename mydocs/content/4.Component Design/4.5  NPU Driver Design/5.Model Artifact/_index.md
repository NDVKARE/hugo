+++
title = "4.5.5 Model Artifact"
weight = 5
+++

# 4.5.5 Model Artifact

Model được biểu diễn dưới dạng một artifact dữ liệu phía CPU. Đây là đơn vị duy nhất cần thay đổi khi triển khai model mới.

| Thành phần | Nội dung |
| --- | --- |
| **Header** | `magic`, `version`, `model_id`, các offset, checksum |
| **Tensor table** | Shape, dtype, tham số lượng tử hoá theo tensor |
| **Operator table** | Command stream hoặc các node đồ thị |
| **Weights** | Trọng số đã pack/quantize |
| **Quantization meta** | Scale/zero-point |
| **Input/output meta** | Kích thước, định dạng, tham số preprocess |

Metadata của artifact (mean/std/scale, độ phân giải input/output) chính là nguồn cấu hình cho ISP preprocess/postprocess — nhờ đó ISP HAL không cần chứa hằng số riêng cho model.
