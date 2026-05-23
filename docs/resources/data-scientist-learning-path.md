---
id: data-scientist-learning-path
title: Lộ trình cho Data Scientist
sidebar_position: 7
description: Lộ trình học Software Architecture dành riêng cho người có nền tảng Data Scientist, ML Engineer hoặc Data Engineer.
---

# Lộ trình cho Data Scientist

> **Tóm tắt một dòng**: Nếu bạn đến từ Data Science, hãy học Software Architecture như hành trình đưa notebook, model và data pipeline vào production: từ code có cấu trúc, sang quality attributes, sang pipeline/event-driven, rồi mới tới service design và documentation.

## Vì sao Data Scientist cần Software Architecture?

Một model trong notebook thường được đánh giá bằng metric như accuracy, F1, AUC, RMSE. Nhưng khi model đi vào production, câu hỏi thay đổi hoàn toàn:

- Dữ liệu online có giống dữ liệu training không?
- Feature mới nhất sau bao lâu thì đến model?
- Inference p95 latency có dưới 100ms không?
- Nếu model mới tệ hơn model cũ, rollback mất bao lâu?
- Ai biết model version nào tạo ra prediction nào?
- Khi pipeline lỗi giữa đêm, ai nhận alert và debug từ đâu?
- Nếu dữ liệu chứa PII, log thế nào để vừa debug được vừa không leak thông tin?

Những câu hỏi này không còn là bài toán modelling thuần. Đây là bài toán kiến trúc. Software Architecture giúp bạn thiết kế hệ thống để model không chỉ "đúng trong notebook", mà còn **chạy ổn, đo được, sửa được, mở rộng được, và giải thích được** trong môi trường thật.

## Bản đồ dịch thuật: từ DS sang SA

| Bạn quen trong DS/ML | Khái niệm tương ứng trong Software Architecture | Học ở đâu |
|---|---|---|
| Notebook biến thành script dài khó sửa | Cohesion, Coupling, SRP | Phần 2 |
| Thêm model mới không muốn sửa toàn bộ code | OCP, Microkernel | 2.4, 5.5 |
| `fit/predict` giống nhau giữa nhiều estimator | LSP, interface contract | 2.5 |
| Preprocessing, training, evaluation tách thành step | Pipeline Architecture | 5.4 |
| Batch inference vs online inference | Quality Attributes, trade-off | 3.3, 4 |
| Feature store | Component boundary, data ownership | 4.4, 6.2 |
| Kafka streaming features | Event-Driven Architecture | 6.4 |
| Model registry | Module/Component + auditability | 4, 7 |
| Data lineage | Auditability, observability | 4, 7 |
| Model drift | Reliability, monitoring, recoverability | 4 |
| Serving model trên GPU/CPU | Allocation View, deployment topology | 7.4 |
| ML platform nhiều team cùng dùng | Service-based hoặc Microservices | 6.2, 6.3 |

## Lộ trình 1: DS muốn hiểu nhanh để làm production ML tốt hơn

Thời gian: 12-18 giờ.

| Thứ tự | Bài | Mục tiêu |
|---|---|---|
| 1 | [1.2 Software Architecture là gì?](../01-introduction/02-what-is-software-architecture.md) | Biết quyết định nào là kiến trúc. |
| 2 | [3.3 Trade-off Analysis](../03-architectural-thinking/03-tradeoffs-analysis.md) | Học cách cân accuracy, latency, cost, explainability. |
| 3 | [4.1 Quality Attributes](../04-quality-attributes/01-overview.md) | Chuyển từ model metric sang system metric. |
| 4 | [4.2 FR vs NFR](../04-quality-attributes/02-functional-vs-nfr.md) | Phân biệt "model predict được" với "predict ổn trong production". |
| 5 | [5.4 Pipeline Architecture](../05-fundamental-styles/04-pipeline-architecture.md) | Map ETL/ML pipeline sang architecture style. |
| 6 | [6.4 Event-Driven Architecture](../06-distributed-styles/04-event-driven.md) | Hiểu streaming, Kafka, async processing. |
| 7 | [7.3 C&C Views](../07-documenting/03-component-connector-views.md) | Vẽ runtime flow của inference/training. |
| 8 | [8.3 Smart City Traffic](../08-case-studies/03-smart-city-traffic.md) | Xem một case real-time ML/data system end-to-end. |
| 9 | [8.4 Production ML Feature Store](../08-case-studies/05-production-ml-feature-store.md) | Xem feature store, model serving, monitoring và governance. |
| 10 | [9.4 Software Architecture for MLOps](../09-seminar-advanced-topics/04-software-architecture-for-mlops.md) | Nhìn toàn bộ ML lifecycle như một production platform. |

Sau path này, bạn nên tự vẽ được kiến trúc sơ bộ cho một hệ fraud detection, churn prediction, recommendation serving, feature store hoặc MLOps platform.

## Lộ trình 2: DS muốn chuyển sang ML Engineer / Platform Engineer

Thời gian: 30-45 giờ.

### Giai đoạn 1: Code structure

Đọc Phần 2 đầy đủ. Mục tiêu không phải thuộc SOLID như lý thuyết OOP, mà là sửa được kiểu code rất quen trong DS:

```text
notebook.ipynb
  load data
  clean data
  train model
  evaluate
  save artifact
  generate report
  call API
  write database
```

Thứ cần đạt: biết tách thành modules như `data_loader`, `feature_builder`, `trainer`, `evaluator`, `model_registry`, `serving_client`.

### Giai đoạn 2: Thinking in trade-offs

Đọc Phần 3 và Phần 4. Đây là phần quan trọng nhất nếu bạn muốn làm production ML.

Ví dụ một quyết định tưởng đơn giản: "Có nên dùng online inference không?" Không thể trả lời bằng cảm tính. Bạn cần so:

| Option | Lợi | Giá phải trả |
|---|---|---|
| Batch inference | Rẻ, đơn giản, dễ kiểm soát | Prediction có thể stale |
| Online inference CPU | Fresh, dễ deploy | Latency và autoscaling cần quản lý |
| Online inference GPU | Latency tốt cho model lớn | Cost cao, scheduling phức tạp |
| Hybrid | Cân bằng tốt | Logic phức tạp hơn |

Đây chính là architectural thinking.

### Giai đoạn 3: Styles cho data/ML systems

Đọc theo thứ tự ưu tiên:

1. [5.4 Pipeline](../05-fundamental-styles/04-pipeline-architecture.md)
2. [6.4 Event-Driven](../06-distributed-styles/04-event-driven.md)
3. [6.2 Service-based](../06-distributed-styles/02-service-based.md)
4. [5.5 Microkernel](../05-fundamental-styles/05-microkernel-architecture.md)
5. [6.3 Microservices](../06-distributed-styles/03-microservices.md)

Không nên nhảy thẳng vào microservices. Rất nhiều ML platform tốt bắt đầu bằng modular monolith hoặc service-based architecture: một service cho feature, một service cho training orchestration, một service cho model registry, một service cho serving.

### Giai đoạn 4: Documentation và case study

Đọc Phần 7 và Phần 8. Ưu tiên [8.4 Production ML Feature Store](../08-case-studies/05-production-ml-feature-store.md) nếu bạn muốn thấy một ML platform production được thiết kế từ Quality Attributes tới runtime flows. Mục tiêu: biết viết architecture doc cho ML system, không chỉ code.

Một architecture doc tối thiểu cho ML system nên có:

- System Context: user, data sources, model consumers.
- Container View: pipeline orchestrator, feature store, registry, serving API, monitoring.
- Sequence Diagram: online prediction flow.
- Deployment View: CPU/GPU nodes, object storage, warehouse, observability stack.
- ADR: batch vs online inference, feature store decision, model registry decision.

## Lộ trình 3: DS chỉ muốn hiểu để làm việc tốt hơn với backend/platform team

Thời gian: 6-10 giờ.

Đọc:

1. [Course Summary](course-summary.md), để biết vocabulary.
2. [4.1 Quality Attributes](../04-quality-attributes/01-overview.md), để nói chuyện bằng metric hệ thống.
3. [5.4 Pipeline](../05-fundamental-styles/04-pipeline-architecture.md), vì gần nhất với DS workflow.
4. [6.2 Service-based](../06-distributed-styles/02-service-based.md), để hiểu service decomposition.
5. [7.2 Module Views](../07-documenting/02-module-views.md), để đọc diagram team đưa.

Sau path này, bạn chưa thành architect, nhưng sẽ trao đổi tốt hơn khi team hỏi:

- Model nên serve online hay batch?
- Feature tính ở request time hay precompute?
- Data contract giữa data pipeline và backend là gì?
- Có cần Kafka không, hay cron job đủ?
- Metrics nào cần monitor sau deploy?

## Case thực hành gợi ý

Chọn một bài gần công việc của bạn:

### Case A: Churn prediction platform

- Input: user events, billing history, support tickets.
- Output: daily churn score cho CRM.
- Key decision: batch inference hay online inference?
- QA quan trọng: data freshness, reproducibility, privacy, cost.

### Case B: Real-time fraud detection

- Input: transaction event stream.
- Output: approve/block/manual review trong dưới 200ms.
- Key decision: Kafka + feature store + online serving hay synchronous DB lookup?
- QA quan trọng: latency, reliability, auditability, explainability.

### Case C: Recommendation serving

- Input: user profile, item catalog, behavior events.
- Output: top-N recommendation trong app.
- Key decision: precompute candidates, online ranking, hay hybrid?
- QA quan trọng: p95 latency, freshness, scalability, fallback.

### Case D: ML monitoring platform

- Input: predictions, labels delayed, feature distributions.
- Output: drift alert, model performance report.
- Key decision: batch analytics hay streaming monitoring?
- QA quan trọng: observability, data lineage, alert precision, maintainability.

## Checklist tự kiểm tra cho DS

Bạn hiểu đủ nếu trả lời được:

- Vì sao accuracy cao không đủ để deploy model?
- Batch inference, online inference và streaming inference khác nhau ở QA nào?
- Feature store giải quyết coupling nào giữa training và serving?
- Khi nào Kafka là cần thiết, khi nào cron job đủ?
- Model registry là component, module hay database?
- Vẽ online prediction flow bằng sequence diagram như thế nào?
- Nếu model mới gây lỗi production, rollback path là gì?
- Log prediction thế nào để debug mà không leak PII?
- Data drift thuộc reliability, observability hay correctness?
- Khi nào nên chọn service-based thay vì microservices cho ML platform?

## Kết luận

Data Scientist học Software Architecture không phải để bỏ modelling, mà để đưa modelling vào hệ thống thật. Một model tốt chỉ là một phần nhỏ của sản phẩm. Architecture quyết định model đó có sống được trong production hay không.

Nếu bạn chỉ nhớ một câu: **hãy chuyển từ câu hỏi "model có đúng không?" sang câu hỏi "hệ thống dùng model này có vận hành đúng, đo được, sửa được và mở rộng được không?"**
