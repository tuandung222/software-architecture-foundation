---
id: content-review-ds
title: Review nội dung cho Data Scientist
sidebar_position: 6
description: Rà soát toàn bộ nội dung khoá theo góc nhìn người học có nền tảng Data Scientist, kèm kế hoạch cải thiện từng cụm.
---

# Review nội dung cho Data Scientist

> **Tóm tắt một dòng**: Khoá hiện tại đã có khung kiến thức Software Architecture đầy đủ, nhưng còn viết theo giả định người đọc đã quen Software Engineering. Nếu người học đến từ Data Science, cần thêm cầu nối từ notebook, ML pipeline, feature store, model serving, data quality và MLOps sang các khái niệm kiến trúc.

## Vì sao cần review riêng cho Data Scientist?

Một Data Scientist thường bước vào Software Architecture từ một điểm xuất phát rất khác với backend engineer. Backend engineer đã quen với API, interface, deploy service, database transaction, monitoring, rollback. Data Scientist lại thường quen với notebook, pandas, training set, validation metric, feature engineering, experiment tracking, model artifact và dashboard.

Hai nhóm đều viết code, nhưng nỗi đau production khác nhau. Backend engineer thường đau vì service coupling, latency, deploy, incident. Data Scientist thường đau vì training-serving skew, data drift, feature freshness, model reproducibility, pipeline bị gãy, notebook không thể đưa vào production, hoặc model offline rất tốt nhưng online lại chậm và khó monitor.

Vì vậy cùng một khái niệm kiến trúc cần được giải thích bằng ngôn ngữ khác. Ví dụ:

- **Quality Attribute** không chỉ là "p99 latency" của API, mà còn là feature freshness, reproducibility, data lineage và model rollback time.
- **Pipeline Architecture** không chỉ là Unix `cat | grep | sort`, mà còn là ETL, feature engineering, training pipeline và inference pipeline.
- **Deployment View** không chỉ là service chạy ở EC2 nào, mà còn là model serving chạy CPU hay GPU, feature store ở đâu, data warehouse ở đâu, monitoring nhận metrics nào.
- **ADR** không chỉ ghi "chọn PostgreSQL", mà còn ghi "chọn batch inference hay online inference", "chọn feature store hay query trực tiếp từ warehouse".

Review này dùng persona đó để xác định bài nào cần thêm giải thích, bài nào cần rewrite sâu hơn, và bài nào cần thêm ví dụ DS/ML.

## Tóm tắt audit hiện trạng

| Metric | Kết quả |
|---|---:|
| Tổng markdown files trong `docs/` | 43 |
| Bài học chính | 37 |
| Resources | 5 |
| Tổng số từ xấp xỉ | 48.5k |
| Median words mỗi bài | 1153 |
| Keyword `Data Scientist` | chưa có |
| Keyword `MLOps` | chưa có |
| Keyword `feature store` | chưa có |
| Keyword `model serving` | chưa có |
| Keyword `data lake` | chưa có |

Kết luận ngắn: nội dung đã có skeleton kiến thức đúng, nhưng chưa đủ personalized cho DS. Nhiều bài đang thiên về compact lecture notes. Để người đọc DS tiếp thu tốt, cần thêm tầng "dịch thuật khái niệm": lấy khái niệm quen thuộc trong DS, nối sang thuật ngữ Software Architecture, rồi mới formalize.

## Rubric review

Mỗi bài được đánh giá theo 7 tiêu chí:

| Tiêu chí | Câu hỏi review |
|---|---|
| Intuition | Bài có mở bằng vấn đề đời thực dễ cảm không? |
| DS bridge | Có analogy hoặc ví dụ từ data, ML, MLOps không? |
| Prerequisite | Có giải thích khái niệm SWE/OOP trước khi dùng không? |
| Depth | Có đủ reasoning từng bước, không chỉ bullet/tóm tắt không? |
| Examples | Có ví dụ concrete, scenario, code hoặc diagram đủ sát không? |
| Flow | Các section nối nhau tự nhiên, không nhảy concept không? |
| Practice | Có câu hỏi tự kiểm tra hoặc bài tập nhỏ không? |

## Review theo cụm

### Intro và Cụm 1: Giới thiệu

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `intro.md` | Cần cập nhật | Đối tượng đọc chưa nêu Data Scientist. Assumption hơi nghiêng về dev production/OOP. | Thêm persona DS, giải thích vì sao DS cần SA khi đưa model/data pipeline vào production. |
| `01-overview.md` | Cần mở rộng | Tốt cho warm-up, nhưng chưa có ví dụ ML production failure. | Thêm ví dụ notebook chạy tốt nhưng production fail vì latency, drift, monitoring. |
| `02-what-is-software-architecture.md` | Cần DS bridge | Định nghĩa SA ổn, nhưng ví dụ đang thiên về app/backend. | Thêm decision examples: batch vs online inference, data warehouse vs feature store, model registry. |
| `03-aims-and-outcomes.md` | Cần cập nhật | Learning outcomes chưa nói được năng lực thiết kế ML/data systems. | Thêm outcomes phụ cho DS: nhận diện QA của model serving, document ML platform, phân biệt prototype vs production. |
| `04-roadmap.md` | Cần cập nhật ngay | Chưa có learning path riêng cho DS. | Thêm lộ trình "Data Scientist to Software Architect" và link resource riêng. |

### Cụm 2: Design Principles

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `01-overview.md` | Cần DS bridge | SOLID có thể xa lạ với người quen notebook/script. | Mở bằng ví dụ notebook training biến thành script 2000 dòng khó sửa. |
| `02-cohesion-and-coupling.md` | Cần thêm ví dụ | Có nội dung tốt nhưng nên map sang feature engineering/training/evaluation. | Thêm ví dụ module `train.py` làm mọi thứ vs tách data loader, featurizer, trainer, evaluator. |
| `03-srp.md` | Cần rewrite vừa | SRP nên giải thích bằng actor trong ML workflow. | Ví dụ tách trách nhiệm của data scientist, ML engineer, platform engineer. |
| `04-ocp.md` | Cần thêm ví dụ DS | OCP rất hợp model plug-in nhưng chưa khai thác. | Thêm ví dụ thêm XGBoost/LightGBM/Transformer mà không sửa evaluator. |
| `05-lsp.md` | Cần giải thích chậm | LSP thường khó với DS nếu không quen inheritance. | Dùng sklearn estimator contract: `fit`, `predict`, `predict_proba`. |
| `06-isp.md` | Cần ví dụ role interface | ISP có thể map sang Trainer, Predictor, Explainer. | Thêm ví dụ tránh ép model nào cũng implement explainability. |
| `07-dip.md` | Cần bridge mạnh | DIP quan trọng nhưng abstract. | Ví dụ training logic không depend trực tiếp vào S3, MLflow, BigQuery. |

### Cụm 3: Architectural Thinking

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `01-overview.md` | Cần DS framing | Tốt nhưng chưa gắn với shift từ prototype sang production. | Thêm đoạn "từ model accuracy sang system outcome". |
| `02-architecture-vs-design.md` | Cần DS examples | Framework 3 tiêu chí cần ví dụ ML. | Batch vs online inference là architectural; đổi optimizer training thường là design/detail. |
| `03-tradeoffs-analysis.md` | Cần mở rộng | Trade-off là core, nên dùng DS trade-offs. | Accuracy vs latency, freshness vs cost, explainability vs performance, privacy vs observability. |
| `04-modularity.md` | Cần DS boundary | Đã có vertical slicing, cần map sang ML platform domains. | Feature pipeline, training, model registry, serving, monitoring là bounded contexts. |

### Cụm 4: Quality Attributes

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `01-overview.md` | Rewrite ưu tiên cao | Đây là cụm quan trọng nhất cho DS nhưng chưa có QA riêng cho ML/data. | Rewrite thêm data quality, feature freshness, reproducibility, drift detection, lineage. |
| `02-functional-vs-nfr.md` | Cần mở rộng | Nên có ví dụ model offline tốt nhưng NFR fail. | FR: predict churn. NFR: p95 latency, data freshness, explainability, rollback time. |
| `03-identifying-characteristics.md` | Cần thêm worksheet DS | Hiện general, cần stakeholder/questions cho ML platform. | Thêm câu hỏi cho DS: model stale bao lâu thì nguy hiểm, data drift ai nhận alert. |
| `04-component-based-thinking.md` | Cần map data components | Component examples còn general. | Thêm component map: ingestion, validation, feature store, trainer, registry, serving, monitor. |

### Cụm 5: Fundamental Styles

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `01-overview.md` | Cần DS orientation | Nên định vị Pipeline là cầu nối tự nhiên cho DS. | Thêm guide: nếu bạn làm data pipeline, đọc 5.4 kỹ nhất. |
| `02-monolithic-vs-distributed.md` | Cần ví dụ ML evolution | Monolith vs distributed có thể map notebook to production. | Notebook/script, modular package, batch job, service-based ML platform. |
| `03-layered-architecture.md` | Cần bridge | Layered hơi backend-centric. | Map sang API layer, domain/inference layer, model/data access layer. |
| `04-pipeline-architecture.md` | Rewrite ưu tiên cao | Đây là bài gần DS nhất nhưng còn quá ngắn. | Rewrite sâu với ETL, feature pipeline, training pipeline, inference pipeline. |
| `05-microkernel-architecture.md` | Cần ví dụ DS | Rất hợp plug-in algorithm/metrics. | Thêm model plug-in, metric plug-in, transform plug-in. |

### Cụm 6: Distributed Styles

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `01-overview.md` | Cần warning cho DS | DS dễ bị cuốn vào microservices khi nghe MLOps. | Thêm nguyên tắc: DS team nhỏ nên bắt đầu modular monolith/service-based. |
| `02-service-based.md` | Cần ML platform example | Service-based là default tốt cho ML platform vừa. | Ví dụ feature service, training service, serving service, monitoring service. |
| `03-microservices.md` | Cần cảnh báo | Cần nhấn mạnh cost vận hành với DS team. | Ví dụ distributed monolith trong ML platform. |
| `04-event-driven.md` | Rewrite vừa | Rất liên quan streaming ML. | Thêm fraud detection, real-time feature update, Kafka schema evolution. |
| `05-space-based.md` | Cần contextualize | Niche, DS có thể hiểu qua online feature cache. | Giải thích bằng low-latency feature lookup và extreme traffic. |

### Cụm 7: Documenting

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `01-overview.md` | Cần ML architecture doc example | Documentation chưa gắn với model/data pipeline. | Thêm vì sao ML system càng cần doc: lineage, owner, rollback. |
| `02-module-views.md` | Cần ML module view | C4 examples general. | Thêm module view cho ML platform. |
| `03-component-connector-views.md` | Cần inference/training flows | Sequence diagram nên có online inference và batch training. | Thêm runtime flow: request, feature lookup, model inference, logging. |
| `04-allocation-views.md` | Cần GPU/data infra | Deployment view nên có GPU, object store, warehouse. | Thêm allocation example: CPU API, GPU serving, data lake, monitoring. |

### Cụm 8: Case Studies

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `01-overview.md` | Cần DS lens | Case Smart City có ML nhưng chưa nói rõ đây là bridge. | Thêm note cho DS nên đọc Smart City kỹ. |
| `02-uams-academic-management.md` | OK, cần annotation | Không cần biến thành DS case. | Thêm box so sánh với data-heavy system khi relevant. |
| `03-smart-city-traffic.md` | Cần rewrite sâu | Đây là DS-friendly case tốt nhất hiện có. | Mở rộng inference latency, data pipeline, model drift, hot/cold storage. |
| `04-exercise-set.md` | Cần DS exercises | Hiện chỉ có vài bài gần data. | Thêm churn prediction platform, recommendation system, feature store, ML monitoring. |

### Resources

| File | Trạng thái | Gap chính | Action |
|---|---|---|---|
| `course-summary.md` | Cần DS summary | Hiện summary general. | Thêm section "Nếu bạn là Data Scientist". |
| `glossary.md` | Cần terms DS/MLOps | Thiếu MLOps vocabulary. | Thêm feature store, model serving, drift, lineage, reproducibility. |
| `cross-reference.md` | Cần DS path | Có shortcut paths nhưng chưa có DS. | Thêm dependency path cho DS. |
| `exam-checklist.md` | Cần self-assessment DS | Checklist general. | Thêm block production ML architecture. |
| `pdfs.md` | OK | Không cần đổi nhiều. | Sau rewrite chỉ rebuild PDF. |

## Ưu tiên cải thiện

| Priority | Nhóm bài | Lý do |
|---|---|---|
| P0 | Intro, Roadmap, DS learning path | Người học DS cần biết mình nên đọc thế nào ngay từ đầu. |
| P0 | Cụm 4 Overview | QA là nơi DS chuyển từ model metric sang system metric. |
| P0 | Pipeline Architecture | Đây là cầu nối tự nhiên nhất từ DS sang Architecture. |
| P1 | Trade-off, Modularity, Event-Driven | Ba khái niệm tạo năng lực thiết kế production data/ML systems. |
| P1 | SOLID với Python/ML examples | Giúp DS refactor từ notebook sang maintainable package. |
| P2 | Documenting và Allocation | Cần sau khi đã hiểu system shape. |
| P2 | Case Studies | Cần thêm DS-first case để consolidate. |

## Chuẩn cải thiện cho từng bài

Mỗi bài sau rewrite nên có tối thiểu:

1. Một đoạn mở đầu intuition-first.
2. Một box hoặc section `Nếu bạn đến từ Data Science`.
3. Một ví dụ ML/data platform nếu concept relevant.
4. Một bảng trade-off hoặc decision rule.
5. Một mini self-check 3 câu.
6. Không dùng em dash.
7. Mermaid labels không chứa ký tự dễ lỗi nếu chưa quote.

## Kết luận

Khoá hiện tại là bản nền tốt, nhưng chưa phải bản tối ưu cho Data Scientist. Việc cải thiện không nên biến khoá thành MLOps course. Mục tiêu đúng là giữ Software Architecture làm trục chính, nhưng dùng DS/ML/Data platform làm ngôn ngữ cầu nối để người học dễ hiểu và thấy tính ứng dụng ngay.
