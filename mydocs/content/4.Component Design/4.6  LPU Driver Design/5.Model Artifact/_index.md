+++
title = "4.6.5 Model Artifact"
weight = 5
+++

# 4.6.5 Model Artifact

Model LLM được biểu diễn dưới dạng một artifact dữ liệu phía CPU. Đây là đơn vị chính cần thay đổi khi triển khai hoặc cập nhật một model mới hoặc thay đổi tokenizer, quantization, context length, memory layout.

Mỗi LPU model artifact chứa:

| Thành phần | Nội dung |
| --- | --- |
| **Header** | Magic, version, model ID, checksum, artifact size. |
| **Model config** | Số layer, hidden size, vocab size, context length, precision. |
| **Tokenizer / vocabulary** | Vocab file, special tokens. |
| **Prompt template** | Format prompt đầu vào. |
| **Tensor table** | Shape, dtype, offset, size của từng tensor trong artifact. |
| **Weights** | Trọng số GPT-2 đã pack/quantize. |
| **Operator / layer schedule** | Thứ tự chạy các layer. |
| **Memory plan** | Địa chỉ vùng input tokens, logits, output tokens, scratch buffer, KV cache. |
| **KV cache config** | Layout key/value cache, max tokens. |
| **Decode config** | Max tokens, stop token. |
| **Output schema** | Text/JSON/mission DSL format. |
