---
id: 03-tradeoffs-analysis
title: 3.3 Phân tích Trade-off
sidebar_position: 3
description: Mọi quyết định kiến trúc đều có trade-off. Framework ATAM-lite để liệt kê trade-off có hệ thống, sai lầm "tối ưu một chiều", và cách present trade-off cho stakeholder non-technical. Bonus - cân bằng architect và hands-on coding.
---

# 3.3 Phân tích Trade-off

> **Tóm tắt một dòng**: Không có "best architecture", chỉ có "best given priorities". Job của architect là liệt kê trade-off có hệ thống, không phải pick một option và defend nó. Cùng dạy về cân bằng vai trò architect với hands-on coding.

## Câu hỏi nền tảng

"Có nên dùng microservices không?" là câu hỏi sai. Đúng phải là: "Cho project X với priorities Y, microservices đem lại lợi ích Z với cost W. So với monolith thì Z' / W'. Mình ưu tiên gì?".

Mỗi quyết định architecture đều có:

- **Lợi ích** (benefits), cái nó cải thiện.
- **Chi phí** (costs), cái nó hy sinh hoặc thêm vào.
- **Risk**, điều có thể đi sai.

Architect chuyên nghiệp không "tin" vào style/pattern nào. Họ liệt kê 3 yếu tố trên cho mỗi option, present cho team/stakeholder, hỗ trợ chọn dựa trên *priority hiện tại* của business.

## Nếu bạn đến từ Data Science

Trong Data Science, bạn đã quen với trade-off, chỉ là bạn thường gọi nó bằng tên khác. Bạn cân precision và recall. Bạn cân bias và variance. Bạn cân model complexity và overfitting. Software Architecture cũng vậy, nhưng trade-off nằm ở mức hệ thống.

Ví dụ, câu hỏi "có nên deploy model online không?" không thể trả lời bằng câu "online hiện đại hơn". Bạn phải so các option:

| Option | Lợi ích | Giá phải trả |
|---|---|---|
| Batch scoring mỗi đêm | Rẻ, đơn giản, dễ audit | Prediction stale, không realtime |
| Online inference CPU | Fresh hơn, tích hợp API dễ | Cần quản lý latency, autoscaling, uptime |
| Online inference GPU | Chạy model lớn nhanh hơn | Cost cao, scheduling khó, cold start |
| Hybrid batch + online rerank | Cân bằng tốt | Logic và monitoring phức tạp hơn |

Đây là cùng tư duy với model selection, nhưng đơn vị tối ưu không còn là AUC. Đơn vị tối ưu là latency, freshness, cost, reliability, explainability, privacy và khả năng vận hành.

## Vì sao trade-off khó

Vài lý do trade-off thường bị làm sai:

### Lý do 1: Lợi ích thường visible, chi phí thì không

Dễ thấy: "Microservices scale từng phần độc lập!", "Event-driven async cho high throughput!". Khó thấy: complexity của distributed tracing, network failures, eventual consistency bugs.

Architect ngây thơ chỉ list lợi ích → quyết định sai.

### Lý do 2: Chi phí phân tán theo thời gian

Chọn microservices thấy đau ngay tuần 1 (setup phức tạp), nhưng cũng đau ở tháng 24 (operational overhead). Phần lớn cost ở tháng 24, và architect ngây thơ không cân nhắc khi quyết định ở tuần 1.

### Lý do 3: Stakeholder khác nhau ưu tiên khác nhau

CTO ưu tiên scalability (long-term). PM ưu tiên time-to-market (short-term). DBA ưu tiên data consistency (correctness). Architect là người ghép các view này lại, không phải chọn 1 view.

### Lý do 4: Khó định lượng

"Maintainability" khó đo bằng số. So sánh "monolith maintainable hơn microservices vì simpler" với "microservices maintainable hơn monolith vì module boundary cứng", không có metric nào quyết định.

## Framework ATAM-lite

ATAM (Architecture Tradeoff Analysis Method) là phương pháp formal của SEI Carnegie Mellon. Đầy đủ ATAM tốn cả tuần workshop. Bản gọn ATAM-lite cho việc hàng ngày:

### Bước 1: Liệt kê options (3-5 cái)

Đừng so 2 options, nó dễ trở thành "tôi vs anh" và mất objectivity. List 3-5 options bao gồm "do nothing" và "naive solution" làm baseline.

Ví dụ cho câu hỏi "Nên dùng cache cho hệ tìm kiếm không?":

- Option A: Không cache, mọi request đi đến database.
- Option B: Cache in-memory per-instance (vd: LRU).
- Option C: Cache distributed (Redis).
- Option D: CDN cache cho response.

### Bước 2: Liệt kê quality attributes liên quan

Cho mỗi option, xem ảnh hưởng tới các QA. QA phổ biến:

- Performance (latency, throughput).
- Scalability.
- Availability.
- Consistency (data correctness).
- Maintainability.
- Cost (infrastructure, dev time).
- Security.
- Observability.

Vẽ bảng:

| QA | A (no cache) | B (local) | C (Redis) | D (CDN) |
|---|---|---|---|---|
| Latency | High (DB query) | Low | Low | Lowest |
| Throughput | Low | High | High | Highest |
| Consistency | Strong | Eventual (TTL) | Eventual | Eventual |
| Cost infra | Low | Low | Medium | Low |
| Cost dev | Low | Medium | Medium | High (CDN config) |
| Maintainability | High | High | Medium (Redis ops) | Medium |
| Observability | Easy | Hard (per-inst) | Medium (centralized) | Hard |

### Bước 3: Identify trade-off

Trade-off = QA cải thiện ở option này, xấu đi ở option khác. Vd:

- Option B trade Consistency lấy Throughput.
- Option C thêm Cost infra để có Throughput + observability tốt hơn B.
- Option D có Latency tốt nhất nhưng phức tạp setup nhất.

### Bước 4: Map vào priorities

Hỏi business/team:

- "Latency p99 quan trọng cỡ nào? 200ms acceptable?"
- "Stale data 30s có ổn không cho use case này?"
- "Team có experience operate Redis không?"

Câu trả lời dẫn tới decision. Ví dụ:

- "Tolerate 30s stale + cần p99 < 100ms + team không có Redis ops" → Option D (CDN).
- "Cần real-time + chấp nhận latency cao" → Option A (no cache).
- "Cần balance + có ops team" → Option C (Redis).

### Bước 5: Document quyết định

Viết ADR (Architecture Decision Record). Format chuẩn:

```markdown
# ADR-007: Caching strategy for search service

## Context
- Search latency p99 đang là 800ms, target 200ms.
- 80% queries lặp lại trong 5 phút.
- Stale data 1-2 phút acceptable cho UX.

## Options considered
1. No cache (status quo)
2. Local LRU cache
3. Redis distributed cache
4. CDN cache

## Decision
Chọn option 3 (Redis distributed cache).

## Rationale
- Latency: dự kiến giảm xuống 50-100ms (qua benchmark prototype).
- Throughput: tăng 5-10x.
- Observability: centralized Redis có Prometheus exporter sẵn.
- Team đã có experience Redis ops từ project khác.
- Cost: ~$200/tháng cho Redis cluster, acceptable.

## Consequences
- Phải code cache invalidation logic.
- Phải monitor Redis cluster health.
- Eventual consistency: stale 30-120s tuỳ TTL.

## Status: Accepted, 2026-01-15
```

ADR là nơi lưu trade-off analysis. Future maintainer sẽ hiểu *vì sao* quyết định này, không chỉ *cái gì* được quyết.

## Sai lầm "tối ưu một chiều"

Sai lầm phổ biến: architect tập trung vào *1* QA và bỏ qua các QA khác.

### Ví dụ thật

Một startup hype microservices vì "scalability". Quyết định: tách monolith 50 services. Một năm sau:

- Scalability: đạt (mỗi service scale riêng).
- Maintainability: TỆ HƠN (distributed tracing thiếu, debug cross-service mất nhiều giờ).
- Time-to-market: TỆ HƠN (feature mới touch 5-10 services).
- Cost ops: TĂNG 5x (Kubernetes, service mesh, monitoring stack).
- Team: BURN-OUT (on-call lan rộng, không ai own end-to-end).

Net effect: âm. Vì chỉ tối ưu scalability mà bỏ qua các QA khác.

### Cách phòng tránh

Trước mỗi quyết định lớn, hỏi: "Tôi đang tối ưu QA nào? Tôi đang hy sinh QA nào? Hy sinh đó có acceptable không?".

Nếu không answer được "đang hy sinh gì" → bạn chưa thấy trade-off → analysis chưa đủ.

## Cân bằng Architect và Hands-on Coding

Một dimension trade-off ít người nói: thời gian architect dành cho diagram/document vs cho coding.

### Hai cực sai

**Cực 1: Architect 100% non-coding ("Ivory Tower Architect")**:

- Vẽ diagram đẹp.
- Đề xuất giải pháp lý thuyết.
- Mất uy tín với team ("ông này không biết code base của mình").
- Quyết định disconnect với reality.

**Cực 2: Architect 100% coding ("Senior Developer in disguise")**:

- Code tốt nhưng không đầu tư cross-cutting work.
- Không document.
- Không mentor team.
- Quyết định ad-hoc.

### Sweet spot

Empirical: 20-40% thời gian architect dành cho coding. Code:

- Prototype cho đề xuất mới (POC).
- Review PR có touch architecture.
- Pair với developer mid-level để mentor.
- Build common library / framework dùng across team.

60-80% còn lại:

- Diagram + documentation (ADR).
- Cross-team meeting.
- Code review (không write).
- Technical strategy long-term.
- Mentorship 1-on-1.

Tỷ lệ tuỳ team size:

- Startup 5 người: architect có thể code 60-70% (vì codebase nhỏ, tech debt phải clear).
- Enterprise 100 engineers: architect có thể code 10-20% (vì cross-cutting work nhiều).

### Dấu hiệu architect đã xa rời code

- Lần cuối merge code > 6 tháng.
- Không biết build command của project mình.
- Không biết test pass-rate của repo chính.
- PR review chỉ "LGTM" không có substantial comment.

Nếu bạn (hoặc senior architect bạn quen) thấy 2+ dấu hiệu, cần realign ngay.

## Trade-off đặc biệt: "Right-sizing" architecture

Đừng over-engineer (architecture quá phức tạp so với problem), cũng đừng under-engineer (architecture không đỡ được growth).

### Quy tắc thực hành: "Architecture should match team size + 1 stage"

- 1-5 people team: monolith, 1 database, deploy as one. Đừng bao giờ microservices ở stage này.
- 5-20 people: monolith tổ chức tốt thành modules, có thể tách 1-2 service nếu có lý do.
- 20-50 people: modular monolith hoặc service-based architecture. 4-12 services.
- 50-200 people: microservices. 20-100 services.
- > 200 people: microservices + platform team build internal tools.

Đi quá nhanh (5 people làm microservices) = over-engineering. Đi quá chậm (200 people 1 monolith) = bottleneck.

## Sai lầm thường gặp

### Sai lầm 1: "Hype-driven architecture"

Đọc bài blog hot, áp dụng ngay. Không xét context.

### Sai lầm 2: "Resume-driven architecture"

Chọn tech để CV trông ngầu. Hệ quả: team dùng K8s+Istio+gRPC cho app 100 user.

### Sai lầm 3: "Last project bias"

Architect vừa làm microservices ở công ty cũ thành công → đề xuất microservices cho công ty mới mà không kiểm tra fit.

### Sai lầm 4: "Default to complex"

Khi không chắc, chọn solution phức tạp "for future flexibility". Sai. Default nên là *simplest thing that works*, phức tạp khi cần justify được.

## Tóm tắt

- **Trade-off analysis** = liệt kê options, map QA, identify trade-off, match priority.
- **ATAM-lite**: 5 bước, đủ cho việc hàng ngày.
- **Document qua ADR**: future maintainer hiểu vì sao.
- **Sai lầm "tối ưu một chiều"**: luôn hỏi "đang hy sinh gì".
- **Architect coding 20-40%**: stay grounded.
- **Right-size architecture**: match team size + 1 stage.

Bài tiếp: [Modularity](04-modularity.md), scale cohesion-coupling lên mức hệ thống.
