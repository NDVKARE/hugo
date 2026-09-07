+++
title = "4.6.6 Design Principle"
weight = 6
+++

# 4.6.6 Design Principle

Đây là các ràng buộc bất biến của kiến trúc LPU, mọi thành phần phải tuân thủ:

1. **Firmware LPU tuyệt đối không chứa model-specific logic.** Không có hàm `run_gpt2()`, `run_llama()`, `run_model_x()`, hoặc danh sách layer cố định trong firmware.
2. **CPU-side LPU model artifact là nguồn cấu hình duy nhất của model.** Các thông tin như `model_id`, `num_layers`, `hidden_size`, `num_heads`, `vocab_size`, `context_length`, `max_token`, tokenizer metadata, quantization parameters và KV cache layout phải nằm trong artifact.
3. **CPU chỉ đóng vai trò host/controller, không chạy các kernel tính toán LLM.** CPU tạo prompt, tokenize, dựng input token buffer, dựng job descriptor, cập nhật queue, rung doorbell và đọc kết quả. Các phép tính sẽ được thực hiện bởi LPU.
4. **LPU chỉ thực thi các lệnh tổng quát đã được định nghĩa.** Ví dụ: `CMD_EMBEDDING`, `CMD_MATMUL`, `CMD_ATTENTION`, `CMD_MLP`, …
5. **Doorbell qua MMIO** phải có cơ chế acknowledge rõ ràng.
6. **Cache flush/invalidate** phải được xử lý đúng trước và sau khi LPU thực thi.
7. **Backend compute engine** được cô lập phía sau các command handler tổng quát.
