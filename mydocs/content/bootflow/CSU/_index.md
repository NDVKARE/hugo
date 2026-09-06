+++
title = "CSU - Control and Security Unit"
weight = 2
+++

# CSU - Control and Security Unit

**CSU** (Control and Security Unit)  là khối điều khiển và bảo mật của SoC. Kiến trúc trình bày ở đây gồm **Secure ROM cố định** và **Secure Firmware có thể cập nhật**: 
- Secure ROM chịu trách nhiệm kiểm tra image CSU firmware lúc khởi động
- Secure Firmware tiếp nhận và xử lý request khi hệ thống vận hành
- Đóng vai trò [**Root-of-Trust**](ROT/) của toàn hệ thống

Đặc điểm:
- CSU processor fetch và thực thi trực tiếp mã lệnh từ CSU Mask ROM trên die (XIP).
- Thời điểm chạy: sau khi miền PMU giải phóng reset cho CSU 
- Đọc cấu hình boot mode và các trường cấu hình trong eFuse/OTP.
- Khởi tạo CSU SRAM và khối Crypto Engine.
- Khởi tạo controller của thiết bị lưu trữ khởi động (QSPI FLASH / eMMC).
- Đọc khóa gốc hoặc hash của khóa gốc từ OTP/eFuse.
- Xác thực CSU Runtime Firmware và nạp vào CSU RAM.
- Chuyển quyền điều khiển cho CSU Runtime Firmware.

## 1. Kiến trúc CSU

~~~text
CSU
├── Immutable Secure ROM              Cố định trong silicon
│   ├── Đọc và kiểm tra firmware image
│   ├── Xác thực chữ ký
│   ├── Kiểm tra phiên bản được phép
│   └── Cho phép thực thi khi hợp lệ
├── Secure SRAM                       Chứa firmware khi thực thi
├── Secure CPU                        Thực thi ROM / Secure Firmware
├── Secure Firmware                   Có thể cập nhật
│   ├── Secure boot policy
│   ├── Key management
│   ├── Crypto service
│   ├── Anti-rollback policy
│   └── Runtime security
├── Các tài nguyên bảo mật
│   ├── AES / SHA / RSA
│   ├── Key storage
│   ├── eFuse
│   └── PUF
└── Thanh ghi điều khiển và trạng thái
~~~

| Thành phần | Vai trò trong luồng |
| --- | --- |
| **Secure ROM** | Giữ phần kiểm tra ban đầu tối thiểu, quyết định firmware nào được phép chạy. |
| **QSPI Flash** | Lưu Secure Firmware Image; đây là phần được thay đổi khi cập nhật firmware. |
| **Secure SRAM** | Chứa mã firmware được nạp để thực thi. |
| **Secure CPU** | Bắt đầu với ROM, sau đó chuyển quyền điều khiển cho firmware hợp lệ. |
| **Secure Firmware** | Cung cấp chính sách và dịch vụ bảo mật có thể cập nhật. |

## 2. Luồng nạp và xác thực Secure Firmware

~~~mermaid
%%{init: {"themeVariables": {"fontSize": "12px"}, "flowchart": {"nodeSpacing": 16, "rankSpacing": 18, "padding": 6, "useMaxWidth": true}}}%%
flowchart TD
    START["CSU bắt đầu thực thi Secure ROM"] --> READ["0. Đọc Secure Firmware Image"]
    FLASH["QSPI Flash<br/>Binary · Version · Signature · Metadata"] --> READ
    READ --> FORMAT["1. Kiểm tra cấu trúc image"]
    FORMAT --> SIGN["2. Xác thực chữ ký"]
    SIGN --> VERSION["3. Kiểm tra phiên bản"]
    VERSION --> VALID{"4. Image được chấp nhận?"}
    VALID -->|Không| REJECT["Từ chối thực thi<br/>Chuyển xử lý lỗi / phục hồi"]
    VALID -->|Có| COPY["5. Nạp firmware vào Secure SRAM"]
    COPY --> HANDOFF["6. Chuyển quyền điều khiển<br/>Secure CPU chạy firmware"]
    HANDOFF --> SERVICES["7. Secure Firmware hoạt động<br/>Policy · Keys · Crypto · Runtime security"]
    classDef error fill:#fee2e2,stroke:#dc2626,color:#7f1d1d
    classDef ready fill:#dcfce7,stroke:#16a34a,color:#14532d
    class REJECT error
    class HANDOFF,SERVICES ready
~~~

Sơ đồ mô tả các bước logic; bất kỳ kiểm tra bắt buộc nào thất bại đều dẫn đến từ chối. Khi triển khai, dữ liệu được thực thi phải chính là dữ liệu đã được xác thực, kể cả khi việc đọc, copy và kiểm tra được thực hiện xen kẽ.

### Giải thích các bước

| Bước | Công việc | Ý nghĩa |
| :---: | --- | --- |
| **0** | Đọc image | ROM lấy firmware binary và thông tin đi kèm từ QSPI Flash. |
| **1** | Kiểm tra cấu trúc | Kiểm tra định dạng, kích thước, địa chỉ nạp và điểm vào theo quy ước image. |
| **2** | Xác thực chữ ký | Kiểm tra tính xác thực và toàn vẹn bằng khóa tin cậy của hệ thống. |
| **3** | Kiểm tra phiên bản | So sánh phiên bản với chính sách cho phép, từ chối phiên bản đã bị loại bỏ. |
| **4** | Quyết định | Chỉ cho phép tiếp tục khi tất cả kiểm tra bắt buộc đạt yêu cầu. |
| **5** | Nạp Secure SRAM | Đặt mã firmware hợp lệ vào vùng nhớ thực thi được bảo vệ. |
| **6** | Handoff | Secure CPU chuyển từ mã ROM sang điểm vào của Secure Firmware. |
| **7** | Cung cấp dịch vụ | Firmware khởi tạo và phục vụ các chức năng bảo mật khi hệ thống chạy. |

## 3. Luồng cập nhật Secure Firmware

Cập nhật thay đổi **firmware image trong flash**. Secure ROM vẫn cố định và kiểm tra lại image khi khởi động. Quy trình dưới đây mô tả nguyên tắc; bố trí slot, cơ chế ghi flash và đường phục hồi cần được xác định trong thiết kế cập nhật.

~~~mermaid
%%{init: {"themeVariables": {"fontSize": "12px"}, "flowchart": {"nodeSpacing": 16, "rankSpacing": 18, "padding": 6, "useMaxWidth": true}}}%%
flowchart TD
    PACKAGE["Nhận gói Secure Firmware mới"] --> CHECK["Kiểm tra gói cập nhật<br/>Chữ ký · Phiên bản · Tương thích"]
    CHECK --> OK{"Chấp nhận cập nhật?"}
    OK -->|Không| STOP["Từ chối gói cập nhật"]
    OK -->|Có| WRITE["Ghi image vào vùng cập nhật QSPI"]
    WRITE --> VERIFY["Kiểm tra dữ liệu đã ghi"]
    VERIFY --> WRITTEN{"Ghi đầy đủ và hợp lệ?"}
    WRITTEN -->|Không| RECOVER["Báo lỗi / phục hồi<br/>Không kích hoạt image lỗi"]
    WRITTEN -->|Có| ACTIVATE["Kích hoạt image theo cơ chế cập nhật"]
    ACTIVATE --> REBOOT["Khởi động lại CSU / hệ thống<br/>theo thiết kế reset"]
    REBOOT --> ROM["Secure ROM kiểm tra lại image"]
    ROM --> BOOT{"Đạt kiểm tra boot?"}
    BOOT -->|Có| RUN["Nạp Secure SRAM<br/>Chạy Secure Firmware mới"]
    BOOT -->|Không| RECOVER
~~~

| Giai đoạn | Trách nhiệm |
| --- | --- |
| **Chuẩn bị gói** | Đóng gói binary, version, metadata và chữ ký theo định dạng được ROM hỗ trợ. |
| **Kiểm tra trước ghi** | Thành phần xử lý cập nhật kiểm tra gói và điều kiện tương thích. |
| **Ghi và kích hoạt** | Chỉ kích hoạt image sau khi ghi thành công; quy định cách xử lý mất nguồn hoặc ghi lỗi. |
| **Kiểm tra lúc boot** | ROM vẫn thực hiện xác thực độc lập trước khi cho phép chạy firmware mới. |

## 4. Dịch vụ của Secure Firmware

| Chức năng | Phạm vi |
| --- | --- |
| **Secure boot policy** | Quản lý điều kiện cho phép các thành phần tiếp theo được nạp hoặc chạy. |
| **Key management** | Quản lý việc sử dụng khóa và quyền truy cập tài nguyên khóa. |
| **Crypto service** | Cung cấp thao tác mật mã qua các khối AES, SHA, RSA theo giao diện thiết kế. |
| **Anti-rollback** | Áp dụng chính sách phiên bản và phối hợp với cơ chế kiểm tra của ROM. |
| **Runtime security** | Xử lý yêu cầu và sự kiện bảo mật trong quá trình vận hành. |

## 5. Luồng yêu cầu bảo mật từ AP

**AP (Application Processor – bộ xử lý ứng dụng)** gửi request đến **Secure Firmware đang chạy trên CSU** để sử dụng dịch vụ bảo mật. 

Luồng dưới đây mô tả giao diện logic của kiến trúc này. Kênh truyền có thể là mailbox kết hợp shared memory và ngắt thông báo; cơ chế cụ thể, định dạng message và tên API cần được xác định trong đặc tả AP–CSU.

### Flow request / response

~~~mermaid
%%{init: {"themeVariables": {"fontSize": "12px"}, "flowchart": {"nodeSpacing": 16, "rankSpacing": 18, "padding": 6, "useMaxWidth": true}}}%%
flowchart TD
    APP["0. Ứng dụng / OS trên AP"] --> DRIVER["1. Driver tạo request<br/>ID · Service · Tham số · Buffer"]
    DRIVER --> SEND["2. Gửi qua kênh AP–CSU<br/>Thông báo có request"]
    SEND --> RECEIVE["3. Secure Firmware tiếp nhận<br/>Chụp nội dung request"]
    RECEIVE --> VALIDATE["4. Kiểm tra nguồn gọi, quyền<br/>Service · Key handle · Buffer"]
    VALIDATE --> ALLOW{"Request hợp lệ<br/>và được phép?"}
    ALLOW -->|Không| DENY["Tạo phản hồi lỗi<br/>Không thực hiện dịch vụ"]
    ALLOW -->|Có| DISPATCH["5. Chuyển đến service handler"]
    DISPATCH --> EXEC["6. Thực hiện dịch vụ<br/>Firmware / AES / SHA / RSA"]
    EXEC --> DONE{"Hoàn tất thành công?"}
    DONE -->|Không| FAIL["Ghi nhận lỗi / timeout<br/>Dọn trạng thái tác vụ"]
    DONE -->|Có| RESULT["7. Chuẩn bị kết quả được phép trả"]
    DENY --> RESPONSE["8. Response<br/>Request ID · Status · Result"]
    FAIL --> RESPONSE
    RESULT --> RESPONSE
    RESPONSE --> NOTIFY["Thông báo hoàn tất cho AP"]
    NOTIFY --> CONSUME["9. Driver đối chiếu request ID<br/>Trả kết quả cho bên gọi"]
    classDef error fill:#fee2e2,stroke:#dc2626,color:#7f1d1d
    classDef success fill:#dcfce7,stroke:#16a34a,color:#14532d
    class DENY,FAIL error
    class RESULT,CONSUME success
~~~

### Giải thích các bước

| Bước | Bên thực hiện | Công việc |
| :---: | --- | --- |
| **0** | Ứng dụng / OS | Yêu cầu dịch vụ như băm, xác thực chữ ký hoặc mã hóa. |
| **1** | Driver AP | Đóng gói service ID, request ID và tham số; chuẩn bị buffer theo giao thức. |
| **2** | Kênh AP–CSU | Công bố request rồi thông báo cho CSU; đồng bộ cache/bộ nhớ nếu dùng vùng chia sẻ không coherent. |
| **3** | Secure Firmware | Tiếp nhận và chụp descriptor vào vùng CSU quản lý để tránh AP đổi tham số trong lúc kiểm tra. |
| **4** | Bộ kiểm tra request | Kiểm tra danh tính nguồn gọi từ ngữ cảnh tin cậy, quyền dùng service/khóa, địa chỉ, độ dài và quyền truy cập buffer. |
| **5** | Dispatcher | Chọn handler của dịch vụ được hỗ trợ; quản lý hàng đợi nếu CSU đang bận. |
| **6** | Service handler | Thực hiện thuật toán bằng firmware hoặc phần cứng mật mã; theo dõi trạng thái và timeout. |
| **7** | Secure Firmware | Ghi kết quả vào vùng đầu ra hợp lệ; không trả khóa bí mật nội bộ cho AP. |
| **8** | CSU | Công bố response trước khi thông báo hoàn tất; trả mã lỗi khi request bị từ chối hoặc xử lý thất bại. |
| **9** | Driver AP | Ghép response với request đang chờ, kiểm tra status và độ dài kết quả trước khi trả cho bên gọi. |

### Nội dung request và response

Các trường sau là **đề xuất giao diện**, chưa phải layout thanh ghi hay ABI cố định.

| Message | Trường | Mục đích |
| --- | --- | --- |
| Request | `request_id`, `service_id` | Nhận diện tác vụ và dịch vụ cần gọi. |
| Request | `parameters`, `key_handle` nếu cần | Tham số thuật toán và tham chiếu khóa; handle không thay thế kiểm tra quyền. |
| Request | `input_buffer`, `input_length` | Vị trí và kích thước dữ liệu đầu vào. |
| Request | `output_buffer`, `output_capacity` | Vùng nhận kết quả và sức chứa tối đa. |
| Response | `request_id`, `status`, `result_length` | Ghép tác vụ, báo thành công/lỗi và độ dài kết quả hợp lệ. |

**Ranh giới bảo mật:** AP gửi yêu cầu sử dụng dịch vụ; CSU quyết định quyền thực hiện. Danh tính do AP tự ghi trong payload không đủ để xác thực nguồn gọi. Với dữ liệu chia sẻ, cần copy vào vùng bảo vệ hoặc cơ chế sở hữu buffer phù hợp để dữ liệu không bị thay đổi giữa lúc kiểm tra và sử dụng.

### Ví dụ: AP yêu cầu xác thực chữ ký

~~~text
AP → CSU: request_id, dịch vụ VERIFY_SIGNATURE,
          dữ liệu, chữ ký, key_handle

CSU: kiểm tra request và quyền sử dụng khóa
     → xác thực chữ ký bằng thuật toán được chọn
     → trả request_id + trạng thái xác thực

AP: nhận kết quả hợp lệ / không hợp lệ / lỗi xử lý
~~~

Request ID dùng để ghép phản hồi, không tự cung cấp cơ chế chống phát lại. Các yêu cầu thay đổi trạng thái bảo mật, chẳng hạn cập nhật firmware hoặc chính sách khóa, cần quy tắc cấp quyền và kiểm soát phiên giao dịch riêng trong đặc tả dịch vụ.

### Flow: FSBL yêu cầu xác thực OpenSBI và U-Boot

FSBL điều phối việc đọc image và yêu cầu xác thực; CSU Runtime FW thực hiện kiểm tra mật mã và chính sách bảo mật. Luồng dưới đây là **đề xuất chi tiết** dùng mailbox và vùng nhớ chia sẻ; định dạng image, thuật toán chữ ký, thanh ghi và ABI cần được chốt trong đặc tả FSBL–CSU.

~~~mermaid
sequenceDiagram
    participant F as FSBL
    participant S as OSPI NOR / eMMC
    participant C as CSU Runtime FW
    participant K as Gốc tin cậy / Crypto
    loop Từng image: OpenSBI, sau đó U-Boot
        F->>S: Đọc header, manifest, chữ ký và payload
        S-->>F: Image trong vùng đệm chưa tin cậy
        F->>F: Kiểm tra giới hạn kích thước, địa chỉ và tràn số
        F->>F: Chuẩn bị descriptor, đồng bộ cache / bộ nhớ
        F->>C: Mailbox: VERIFY_IMAGE + request_id + buffer + length
        C->>C: Kiểm tra bên gọi, descriptor và phạm vi buffer
        C->>C: Chụp metadata, giữ payload ổn định khi xác thực
        C->>K: Lấy khóa tin cậy hoặc kiểm tra chuỗi khóa về OTP
        K-->>C: Khóa được phép theo chính sách
        C->>C: Kiểm tra chữ ký manifest bằng khóa tin cậy
        C->>C: Kiểm tra loại image, phiên bản và địa chỉ đích
        C->>K: Tính hash payload theo thuật toán được phép
        K-->>C: Hash payload thực tế
        C->>C: So sánh với hash trong manifest đã xác thực
        alt Một bước lỗi hoặc không hợp lệ
            C-->>F: request_id + FAIL + mã lỗi
            F->>F: Hủy image, dừng luồng boot
        else Tất cả kiểm tra hợp lệ
            C-->>F: request_id + OK + thông tin image đã xác thực
            F->>F: Đối chiếu request_id, status và image
            F->>F: Nạp đúng payload đã xác thực vào DDR
        end
    end
    Note over F,C: Chỉ tiếp tục khi cả hai image thành công<br/>Lỗi hoặc timeout kết thúc luồng
    F->>F: Đồng bộ bộ nhớ / lệnh, chuẩn bị tham số handoff
    F->>F: Chuyển quyền đến entry-point OpenSBI đã xác thực
~~~

**Dữ liệu gửi sang CSU**

| Trường đề xuất | Nội dung |
| --- | --- |
| `request_id` | Ghép phản hồi với đúng yêu cầu đang chờ. |
| `service` | Dịch vụ xác thực image, ví dụ `VERIFY_IMAGE`. |
| `image_type` | OpenSBI hoặc U-Boot; CSU đối chiếu với metadata có chữ ký. |
| `buffer`, `length` | Địa chỉ và kích thước image; CSU kiểm tra lại phạm vi truy cập. |

**CSU kiểm tra gì?**

1. **Định dạng và phạm vi:** header/manifest phải hợp lệ, các offset và độ dài nằm trong image; không cho phép đọc hoặc ghi ngoài vùng được cấp.
2. **Khóa và chữ ký:** khóa xác thực phải được neo vào gốc tin cậy đã cấu hình. Nếu image kèm khóa hoặc chứng thư, CSU phải kiểm tra chuỗi tin cậy trước khi dùng; không tin khóa chỉ vì nó nằm trong image.
3. **Metadata có chữ ký:** trong định dạng đề xuất, manifest chứa loại image, độ dài, hash payload, phiên bản, địa chỉ nạp và entry-point. CSU kiểm tra chữ ký manifest, chính sách phiên bản/anti-rollback nếu được cấu hình, và giới hạn vùng nhớ/entry-point.
4. **Nội dung payload:** CSU tính hash từ chính payload rồi so sánh với hash trong manifest đã xác thực. Chỉ so sánh hash với một giá trị không có chữ ký là chưa đủ để xác thực nguồn gốc image.
5. **Phản hồi:** chỉ trả `OK` khi toàn bộ kiểm tra thành công; các trường hợp sai chữ ký, sai hash, khóa không hợp lệ hoặc vi phạm chính sách trả lỗi.

**FSBL xử lý kết quả thế nào?**

- Chờ phản hồi với timeout, đối chiếu `request_id` và trạng thái; không tiếp tục khi lỗi hoặc thiếu phản hồi.
- Giữ nguyên payload từ lúc CSU kiểm tra đến lúc nạp vào DDR. Cần chốt cơ chế bảo vệ buffer trước ghi từ core/DMA khác, hoặc để CSU quản lý việc sao chép vào vùng đích được bảo vệ. Không đọc lại một bản image khác từ thiết bị lưu trữ sau khi đã xác thực.
- Chỉ dùng địa chỉ nạp và entry-point đã được kiểm tra. Khi cả hai image đã hợp lệ và được nạp, đồng bộ bộ nhớ/cache lệnh theo nền tảng, chuẩn bị tham số rồi chuyển quyền cho OpenSBI; OpenSBI tiếp tục chuyển quyền cho U-Boot.

## 6. Thuật ngữ

| Thuật ngữ | Ý nghĩa |
| --- | --- |
| **AP** | Application Processor – bộ xử lý ứng dụng gửi yêu cầu đến CSU. |
| **Mailbox / shared memory** | Kênh thông báo / vùng nhớ chia sẻ để trao đổi request và response. |
| **Key handle** | Định danh tham chiếu đến khóa do CSU quản lý, không phải nội dung khóa. |
| **Immutable ROM** | Mã ROM cố định, không thay đổi qua cập nhật firmware. |
| **Secure SRAM** | Vùng SRAM dành cho thực thi và dữ liệu bảo mật, có cơ chế bảo vệ truy cập. |
| **AES** | Advanced Encryption Standard – chuẩn mã hóa đối xứng. |
| **SHA** | Secure Hash Algorithm – thuật toán băm. |
| **RSA** | Rivest–Shamir–Adleman – thuật toán mật mã khóa công khai. |
| **eFuse** | Electronic Fuse – phần tử lưu cấu hình lập trình một lần. |
| **PUF** | Physically Unclonable Function – cơ chế khai thác đặc tính vật lý riêng của chip. |
