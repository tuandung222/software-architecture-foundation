---
id: 01-overview
title: 8.1 Tổng quan Cụm 8
sidebar_position: 1
description: Áp toàn bộ kiến thức 7 cụm trước vào 2 case study end-to-end. UAMS (Academic Management System) và Smart City Traffic Detection. Plus bộ exercise tự practice.
---

# 8.1 Tổng quan Cụm 8: Case Studies

> **Tóm tắt một dòng**: 7 cụm trước cung cấp building block. Cụm này áp tất cả vào 2 case thực để bạn thấy cách lập luận "given context X, why this architecture not that" - skill thực sự của architect.

## Nếu bạn đến từ Data Science

Trong hai case study, hãy đọc kỹ Smart City Traffic. Case này có ingest data, normalize, streaming, ML detector, alerting, time-series storage và data warehouse. Nó rất gần với production data/ML system: nhiều nguồn dữ liệu, throughput cao, latency target rõ, model inference nằm trong pipeline lớn hơn.

UAMS vẫn đáng đọc vì nó dạy phần business workflow, audit, data integrity và service-based thinking. Nhưng Smart City là cầu nối trực tiếp hơn từ DS sang Software Architecture.

## Vì sao case study?

Lý thuyết kiến trúc dễ học, áp dụng khó. Cụm 1-7 cho bạn vocabulary và principles. Nhưng câu hỏi thực sự khi làm architect là:

- "Hệ này nên monolith hay microservices?"
- "Database nào? SQL hay NoSQL?"
- "Communication nào? Sync HTTP hay async event?"
- "Architecture style nào best fit?"

Câu trả lời tuỳ context. Case study đi qua **lập luận end-to-end** cho hai context khác nhau, show cách architect thinks.

## 2 Case Studies

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

### Bài tập

Cuối cụm có bộ exercises để bạn tự apply.

## Cách áp dụng framework cho mỗi case

Mỗi case sẽ đi qua 6 bước (synthesizing các cụm trước):

### Bước 1: Hiểu domain + functional requirements (Cụm 1)

Đào ra hệ làm gì, ai dùng, business context.

### Bước 2: Identify Quality Attributes (Cụm 4)

Top 5-7 QA priority. Operationalize.

### Bước 3: Cân nhắc Style, Monolithic vs Distributed (Cụm 5.2)

Default monolithic; chỉ distributed nếu justify.

### Bước 4: Choose specific Architecture Style (Cụm 5-6)

Match QA priorities với style trade-offs.

### Bước 5: Component decomposition (Cụm 2.3 SRP + Cụm 3.4 + Cụm 4.4)

Bounded context, module boundary.

### Bước 6: Document (Cụm 7)

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

## Bài trong cụm

- **8.2 UAMS**: Academic Management System.
- **8.3 Smart City Traffic**: Real-time incident detection.
- **8.4 Exercise Set**: 5 bài tập tự practice với hint.

Vào [Bài 8.2: UAMS](02-uams-academic-management.md) để bắt đầu.
