+++
title = "ROT - Root of trust"
weight = 1
+++

# ROT - Root of trust
 ROT - Root of trust là nguồn gốc của sự tin tưởng, là cơ chế được áp dụng để tránh hệ thống bị xâm nhập, cố tình sửa đổi hoạt động của hệ thống.

## 1. Gốc tin cậy bằng một cặp khóa 
( 1 KHÓA BÍ MẬT + 1 KHÓA CÔNG KHAI)

 
~~~text
                          OpenSSL
                              ▼
                       TẠO CẶP KHÓA
                    ┌─────────┴─────────┐
                    ▼                   ▼
              KHÓA BÍ MẬT         KHÓA CÔNG KHAI
            (Lưu tại nhà máy)           │
                    │                   │
  Firmware          │                   │
      ▼             │                   │
  Secure Hash       │                   │
  Algorithm 3       │                   │
      ▼             │                   │
  Kết quả BĂM       │                   │
      └──────┬──────┘                   │
             ▼                          │
     KÝ BẰNG THUẬT TOÁN                 │
   Rivest–Shamir–Adleman                │
             ▼                          │
         CHỮ KÝ SỐ                      │
             │                          │
             └──────────┐     ┌─────────┘
                        │     │
  Firmware ────────┐    │     │
                   │    │     │
                   ▼    ▼     ▼
                ┌─────────────────┐
                │  Gói firmware   │
                │                 │
                │ • Firmware      │
                │ • Chữ ký số     │
                │ • Khóa công khai│
                └────────┬────────┘
                         ▼
                      KHỞI ĐỘNG
                         ▼
                    (Bước 1)
             Xác thực chữ ký công khai 
             bằng cách so sánh Hash khóa công khai trên vị trí lưu trữ
             với Hash khóa công khai đã lưu trong Chip
                       ┌─┴─────────────┐
                       ▼               ▼
                      ĐÚNG            SAI
                       │               │  
                       ▼               ▼
                    Firmware       Ghi nhận lỗi, dừng xác thực
                       ▼
                   Secure Hash
                   Algorithm 3
                       ▼
                   Kết quả BĂM 
                       │
                       ▼
                   (Bước 2)
       XÁC MINH BẰNG Rivest–Shamir–Adleman
           ┌───────────┼────────────┐
           │           │            │
       Kết quả BĂM   CHỮ KÝ SỐ   KHÓA CÔNG KHAI
           │           │            │
           └───────────┼────────────┘
                       │
                 ┌─────┴─────┐
                 ▼           ▼
               ĐÚNG         SAI
                 ▼           ▼
              CHO CHẠY    KHÔNG CHẠY FIRMWARE
~~~

### Trường hợp 1
- Nếu hệ thống bị thay đổi sau đó không được ký từ **khóa bí mật** của nhà sản xuất, khi băm ra giá trị Hash khác => Xác minh ở **Bước 2** sẽ thất bại
### Trường hợp 2
- Nếu cố tình tạo lại bộ key mới **(khóa bí mật mới và khóa công khai mới)** và ký từ Mã bí mật mới => Tuy hợp lệ ở **Bước 2** nhưng xác minh ở **Bước 1** sẽ thất bại 
### Trường hợp 3
- Khóa bí mật bị lộ => hacker ký mới thành công => Gốc tin cậy đã bị phá vỡ

### Ý nghĩa
- Cần có key bí mật ban đầu của nhà sản xuất để tạo ra các bản ký mới hợp lệ cho các firmware mới 
- Tuy nhiên vì mỗi lần ký mới đều phải sử dụng khóa bí mật nên khả năng bị lộ khóa vẫn cao -> cần phải đảm bảo bí mật

## 2. Gốc tin cậy bằng hai cặp khóa 

- Để giảm thiếu việc sử dụng thường xuyên khóa bí mật chính dẫn đến bị lộ thông tin ta có phương án sử dụng 2 cặp khóa bao gồm **KHÓA BÍ MẬT CHÍNH + KHÓA CÔNG KHAI CHÍNH +  KHÓA BÍ MẬT THỨ CẤP + KHÓA CÔNG KHAI THỨ CẤP**

~~~text
                         OpenSSL
                            │
                            ▼
                    TẠO HAI CẶP KHÓA
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
        CẶP KHÓA CHÍNH              CẶP KHÓA THỨ CẤP
              │                           │
        ┌─────┴─────┐               ┌─────┴─────┐
        ▼           ▼               ▼           ▼
   Khóa bí mật   Khóa công      Khóa bí mật   Khóa công
      chính      khai chính       thứ cấp      khai thứ cấp
        │                                           │
        │                                           │
        │                    Khóa công khai thứ cấp ┘
        │                              │
        │                              ▼
        │                             BĂM
        │                              │
        │                              ▼
        │                    Giá trị băm khóa
        │                    công khai thứ cấp
        │                              │
        └──────────────────────────────┤
                                       ▼
                                      KÝ
                                       │
                                       ▼
                              Chữ ký của khóa
                              công khai thứ cấp


Firmware
   │
   ▼
  BĂM
   │
   ▼
Giá trị băm Firmware
   │
   │            Khóa bí mật thứ cấp
   │                    │
   └────────────────────┤
                        ▼
                       KÝ
                        │
                        ▼
                 Chữ ký Firmware


──────────────────── CHUẨN BỊ CHIP ────────────────────


Khóa công khai chính
        │
        ▼
       BĂM
        │
        ▼
Giá trị băm của khóa công khai chính
        │
        ▼
LƯU CỐ ĐỊNH TRONG CHIP


──────────────────── KHI KHỞI ĐỘNG ────────────────────


Khóa công khai chính trong BOOT.BIN
        │
        ▼
       BĂM
        │
        ▼
Giá trị băm tính lại
        │
        │
        ├────────── SO SÁNH ◄────────── Giá trị băm
        │                              khóa công khai chính
        │                              lưu trong chip
        │
        ▼
      KHỚP?
     /     \
   KHÔNG    CÓ
     │       │
     ▼       ▼
   DỪNG    Khóa công khai chính
           ĐƯỢC TIN CẬY
                  │
                  ▼
        Khóa công khai thứ cấp
                  │
                  ▼
                 BĂM
                  │
                  ▼
        Giá trị băm khóa
        công khai thứ cấp
                  │
                  │
Chữ ký của khóa   │       Khóa công khai chính
công khai thứ cấp │               │
        │         │               │
        └─────────┼───────────────┘
                  ▼
               XÁC MINH
                  │
               HỢP LỆ?
               /     \
            KHÔNG     CÓ
              │        │
              ▼        ▼
            DỪNG     Khóa công khai thứ cấp
                     ĐƯỢC TIN CẬY
                              │
                              ▼
                           Firmware
                              │
                              ▼
                             BĂM
                              │
                              ▼
                     Giá trị băm Firmware
                              │
                              │
Chữ ký Firmware ──────────────┤
                              │
Khóa công khai thứ cấp ───────┤
                              ▼
                           XÁC MINH
                              │
                           HỢP LỆ?
                           /     \
                        KHÔNG     CÓ
                          │        │
                          ▼        ▼
                        DỪNG    FIRMWARE
                                HỢP LỆ
                                   │
                                   ▼
                              CHO PHÉP CHẠY

~~~

### Tóm tắt nguyên tắc tin tưởng với 2 cặp khóa                              
~~~text
    Giá trị băm khóa công khai chính
        [LƯU TRONG CHIP]
                │
                ▼
       tin khóa công khai chính
                │
                ▼
      tin khóa công khai thứ cấp
                │
                ▼
             tin Firmware
                │
                ▼
               CHẠY
~~~

### Trường hợp 1 
Firmware bị thay đổi nhưng không có khóa bí mật thứ cấp
~~~text
 - Người sửa không có khóa bí mật thứ cấp của nhà sản xuất nên không thể tạo chữ ký Firmware hợp lệ.
 - Khi hệ thống băm lại Firmware, giá trị băm không còn tương ứng với chữ ký Firmware cũ.
 - Xác minh Firmware bằng khóa công khai thứ cấp sẽ thất bại.
~~~
 **Kết quả**: Firmware không được phép chạy.

### Trường hợp 2 
Tạo cặp khóa thứ cấp giả và ký lại Firmware
~~~text
Người sửa tạo:

Khóa bí mật thứ cấp mới
Khóa công khai thứ cấp mới

Sau đó dùng khóa bí mật thứ cấp mới để ký Firmware giả.

Việc xác minh Firmware bằng khóa công khai thứ cấp mới có thể hoàn toàn hợp lệ:

Firmware giả
     ↓
được ký bằng
Khóa bí mật thứ cấp mới
     ↓
xác minh bằng
Khóa công khai thứ cấp mới
     ↓
HỢP LỆ

Nhưng khóa công khai thứ cấp mới chưa được khóa bí mật chính của nhà sản xuất ký.

Vì vậy khi hệ thống dùng khóa công khai chính để xác minh chữ ký của khóa công khai thứ cấp:

Khóa công khai thứ cấp mới
          ↓
XÁC MINH bằng
Khóa công khai chính
          ↓
THẤT BẠI
~~~
Kết quả: Hệ thống không tin khóa công khai thứ cấp mới, nên không chấp nhận Firmware.

### Trường hợp 3 
Khóa bí mật thứ cấp của nhà sản xuất bị lộ

~~~text
Người sửa có được khóa bí mật thứ cấp thật.

Khi đó họ có thể:

Firmware giả
     +
Khóa bí mật thứ cấp thật
     ↓
Tạo chữ ký Firmware hợp lệ

Khóa công khai thứ cấp vẫn là khóa thật và đã được khóa bí mật chính của nhà sản xuất ký trước đó.

Do đó:

Giá trị băm khóa công khai chính
        ↓
Khóa công khai chính        → HỢP LỆ
        ↓
Khóa công khai thứ cấp thật → HỢP LỆ
        ↓
Firmware giả được ký bằng
khóa bí mật thứ cấp thật    → HỢP LỆ
~~~
**Kết quả**: Nếu không có thêm cơ chế thu hồi khóa, phiên bản, hoặc chính sách bảo mật khác, hệ thống có thể chấp nhận Firmware giả.

**Đây chính là lý do khóa bí mật thứ cấp vẫn phải được bảo vệ nghiêm ngặt.**

### Trường hợp 4 
Khóa bí mật thứ cấp bị lộ nhưng khóa bí mật chính vẫn an toàn

- Đây là lợi ích lớn của việc có hai cặp khóa.

~~~text
Nhà sản xuất có thể ngừng sử dụng cặp khóa thứ cấp cũ và tạo:

Khóa bí mật thứ cấp mới
Khóa công khai thứ cấp mới

Sau đó dùng:

Khóa bí mật chính
        ↓
KÝ
        ↓
Khóa công khai thứ cấp mới

Như vậy khóa công khai chính vẫn giữ nguyên và gốc tin cậy của thiết bị không cần thay đổi.

Giá trị băm khóa công khai chính
          ↓
Khóa công khai chính
          ↓
Khóa công khai thứ cấp MỚI
          ↓
Firmware mới
~~~

Lưu ý: Muốn các thiết bị thực sự từ chối khóa thứ cấp cũ đã bị lộ thì hệ thống còn cần cơ chế thu hồi khóa thứ cấp cũ. Chỉ tạo khóa thứ cấp mới không tự động làm khóa cũ mất hiệu lực.

### Trường hợp 5 
Khóa bí mật chính bị lộ

Đây là trường hợp nghiêm trọng nhất.

~~~text
Người tấn công có thể tự tạo:

Cặp khóa thứ cấp giả
        │
        ▼
Khóa công khai thứ cấp giả
        │
        ▼
dùng Khóa bí mật chính thật để ký

Sau đó:

Firmware giả
     ↓
ký bằng
Khóa bí mật thứ cấp giả

Toàn bộ chuỗi có thể trở thành hợp lệ:

Gốc tin cậy trong chip
        ↓
Khóa công khai chính thật
        ↓
Khóa công khai thứ cấp giả
nhưng được ký bằng khóa bí mật chính thật
        ↓
Firmware giả
được ký bằng khóa bí mật thứ cấp tương ứng
        ↓
HỢP LỆ
~~~

Kết quả: Gốc tin cậy đã bị phá vỡ.

### Ý nghĩa

Hai cặp khóa tạo ra sự phân cấp:

~~~text
KHÓA BÍ MẬT CHÍNH
        │
        │ bảo vệ cực kỳ nghiêm ngặt
        │ rất ít khi sử dụng
        ▼
cho phép một
KHÓA CÔNG KHAI THỨ CẤP
        │
        ▼
KHÓA BÍ MẬT THỨ CẤP
        │
        │ sử dụng để ký Firmware
        ▼
Firmware
~~~

- Khóa bí mật chính = bảo vệ quyền cấp phép cho khóa ký Firmware.
- Khóa bí mật thứ cấp = bảo vệ quyền phát hành Firmware.
- Lợi ích so với một cặp khóa là khóa bí mật chính không phải đem ra sử dụng mỗi lần phát hành Firmware, giảm nguy cơ làm lộ khóa quan trọng nhất của toàn bộ hệ thống.

## 3. Cơ chế mã hóa Firmware - AES

~~~text
PHÍA NHÀ SẢN XUẤT

Firmware gốc
     │
     │       Khóa bí mật mã hóa
     │              │
     └───────┬──────┘
             ▼
   Advanced Encryption Standard
       Galois/Counter Mode
             │
       ┌─────┴─────┐
       ▼           ▼
Firmware đã     Thẻ xác thực
mã hóa
       │           │
       └─────┬─────┘
             ▼
        Lưu vào Flash


────────────────────────────────────


                    THIẾT BỊ

Firmware đã mã hóa
       │
       │        Khóa bí mật mã hóa
       │        lưu an toàn trong chip
       │                 │
       └────────┬────────┘
                │
                ▼
      Advanced Encryption Standard
          Galois/Counter Mode
                │
        kiểm tra thẻ xác thực
                │
          ┌─────┴─────┐
          ▼           ▼
        ĐÚNG          SAI
          │            │
          ▼            ▼
       GIẢI MÃ        DỪNG
          │
          ▼
     Firmware gốc
         
~~~


### Trường hợp 1 
— Đọc trộm bộ nhớ Flash

* Kẻ tấn công đọc toàn bộ nội dung bộ nhớ Flash.
* Chỉ lấy được **Firmware đã mã hóa** và **thẻ xác thực**.
* Không có **khóa bí mật mã hóa** nằm an toàn trong chip.

**Kết quả:** Không thể đọc được Firmware gốc một cách khả thi.

---

### Trường hợp 2 
— Firmware đã mã hóa bị sửa

* Kẻ tấn công thay đổi dữ liệu của Firmware đã mã hóa.
* Khi thiết bị sử dụng **Advanced Encryption Standard Galois/Counter Mode**, việc kiểm tra **thẻ xác thực** sẽ thất bại.

**Kết quả:** Thiết bị phát hiện dữ liệu bị thay đổi và không cho Firmware đó chạy.

---

### Trường hợp 3 
— Thay cả Firmware đã mã hóa và thẻ xác thực bằng dữ liệu tự tạo

* Kẻ tấn công muốn tạo Firmware giả.
* Muốn tạo ra **Firmware mã hóa + thẻ xác thực hợp lệ**, cần có **khóa bí mật mã hóa đúng**.
* Kẻ tấn công không có khóa này.

**Kết quả:** Kiểm tra thẻ xác thực thất bại → không cho chạy.

---

### Trường hợp 4 
— Khóa bí mật mã hóa bị lộ

Nếu kẻ tấn công lấy được **khóa bí mật mã hóa thật**:

```text
Firmware giả
     +
Khóa bí mật mã hóa thật
     ↓
Mã hóa
     ↓
Firmware giả đã mã hóa
     +
Thẻ xác thực hợp lệ
```

**Kết quả:** Lộ nội dung Firmware gốc.

### Ý nghĩa
* **Firmware đã mã hóa** → đọc bộ nhớ Flash cũng không thấy nội dung Firmware gốc.
* **Không có khóa bí mật mã hóa** → không đọc được Firmware gốc và không tạo được dữ liệu mã hóa hợp lệ.
* **Dữ liệu mã hóa bị sửa** → thẻ xác thực không hợp lệ.
* **Khóa bí mật mã hóa bị lộ** → lớp bảo vệ bằng mã hóa bị phá vỡ, vì vậy Khóa bí mật mã hóa phải được bảo vệ trong chip. (eFuse)

 
