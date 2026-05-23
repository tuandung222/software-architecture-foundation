---
id: exam-checklist
title: Checklist tự đánh giá
sidebar_position: 5
description: Bảng checklist để bạn tự kiểm tra mức master sau khi đọc khoá. 50+ items chia theo phần.
---

# Checklist tự đánh giá

> Tick từng item nếu bạn có thể giải thích cho người khác hiểu trong 2-3 phút. Tự đánh giá honest. Items chưa tick = cần ôn lại bài tương ứng.

## Phần 1: Giới thiệu

- [ ] Định nghĩa Software Architecture theo 3 tiêu chí (Bài 1.2).
- [ ] Phân biệt architecture vs design vs implementation theo cost-to-change.
- [ ] Giải thích "Architecture is the stuff hard to Google".
- [ ] Liệt kê 10 Learning Outcomes của khoá.
- [ ] Chọn được 1 trong 3 reading path phù hợp cho mình.

## Phần 2: SOLID

- [ ] Phân biệt cohesion vs coupling. Cho ví dụ mỗi mức (low/medium/high).
- [ ] Định nghĩa SRP theo "actor" (không phải "one thing").
- [ ] Cho 1 ví dụ SRP violation + cách fix bằng Extract Class.
- [ ] Giải thích OCP qua ví dụ Strategy pattern.
- [ ] Phân biệt LSP violation thực sự vs imagined (vd: Square/Rectangle).
- [ ] Liệt kê 3 phần của contract (Pre/Post/Invariant) và rule LSP.
- [ ] Cho ví dụ ISP violation và fix bằng role-based interface.
- [ ] Giải thích DIP qua ví dụ Hexagonal Architecture.
- [ ] Phân biệt DIP (principle) vs DI (technique).
- [ ] Identify khi nào SOLID là over-engineering.

## Phần 3: Architectural Thinking

- [ ] Apply framework 3 tiêu chí cho 5 quyết định bất kỳ.
- [ ] Giải thích Levels of Knowledge và relevance cho architect.
- [ ] Sử dụng ATAM-lite cho 1 quyết định thật.
- [ ] Viết 1 ADR cho quyết định gần đây.
- [ ] Giải thích "tối ưu một chiều" anti-pattern.
- [ ] Phân biệt Vertical vs Horizontal slicing.
- [ ] Identify Big Ball of Mud / Distributed Monolith / Death Star.
- [ ] Apply 4 heuristics identify module boundary.
- [ ] Justify ratio architect coding (20-40%) cho team size cụ thể.

## Phần 4: Quality Attributes

- [ ] Phân biệt FR vs NFR cho 1 hệ cụ thể.
- [ ] List Top 7 QA cho 1 hệ thật bạn đang làm.
- [ ] Operationalize 1 QA thành metric đo được + tool đo.
- [ ] Run CQA worksheet cho 1 use case.
- [ ] Identify implicit QAs cho 1 hệ.
- [ ] Phân biệt operational / structural / cross-cutting QA.
- [ ] Apply REP/CCP/CRP cho 1 component decomposition.
- [ ] Plot 1 component trên Main Sequence (I-A graph).

## Phần 5: Fundamental Styles

- [ ] Liệt kê 8 fallacies of distributed computing.
- [ ] Justify "monolithic là default" cho 80% projects.
- [ ] Giải thích Strangler Fig migration pattern.
- [ ] Vẽ Layered topology với open/closed layers.
- [ ] Identify Sinkhole anti-pattern.
- [ ] Cho 3 use cases cho Pipeline (Unix tools, compiler, ETL).
- [ ] Liệt kê 4 loại filter (producer/transformer/tester/consumer).
- [ ] Vẽ Microkernel topology với plugin contract.
- [ ] Cho 3 examples Microkernel (IDE, browser, CMS).
- [ ] So sánh trade-off của 3 fundamental styles.

## Phần 6: Distributed Styles

- [ ] Phân biệt Service-based vs Microservices (số services, DB, scale).
- [ ] Liệt kê 5 điều kiện cần có để dùng Microservices.
- [ ] Liệt kê 5 cost ẩn của distributed (đặc biệt operations).
- [ ] Phân biệt Choreography vs Orchestration saga.
- [ ] Giải thích CAP theorem cho 1 ví dụ thực (Cassandra vs Postgres).
- [ ] Phân biệt Mediator vs Broker topology trong EDA.
- [ ] Liệt kê 5 brokers phổ biến + use case mỗi cái.
- [ ] Phân biệt thin vs fat events.
- [ ] Giải thích event sourcing + 1 use case.
- [ ] Khi nào Space-Based phù hợp (extreme load only).

## Phần 7: Documenting

- [ ] Phân biệt Module / C&C / Allocation View.
- [ ] Vẽ C4 Context + Container cho 1 hệ.
- [ ] Vẽ 1 Sequence Diagram cho 1 critical flow.
- [ ] Viết 5 ADRs cho 5 quyết định gần nhất.
- [ ] Giải thích Conway's Law với 1 example thật.
- [ ] Liệt kê 5 anti-patterns trong documenting (big upfront, diagram-only, ...).
- [ ] Annotate cost trong 1 Deployment View.
- [ ] Apply Inverse Conway maneuver cho 1 reorg.

## Phần 8: Case Studies

- [ ] Đọc UAMS case + reproduce reasoning cho Service-based choice.
- [ ] Đọc Smart City case + reproduce reasoning cho EDA + Microservices mix.
- [ ] Đọc Production ML Feature Store case + reproduce reasoning cho service-based + pipeline + event-driven mix.
- [ ] So sánh UAMS, Smart City và Production ML: identify 5 key differences.
- [ ] Làm 1 exercise (8.5) end-to-end.
- [ ] Critique 1 case study: "what would you do differently".

## Cross-cutting skills

- [ ] Hỏi 3 questions để extract QA priorities từ stakeholder.
- [ ] Lead 1 architecture review meeting cho design proposal.
- [ ] Justify "không dùng microservices" với CTO want them.
- [ ] Mentor 1 mid-level engineer về 1 SOLID principle.
- [ ] Write architecture document cho 1 service hoàn chỉnh (intro + 3 views + 5 ADR).

## Production ML / Data Scientist checklist

Dùng phần này nếu bạn đến từ Data Science và muốn tự đánh giá khả năng áp dụng architecture vào ML/data systems.

- [ ] Tôi phân biệt được model metric và system Quality Attribute.
- [ ] Tôi giải thích được vì sao accuracy cao chưa đủ để productionize model.
- [ ] Tôi so sánh được batch inference, online inference và hybrid inference.
- [ ] Tôi viết được freshness SLA cho feature quan trọng.
- [ ] Tôi biết feature store giải quyết training-serving skew như thế nào.
- [ ] Tôi vẽ được training pipeline dưới dạng Pipeline Architecture.
- [ ] Tôi vẽ được online prediction flow bằng C&C View.
- [ ] Tôi biết model registry cần lưu model version, data version, feature schema và metric.
- [ ] Tôi biết rollback model version cần component nào hỗ trợ.
- [ ] Tôi biết khi nào Kafka/streaming là cần thiết, khi nào batch job đủ.
- [ ] Tôi biết log prediction thế nào để audit mà không leak PII.
- [ ] Tôi biết monitoring production ML cần latency, error rate, drift, feature null rate và business metric.
- [ ] Tôi nhận ra distributed monolith trong một ML platform tách service sai boundary.
- [ ] Tôi viết được ADR cho quyết định batch vs online inference.
- [ ] Tôi thiết kế được architecture sơ bộ cho churn prediction, fraud detection hoặc recommendation serving.

## Self-scoring

| Score | Meaning |
|---|---|
| < 30% checked | Đọc lại các phần tương ứng. Practice exercise. |
| 30-60% checked | Mid-level. Có foundation, cần practice more. |
| 60-80% checked | Senior-level. Có thể lead small team. |
| 80%+ checked | Architect-level. Có thể tư vấn cross-team. |

## Sau khi self-assess

1. **Identify gap**: items chưa tick → tương ứng bài/phần cần đọc lại.
2. **Practice**: làm exercises ở Bài 8.5 cho gap area.
3. **Apply**: 1 project thật + 1-on-1 review với mentor.
4. **Iterate**: tự đánh giá lại sau 2-3 tháng. Score sẽ tăng theo experience.

Master Software Architecture là journey 2-5 năm. Khoá này chỉ là step 1. Good luck.
