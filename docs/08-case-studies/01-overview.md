---
id: 01-overview
title: 8.1 Tổng quan Phần 8
sidebar_position: 1
description: Áp toàn bộ kiến thức 7 phần trước vào 3 case study end-to-end. UAMS, Smart City Traffic Detection, Production ML Feature Store, plus bộ exercise tự practice.
---

# 8.1 Tổng quan Phần 8: Case Studies

> **Tóm tắt một dòng**: 7 phần trước cung cấp building block. Phần này áp tất cả vào 3 case thực để bạn thấy cách lập luận "given context X, why this architecture not that" - skill thực sự của architect.

## Nếu bạn đến từ Data Science

Trong ba case study, hãy đọc kỹ Smart City Traffic và Production ML Feature Store. Smart City cho bạn thấy realtime data/ML system với ingest, normalize, streaming, ML detector, alerting, time-series storage và data warehouse. Production ML Feature Store đi sát hơn vào công việc DS/MLOps: feature definition, offline store, online store, model registry, serving API, drift monitoring và auditability.

UAMS vẫn đáng đọc vì nó dạy phần business workflow, audit, data integrity và service-based thinking. Nhưng nếu mục tiêu của bạn là đưa model vào production, hãy ưu tiên 8.3 và 8.4.

## Vì sao case study?

Lý thuyết kiến trúc dễ học, áp dụng khó. Phần 1-7 cho bạn vocabulary và principles. Nhưng câu hỏi thực sự khi làm architect là:

- "Hệ này nên monolith hay microservices?"
- "Database nào? SQL hay NoSQL?"
- "Communication nào? Sync HTTP hay async event?"
- "Architecture style nào best fit?"

Câu trả lời tuỳ context. Case study đi qua **lập luận end-to-end** cho ba context khác nhau, show cách architect thinks.

## 3 Case Studies

### Case 1: UAMS, University Academic Management System

Context:

- Trường đại học multi-program (undergraduate, postgraduate).
- Centralized system manage student, course, grade.
- Regulatory compliance (data privacy, audit trail).
- Scale: 50k student peak (registration week).

Focus: structured business processes, ACID requirements, internal users.

### Case 2: Smart City Traffic Incident Detection

Context:

- City government deploy system phát hiện sự cố giao thông real-time.
- Data sources: camera, sensor, GPS, citizen mobile reports.
- Notify operator, emergency services, navigation systems.
- Scale: thousands sensors, millions data points/hour, sub-second response.

Focus: high-throughput streaming, real-time, heterogeneous data.

### Case 3: Production ML Feature Store

Context:

- Công ty SaaS có nhiều team DS/ML cùng build model production.
- Duplicate feature logic, training-serving skew, thiếu lineage và monitoring.
- Cần feature registry, offline store, online store, model registry, serving API.
- Scale: 40 models production, 200 features tăng lên 1000, 15k RPS peak.

Focus: production ML, feature freshness, online inference, auditability, privacy, service-based + pipeline + event-driven mix.

### Bài tập

Cuối phần có bộ exercises để bạn tự apply.

## Cách áp dụng framework cho mỗi case

Mỗi case sẽ đi qua 6 bước (synthesizing các phần trước):

### Bước 1: Hiểu domain + functional requirements (Phần 1)

Đào ra hệ làm gì, ai dùng, business context.

### Bước 2: Identify Quality Attributes (Phần 4)

Top 5-7 QA priority. Operationalize.

### Bước 3: Cân nhắc Style, Monolithic vs Distributed (Bài 5.2)

Default monolithic; chỉ distributed nếu justify.

### Bước 4: Choose specific Architecture Style (Phần 5-6)

Match QA priorities với style trade-offs.

### Bước 5: Component decomposition (Bài 2.3 SRP + Bài 3.4 + Bài 4.4)

Bounded context, module boundary.

### Bước 6: Document (Phần 7)

C4 Context + Container, key sequence, ADR for important decisions.

Sau mỗi case sẽ có "What we'd do differently", phần phản biện.

## Sản phẩm cuối case

Mỗi case xuất ra:

1. **System Context diagram** (C4 Level 1).
2. **Container diagram** (C4 Level 2).
3. **2-3 sequence diagram** cho critical flows.
4. **3-5 ADR** cho key decisions.
5. **QA scorecard**: bảng QA vs measurement.
6. **Trade-off reflection**: "đã hy sinh gì để đạt gì".

Khi bạn làm xong, output này là *template* cho architecture doc của project bạn.

## Tone của cases

Cases viết theo phong cách "consulting walk-through", như consultant trình bày cho client. Bạn đọc như đang sit-in một consulting engagement.

Mỗi case dài ~3500-5000 chữ, đọc 1.5-2h. Đáng dành thời gian.

## Bài trong phần

- **8.2 UAMS**: Academic Management System.
- **8.3 Smart City Traffic**: Real-time incident detection.
- **8.4 Production ML Feature Store**: feature store, model serving, monitoring, governance.
- **8.5 Exercise Set**: 8 bài tập tự practice với hint.

Vào [Bài 8.2: UAMS](02-uams-academic-management.md) để bắt đầu, hoặc nếu bạn đến từ Data Science, có thể đi thẳng tới [Bài 8.4: Production ML Feature Store](05-production-ml-feature-store.md).
