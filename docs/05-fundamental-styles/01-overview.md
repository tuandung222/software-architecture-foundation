---
id: 01-overview
title: 5.1 Tổng quan Phần 5
sidebar_position: 1
description: Phân biệt Architecture Style vs Architecture Pattern. Bốn fundamental style monolithic-friendly - Layered, Pipeline, Microkernel - và monolithic vs distributed trade-off cốt lõi.
---

# 5.1 Tổng quan Phần 5: Fundamental Architecture Styles

> **Tóm tắt một dòng**: Architecture Style là "shape" tổng thể của hệ. Phần này dạy 4 style fundamental (monolithic-friendly): Monolithic baseline, Layered, Pipeline, Microkernel, và quyết định cơ bản nhất: monolithic hay distributed.

## Nếu bạn đến từ Data Science

Trong Phần 5, bài bạn nên đọc kỹ nhất là Pipeline Architecture. Đây là style gần nhất với ETL, feature engineering, training pipeline và batch scoring. Layered giúp bạn hiểu cách tách API, business logic và persistence. Microkernel giúp bạn hiểu cách thêm plug-in model, metric hoặc feature transform mà không sửa core.

Đừng xem architecture styles như danh sách tên để thuộc. Hãy xem chúng như các hình dạng tổ chức hệ thống. Một notebook lớn là một hình dạng. Một Airflow DAG là một hình dạng khác. Một model serving API với feature store lại là hình dạng khác nữa.

## Style vs Pattern

Phân biệt:

- **Architecture Style**: shape tổng thể của hệ. Vd: "monolithic", "microservices", "event-driven". Quyết định một lần cho cả hệ (thường).
- **Architecture Pattern**: solution cụ thể cho một bài toán con. Vd: "Saga", "Circuit Breaker", "CQRS", "Strangler Fig". Một hệ có thể dùng nhiều pattern.

Trong khoá này, Phần 5 + 6 đi qua *9 styles*. Pattern được nhắc lúc relevant nhưng không là focus chính.

## 9 Architecture Styles trong khoá

### Phần 5 (Fundamental - monolithic-friendly)

| Style | Topology | Khi dùng |
|---|---|---|
| **Layered** | Tầng UI/Business/Data | Default cho monolith, app đơn giản |
| **Pipeline** | Filter nối tiếp | Data processing, ETL, compiler |
| **Microkernel** | Core + plug-ins | IDE, browser, CMS, product có extensibility |

Plus Monolithic vs Distributed comparison (Bài 5.2).

### Phần 6 (Distributed)

| Style | Topology | Khi dùng |
|---|---|---|
| **Service-based** | 4-12 coarse services + DB shared | Enterprise medium, ít risk hơn microservices |
| **Microservices** | Many fine-grained services + DB per service | Large scale, multi-team |
| **Event-Driven** | Async message broker | Real-time, high throughput, decoupling |
| **Space-Based** | In-memory grid + DB async sync | Extreme load (Black Friday) |

## Bài trong phần

### 5.2: Monolithic vs Distributed

Trade-off cơ bản nhất. Vì sao monolithic là *default*, khi nào lên distributed. "Distributed Computing Fallacies", 8 sai lầm phổ biến. Cost của distributed: latency, partial failure, debugging.

### 5.3: Layered Architecture

Style phổ biến nhất historical. UI / Business / Data layer. Closed vs Open layer. Strengths: simple, well-understood. Weaknesses: hard to scale parts, "sinkhole anti-pattern".

### 5.4: Pipeline Architecture

Filter + Pipe. Sequential transformation. Unix philosophy. Strengths: composable, easy to add filter. Use cases: ETL, compiler, image processing.

### 5.5: Microkernel Architecture

Core (kernel) + Plug-ins. OCP at scale. Examples: VS Code, Eclipse, Chrome, WordPress. Strengths: extensibility, third-party ecosystem. Weaknesses: plugin compatibility, performance overhead.

## Tại sao chỉ 3 style + Monolithic baseline ở Phần 5?

Phần 5 cover **fundamental styles**, những style mà toàn hệ chạy trong 1 process (typical monolith), hoặc 1 process với plug-ins. Phần 6 cover **distributed styles**, nhiều process/network.

Reason tách: monolithic thinking và distributed thinking khác nhau cơ bản. Distributed thêm cost mới (network, partial failure, eventual consistency) cần cách reasoning mới.

## Cách đọc phần

Tuần tự 5.2 → 5.3 → 5.4 → 5.5. Hoặc đọc 5.2 first và skip nếu đã biết, sau đó chọn style đang relevant với dự án mình.

Mỗi bài có pattern chung:

1. **Topology**: vẽ diagram cốt lõi.
2. **Khi nào dùng**.
3. **Khi nào không**.
4. **Trade-off** với QA (Phần 4): style này tối ưu QA gì, hy sinh QA gì.
5. **Real-world examples**.

Vào [Bài 5.2: Monolithic vs Distributed](02-monolithic-vs-distributed.md) để bắt đầu.
