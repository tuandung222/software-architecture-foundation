---
id: 01-overview
title: 9.1 Tổng quan Seminar Advanced Topics
sidebar_position: 1
description: "Tổng quan bộ seminar nâng cao về Software Architecture for IoT, Web3, MLOps và Digital Twin. Mỗi seminar là một case study domain-specific nối từ nền tảng kiến trúc sang hệ thống hiện đại."
---

# 9.1 Tổng quan Seminar - Advanced Topics

> **Tóm tắt một dòng**: Cụm 9 không dạy thêm một style mới. Cụm này dạy cách dùng toàn bộ nền tảng từ Cụm 1-8 để phân tích bốn domain khó: IoT, Web3, MLOps và Digital Twin.

## Vì sao cần cụm seminar?

Sau khi học xong 8 cụm nền tảng, bạn đã có vocabulary để nói về:

- Architectural decisions.
- Quality Attributes.
- Trade-off.
- Component boundary.
- Architecture styles.
- Documentation views.
- ADR.

Nhưng khi bước vào hệ thống hiện đại, câu hỏi hiếm khi xuất hiện dưới dạng sạch như "nên dùng layered hay microservices?". Câu hỏi thực tế thường là:

- Hệ IoT có hàng trăm nghìn thiết bị offline liên tục thì kiến trúc ra sao?
- Hệ Web3 có smart contract immutable thì rollback như thế nào?
- Nền tảng MLOps có training, serving, monitoring, governance thì boundary đặt ở đâu?
- Digital Twin cần đồng bộ physical world và virtual model thì latency, consistency, simulation xử lý thế nào?

Bốn seminar này giúp bạn luyện kỹ năng **chuyển từ domain constraint sang architecture decision**.

## Bốn chủ đề

| Bài | Chủ đề | Trọng tâm kiến trúc |
|---|---|---|
| 9.2 | Software Architecture for IoT | Edge-cloud split, device fleet, unreliable network, telemetry pipeline |
| 9.3 | Software Architecture for Web3 | Smart contracts, off-chain services, indexer, wallet, finality, governance |
| 9.4 | Software Architecture for MLOps | ML platform, pipeline orchestration, feature store, model registry, serving, monitoring |
| 9.5 | Software Architecture for Digital Twin | Real-time mirror, simulation, event streaming, time-series data, command loop |

## Cách đọc cụm này

### Nếu bạn muốn học nhanh

Đọc theo thứ tự:

1. [9.2 IoT](02-software-architecture-for-iot.md), vì nó nối trực tiếp với event-driven, pipeline và edge deployment.
2. [9.4 MLOps](04-software-architecture-for-mlops.md), nếu bạn đến từ Data Science hoặc data platform.
3. [9.5 Digital Twin](05-software-architecture-for-digital-twin.md), vì nó kết hợp IoT, streaming, simulation và visualization.
4. [9.3 Web3](03-software-architecture-for-web3.md), vì nó có constraint đặc biệt nhất: immutability và trust boundary.

### Nếu bạn là Data Scientist

Ưu tiên 9.4 trước, sau đó đọc 9.5. MLOps cho bạn thấy vòng đời model từ training tới serving và monitoring. Digital Twin cho bạn thấy ML model được đặt trong một hệ cyber-physical system lớn hơn, nơi prediction có thể tác động ngược lại physical world.

### Nếu bạn là backend/platform engineer

Ưu tiên 9.2 và 9.3. IoT giúp bạn luyện edge-cloud partitioning, backpressure, device identity và telemetry ingestion. Web3 giúp bạn hiểu cách thiết kế hệ thống khi một phần business logic nằm trong smart contract không dễ thay đổi.

## Framework chung cho bốn seminar

Mỗi bài đi qua cùng một khung:

1. Domain context.
2. Functional requirements.
3. Quality Attributes.
4. Style mix.
5. High-level architecture.
6. Critical runtime flows.
7. Data and state strategy.
8. Security and governance.
9. Failure modes.
10. ADR examples.
11. Self-check.

Khung này cố tình giống Cụm 8. Điểm khác là domain phức tạp hơn và trade-off sắc hơn.

## Mapping từ nền tảng sang seminar

| Nền tảng | Dùng trong seminar |
|---|---|
| Quality Attributes | Mỗi domain có QA driver khác nhau |
| Pipeline Architecture | Telemetry, ETL, training, simulation data flow |
| Event-Driven Architecture | IoT events, Web3 indexer, model monitoring, twin sync |
| Service-based Architecture | Platform core services và domain services |
| Microservices | Chỉ dùng khi domain/team/scale justify |
| Microkernel | Plugin analytics, model adapters, protocol adapters |
| C&C View | Runtime flow của event, command, prediction, transaction |
| Allocation View | Edge, cloud, blockchain, GPU cluster, simulator nodes |
| ADR | Ghi lại quyết định không hiển nhiên |

## Điều quan trọng nhất

Không có "kiến trúc IoT", "kiến trúc Web3", "kiến trúc MLOps" hay "kiến trúc Digital Twin" duy nhất. Mỗi domain chỉ làm nổi bật một tập constraint đặc biệt.

Kiến trúc tốt vẫn bắt đầu từ cùng một câu hỏi:

> Quality Attributes nào thật sự drive hệ này, và ta chấp nhận hy sinh gì để đạt chúng?

## Bài tiếp

Bắt đầu với [9.2 Software Architecture for IoT](02-software-architecture-for-iot.md).
