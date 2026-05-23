---
id: 01-overview
title: 2.1 Tổng quan Cụm 2
sidebar_position: 1
description: Vì sao SOLID là nền tảng của Software Architecture, mối quan hệ giữa cohesion-coupling với SOLID, và cách đọc 6 bài còn lại của cụm.
---

# 2.1 Tổng quan Cụm 2: Design Principles (SOLID)

> **Tóm tắt một dòng**: Kiến trúc tốt luôn bắt đầu từ code tốt, và "code tốt" có ý nghĩa rất cụ thể: 5 nguyên lý SOLID + nguyên tắc cohesion cao - coupling thấp. Master 7 bài trong cụm này là bạn đã có nền cho mọi cụm sau.

## Vì sao cụm này đứng thứ hai

Bạn có thể hỏi: "Khoá tên là Software Architecture, sao bài đầu lại nói về principles cấp module?". Câu trả lời nằm ở một metaphor cổ điển của Robert C. Martin:

> "Good software systems begin with clean code. If the bricks aren't well made, the architecture of the building doesn't matter much. On the other hand, you can make a substantial mess with well-made bricks. This is where the SOLID principles come in."

Nghĩa là:

- **Bricks không tốt** → architecture không cứu được. Class hierarchy mục nát thì dù bạn dùng microservices hay layered, mỗi service vẫn là một đống bug.
- **Bricks tốt nhưng xếp sai** → vẫn ra một đống lộn xộn. Bạn có class tuân thủ SOLID nhưng tổ chức module sai thì hệ thống vẫn khó maintain.

SOLID đảm bảo bricks tốt. Architecture (Cụm 3-7) đảm bảo xếp đúng. Cả hai đều cần, và SOLID phải đến trước vì nó là tiền đề.

## Cụm 2 sẽ dạy gì?

Cụm này có 7 bài, chia hai phần:

### Phần A: Foundation (1 bài)

**Bài 2.2: Cohesion và Coupling**, định nghĩa hai khái niệm cốt lõi nhất trong thiết kế modular. Cohesion đo độ "gắn kết" của các phần tử *bên trong* một module; Coupling đo độ "ràng buộc" *giữa* các module. Mục tiêu vĩnh cửu: **high cohesion + low coupling**. Toàn bộ SOLID có thể được suy ra từ hai nguyên tắc này, nhưng SOLID cho operational guidance cụ thể hơn.

### Phần B: Năm nguyên lý SOLID (5 bài)

**Bài 2.3: SRP, Single Responsibility Principle**, "Mỗi module nên có duy nhất một lý do để thay đổi". Đây là principle khó nhất để hiểu đúng (thường bị giảng sai). Bài này dùng định nghĩa modern của Robert Martin: SRP nói về *actors* chứ không phải *functions*.

**Bài 2.4: OCP, Open-Closed Principle**, "Open for extension, closed for modification". Module nên mở rộng được khả năng mà không phải sửa code đã có. Cách phổ biến: dùng interface/abstraction + polymorphism. Plug-in architecture là OCP ở mức kiến trúc.

**Bài 2.5: LSP, Liskov Substitution Principle**, Subtype phải thay thế được supertype mà không phá behavior của client. Bài này giải thích vì sao "Square is-a Rectangle" là sai trong code, và cách dùng contract design để check LSP.

**Bài 2.6: ISP, Interface Segregation Principle**, Client không nên depend vào interface chứa method nó không dùng. Hệ quả: thà nhiều interface nhỏ hơn một interface to. Apply ở mức architecture: API gateway pattern, BFF (Backend-for-Frontend).

**Bài 2.7: DIP, Dependency Inversion Principle**, High-level module không depend vào low-level module; cả hai depend vào abstraction. Đây là principle quan trọng nhất ở mức architecture, làm nền cho hexagonal/clean architecture và dependency injection framework.

## Vì sao SOLID quan trọng cho architect

Có một misunderstanding phổ biến: "SOLID là principles cho developer, architect không cần quan tâm". Sai. SOLID đặc biệt quan trọng cho architect vì ba lý do:

### Lý do 1: Architect phải review design của team

Một architect không hands-on review code, design proposal, và pull request thì kiến trúc bạn vẽ trên giấy sẽ bị implement sai. SOLID là language chung để feedback design, không có nó, feedback của architect mãi ở mức "tôi thấy không ổn, sửa đi" mà không nói rõ vì sao.

### Lý do 2: SOLID là building block cho architecture patterns lớn hơn

- Hexagonal architecture xuất phát từ DIP.
- Plug-in architecture (Microkernel style) là OCP ở scale lớn.
- Microservices được justify bằng SRP ở mức service.
- API gateway pattern xử lý đúng vấn đề ISP đặt ra.
- Strategy pattern, Adapter pattern, Decorator pattern, đều là cách áp dụng SOLID.

Không nắm SOLID, bạn học pattern lớn sẽ chỉ thuộc *cái gì* mà không hiểu *vì sao*.

### Lý do 3: Refactoring legacy là việc architect hay phải định hướng

Khi team kế thừa codebase 5-10 năm tuổi, architect thường được hỏi: "Nên refactor cái gì trước?". SOLID violations là một heuristic tốt để rank technical debt, class vi phạm nặng SRP/OCP/DIP thường là nơi bug tập trung và cost-to-change cao nhất.

## SOLID không miễn phí

Cảnh báo trước khi bạn vào phần B: SOLID có *cost*, không phải "lúc nào cũng đúng". Áp dụng SOLID đặt ra:

- Thêm interfaces, abstractions → tăng số file, tăng cognitive load lúc đọc.
- Tăng indirection → debug khó hơn (phải jump qua nhiều layer).
- Risk over-engineering → một startup MVP áp SOLID toàn diện thường delay 2-3x.

Một nguyên tắc empirical:

- **Apply SOLID gần như mặc định** trong code production có lifespan > 2 năm và team > 5 người.
- **Apply selectively** trong startup MVP, code prototype, hoặc script chạy một lần.
- **Đo bằng pain**: chỗ nào sửa thường xuyên gây bug → áp SOLID trước; chỗ nào ổn định không sửa → để yên.

Cụm 3 (Architectural Thinking) sẽ build lên insight này với khái niệm "iatrogenic" (bệnh do thầy thuốc gây ra), over-engineering cũng là một loại bệnh.

## Thứ tự đọc

Đề nghị đọc theo thứ tự tự nhiên: 2.2 → 2.3 → 2.4 → 2.5 → 2.6 → 2.7. Mỗi bài khoảng 4000-5000 chữ, đọc kỹ 1.5-2h.

Nếu bạn đã quen với SOLID từ trước, có thể skip 2.2 (cohesion-coupling) nhưng vẫn nên đọc tuần tự 5 bài SOLID vì cách trình bày trong tài liệu này có thể khác với cách bạn đã học. Đặc biệt 2.3 (SRP) thường bị giảng sai, đáng đọc lại.

Bài kế thúc cụm: hết Cụm 2, bạn sẽ vào [Cụm 3: Architectural Thinking](../03-architectural-thinking/01-overview.md), mở rộng tư duy từ class lên hệ thống.

## Kết nối với các cụm sau

- **Cụm 3 (Modularity)** dùng cohesion-coupling từ Bài 2.2 ở mức module/sub-system.
- **Cụm 4 (Quality Attributes)** liên hệ "modifiability", một QA quan trọng, với SOLID violations.
- **Cụm 5.5 (Microkernel)** chính là OCP ở scale lớn.
- **Cụm 6.3 (Microservices)** justify bằng SRP ở mức service.
- **Cụm 7.2 (Module Views)** vẽ ra structure mà SOLID giúp tạo.

Hãy bắt đầu với [Bài 2.2: Cohesion và Coupling](02-cohesion-and-coupling.md).
