---
id: 03-identifying-characteristics
title: 4.3 Xác định Architecture Characteristics
sidebar_position: 3
description: Cách extract QA từ requirement, kinh nghiệm Top-7 rule, hierarchy (operational, structural, cross-cutting), workshop ATAM với stakeholder.
---

# 4.3 Xác định Architecture Characteristics

> **Tóm tắt một dòng**: Đừng pick "all the -ilities". Chọn 3-7 QA top driven bởi business priority, document chúng có thể đo được, dùng workshop với stakeholder để negotiate khi xung đột.

## Nếu bạn đến từ Data Science

Stakeholder hiếm khi nói thẳng bằng thuật ngữ architecture. Họ sẽ không nói "tôi cần feature freshness SLA 5 phút". Họ có thể nói "đừng để hệ thống chặn giao dịch dựa trên thông tin cũ". Nhiệm vụ của bạn là dịch câu đó thành Quality Attribute đo được.

Một số câu hỏi hữu ích: prediction stale bao lâu thì gây hại? Nếu model sai, ai chịu rủi ro? Có cần giải thích từng prediction không? Data chứa PII không? Label về trễ bao lâu? Nếu pipeline training fail, business có chấp nhận dùng model cũ thêm một ngày không? Từ câu trả lời, bạn extract được freshness, explainability, privacy, recoverability và reliability.

## Vì sao "không quá 7"?

Cognitive limit. Người ta nhớ và optimize được khoảng 5-9 thứ cùng lúc (Miller's 7±2 rule). Architect đặt 15 QA "quan trọng" → 15 QA đều không thực sự được tối ưu.

Quy tắc: **Top 5-7 QA**. Còn lại là implicit (default expectations như "không crash", "không leak password") nhưng không driven decision.

Tỷ lệ thực hành:

- 3 QA: lý tưởng cho startup MVP. Vd: "time-to-market, simplicity, cost".
- 5 QA: ổn cho hệ trung. Vd: "performance, scalability, availability, maintainability, security".
- 7 QA: max. Vd: thêm "auditability, observability".
- 10+ QA: bạn đang nói dối rằng mọi thứ đều ưu tiên. Force prioritize.

## Pipeline identify

### Bước 1: Đọc requirement document

Highlight mọi từ tiềm năng là NFR. Vài keyword:

- "fast", "responsive", "real-time" → performance
- "scale", "grow", "millions" → scalability
- "uptime", "always available", "24/7" → availability
- "secure", "encrypted", "compliant" → security
- "audit", "trace", "log" → auditability
- "easy to deploy", "frequent release" → deployability
- "low cost", "budget" → cost

Lưu ý: business owner thường không dùng từ kỹ thuật. "Hệ phải always work" có thể nghĩa availability *hoặc* reliability. Phải hỏi để clarify.

### Bước 2: Stakeholder interview

Schedule meeting 1-2h với:

- Product Owner / PM (business priorities).
- Engineering Manager (team capability).
- Customer Success (user pain points hiện tại).
- Optional: end user (vd: focus group cho consumer product).

Câu hỏi mẫu:

- "Trong 3 năm tới, hệ này có khả năng phát triển ra sao? 10x user? 100x?" → scalability priority.
- "Nếu hệ down 1 giờ giữa giờ làm, ai bị ảnh hưởng và thiệt hại bao nhiêu?" → availability priority.
- "Tốc độ release feature hiện tại là tuần? tháng? Có cần nhanh hơn không?" → time-to-market + deployability.
- "Có khả năng audit / compliance requirement (GDPR, SOC2, PCI)?" → compliance/auditability.
- "Hệ này lưu data nhạy cảm? Loại nào?" → security/privacy.

### Bước 3: Implicit characteristics

Như đã nói ở Bài 4.2, ngoài explicit, còn implicit. Default implicit cho most systems:

- Reliability: không data corruption.
- Security: basic auth, no XSS/SQLi.
- Maintainability: ai cũng có thể onboard.
- Observability: logs + basic metrics.

Implicit không cần "top 7", nhưng cần *baseline*. Architect đảm bảo baseline được respected.

### Bước 4: Priority với business

Workshop format:

1. List 10-15 candidate QA (mix explicit + implicit).
2. Business stakeholder rank: must-have / should-have / nice-to-have.
3. Push back: nếu mọi cái "must-have", force chọn top 5.
4. Output: top 5-7 QA + acceptable range cho mỗi cái.

Ví dụ output:

| QA | Priority | Target |
|---|---|---|
| Performance | Must | p99 < 200ms cho 95% endpoint |
| Availability | Must | 99.9% uptime |
| Security | Must | Compliance OWASP Top 10 |
| Scalability | Should | Scale 10x trong 1 năm |
| Maintainability | Should | Onboard new dev < 2 tuần |
| Cost | Should | < $5k/tháng infra cho 50k users |

Document này là "north star" cho mọi architecture decision.

### Bước 5: Operationalize

Translate QA thành metric đo được.

| QA | Cách đo |
|---|---|
| Performance | p50, p95, p99 latency từ APM (Datadog, New Relic) |
| Availability | Uptime % từ monitoring (Pingdom, internal) |
| Scalability | Max concurrent users từ load test |
| Maintainability | Mean time to PR-merged, cyclomatic complexity |
| Deployability | Time from commit to production |
| Security | Pen-test results, dependency vulnerability count |
| Cost | Monthly cloud bill |

Mỗi QA nên có:

- Metric đo (number).
- Cách đo (tool).
- Threshold pass/fail (vd: p99 < 200ms = pass; > 200ms = alert).
- Frequency review (vd: weekly architecture review).

Không operationalize được → QA không "real", chỉ là khẩu hiệu.

## Hierarchy của Characteristics

Có thể group QA theo 3 layer:

### Operational (Runtime characteristics)

QA về *cách hệ chạy* trong production:

- Performance
- Scalability
- Availability
- Reliability
- Security
- Recoverability

Đo bằng monitoring tool.

### Structural (Development characteristics)

QA về *cách hệ được build*:

- Maintainability
- Testability
- Deployability
- Modularity
- Reusability

Đo bằng code metric + dev workflow metric.

### Cross-cutting

QA xuyên qua mọi layer:

- Cost
- Time-to-market
- Auditability
- Observability
- Compliance (GDPR, HIPAA, ...)
- Accessibility
- i18n

Đo theo context.

Insight: thường top 5-7 QA distributed across 3 layer. Vd:

- 2 operational (performance, availability).
- 2 structural (maintainability, deployability).
- 1-2 cross-cutting (cost, compliance).

Distribution này khoẻ. Tất cả ở 1 layer là warning (bias).

## CQA Worksheet (Quality Attribute Workshop simplified)

Format compact để run workshop 60-90 phút:

```
| QA | Scenario (concrete) | Source | Response | Measure |
|---|---|---|---|---|
| Performance | User search product on mobile during peak | User | Result returned | p99 < 300ms |
| Scalability | Black Friday traffic 10x normal | System | All requests served | < 5% error rate |
| Availability | DB primary fails | System | Failover to replica | < 30s outage |
| Maintainability | Junior dev fix critical bug | Dev | PR merged | < 4 hours |
| Security | Attacker tries SQL injection | Attacker | Request blocked | 0 successful attacks/year |
```

Mỗi row là một "QA scenario". Scenario cụ thể dễ test hơn QA abstract. Output workshop = bảng scenarios với measure rõ ràng.

Reference: ATAM (Architecture Tradeoff Analysis Method) của SEI Carnegie Mellon, full version dùng cho hệ critical. Quality Attribute Workshop simplified dùng cho hệ thường.

## Sai lầm thường gặp

### Sai lầm 1: "Mọi thứ đều quan trọng"

Phổ biến nhất. Stakeholder nói tất cả must-have. Architect không push back → end up với 15 QA = không QA nào được tối ưu thật.

Fix: force ranking. "Nếu chỉ chọn 3, bạn chọn cái nào?".

### Sai lầm 2: QA không measurable

"Hệ phải user-friendly." → không đo được. Refine thành: "task completion rate > 85% trong usability test với 10 user."

### Sai lầm 3: Implicit không document

Implicit characteristics được architect assume nhưng không communicate. Sau 1 năm team thay đổi, no one biết. Document chúng vào "implicit baseline" section của architecture doc.

### Sai lầm 4: QA conflict không resolve

List "performance + security + simplicity" mà không acknowledge chúng có thể conflict. Khi conflict xảy ra trong development, không có guidance để pick.

Fix: trong workshop, present cặp QA có thể conflict và force prioritization. Vd: "Khi performance vs security xung đột, mình chọn cái nào?".

### Sai lầm 5: Không revisit

QA được set 1 lần ở project kickoff rồi quên. Business priority có thể thay đổi (vd: COVID làm e-commerce ưu tiên availability hơn cost).

Fix: revisit QA mỗi quarter hoặc khi có major business change.

## Tóm tắt

- **Top 5-7 QA**, không nhiều hơn.
- **Pipeline**: read requirement → interview → identify implicit → priority workshop → operationalize.
- **Hierarchy**: operational + structural + cross-cutting.
- **CQA worksheet**: scenario-based, measurable.
- **Sai lầm**: "mọi thứ quan trọng", QA không measurable, implicit không doc, conflict không resolve, không revisit.

Bài tiếp (cuối Cụm 4): [Component-Based Thinking](04-component-based-thinking.md), map QA xuống component.
