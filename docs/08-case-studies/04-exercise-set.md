---
id: 04-exercise-set
title: 8.4 Bài tập tổng hợp
sidebar_position: 4
description: 5 bài tập kiến trúc với hints chi tiết. Tự practice end-to-end pipeline - identify QA, chọn style, decompose component, draft ADR.
---

# 8.4 Bài tập tổng hợp

> **Tóm tắt một dòng**: 5 bài tập tự practice. Mỗi bài có context, requirements, và hints để bạn lập luận theo framework từ Cụm 1-7. Không có "đáp án đúng" - chỉ có "đáp án hợp lý cho context".

## Cách làm

Cho mỗi bài tập:

1. **Đọc context** + functional requirements.
2. **Identify Top 5-7 Quality Attributes** (Cụm 4).
3. **Quyết định monolithic vs distributed** (Cụm 5.2).
4. **Choose architecture style** (Cụm 5-6).
5. **Decompose components** (Cụm 4.4, 3.4).
6. **Draft 3-5 ADRs** cho key decisions (Cụm 7.2).
7. **Vẽ C4 Context + Container diagrams** (Cụm 7.2).
8. **Identify trade-offs hy sinh** (Cụm 3.3).

Time budget: 2-3 giờ mỗi bài.

Tốt nhất là làm với 1-2 đồng nghiệp + present cho nhau. SA là kỹ năng *socialized* — debate giúp identify weak reasoning.

---

## Bài 1: Online Food Delivery Platform

### Context

Startup Việt Nam build platform giao đồ ăn (như GrabFood, ShopeeFood).

- Phase 1 (6 tháng): launch tại HCM, ~1000 restaurants, ~50k customer, ~500 driver.
- Phase 2 (12 tháng): expand 5 thành phố lớn, 10x scale.
- Phase 3 (24 tháng): national, 100x scale phase 1.

### Functional requirements

- Customer browse restaurant + menu, place order.
- Restaurant receive order, confirm/reject.
- Driver được assigned, pickup, deliver.
- Real-time tracking driver location for customer.
- Payment (digital wallet, COD).
- Rating + review.

### Constraints

- Initial team: 8 engineers.
- Budget: < $5k/month infrastructure phase 1.

### Hints

- **Scale trajectory**: design cho phase 1, planned migration to phase 2.
- **Real-time tracking**: WebSocket + location streaming.
- **Order workflow**: state machine (placed → confirmed → preparing → ready → picked → delivered).
- **Multi-sided platform**: 3 user types (customer, restaurant, driver) — consider BFF pattern.

### Things to consider

- Monolithic phase 1, migrate phase 2? Hay service-based từ đầu?
- DB: PostgreSQL? Add Redis? Add Kafka?
- Payment: build hay integrate (Stripe/local gateway)?
- Notification: push notification setup?

### Output expected

- C4 Context + Container.
- Top 5 QA + targets.
- 4-5 ADRs.
- Trade-off reflection.

---

## Bài 2: B2B SaaS for Property Management

### Context

SaaS giúp building owner quản lý apartment complex (như Yardi, RealPage but VN-focused).

- Khách hàng: building owner / management company (100-2000 apartments per customer).
- Target: 50 customers in year 1, 500 in year 3.

### Functional requirements

- Tenant management (lease, contract, profile).
- Rent collection (recurring billing, payment tracking).
- Maintenance ticket (tenant submit → assigned to staff → resolve).
- Financial reporting (collected, outstanding, occupancy rate).
- Customer admin portal + Tenant mobile app.

### Constraints

- Multi-tenancy (khách hàng A không thấy data khách hàng B).
- Customization: each building can have custom rules (vd: late fee policy).
- Compliance: GDPR-like privacy regulation.

### Hints

- **Multi-tenancy**: shared DB + tenant_id column? Database-per-tenant? Schema-per-tenant?
- **Customization**: rule engine? Plug-in?
- **Reporting**: separate read replica? CQRS?
- **Mobile app**: BFF for tenant?

### Things to consider

- Scale 50-500 customers — service-based likely sufficient.
- Multi-tenancy strategy có ảnh hưởng lớn đến architecture.
- Compliance audit log.

### Output expected

- Same as Bài 1.
- Bonus: design multi-tenancy schema in detail.

---

## Bài 3: Real-time Stock Trading Platform

### Context

Startup fintech build platform giao dịch chứng khoán (Robinhood-style).

- Target users: 100k retail trader Vietnam.
- Peak hours: 9:00-15:00 weekdays.
- Connect to local exchange (HOSE, HNX) via FIX protocol.

### Functional requirements

- View real-time price ticker.
- Place buy/sell order.
- Portfolio tracking.
- Historical price chart (1-min, 5-min, daily candles).
- News feed.
- Account & money transfer.

### Constraints

- Compliance: SBV regulation, audit log mọi transaction.
- Latency critical: order execution < 100ms.
- Data integrity: 100% accurate (financial).
- Uptime peak hours: 99.99%.

### Hints

- **Price ticker**: WebSocket streaming. Pub-sub pattern. Redis pub/sub or Kafka?
- **Order matching engine**: critical path — likely in-house cho fairness/latency.
- **Historical data**: time-series DB (TimescaleDB, InfluxDB).
- **Compliance**: event sourcing (cho audit + replay)?

### Things to consider

- This is "harder" than typical app — financial, real-time, regulated.
- Space-Based architecture có relevant không (for matching engine)?
- Disaster recovery critical.

### Output expected

- Same as before + DR/failover plan.
- Critical: explain latency budget breakdown.

---

## Bài 4: IoT Manufacturing Monitoring

### Context

Manufacturing company want monitor 50 factories worldwide. Each factory has 200 machines với sensor (temperature, vibration, power, ...).

### Functional requirements

- Ingest sensor data (10k sensors total, each pings every 5s = 2000 events/s).
- Real-time dashboard cho factory manager.
- Anomaly detection (predictive maintenance).
- Historical analytics (5 year retention).
- Alert system (SMS + email + integration với existing ticketing).

### Constraints

- Some factories có poor internet — edge processing cần thiết.
- Latency: anomaly detection within 60s.
- Cost-sensitive (industrial budget, not tech startup).
- Compliance: ISO 27001.

### Hints

- **Edge processing**: do detection locally, sync results to central.
- **Cloud + on-prem hybrid**.
- **Time-series storage**: InfluxDB, TimescaleDB.
- **Anomaly detection**: rule + ML.

### Things to consider

- Hybrid (edge + cloud) is rare but appropriate here.
- Bandwidth limited → compress + batch.
- Lambda architecture (batch + stream) possible.

---

## Bài 5: Multi-region E-commerce Platform

### Context

Major e-commerce expand từ Vietnam ra Southeast Asia (Thailand, Indonesia, Philippines, Malaysia).

- Current: monolith Vietnam, 10M users.
- Target: multi-region, 50M users across SEA.
- Constraints: comply local data residency law (each country's data must stay in-country).

### Functional requirements

- Catalog (products country-specific + global).
- Cart, checkout, payment (country-specific payment methods).
- Inventory (country-specific warehouses).
- Search (country-specific language).
- Recommendations (cross-region OK).

### Constraints

- Latency: page load < 2s in each country.
- Data residency: hard requirement.
- Existing monolith: 5-year-old codebase, can't rewrite.

### Hints

- **Migration strategy**: Strangler Fig (Cụm 5.2).
- **Multi-region deployment**: each country has DB; some services shared globally (recommendations).
- **CDN**: critical for asset performance.
- **Data residency**: dictate database location, search index, cache.

### Things to consider

- This is the hardest exercise — combine migration + multi-region + compliance.
- Hybrid: legacy monolith + new microservices.
- Plan over 24-36 months.

---

## Reflection questions

Sau khi làm 5 bài:

1. Bài nào dễ nhất? Vì sao?
2. Bài nào khó nhất? Vì sao?
3. Style nào bạn dùng nhiều nhất across exercises? Có pattern không?
4. QA nào hay được prioritize? (security, scalability, ...)
5. Quyết định bạn ít confident nhất? Cần học gì thêm?

Câu trả lời tiết lộ strengths + gaps của bạn. Use it to plan further learning.

## Discussion với mentor (nếu có)

Show bài tập của bạn cho:

- Senior architect tại công ty.
- Mentor từ tech community.
- Bạn cùng nhóm học.

Hỏi:

- "Đâu là điểm tôi missing?"
- "Bạn would do differently cái nào?"
- "Quyết định nào bạn would push back?"

Feedback từ người có kinh nghiệm thực tế > self-study 10 giờ.

## Tóm tắt

- 5 bài tập từ easy (food delivery) đến hard (multi-region migration).
- Apply framework end-to-end.
- Discuss với mentor để identify gap.

## Tổng kết Cụm 8 và toàn khoá

Hết Cụm 8. Hết khoá.

Tóm tắt journey:

- **Cụm 1**: framework tư duy.
- **Cụm 2**: foundation principles (SOLID, cohesion-coupling).
- **Cụm 3**: tư duy architect (vs designer).
- **Cụm 4**: cái cần tối ưu (QA).
- **Cụm 5-6**: 9 styles để chọn.
- **Cụm 7**: cách document.
- **Cụm 8**: áp end-to-end vào case thực.

Bạn đã có toolkit đầy đủ. Bước tiếp theo là *practice* trên dự án thật của bạn. Architecture là kỹ năng *applied*: chỉ đọc không đủ.

Suggested next steps:

1. Đọc lại [Course Summary](../resources/course-summary.md) để consolidate.
2. Apply framework vào 1 dự án thật bạn đang làm.
3. Đọc thêm: *Fundamentals of Software Architecture* (Mark Richards), *Software Architecture in Practice* (Bass-Clements-Kazman).
4. Practice qua [exam checklist](../resources/exam-checklist.md) nếu chuẩn bị phỏng vấn.

Chúc bạn trở thành software architect xuất sắc.
