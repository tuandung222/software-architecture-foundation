---
id: 03-aims-and-outcomes
title: 1.3 Mục tiêu và kết quả học tập
sidebar_position: 3
description: Khoá học định cho bạn kỹ năng gì khi kết thúc, vì sao một số chủ đề bị bỏ ra ngoài, và bạn nên học gì tiếp theo sau khoá này.
---

# 1.3 Mục tiêu và kết quả học tập

> **Tóm tắt một dòng**: Khoá này muốn bạn ra trường biết tên 9 architecture styles phổ biến, đọc được documentation kiến trúc bất kỳ, và lập luận được trade-off khi chọn architecture cho dự án mới, chứ không cố làm bạn thành expert ở mọi pattern.

## Vì sao cần nói rõ mục tiêu?

Một sai lầm phổ biến khi học SA là cố học "tất cả": SOLID, DDD, CQRS, Event Sourcing, Saga pattern, Outbox pattern, hexagonal, clean architecture, onion architecture, BFF, sidecar, service mesh, mesh app... Mỗi chủ đề lại dẫn tới 5 chủ đề khác. Không ai có thể master tất cả, và cố làm thế chỉ dẫn tới sự nông cạn ở mọi chỗ.

Khoá này có scope rõ ràng và *cố tình* không dạy mọi thứ. Đọc kỹ phần "Không nằm trong scope" để biết bạn cần học gì sau khoá.

## Mục tiêu khoá (Aims)

Sau khi hoàn thành khoá, bạn sẽ:

### Mục tiêu 1: Nhận biết và lập luận về architectural decisions

Bạn sẽ phân biệt được:

- Architectural decision vs Design decision vs Implementation detail (Bài 1.2 và Cụm 3 build kỹ).
- Architectural characteristic (cái bạn tối ưu) vs Architectural style (cách bạn tổ chức để tối ưu).
- Trade-off đa chiều: vì sao "best architecture" không tồn tại trong vacuum.

### Mục tiêu 2: Áp dụng SOLID và các nguyên lý thiết kế cấp module

Cụm 2 dạy bạn 5 nguyên lý SOLID kèm cohesion-coupling. Sau cụm này, bạn:

- Nhận ra anti-pattern vi phạm SOLID trong code thực.
- Refactor được code vi phạm SRP/OCP/LSP/ISP/DIP về dạng tuân thủ.
- Hiểu được khi nào áp dụng SOLID là *over-engineering* (vì SOLID không miễn phí).

### Mục tiêu 3: Biết 9 architecture styles phổ biến

Cụm 5-6 đi qua 9 style chính: Layered, Pipeline, Microkernel, Monolithic (đối chiếu), Service-based, Microservices, Event-Driven, Space-Based, và một số biến thể. Với mỗi style bạn sẽ biết:

- Topology cốt lõi (vẽ được trên giấy).
- Quality attributes mà nó tối ưu (vd: Microservices tối ưu scalability/deployability, sacrificing simplicity).
- Khi nào dùng, khi nào không.
- Cách evolve giữa các style (vd: monolith → service-based → microservices).

### Mục tiêu 4: Đọc và viết documentation kiến trúc chuẩn

Cụm 7 dạy 3 loại view (Module, Component-and-Connector, Allocation), đây là chuẩn de-facto của ngành. Sau cụm này bạn:

- Đọc được architecture document bất kỳ và nhận ra đó là loại view nào.
- Viết được architecture document cho hệ mình thiết kế, dùng đúng notation chuẩn.
- Biết khi nào dùng ADR (Architecture Decision Record) và viết được một ADR đúng cách.

### Mục tiêu 5: Áp dụng vào case study thực

Cụm 8 đi qua 2 case study chi tiết (UAMS, Academic Management System, Smart City Traffic Detection) và một bộ bài tập tổng hợp. Sau cụm này bạn:

- Tự thiết kế kiến trúc end-to-end cho hệ cỡ trung (50-500k user) dựa trên requirement.
- Trình bày được kiến trúc đó cho người không-kỹ-thuật hiểu (vd: PM, business stakeholder).
- Defend được lựa chọn trước câu hỏi "vì sao không dùng X?".

## Kết quả học tập (Learning Outcomes)

Kết quả học tập là phiên bản đo được của mục tiêu. Sau khi hoàn thành khoá, bạn có thể:

| Mã | Kết quả | Cụm dạy |
|---|---|---|
| LO1 | Định nghĩa SA và phân biệt architectural vs design decisions | 1, 3 |
| LO2 | Áp dụng 5 nguyên lý SOLID khi review/refactor code | 2 |
| LO3 | Phân tích trade-off khi chọn architecture cho ứng dụng cho trước | 3, 4 |
| LO4 | Xác định 5-10 architecture characteristics ưu tiên cho hệ mới | 4 |
| LO5 | Mô tả topology và trade-off của 9 architecture styles phổ biến | 5, 6 |
| LO6 | Chọn architecture style phù hợp cho một dự án dựa trên QA priorities | 5, 6, 8 |
| LO7 | Vẽ Module View, C&C View, Allocation View cho hệ thiết kế | 7 |
| LO8 | Viết Architecture Decision Record (ADR) cho một quyết định cụ thể | 7 |
| LO9 | Thiết kế end-to-end kiến trúc cho hệ cỡ trung trong 2-3 giờ | 8 |
| LO10 | Đọc, đánh giá, và phản biện architecture của hệ có sẵn | All |

Bộ LO này khá tham vọng. Đạt được toàn bộ đòi hỏi 30-50 giờ học nghiêm túc + 10-20 giờ thực hành. Đừng vội nản nếu sau lần đọc đầu tiên chưa đạt, kiến trúc là kỹ năng tích luỹ.

## Không nằm trong scope

Khoá này cố tình bỏ ra ngoài các chủ đề sau (để giữ scope khả thi):

### 1. Domain-Driven Design (DDD)

DDD là một methodology để mô hình hoá domain phức tạp. Nó liên quan tới SA nhưng là một body of knowledge riêng (sách của Eric Evans ~500 trang). Học sau khoá này: đọc *Domain-Driven Design Distilled* (Vaughn Vernon) cho phiên bản gọn, hoặc *Implementing Domain-Driven Design* (Vaughn Vernon) cho phiên bản đầy đủ.

### 2. CQRS, Event Sourcing, Saga, Outbox pattern

Đây là các pattern phổ biến trong distributed systems hiện đại nhưng thuộc về *pattern level*, không phải *style level*. Khoá này dừng ở style. Học sau: *Microservices Patterns* (Chris Richardson) là tài liệu tốt nhất cho các pattern này.

### 3. Hexagonal / Clean / Onion Architecture

Ba "kiến trúc" này thực ra là cùng một idea (separation of business logic khỏi infrastructure) đóng gói khác nhau. Quan trọng nhưng overlap nhiều với SOLID + layered architecture. Học sau: chương 22-24 của *Clean Architecture* (Robert C. Martin).

### 4. Cloud-native specifics

Service mesh (Istio, Linkerd), serverless (Lambda, Cloud Run), container orchestration (Kubernetes), API gateway... đều là các topic con của cloud architecture. Khoá này chỉ nhắc đến khi cần trong Cụm 6. Học sau: *Cloud Native Patterns* (Cornelia Davis) hoặc tài liệu chính thống của cloud provider.

### 5. Performance engineering chi tiết

Khoá có nói về performance là một quality attribute, nhưng không đi sâu vào: caching strategies, database tuning, load testing methodology, profiling tools. Học sau: *Designing Data-Intensive Applications* (Martin Kleppmann), sách gối đầu giường về scaling.

### 6. Security architecture chi tiết

Tương tự, security được nhắc đến nhưng không sâu. Nếu quan tâm security thực sự, học một khoá riêng hoặc xem qua [Software Security Foundation](https://tuandung222.github.io/software-security-foundation/), sister course của khoá này.

## Lộ trình học tiếp sau khoá

Sau khi hoàn thành khoá này, đây là lộ trình gợi ý theo focus area:

### Nếu bạn đi hướng Architect chuyên nghiệp

1. Đọc *Fundamentals of Software Architecture* (Mark Richards, Neal Ford), sách chính của ngành.
2. Đọc *Software Architecture: The Hard Parts* (Neal Ford, Mark Richards), phần distributed deeply.
3. Học DDD qua *Domain-Driven Design Distilled* (Vaughn Vernon).
4. Bắt đầu viết ADR thật trong dự án của bạn.

### Nếu bạn đi hướng Tech Lead

1. Đọc *The Software Architect Elevator* (Gregor Hohpe), về vai trò architect trong tổ chức.
2. Đọc *Team Topologies* (Skelton, Pais), về cách tổ chức team xung quanh architecture.
3. Practice trade-off analysis trên dự án thật của team mình.

### Nếu bạn đi hướng Distributed Systems

1. Đọc *Designing Data-Intensive Applications* (Martin Kleppmann), bible của ngành.
2. Học Kafka, gRPC, distributed consensus (Raft, Paxos).
3. Practice với một hệ thật (vd: build một service mesh nhỏ).

### Nếu bạn đi hướng Cloud Architect

1. Lấy chứng chỉ AWS Solutions Architect Associate hoặc Google Professional Cloud Architect.
2. Đọc *Cloud Native Patterns* (Cornelia Davis).
3. Practice với Kubernetes thật + ít nhất một managed service mesh.

## Tóm tắt

- Khoá có 5 mục tiêu chính, đo được qua 10 learning outcomes.
- Khoá *cố tình* không dạy DDD, CQRS, hexagonal, cloud-native deeply, performance/security deeply.
- Sau khoá, có 4 lộ trình tiếp theo tuỳ focus area.
- Đạt được toàn bộ LO đòi hỏi 30-50 giờ học + thực hành.

Bài tiếp: [Lộ trình đọc tài liệu](04-roadmap.md), chọn cách đọc phù hợp với bạn.
