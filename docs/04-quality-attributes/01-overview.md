---
id: 01-overview
title: 4.1 Tổng quan Cụm 4
sidebar_position: 1
description: Quality attributes (architecture characteristics) là cái cần tối ưu trong trade-off analysis. Cụm này giúp bạn identify, prioritize, và operationalize chúng.
---

# 4.1 Tổng quan Cụm 4: Quality Attributes

> **Tóm tắt một dòng**: Bạn không thể tối ưu mọi thứ cùng lúc — phải chọn 3-7 quality attributes ưu tiên cho hệ thống của mình. Cụm này dạy cách identify, prioritize, và translate chúng thành quyết định kiến trúc cụ thể.

## Vì sao có cụm này

Cụm 3 dạy "trade-off là essence của architecture". Nhưng trade-off *giữa cái gì*? Câu trả lời: giữa các **quality attributes** (còn gọi là **architecture characteristics**, **non-functional requirements**, hay **-ilities**).

Không hiểu QA thì:

- Trade-off analysis trở thành argument cảm tính ("tôi thấy nó tốt hơn").
- Quyết định kiến trúc không có "lý do" rõ ràng, không thuyết phục được stakeholder.
- Khi requirement thay đổi, không biết quyết định nào cần re-evaluate.

Cụm này fix cả 3 vấn đề.

## Cụm 4 sẽ dạy gì

Bốn bài:

### Bài 4.2: Functional vs Non-functional Requirements

Phân biệt requirement chức năng (cái hệ phải làm) với non-functional (cách hệ phải làm). Vì sao QA quan trọng hơn function trong nhiều case. Định nghĩa Architecture Characteristic theo Mark Richards (3 tiêu chí: non-domain consideration, structural impact, critical to success).

### Bài 4.3: Identifying Architecture Characteristics

Cách extract QA từ requirement document, từ stakeholder interview, từ business context. Top-N rule: chọn không quá 7 QA priority. Hierarchy: operational, structural, cross-cutting. Cách dùng ATAM/CQA worksheet để negotiate priorities với business.

### Bài 4.4: Component-Based Thinking

Cách map QA xuống component design. Component vs Module vs Class. Identify component boundary từ entity vs workflow approach. Component cohesion principles (REP, CCP, CRP) và component coupling principles (acyclic, stable, abstract).

## Quality Attributes là gì?

Definition: **non-domain consideration** ảnh hưởng đến *cách hệ thống behave* hoặc *được build*. Khác biệt với functional requirement:

| Aspect | Functional | Non-functional (QA) |
|---|---|---|
| Câu hỏi | Hệ làm gì? | Hệ làm thế nào? |
| Test | Pass/fail (acceptance test) | Đo đếm (benchmark, monitoring) |
| Example | "User đặt được order" | "Order processing p99 < 200ms" |
| Owner | Product / Business | Architecture / Engineering |

## Bảng QA phổ biến

Theo Bass-Clements-Kazman, *Software Architecture in Practice* 4th ed:

### Operational (runtime)

| QA | Định nghĩa |
|---|---|
| Performance | Response time, throughput |
| Scalability | Khả năng tăng load mà vẫn duy trì performance |
| Availability | Uptime, fault tolerance |
| Security | Confidentiality, integrity, access control |
| Reliability | Đúng output, không corrupt data |
| Recoverability | Time-to-recover sau failure |

### Structural (development-time)

| QA | Định nghĩa |
|---|---|
| Maintainability | Effort để sửa bug / thêm feature |
| Modularity | Mức tách bạch giữa các phần |
| Testability | Effort để test code |
| Deployability | Effort + time để deploy |
| Reusability | Code/component dùng lại được ở project khác |

### Cross-cutting

| QA | Định nghĩa |
|---|---|
| Cost (CAPEX/OPEX) | Tiền infrastructure + dev |
| Time-to-market | Thời gian từ ý tưởng đến production |
| Auditability | Khả năng trace ai làm gì khi nào |
| Observability | Hiểu state hệ qua logs, metrics, traces |
| Privacy | Tuân thủ GDPR, CCPA, dữ liệu cá nhân |
| Accessibility | Hỗ trợ disabilities |
| Internationalization (i18n) | Đa ngôn ngữ |

Tổng cộng ~20-30 QA phổ biến. Một hệ không thể tối ưu cả 30 — phải chọn 5-7 ưu tiên.

## "You can't pick all of them"

Định luật bất khả: **Tối ưu một QA thường hy sinh QA khác**. Vài cặp trade-off kinh điển:

### Performance ↔ Security

Mã hoá dữ liệu tăng security nhưng giảm performance. Cache giảm latency nhưng tăng attack surface.

### Consistency ↔ Availability (CAP theorem)

Hệ phân tán không thể đạt cả Consistency + Availability khi có Network partition. Phải chọn. Bài 6.4 (Event-Driven) sẽ đi sâu.

### Scalability ↔ Simplicity

Microservices scale tốt nhưng phức tạp hơn monolith. Kafka throughput cao nhưng phức tạp hơn HTTP.

### Time-to-market ↔ Maintainability

Hack quick & dirty ship nhanh nhưng tech debt cao. Code đúng SOLID + test full ship chậm nhưng maintain lâu dài.

### Cost ↔ Performance

GPU nhanh hơn CPU nhưng đắt. Replica cluster tăng availability nhưng x3 cost.

### Privacy ↔ Observability

Log mọi user action giúp debug nhưng leak PII. Anonymize logs lose context.

## Architect's responsibility

Mỗi quyết định kiến trúc nên:

1. **Tham chiếu QA ưu tiên** đã agree với business.
2. **Show trade-off** ngắn gọn (Bài 3.3).
3. **Document** trong ADR (Bài 7.4 sẽ dạy).

Nếu architect ra quyết định không tham chiếu QA → quyết định cảm tính, dễ bị challenge và overrule sau đó.

## Cách đọc cụm này

Tuần tự 4.2 → 4.3 → 4.4. Mỗi bài 3500-4500 chữ.

Mục tiêu thực hành sau cụm:

- List 5-7 QA ưu tiên cho một hệ thực mà bạn đang làm.
- Đo được (hoặc đề xuất cách đo) cho mỗi QA.
- Vẽ component diagram với boundary thể hiện QA.

Vào [Bài 4.2: Functional vs Non-functional](02-functional-vs-nfr.md) để bắt đầu.
