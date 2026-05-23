---
id: 03-component-connector-views
title: 7.3 Component-and-Connector Views
sidebar_position: 3
description: View về runtime structure. Component instances, connectors, data flow. Subtypes - process, concurrency, communication, deployment. Sequence diagrams cho dynamic behavior.
---

# 7.3 Component-and-Connector Views

> **Tóm tắt một dòng**: C&C View show *runtime* structure - khi hệ chạy, component instances nào tồn tại, communicate với connector nào, data flow ra sao. Khác Module View ở chỗ Module = static, C&C = dynamic.

## Nếu bạn đến từ Data Science

C&C View rất hữu ích để vẽ online inference. Một request đi từ client vào API, API gọi feature store, load model runtime, trả prediction, ghi prediction log, đẩy metric sang monitoring. Sequence này chính là nơi latency, failure và observability xuất hiện.

Nếu chỉ nhìn code training, bạn sẽ bỏ lỡ runtime behavior. C&C View giúp bạn thấy model không chạy một mình. Nó nằm trong chuỗi connector: HTTP, database query, cache lookup, message queue, logging pipeline.

## Module vs C&C

| Aspect | Module View | C&C View |
|---|---|---|
| Element | Module (class, package) | Component instance, connector |
| Relation | Depend, contain, inherit | Communicate at runtime |
| Time | Static (code) | Dynamic (runtime) |
| Example | Order package depends Payment package | OrderService instance calls PaymentService via HTTP |
| Tool | C4 Component diagram, UML class | Sequence diagram, runtime topology |

Cùng hệ có thể có Module và C&C view *khác nhau*. Vd:

- Module: 1 `payment` module exist.
- C&C: 3 instance PaymentService chạy parallel (replicated for HA).

## Subtypes của C&C

### Subtype 1: Process View

Show processes/threads chạy ở runtime + sync/communication.

```mermaid
sequenceDiagram
    User->>WebApp: HTTP request
    WebApp->>OrderService: gRPC call
    OrderService->>Database: SQL query
    Database-->>OrderService: result
    OrderService->>EventBus: publish OrderCreated
    OrderService-->>WebApp: response
    WebApp-->>User: HTTP response
    EventBus->>EmailService: deliver event (async)
    EmailService->>SMTP: send email
```

Purpose: hiểu request flow, latency contributors.

### Subtype 2: Concurrency View

Show concurrent execution + synchronization.

Vd:

```mermaid
graph TD
    M[Main Thread]
    W1[Worker 1<br/>Order Processing]
    W2[Worker 2<br/>Email Sending]
    W3[Worker 3<br/>Cache Warming]
    Q[Job Queue]
    
    M --> Q
    Q --> W1
    Q --> W2
    Q --> W3
```

Purpose: identify race condition, deadlock risk, sync points.

### Subtype 3: Communication View

Show topology của component instances + communication links.

```mermaid
graph LR
    LB[Load Balancer]
    LB --> WA1[Web App 1]
    LB --> WA2[Web App 2]
    LB --> WA3[Web App 3]
    WA1 --> API[API Service]
    WA2 --> API
    WA3 --> API
    API --> CACHE[Redis Cluster]
    API --> DB[(DB Primary)]
    DB --> REP[(DB Replica)]
```

Purpose: visualize HA, scalability, single points of failure.

### Subtype 4: Deployment-time

Same as Allocation View (Bài 7.4). Where component instances run physically.

## Khi nào dùng C&C View

- **Debug performance**: trace request flow.
- **Identify bottleneck**: where data flows slow.
- **Design HA**: show replication, failover paths.
- **Onboard SRE**: where data flows through stack.
- **Capacity planning**: scale point identification.

## Diagram types

### Sequence Diagram (UML)

Time vs participant. Show message exchange.

Pros: rất intuitive cho dynamic behavior.

Cons: only 1 scenario per diagram. Many scenarios = many diagrams.

Tools: Mermaid, PlantUML, draw.io.

### Activity Diagram (UML)

Flow chart cho process. Decision, loop, parallel.

Pros: tốt cho business workflow.

Cons: less precise for technical detail.

### Communication Diagram (UML)

Component + numbered messages.

Pros: emphasize structure.

Cons: less popular than sequence.

### Runtime Topology Diagram

Boxes + connectors, custom notation.

Pros: flexible.

Cons: không standard, learning curve cho reader.

C4 Container diagram cũng là dạng C&C View ở mức container.

## Connector types

Connector = mechanism component giao tiếp:

- **Method call** (in-process).
- **HTTP/REST**: sync, request/response.
- **gRPC**: sync, binary protocol.
- **Message queue**: async (Kafka, RabbitMQ).
- **Event bus**: async pub/sub (EDA).
- **Database call**: query.
- **File system**: read/write file.
- **Shared memory**: in-process or IPC.

C&C diagram nên *label* connector với type:

```
[OrderService] --HTTP--> [PaymentService]
[OrderService] --Kafka--> [EmailService]
[WebApp] --gRPC--> [API]
```

Label giúp reader hiểu communication semantics (sync vs async, latency tier).

## Documenting common runtime patterns

### Pattern 1: Request flow

Trace 1 user request qua stack:

```mermaid
sequenceDiagram
    autonumber
    User->>CDN: GET /product/123
    CDN->>WebApp: cache miss, forward
    WebApp->>API: GET /products/123
    API->>Cache: get product:123
    Cache-->>API: cache miss
    API->>DB: SELECT * FROM products WHERE id=123
    DB-->>API: row
    API->>Cache: set product:123 (TTL 5m)
    API-->>WebApp: JSON
    WebApp-->>CDN: HTML
    CDN-->>User: HTML (cached now)
```

Use case: explain to new dev, debug latency issue.

### Pattern 2: Failover

```mermaid
sequenceDiagram
    Client->>LB: request
    LB->>Primary: forward
    Primary--xPrimary: crashes
    LB->>Health: detect down
    LB->>Replica: route to replica
    Replica-->>LB: response
    LB-->>Client: response
```

Use case: explain HA strategy to architect review.

### Pattern 3: Saga (distributed transaction)

Đã show ở Bài 6.4.

### Pattern 4: Async event flow

```mermaid
sequenceDiagram
    Client->>OrderSvc: POST /orders
    OrderSvc->>DB: INSERT order
    OrderSvc->>EventBus: publish OrderCreated
    OrderSvc-->>Client: 201 Created
    EventBus->>InventorySvc: OrderCreated
    InventorySvc->>DB: reserve stock
    EventBus->>EmailSvc: OrderCreated
    EmailSvc->>SMTP: send confirmation
    EventBus->>AnalyticsSvc: OrderCreated
    AnalyticsSvc->>BigQuery: log
```

Use case: explain decoupling of producer from consumers.

## Sai lầm thường gặp

### Sai lầm 1: Vẽ mọi sequence

100 sequence diagrams cho 100 endpoints. Maintain nightmare.

Fix: chỉ vẽ top 5-10 critical/complex flows. Đơn giản flows = doc trong API spec.

### Sai lầm 2: Quên label connector

"A → B" không biết HTTP hay async event. Reader misunderstand.

Fix: always label arrow type.

### Sai lầm 3: Mixed level of abstraction

Một diagram show high-level (services) lẫn low-level (function call). Confusing.

Fix: each diagram one level. C4 model là nguyên tắc tốt.

### Sai lầm 4: No legend

Diagram phức tạp với colors/shapes mà không có legend. Reader guess meaning.

Fix: legend mọi non-standard notation.

### Sai lầm 5: Outdated runtime

Code thay đổi, diagram không update. Worse than no diagram.

Fix: include diagram update in PR template for major changes.

## Tóm tắt

- **C&C View**: runtime structure (vs Module = static).
- **4 subtypes**: Process, Concurrency, Communication, Deployment.
- **Diagram types**: sequence (most popular), communication, runtime topology.
- **Always label connectors** với type (HTTP/Kafka/gRPC/...).
- **Tránh**: vẽ mọi sequence, mixed abstraction, outdated.

Bài tiếp: [Allocation Views](04-allocation-views.md), physical deployment.
