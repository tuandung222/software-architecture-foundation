---
id: glossary
title: Thuật ngữ
sidebar_position: 2
description: Bảng tra cứu alphabet các thuật ngữ chính trong khoá Software Architecture Foundation, Tiếng Việt - Tiếng Anh, kèm link tới bài chi tiết.
---

# Thuật ngữ

> Bảng tra cứu nhanh các thuật ngữ chính. Cột "Bài" link tới phần chi tiết.

## A

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **ACID** | Atomicity-Consistency-Isolation-Durability, properties của database transaction | [6.3](../06-distributed-styles/03-microservices) |
| **ADP** (Acyclic Dependencies Principle) | Không cho phép cycle trong dependency của components | [4.4](../04-quality-attributes/04-component-based-thinking) |
| **ADR** (Architecture Decision Record) | Tài liệu 1-page ghi quyết định kiến trúc + lý do | [7.2](../07-documenting/02-module-views) |
| **API Gateway** | Single entry point routing đến nhiều backend services | [6.2](../06-distributed-styles/02-service-based) |
| **Architecture Characteristic** | Synonym với NFR/Quality Attribute (Mark Richards term) | [4.2](../04-quality-attributes/02-functional-vs-nfr) |
| **Architecture Style** | Shape tổng thể của hệ (vd: monolith, microservices) | [5.1](../05-fundamental-styles/01-overview) |
| **Architecture Pattern** | Solution cụ thể cho bài toán con (vd: Saga, CQRS) | [5.1](../05-fundamental-styles/01-overview) |
| **ATAM** (Architecture Trade-off Analysis Method) | Formal method từ SEI để analyze trade-off architecture | [3.3](../03-architectural-thinking/03-tradeoffs-analysis) |
| **Availability** | QA về uptime, % thời gian hệ available | [4.3](../04-quality-attributes/03-identifying-characteristics) |

## B

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **BBoM** (Big Ball of Mud) | Anti-pattern: codebase không structure | [3.4](../03-architectural-thinking/04-modularity) |
| **BFF** (Backend For Frontend) | API riêng cho mỗi loại client (web, mobile, admin) | [2.6](../02-design-principles/06-isp) |
| **Bounded Context** | Phạm vi mà một domain model có nghĩa nhất quán (DDD) | [3.4](../03-architectural-thinking/04-modularity) |
| **Broker** (topology) | Pub/sub topology không có central mediator | [6.4](../06-distributed-styles/04-event-driven) |
| **Bus Factor** | Số người trong team rời đi để hệ không ai biết | [7.1](../07-documenting/01-overview) |

## C

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **C4 Model** | Diagram framework 4 mức (Context-Container-Component-Code) | [7.2](../07-documenting/02-module-views) |
| **CAP Theorem** | Distributed system chỉ chọn 2 trong 3: Consistency, Availability, Partition tolerance | [6.4](../06-distributed-styles/04-event-driven) |
| **CCP** (Common Closure Principle) | Classes thay đổi cùng nhau ở cùng component | [4.4](../04-quality-attributes/04-component-based-thinking) |
| **Choreography** | Saga pattern: services react to events, no central orchestrator | [6.4](../06-distributed-styles/04-event-driven) |
| **Circuit Breaker** | Pattern: stop calling failed service for N seconds | [6.2](../06-distributed-styles/02-service-based) |
| **Closed Layer** | Layer mà request phải đi qua, không skip | [5.3](../05-fundamental-styles/03-layered-architecture) |
| **Cohesion** | Mức độ phần tử trong module tập trung 1 mục đích | [2.2](../02-design-principles/02-cohesion-and-coupling) |
| **Component** | Independently deployable unit, lớn hơn class | [4.4](../04-quality-attributes/04-component-based-thinking) |
| **Conway's Law** | Architecture follows org chart | [7.4](../07-documenting/04-allocation-views) |
| **Coupling** | Mức độ ràng buộc giữa các module | [2.2](../02-design-principles/02-cohesion-and-coupling) |
| **CQRS** (Command Query Responsibility Segregation) | Tách read API khỏi write API | [2.6](../02-design-principles/06-isp), [6.4](../06-distributed-styles/04-event-driven) |
| **CRP** (Common Reuse Principle) | Don't force client depend things they don't use (component-level ISP) | [4.4](../04-quality-attributes/04-component-based-thinking) |

## D

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **DDD** (Domain-Driven Design) | Methodology mô hình hoá complex domain | [3.4](../03-architectural-thinking/04-modularity) |
| **Death Star** | Anti-pattern: hub central depend bởi mọi service | [3.4](../03-architectural-thinking/04-modularity) |
| **Decomposition View** | Module view subtype: hierarchy module nested | [7.2](../07-documenting/02-module-views) |
| **Dependency Injection** (DI) | Technique cung cấp dependency từ ngoài | [2.7](../02-design-principles/07-dip) |
| **Deployment View** | Allocation view subtype: software → hardware | [7.4](../07-documenting/04-allocation-views) |
| **DIP** (Dependency Inversion Principle) | High + low depend abstraction | [2.7](../02-design-principles/07-dip) |
| **Distributed Monolith** | Anti-pattern: tách microservices nhưng coupling chặt | [3.4](../03-architectural-thinking/04-modularity) |

## E

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **EDA** (Event-Driven Architecture) | Style giao tiếp qua async event | [6.4](../06-distributed-styles/04-event-driven) |
| **Event Sourcing** | Lưu event log thay vì current state | [6.4](../06-distributed-styles/04-event-driven) |
| **Eventual Consistency** | Data sẽ consistent eventually (not immediately) | [6.4](../06-distributed-styles/04-event-driven) |

## F

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **Fallacies of Distributed Computing** | 8 sai lầm phổ biến về distributed (Deutsch+Gosling) | [5.2](../05-fundamental-styles/02-monolithic-vs-distributed) |
| **FR** (Functional Requirement) | Hệ phải làm gì | [4.2](../04-quality-attributes/02-functional-vs-nfr) |

## H

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **HA** (High Availability) | Hệ vẫn chạy khi 1 component fail | [6.2](../06-distributed-styles/02-service-based) |
| **Hexagonal Architecture** | Synonym Ports-and-Adapters; DIP scaled up | [2.7](../02-design-principles/07-dip) |
| **Horizontal Slicing** | Chia hệ theo layer (UI/Business/Data) | [3.4](../03-architectural-thinking/04-modularity) |

## I

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **Idempotency** | Operation gọi nhiều lần cho cùng result | [6.4](../06-distributed-styles/04-event-driven) |
| **ISP** (Interface Segregation Principle) | Client không depend method không dùng | [2.6](../02-design-principles/06-isp) |

## L

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **Layered Architecture** | Style tầng UI/Business/Persistence | [5.3](../05-fundamental-styles/03-layered-architecture) |
| **Levels of Knowledge** | 3 mức: know / know don't know / don't know don't know | [3.2](../03-architectural-thinking/02-architecture-vs-design) |
| **LSP** (Liskov Substitution Principle) | Subtype substitutable cho supertype | [2.5](../02-design-principles/05-lsp) |

## M

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **Mediator** (topology) | Saga pattern: central orchestrator | [6.4](../06-distributed-styles/04-event-driven) |
| **Microkernel** | Style core + plug-ins | [5.5](../05-fundamental-styles/05-microkernel-architecture) |
| **Microservices** | Style 20+ fine-grained services, DB per service | [6.3](../06-distributed-styles/03-microservices) |
| **Modular Monolith** | Monolith với strict module boundaries | [5.2](../05-fundamental-styles/02-monolithic-vs-distributed) |
| **Module** | Code organization unit (package, namespace, library) | [2.2](../02-design-principles/02-cohesion-and-coupling) |
| **Module View** | View về static code structure | [7.2](../07-documenting/02-module-views) |
| **Monolithic** | Style toàn hệ trong 1 process | [5.2](../05-fundamental-styles/02-monolithic-vs-distributed) |

## N

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **NFR** (Non-Functional Requirement) | Constraint trên cách hệ làm việc | [4.2](../04-quality-attributes/02-functional-vs-nfr) |

## O

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **OCP** (Open-Closed Principle) | Open extension, closed modification | [2.4](../02-design-principles/04-ocp) |
| **Open Layer** | Layer mà tầng trên có thể skip | [5.3](../05-fundamental-styles/03-layered-architecture) |
| **Orchestration** | Saga: central điều phối flow | [6.4](../06-distributed-styles/04-event-driven) |

## P

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **Pipeline Architecture** | Style filter + pipe sequential | [5.4](../05-fundamental-styles/04-pipeline-architecture) |
| **Plugin** | Module extend capability của core | [5.5](../05-fundamental-styles/05-microkernel-architecture) |
| **Postcondition** | Condition đảm bảo sau khi method chạy | [2.5](../02-design-principles/05-lsp) |
| **Precondition** | Condition caller đảm bảo trước khi gọi method | [2.5](../02-design-principles/05-lsp) |

## Q

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **QA** (Quality Attribute) | Synonym Architecture Characteristic / NFR | [4.1](../04-quality-attributes/01-overview) |
| **QAW** (Quality Attribute Workshop) | Workshop format để extract QA priority | [4.3](../04-quality-attributes/03-identifying-characteristics) |

## R

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **REP** (Reuse/Release Equivalence Principle) | Granule of reuse = granule of release | [4.4](../04-quality-attributes/04-component-based-thinking) |

## S

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **Saga** | Pattern: distributed transaction via compensation | [6.3](../06-distributed-styles/03-microservices), [6.4](../06-distributed-styles/04-event-driven) |
| **SAP** (Stable Abstractions Principle) | Stable component nên abstract | [4.4](../04-quality-attributes/04-component-based-thinking) |
| **SBA** (Space-Based Architecture) | Style in-memory grid + async DB | [6.5](../06-distributed-styles/05-space-based) |
| **SDP** (Stable Dependencies Principle) | Depend toward stable components | [4.4](../04-quality-attributes/04-component-based-thinking) |
| **Service-based Architecture** | Style 4-12 coarse services | [6.2](../06-distributed-styles/02-service-based) |
| **Sinkhole** | Anti-pattern: layers pass-through không add value | [5.3](../05-fundamental-styles/03-layered-architecture) |
| **SOLID** | 5 design principles | [2](../02-design-principles/01-overview) |
| **SRP** (Single Responsibility Principle) | Module 1 actor | [2.3](../02-design-principles/03-srp) |
| **Strangler Fig** | Pattern migrate monolith sang microservices gradually | [5.2](../05-fundamental-styles/02-monolithic-vs-distributed) |

## T

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **Two-Pizza Team** | Team đủ nhỏ để 2 pizza ăn no (6-8 người) | [3.4](../03-architectural-thinking/04-modularity) |

## V

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **Vertical Slicing** | Chia hệ theo domain/feature | [3.4](../03-architectural-thinking/04-modularity) |

## Y

| Thuật ngữ | Định nghĩa ngắn | Bài |
|---|---|---|
| **YAGNI** (You Aren't Gonna Need It) | Don't build feature/abstraction until needed | [2.4](../02-design-principles/04-ocp) |

## Data/ML Architecture terms

### Batch inference

Cách chạy model theo lô, thường theo lịch định kỳ như mỗi giờ hoặc mỗi ngày. Batch inference đơn giản, rẻ, dễ audit, nhưng prediction có thể stale. Xem thêm [Pipeline Architecture](../05-fundamental-styles/04-pipeline-architecture.md) và [Quality Attributes](../04-quality-attributes/01-overview.md).

### Data drift

Hiện tượng phân phối dữ liệu production thay đổi so với dữ liệu training. Data drift ảnh hưởng reliability và model quality, thường cần monitoring riêng.

### Data lineage

Khả năng truy vết dữ liệu đi từ nguồn nào, qua job nào, transform nào, version nào, rồi tới output nào. Lineage liên quan chặt tới auditability và reproducibility.

### Feature freshness

Độ mới của feature so với sự kiện thật ngoài đời. Fraud detection có thể cần freshness vài giây, churn prediction có thể chỉ cần freshness một ngày.

### Feature store

Component quản lý feature definition, offline feature cho training và online feature cho serving. Feature store giúp giảm training-serving skew và tăng reuse giữa các team.

### MLOps

Tập hợp practices để đưa ML vào production: versioning, CI/CD cho model, model registry, monitoring, drift detection, rollback, governance. Trong khoá này, MLOps được nhìn qua lăng kính Software Architecture.

### Model registry

Nơi lưu model artifact, version, metadata, metric, feature schema và trạng thái lifecycle. Registry hỗ trợ deploy, rollback, audit và reproducibility.

### Model serving

Phần hệ thống đưa model ra phục vụ prediction cho batch job, API hoặc stream. Model serving chịu ảnh hưởng mạnh bởi latency, throughput, availability và cost.

### Online inference

Cách gọi model theo request realtime hoặc near-realtime. Online inference có freshness tốt nhưng đòi hỏi API, autoscaling, monitoring và rollback chặt chẽ.

### Training-serving skew

Lỗi xảy ra khi logic feature trong training khác logic feature trong serving. Đây là một dạng coupling nguy hiểm giữa pipeline training và runtime serving.

