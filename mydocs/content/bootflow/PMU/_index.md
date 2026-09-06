+++
title = "PMU - Platform Management Unit"
weight = 1

+++

# PMU - Platform Management Unit

**PMU** là khối quản lý nền tảng hệ thống SoC, quản lý vòng đời nguồn của các khối trong SoC, chịu trách nhiệm điều phối quá trình bật nguồn, tắt nguồn, reset, clock, isolation, suspend và wakeup dựa trên trạng thái, yêu cầu và quan hệ phụ thuộc giữa các tài nguyên.

 - Kiến trúc là một RISC-V core Ibex có ROM, RAM, timer, interrupt, reset controller, power-domain controller, clock controller, mailbox/inter-p.rocessor interrupt. 
 - Hệ gồm PMU BootROM và PMU Firmware cùng chạy trên Ibex của PMU nhưng đảm nhiệm các giai đoạn khác nhau.

| Thành phần | Nơi thực thi | Vai trò |
| --- | --- | --- |
| **PMU BootROM** | ROM tích hợp | Pre-boot: kiểm tra nguồn, clock, RAM nội, power domain, reset state, rồi nhả reset cho CSU boot/security subsystem, sau đó phục vụ các dịch vụ ROM. 
| **PMU Firmware** | PMU RAM | Framework module, xử lý yêu cầu quản lý nền tảng khi hệ thống chạy. |


~~~text
                         POR
                          ▼
                         FSM
                          ▼
                ┌─────────────────┐
                │   PMU BootROM   │
                │                 │
                │ CPU init        │
                │ power check     │
                │ clock init      │
                │ RAM clear       │
                │ memory test     │
                │ memory repair   │
                │ default power   │
                └────────┬────────┘
                       PASS?
                    ┌────┴────┐
                   NO         YES
                   ▼           ▼
               ERROR      release CSU
                               │
             ┌─────────────────┴────────────────┐
             ▼                                  ▼
      PMU service mode                     CSU BootROM
                                                ▼
                                           boot device
                              ┌─────────────────┴──────────┐
                              ▼                            ▼
                         PMU Firmware                     FSBL
                         → PMU RAM                       → OCM
~~~

**FSM** (Finite State Machine – máy trạng thái hữu hạn) là phần logic phần cứng thực hiện trình tự ban đầu trước khi PMU chạy mã BootROM.
Luồng bắt đầu là **POR → FSM → PMU BootROM**. 


## 1. PMU BootROM
**PMU BootROM** là firmware bring-up silicon cấp thấp nhất: sau giai đoạn FSM, nó thiết lập và kiểm tra trạng thái nguồn, clock, RAM, power domain và reset cần thiết; khi điều kiện pre-boot đạt yêu cầu, nó nhả reset cho CSU để CSU BootROM bắt đầu quá trình nạp boot image.

Các đặc điểm chính:  
- Là chương trình cố định, nằm trong Mask ROM của PMU, không thể cập nhật sau khi sản xuất.
- PMU processor fetch và thực thi trực tiếp mã lệnh từ PMU Mask ROM trên die (XIP).
- Là mã đầu tiên được thực thi trong hệ thống sau khi FSM phần cứng đã cấp nguồn, clock và thoát reset cho PMU core.
- Cấp nguồn, clock và giải phóng reset cho miền bảo mật (CSU).

### Format PMU bootrom code
~~~c {noClasses=false}
void PmuBootRom_Main(void)
{
    /* PMU initialization */
    PmuCpuInit();
    PmuCaptureBootState();

    /* Silicon initialization */
    PmuScanClear();
    PmuSysMonInit();
    PmuPllInit();

    /* Memory */
    PmuRamZeroize();
    PmuMemoryRepair();
    PmuMemoryZeroize();
    PmuMemorySelfTest();

    /* Power */
    PmuPowerSupplyCheck();
    PmuDisableUnusedBlocks();

    /* Validation */
    if (PmuPreBootCheck() == SUCCESS) {
        /* Prepare handoff */
        PmuReleaseCsuReset();

        /* Runtime before full PMU Firmware */
        PmuEnterServiceMode();
    } else {

        /* Fault handling */
        PmuEnterErrorState();
    }

    /* Fault handling */
    PmuLogBootError();
}
~~~

```text
1. PmuCpuInit() — khởi tạo

static void PmuCpuInit(void)
{
    InitExceptionState();
    InitInterruptState();
    InitLocalControl();
}
```

```text
2. PmuCaptureBootState() — chụp trạng thái lúc bật nguồn

Một số trạng thái phần cứng chỉ có ý nghĩa ngay tại thời điểm boot.  
Vì vậy BootROM cần lưu chúng trước khi những khối khác thay đổi.

static void PmuCaptureBootState(void)
{
    boot_state.reset_reason = REG_RESET_REASON;
    boot_state.power_state = REG_POWER_STATUS;
    boot_state.boot_error = REG_BOOT_ERROR;
}
```
```text
3. PmuScanClear() — đưa logic về trạng thái sạch

static void PmuScanClear(void)
{
    ScanClear(LPD); (Low-Power Domain – miền nguồn công suất thấp)
    ScanClear(FPD); (Full-Power Domain – miền nguồn đầy đủ)
}

Mục tiêu là đưa phần logic silicon về trạng thái xác định trước khi boot hệ thống lên
```
```text
4. PmuSysMonInit() — kiểm tra tình trạng chip

static void PmuSysMonInit(void)
{
    SysMonEnable();
    SysMonConfigure();
}

System Monitor – khối giám sát hệ thống cung cấp các thông tin như tình trạng điện áp/nhiệt độ tùy kiến trúc.

BootROM cần có khả năng phát hiện:

nguồn không hợp lệ -> không cho boot tiếp
```
```text
5. PmuPllInit() — chuẩn bị clock phục vụ kiểm tra

Cấu hình PLL (Phase-Locked Loop – vòng khóa pha) phục vụ clock cho quá trình kiểm tra bộ nhớ.

static int PmuPllInit(void)
{
    PllConfigure();
    PllEnable();

    return PllWaitLock();
}

Tức là:
Oscillator ─► PLL ─► clock kiểm tra  ─► memory test
```
```text
6. PmuRamZeroize() — làm sạch RAM của PMU

Đây là việc rất quan trọng với PMU.

static void PmuRamZeroize(void)
{
    for (addr = PMU_RAM_BASE;
         addr < PMU_RAM_END;
         addr += 4) {
        WRITE32(addr, 0);
    }
}

Sau bước này:

PMU ROM      PMU RAM
32 KB        128 KB
──────       ────────
BootROM      00000000
running      00000000
             00000000
```
```text
7. PmuPowerSupplyCheck() — xác nhận nguồn đủ điều kiện

static int PmuPowerSupplyCheck(void)
{
    if (!PowerGood(LPD))
        return ERROR;

    if (!PowerGood(FPD))
        return ERROR;

    return SUCCESS;
}

Luồng:

PMU
 │
 ├── LPD power good?
 ├── FPD power good?
 └── các nguồn cần thiết ổn?
          │
          ├── YES → tiếp tục
          └── NO  → error state

PMU BootROM không nên nhả CSU khi nền tảng nguồn chưa ổn định.
```
```text
8. PmuMemoryRepair() — sửa phần bộ nhớ có repair hardware

static int PmuMemoryRepair(void)
{
    MemoryRepairStart();

    while (!MemoryRepairDone()) {
        if (MemoryRepairFailed())
            return ERROR;
    }

    return SUCCESS;
}

Ở đây BootROM chỉ ra lệnh cho phần cứng repair, chứ CPU không tự sửa từng transistor RAM
PMU BootROM
     │ START
     ▼
Memory Repair Hardware
     │
     ├── lấy repair information
     ├── cấu hình redundant row/column
     └── báo DONE
             ▼
        PMU BootROM
```
```text
9. PmuMemorySelfTest() — ra lệnh kiểm tra SRAM xem có hoạt động đúng không

dùng MBIST (Memory Built-In Self-Test – cơ chế tự kiểm tra bộ nhớ tích hợp) trong pre-boot.

static int PmuMemorySelfTest(void)
{
    MbistStart(LPD); // kiểm tra ram ở các khối LPD
    MbistStart(FPD); // kiểm tra ram ở các khối FPD

    if (!MbistWaitDone())
        return ERROR;

    if (MbistHasError())
        return ERROR;

    return SUCCESS;
}
```
```text
10. PmuDisableUnusedBlocks() — tắt những phần không cần lúc boot

Power-down các IP (Intellectual Property – khối phần cứng chức năng) bị disable.

static void PmuDisableUnusedBlocks(void)
{
    if (!ConfigEnabled(BLOCK_A))
        PowerDown(BLOCK_A);

    if (!ConfigEnabled(BLOCK_B))
        PowerDown(BLOCK_B);
}

Đây đã bắt đầu giống chức năng của PMU Firmware, nhưng mục đích BootROM đơn giản hơn:
Đưa silicon vào trạng thái boot mặc định an toàn.
Không phải quản lý động toàn bộ hệ thống như PMU Firmware sau này.
```
```text
11. PmuReleaseCsuReset() - Nhả reset khối CSU

Sau khi mọi kiểm tra pre-boot thành công:

static void PmuReleaseCsuReset(void)
{
    ResetDeassert(CSU_RESET);
}

Về phần cứng:

PMU BootROM
     │ ghi reset-control register
     ▼
Reset Controller
     │ CSU_RESET_N = 1
     ▼
CSU thoát reset
     ▼
CSU BootROM bắt đầu chạy

Đây chính là ranh giới PMU pre-boot → CSU boot
```
```text
12. CSU bắt đầu làm việc sau đó

Ngay khi reset CSU được nhả, CSU BootROM thực hiện:

CSU BootROM
    │
    ├── initialize OCM
    ├── đọc boot mode
    ├── tìm/đọc boot image (secure-boot)
    ├── 
    ...
    └──  load CSU FW lên OCM -> load PMU Firmware lên PMU RAM
```
```text
13. Sau khi nhả CSU, PMU BootROM tiếp tục service xử lý yêu cầu quản lý nền tảng trong giai đoạn trước khi PMU Firmware advanced được đưa vào chạy

static void PmuEnterServiceMode(void)
{
    while (1) {
        WaitForEvent();

        if (ServiceRequestPending())
            HandleBootRomService();
    }
}

PMU Firmware đã được nạp vào PMU RAM và bắt đầu thực thi, chức năng quản lý nâng cao chuyển sang PMU Firmware.
```



## 2. PMU Firmware


**PMU Firmware** là chương trình bare-metal chạy trên **Ibex của PMU**, được nạp vào PMU RAM bởi [**CSU Firmware**](../CSU/)

Đặc điểm:  
 - Là firmware có thể cập nhật, khác hoàn toàn với PMU BootROM.
 - Được lưu trữ ở QSPI NOR FLASH
 - Được thực thi ở PMU RAM, chạy resident trong suốt vòng đời hệ thống.
 - CSU BootRom xác thực và nạp FW này vào PMU RAM.  
Trách nhiệm (tùy thiết kế của đội PMU), thông thường gồm:  
 - Quản lý các miền nguồn và miền clock trong giai đoạn boot và giai đoạn vận hành.
 - Thực hiện yêu cầu cấp nguồn/clock cho từng subsystem theo yêu cầu của FSBL hoặc của phần mềm chạy trên CPU.
 - Quản lý watchdog hệ thống (xem Q-15 về quyền sở hữu watchdog theo giai đoạn);
 - Xử lý sự kiện nhiệt độ, quá dòng và các sự kiện bảo vệ;
 - Tham gia luồng phục hồi khi một subsystem không phản hồi.


### Các hàm PMU điển hình cần có
 
| Nhóm | Hàm điển hình bạn phải có | Mục đích |
| --- | --- | --- |
| Khởi tạo | `PmuInit()` | Khởi tạo PMU |
| Nhận lệnh | `PmuHandleRequest()` | Nhận yêu cầu từ processor khác |
| Yêu cầu tài nguyên | `PmuRequestNode()` | Xin sử dụng ngoại vi |
| Nhả tài nguyên | `PmuReleaseNode()` | Báo không dùng ngoại vi nữa |
| Bật domain | `PmuPowerOn()` | Bật miền nguồn |
| Tắt domain | `PmuPowerOff()` | Tắt miền nguồn |
| Ép tắt | `PmuForcePowerDown()` | Ép miền nguồn tắt |
| Reset | `PmuAssertReset()`, `PmuReleaseReset()` | Điều khiển reset |
| Isolation | `PmuIsolationOn()`, `PmuIsolationOff()` | Cô lập domain |
| Clock | `PmuClockEnable()`, `PmuClockDisable()` | Điều khiển clock |
| Trạng thái | `PmuGetPowerState()` | Đọc trạng thái phần cứng |
| Suspend | `PmuSuspend()` | Đưa processor/domain vào trạng thái nghỉ |
| Wakeup | `PmuWakeup()` | Đánh thức processor/domain |
| Lỗi | `PmuHandleError()` | Xử lý lỗi nguồn/clock/reset |


### Format PMU firmware 
~~~c {noClasses=false}

/**1. Init**/
   └── PmuInit()

/**2. Hardware drivers**/
   ├── PmuPowerSwitchOn/Off()
   ├── PmuIsolationOn/Off()
   ├── PmuAssert/ReleaseReset()
   └── PmuClockEnable/Disable()

/**3. Power Sequencer**/
   ├── PmuPowerOn()
   └── PmuPowerOff()

/**4. Resource Manager**/
   ├── PmuRequestNode()
   ├── PmuReleaseNode()
   └── PmuSetRequirement()

/**5. Processor power management**/
   ├── PmuSuspend()
   ├── PmuWakeup()
   └── PmuForcePowerDown()

/**6. Communication**/
   └── PmuHandleRequest()

/**7. Error handling**/
   └── PmuHandleError()

/**8. Main loop**/
   └── PmuMainLoop()
~~~
       
## 5. Thuật ngữ

| Viết tắt | Ý nghĩa |
| --- | --- |
| LPD / FPD | Low-Power Domain / Full-Power Domain – các miền nguồn. |
| FSM | Finite State Machine – máy trạng thái hữu hạn; ở luồng này là logic phần cứng trước BootROM. |
| CSU | Configuration Security Unit – khối cấu hình và bảo mật. |
| FSBL | First Stage Boot Loader – bộ nạp khởi động giai đoạn đầu. |
| IPI | Inter-Processor Interrupt – ngắt liên bộ xử lý. |
| MBIST | Memory Built-In Self-Test – tự kiểm tra bộ nhớ tích hợp. |
| ECC | Error-Correcting Code – mã sửa lỗi. |
| PLL | Phase-Locked Loop – vòng khóa pha. |
| MMIO | Memory-Mapped I/O – thanh ghi I/O ánh xạ bộ nhớ. |
| FPGA | Field-Programmable Gate Array – mảng cổng logic lập trình được. |
| eFuse / PUF | Electronic Fuse / Physically Unclonable Function. |
| RPU | Real-Time Processing Unit – khối xử lý thời gian thực. |

## 6. Tài liệu tham khảo

- [AMD UG1137 – Pre-Boot Sequence](https://docs.amd.com/r/2024.2-English/ug1137-zynq-ultrascale-mpsoc-swdev/Pre-Boot-Sequence).
- [AMD Wiki – PMU Firmware](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841724/PMU%2BFirmware).
- [xpfw_main.c – trình tự khởi tạo](https://github.com/Xilinx/embeddedsw/blob/master/lib/sw_apps/zynqmp_pmufw/src/xpfw_main.c).
- [xpfw_core.c – ngắt, dispatch và scheduler](https://github.com/Xilinx/embeddedsw/blob/master/lib/sw_apps/zynqmp_pmufw/src/xpfw_core.c).
- [pm_api_sys.h – API XilPM phía client](https://github.com/Xilinx/embeddedsw/blob/master/lib/sw_services/xilpm/src/zynqmp/client/common/pm_api_sys.h).
- [pm_defs.h – node, reset action và shutdown type](https://github.com/Xilinx/embeddedsw/blob/master/lib/sw_services/xilpm/src/zynqmp/client/common/pm_defs.h).
