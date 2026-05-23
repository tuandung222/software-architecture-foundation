---
id: 02-functional-vs-nfr
title: 4.2 Functional vs Non-functional Requirements
sidebar_position: 2
description: Vì sao NFR (quality attributes) thường quan trọng hơn functional requirements. Định nghĩa Architecture Characteristic theo 3 tiêu chí của Mark Richards. Implicit vs explicit characteristics.
---

# 4.2 Functional vs Non-functional Requirements

> **Tóm tắt một dòng**: Functional requirement nói "hệ phải làm X"; Quality attribute nói "hệ phải làm X *tốt cỡ nào*". Architecture được quyết định bởi QA chứ không phải bởi functional requirement, vì cùng functionality có thể được implement bằng vô số architecture khác nhau.

## Nếu bạn đến từ Data Science

Trong ML system, functional requirement thường nghe rất đơn giản: "hệ thống trả về churn score", "hệ thống phát hiện fraud", "hệ thống recommend sản phẩm". Nhưng phần làm kiến trúc khó nằm ở NFR: score phải trả trong bao lâu, feature được phép cũ bao lâu, prediction có cần explain không, có cần audit model version không, pipeline fail thì recover thế nào.

Vì vậy đừng dừng ở câu "model predict được". Hãy hỏi tiếp: predict cho bao nhiêu request mỗi giây, với p95 latency bao nhiêu, khi schema đổi thì phát hiện ở đâu, khi model drift thì ai biết, rollback mất bao lâu. Những câu hỏi này biến một model thành production system.

## Câu hỏi mở đầu

Hai team build cùng một e-commerce site. Functional requirement giống hệt: catalog, cart, checkout, payment.

Team A architect:

- Monolithic Rails app.
- PostgreSQL.
- Deploy 1 server EC2 t3.medium.
- Cost: $30/tháng.

Team B architect:

- 12 microservices (Catalog, Cart, Inventory, Payment, ...) trên Kubernetes.
- PostgreSQL + Redis + Elasticsearch + Kafka.
- Multi-region active-active deployment.
- Cost: $15,000/tháng.

Cả hai đều "đáp ứng functional requirement", user có thể browse, add to cart, checkout. Nhưng architecture khác nhau 500 lần về cost. Tại sao?

Vì *non-functional requirement* khác nhau:

- Team A: ~100 user, không cần multi-region, downtime 1 giờ/tháng OK.
- Team B: 10M user, 99.99% uptime, p99 latency < 200ms, scale to 10x traffic in 5 phút.

**Architecture decision được driven bởi NFR, không phải bởi functional requirement**. Đây là một trong những insight quan trọng nhất của Software Architecture.

## Định nghĩa formal

### Functional Requirement (FR)

> "What the system must do.", Hành vi observable mà hệ phải có.

Ví dụ:
- "User có thể đăng ký account bằng email + password."
- "Admin có thể export CSV danh sách user."
- "Hệ tự động gửi email khi order được ship."

FR pass/fail qua acceptance test: hành vi xảy ra hoặc không.

### Non-functional Requirement (NFR)

> "How well the system must do it.", Constraint trên cách hệ behave.

Ví dụ:
- "API response p99 < 200ms cho 95% endpoints."
- "Uptime ≥ 99.9% (3 phút downtime/tháng)."
- "Hỗ trợ 10,000 concurrent users."
- "Code 80%+ unit test coverage."

NFR đo qua benchmark, monitoring, code metric. Có thể "đạt mức nào đó", không pass/fail binary.

### Architecture Characteristic (Mark Richards)

Mark Richards trong *Fundamentals of Software Architecture* dùng từ "architecture characteristic" thay vì NFR. Định nghĩa:

> "An architecture characteristic meets three criteria:"
> 
> 1. Specifies a **non-domain design consideration**.
> 2. **Influences some structural aspect** of the design.
> 3. **Critical or important** to application success.

Phân tích 3 tiêu chí:

**1. Non-domain**: không thuộc về business logic. Vd "Order phải có tax" là domain rule. "Order processing latency < 200ms" là non-domain, không nói về domain order, nói về *cách* processing.

**2. Structural impact**: yêu cầu thay đổi structure của hệ. Vd "100 concurrent user" có thể serve bởi single server. "10M concurrent user" require horizontal scaling, load balancer, có lẽ CDN, structure khác hoàn toàn.

**3. Critical**: nếu không đạt, hệ fail. Vd: "Pinterest cần search latency < 100ms", nếu 5 giây thì user rời ngay. "Internal admin tool 2-second latency OK", không critical.

Mọi NFR architectural đều thoả 3 tiêu chí. Một số NFR không thoả tiêu chí 2 (vd "code 80% test coverage" không structural) → không architectural.

## Implicit vs Explicit Characteristics

### Explicit

Stakeholder nói rõ trong requirement doc. Vd: "API p99 < 200ms", viết trong SLA.

### Implicit

Stakeholder không nói nhưng *vẫn expect*. Vd:

- User expect "hệ không bị hack", security implicit (trừ khi product là hack tool, ha ha).
- User expect "data không bị mất khi crash", reliability implicit.
- Developer expect "build < 5 phút", maintainability implicit.

Architect job: identify implicit characteristics. Stakeholder không có ngôn ngữ để articulate chúng, architect đào ra.

Pattern: với mỗi feature, hỏi:

- "Nếu feature này down 1 ngày, user phản ứng sao?"
- "Nếu data sai 1%, ảnh hưởng gì?"
- "Nếu attacker exploit endpoint này, hậu quả?"
- "Nếu hệ scale lên 10x, gì breaks first?"

Câu trả lời tiết lộ implicit characteristics.

## "Architecture is the X-ilities"

Trong industry, NFR thường gọi là "-ilities" vì nhiều cái kết thúc bằng `-ility`:

- Reliab**ility**
- Scalab**ility**
- Maintainab**ility**
- Testab**ility**
- Deployab**ility**
- Observab**ility**
- Auditab**ility**
- Availab**ility**

Quote nổi tiếng (không rõ tác giả): "Architecture is the X-ilities. Get them right and your system works. Get them wrong and your system collapses."

Reason: -ilities là cái khó retro-fit. Function add thêm vào hệ cũ được. Performance/scalability/security bake vào ngay từ đầu mới đảm bảo.

## Ví dụ thực hành: từ FR → NFR → Architecture

### Use case: Hệ booking phim cinema

**Functional requirements**:
- User search phim theo ngày, rạp, thể loại.
- User chọn ghế, payment.
- User nhận email confirmation + QR code.
- Admin manage suất chiếu, giá vé.

**Non-functional requirements** (cần đào):

- *Performance*: search response < 500ms (user wait không bị nản).
- *Concurrency*: thứ bảy 7pm peak 50,000 concurrent user nationwide.
- *Consistency*: 2 user không được book cùng ghế (strong consistency for seat selection).
- *Availability*: ≥ 99.5% uptime, đặc biệt cao ngày cuối tuần.
- *Scalability*: peak khoảng 10x normal, scale up trong < 5 phút.
- *Security*: payment information theo PCI DSS.
- *Auditability*: log mọi transaction cho refund support.

**Architecture implications**:

- *Concurrency 50k + strong consistency seat*: cần seat reservation pattern (Redis SETNX hoặc database row lock). Không cache seat availability.
- *Peak 10x*: auto-scaling group, scale-out architecture (stateless services).
- *PCI DSS*: payment processing isolated service, không touch app-level code. Stripe/local gateway.
- *Audit*: append-only event log (Event Sourcing optional, audit log mandatory).

Quyết định kiến trúc *suy ra* từ NFR. Khác NFR → khác architecture.

## NFR khó hơn FR

NFR thường:

### Khó measure

"Maintainable" cụ thể là gì? Cyclomatic complexity? Lines of code? Time to onboard new dev?

Solution: operationalize NFR bằng metric cụ thể. "Maintainable" = "new dev onboard < 2 tuần đến first PR" + "average bugfix time < 4 giờ" + "cyclomatic complexity < 15 per method".

### Khó test

Performance test cần load generator. Scalability cần production-like environment. Security cần penetration test. Cost cao.

### Khó negotiate với business

Business muốn "everything fast and cheap". Architect job: present trade-off, force prioritization.

Tool: ATAM, CQA (Continuous Quality Assurance) workshop, sẽ học ở 4.3.

### Conflict nhau

Đã nói ở 4.1: cặp trade-off. Không pick all.

## Sai lầm thường gặp

### Sai lầm 1: Bỏ qua NFR trong design phase

Team build feature theo functional spec, không hỏi NFR. Production ship rồi mới đau: too slow, không scale, security holes.

Fix: NFR phải elicited *trước* khi viết code. Workshop 1-2 giờ với business để extract NFR.

### Sai lầm 2: NFR không measurable

"Hệ phải fast." → useless. Phải định lượng: "p99 < 200ms".

### Sai lầm 3: Treat tất cả NFR như nhau

Stakeholder say "tất cả NFR đều critical". Sai. Phải force priority. 5-7 NFR top.

### Sai lầm 4: NFR không liên kết với business value

NFR phải justify bằng business impact. "p99 < 200ms vì study cho thấy mỗi 100ms tăng latency làm conversion giảm 1%". Không justify được → cắt khỏi requirement.

## Tóm tắt

- **FR**: hệ làm gì. **NFR**: hệ làm tốt cỡ nào.
- **Architecture decision driven bởi NFR**, không phải FR.
- **Architecture characteristic** (Richards): non-domain + structural impact + critical.
- **Implicit characteristics**: architect đào ra từ stakeholder.
- **NFR khó**: measure, test, negotiate, conflict.

Bài tiếp: [Identifying Architecture Characteristics](03-identifying-characteristics.md), kỹ thuật extract NFR từ requirement.
