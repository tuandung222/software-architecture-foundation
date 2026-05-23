---
id: intro
title: Giới thiệu khoá học
sidebar_position: 0
description: Tổng quan toàn bộ khoá Software Architecture Foundation, đối tượng người đọc, cách dùng tài liệu và lộ trình đọc gợi ý, đặc biệt có lộ trình cho Data Scientist muốn đưa model và data pipeline vào production.
---

# Software Architecture Foundation

Chào mừng bạn đến với **Software Architecture Foundation**, một bộ tài liệu mở Tiếng Việt về Kiến trúc Phần mềm. Tài liệu này không cố gắng thay thế các sách kinh điển như *Clean Architecture* hay *Software Architecture in Practice*. Nó đóng vai trò như một người hướng dẫn kiên nhẫn: giải thích trực giác trước, formalize sau, rồi gắn từng khái niệm với ví dụ đủ thực tế để bạn áp dụng được vào dự án.

Nếu bạn đến từ backend hoặc software engineering, nhiều ví dụ sẽ rất quen: API, database, microservices, deployment, monitoring. Nếu bạn đến từ **Data Science**, tài liệu này cũng dành cho bạn. Khi một model rời notebook để đi vào production, bạn không còn chỉ làm modelling nữa. Bạn đang xây một hệ thống phần mềm có data pipeline, feature store, model registry, serving endpoint, monitoring, alerting, rollback và audit trail. Đó chính là lãnh thổ của Software Architecture.

## Vì sao có khoá này?

Software Architecture là một trong những lĩnh vực mà người mới rất dễ bị ngợp. Mở một quyển sách bất kỳ, bạn sẽ gặp hàng chục thuật ngữ: SOLID, ATAM, 4+1 views, layered, hexagonal, microservices, event-driven, CQRS, saga, BFF, service mesh. Mỗi thuật ngữ lại kéo theo một họ kỹ thuật con. Người học thường không biết đâu là cốt lõi, đâu là biến thể, đâu là trend, và đâu là thứ thật sự giúp mình ra quyết định tốt hơn.

Với Data Scientist, cảm giác này còn rõ hơn. Bạn có thể đã rất giỏi pandas, scikit-learn, PyTorch, SQL, Airflow hoặc dbt, nhưng khi nghe "bounded context", "deployment view", "quality attribute", "distributed transaction", bạn vẫn thấy như đang học một ngôn ngữ khác. Vấn đề không nằm ở năng lực của bạn. Vấn đề là nhiều tài liệu Software Architecture được viết ngầm định rằng người đọc đã sống nhiều năm trong backend engineering.

Khoá này cố gắng xây cây cầu giữa hai thế giới đó. Ta sẽ vẫn học Software Architecture nghiêm túc, nhưng khi cần, ta sẽ dùng các ví dụ quen thuộc với Data Scientist:

- Notebook training script biến thành pipeline production.
- Batch inference so với online inference.
- Feature store và data ownership.
- Model serving latency, throughput và cost GPU.
- Data drift, model drift, data lineage và reproducibility.
- ML monitoring, rollback và auditability.

## Mạch logic của khoá

Toàn bộ nội dung được sắp xếp theo một mạch rất cụ thể:

1. **Bắt đầu từ code tốt**: Phần 2 dạy cohesion, coupling và SOLID. Với Data Scientist, đây là bước chuyển từ notebook hoặc script dài sang code có module rõ ràng.
2. **Lùi lại nhìn bức tranh lớn**: Phần 3 dạy phân biệt architecture decision với design decision, và học cách phân tích trade-off.
3. **Hiểu cái cần tối ưu**: Phần 4 dạy Quality Attributes. Đây là phần cực quan trọng cho production ML vì accuracy không phải metric duy nhất.
4. **Học các style tổ chức hệ thống**: Phần 5 và 6 đi từ monolith, layered, pipeline tới service-based, microservices và event-driven.
5. **Biết cách truyền đạt**: Phần 7 dạy cách vẽ view và viết ADR. Kiến trúc không được truyền đạt rõ thì rất khó vận hành lâu dài.
6. **Áp vào case study**: Phần 8 cho thấy cách lập luận end-to-end trong các hệ thật.

Nói ngắn gọn: khoá không dạy bạn thuộc lòng pattern. Khoá dạy bạn nhìn một bài toán, hỏi đúng câu hỏi, chọn đúng trade-off, rồi giải thích quyết định đó cho người khác.

## Đối tượng người đọc

Khoá này phù hợp với bốn nhóm chính:

- **Data Scientist / ML Engineer / Data Engineer** muốn hiểu cách đưa model, feature pipeline và data product vào production một cách bền vững.
- **Lập trình viên 2-5 năm kinh nghiệm** đang chuẩn bị bước lên vai trò Senior Engineer, Tech Lead hoặc Architect.
- **Học viên cao học ngành Khoa học Máy tính / Kỹ thuật Phần mềm** cần một tài liệu Tiếng Việt có cấu trúc rõ ràng.
- **Người tự học** muốn lấp khoảng trống giữa "biết viết code" và "biết thiết kế hệ thống".

Bạn không cần phải là backend expert trước khi đọc. Tuy nhiên, bạn nên có một số nền tảng tối thiểu:

- Đã viết code đủ nhiều để hiểu cảm giác code khó sửa, khó test, khó debug.
- Biết cơ bản về HTTP/API, database SQL/NoSQL và version control.
- Nếu chưa quen OOP, class, interface, inheritance, các bài SOLID có thể cần đọc chậm hơn. Khi đó, hãy dùng các ví dụ Python/ML trong tài liệu như điểm tựa.

## Nếu bạn đến từ Data Science

Hãy đọc khoá này với một câu hỏi xuyên suốt: **điều gì làm một model sống được trong production?**

Trong notebook, bạn thường tối ưu metric offline. Trong production, bạn phải tối ưu cả hệ thống:

| Trong notebook | Trong production |
|---|---|
| Accuracy, F1, AUC | Latency, throughput, reliability, rollback |
| CSV hoặc dataframe local | Data contract, schema, lineage, freshness |
| Một người chạy experiment | Nhiều team cùng vận hành pipeline |
| `pickle` hoặc artifact local | Model registry, versioning, deployment strategy |
| Print/log thủ công | Metrics, traces, dashboards, alerts |
| Chạy lại khi cần | Scheduled job, retry, idempotency, monitoring |

Software Architecture không thay thế modelling. Nó giúp modelling trở thành một phần của sản phẩm thật.

Nếu bạn muốn lộ trình riêng, hãy mở [Lộ trình cho Data Scientist](resources/data-scientist-learning-path.md). Nếu muốn xem review nội dung theo góc nhìn DS, xem [Review nội dung cho Data Scientist](resources/content-review-ds.md).

## Cấu trúc tài liệu

Khoá gồm **chín phần bài giảng** và **các tài nguyên tra cứu**.

| Phần | Tên | Số bài | Trọng tâm |
|---|---|---:|---|
| 1 | Giới thiệu Software Architecture | 4 | SA là gì, vì sao học, lộ trình |
| 2 | Design Principles (SOLID) | 7 | Cohesion, coupling, 5 nguyên lý SOLID |
| 3 | Architectural Thinking | 4 | Architecture vs Design, trade-off, modularity |
| 4 | Quality Attributes | 4 | NFR, architecture characteristics, ATAM, component thinking |
| 5 | Fundamental Styles | 5 | Monolith, layered, pipeline, microkernel |
| 6 | Distributed Styles | 5 | Service-based, microservices, event-driven, space-based |
| 7 | Documenting Architecture | 4 | Module/C&C/Allocation views, ADR |
| 8 | Case Studies | 5 | UAMS, Smart City, Production ML Feature Store, bài tập tổng hợp |
| 9 | Seminar - Advanced Topics | 5 | IoT, Web3, MLOps, Digital Twin |

Mỗi phần bắt đầu bằng một bài overview. Nếu bạn đọc tuần tự, overview giúp bạn biết phần này giải quyết vấn đề gì. Nếu bạn đọc tra cứu, overview giúp bạn nhanh chóng định vị bài cần đọc.

## Cách đọc tài liệu

### Người đọc lần đầu

Đọc theo thứ tự tự nhiên: Phần 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9. Đây là đường chắc nhất nếu bạn muốn xây nền tảng đầy đủ. Sau Phần 4, bạn đã hiểu vì sao kiến trúc bị chi phối bởi Quality Attributes. Sau Phần 6, bạn có đủ vocabulary để phân tích đa số system design ở mức trung bình. Sau Phần 7 và 8, bạn biết cách trình bày lựa chọn kiến trúc cho team. Phần 9 giúp bạn áp dụng nền tảng đó vào các domain hiện đại khó hơn như IoT, Web3, MLOps và Digital Twin.

### Data Scientist muốn productionize ML

Đừng bắt đầu bằng microservices. Hãy đi theo path này:

1. Bài 1.2 để hiểu quyết định nào là architectural.
2. Bài 3.3 để học trade-off.
3. Phần 4 để chuyển từ model metric sang system metric.
4. Bài 5.4 để hiểu pipeline architecture.
5. Bài 6.4 để hiểu event-driven và streaming.
6. Phần 7 để biết cách document ML/data systems.
7. Bài 8.3 để xem case real-time data/ML system.
8. Bài 9.4 để xem MLOps như một production platform end-to-end.

Path chi tiết nằm ở [Lộ trình cho Data Scientist](resources/data-scientist-learning-path.md).

### Người đã có kinh nghiệm và muốn tra cứu nhanh

Vào thẳng [Glossary](resources/glossary.md), [Course Summary](resources/course-summary.md), hoặc [Cross-reference](resources/cross-reference.md). Mỗi bài cố gắng tự đứng được, nên bạn có thể mở đúng chủ đề đang cần.

## Triết lý biên soạn

Bốn nguyên tắc xuyên suốt:

1. **Trực giác trước hình thức**. Ta bắt đầu bằng câu hỏi đời thực, rồi mới đưa định nghĩa.
2. **Ví dụ cụ thể hơn khẩu hiệu**. Một thuật ngữ chỉ thật sự có ý nghĩa khi bạn thấy nó giải quyết vấn đề nào.
3. **Trade-off luôn rõ ràng**. Không có best practice tuyệt đối. Mỗi quyết định đều mua một thứ bằng cách hy sinh thứ khác.
4. **Tài liệu hoá là first-class**. Kiến trúc trong đầu một người là rủi ro. Kiến trúc cần được vẽ, viết, review và cập nhật.

## Quy ước hiển thị

- **Tóm tắt một dòng**: ý chính của bài, đọc khi bạn chỉ có 30 giây.
- **Nếu bạn đến từ Data Science**: cầu nối từ DS/ML sang Software Architecture.
- **Sai lầm thường gặp**: các cách hiểu sai dễ gặp.
- **Code block**: ví dụ code hoặc pseudo-code có chủ đích.
- **Mermaid diagram**: sơ đồ topology/flow render trực tiếp trên web.
- **Khi nào dùng / khi nào không**: bảng giúp ra quyết định nhanh.

## Bắt đầu từ đâu?

Nếu bạn đọc lần đầu, bắt đầu với [Phần 1: Tổng quan](01-introduction/01-overview.md). Nếu bạn đến từ Data Science và muốn đi đường ngắn hơn, mở ngay [Lộ trình cho Data Scientist](resources/data-scientist-learning-path.md). Nếu bạn đã biết Software Architecture và chỉ cần tra cứu, bắt đầu từ [Course Summary](resources/course-summary.md) hoặc [Glossary](resources/glossary.md).

Chúc bạn học hiệu quả và biến được mô hình, pipeline, service của mình thành hệ thống production đáng tin cậy.
