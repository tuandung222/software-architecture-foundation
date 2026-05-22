---
id: 01-overview
title: 3.1 Tổng quan Cụm 3
sidebar_position: 1
description: Cụm 3 mở rộng tư duy từ code-level (Cụm 2) lên system-level. Học cách phân biệt architecture decisions với design decisions, phân tích trade-off đa chiều, và áp modularity ở quy mô lớn hơn.
---

# 3.1 Tổng quan Cụm 3: Architectural Thinking

> **Tóm tắt một dòng**: Cụm 2 dạy bạn viết code tốt ở mức class/module. Cụm 3 dạy bạn *suy nghĩ như architect* — phân biệt cái gì là architectural, cân nhắc trade-off có hệ thống, và scale principles modularity từ module lên hệ thống.

## Vì sao có cụm này

Bạn vừa hoàn thành Cụm 2 — master SOLID. Có thể bạn nghĩ "vậy là biết kiến trúc rồi". Sai. SOLID là *necessary* (cần) nhưng không *sufficient* (đủ) cho kiến trúc tốt. Một codebase có thể tuân thủ 100% SOLID nhưng vẫn vỡ ở mức kiến trúc vì:

1. **Chọn sai quy mô**. Microservices cho startup 5 người (over-engineer) hoặc monolith cho hệ enterprise 200 engineers (bottleneck).
2. **Không cân nhắc trade-off**. Tối ưu performance hy sinh maintainability mà không nhận ra.
3. **Boundary sai giữa các module/service**. Cohesion thấp ở mức hệ thống dù mỗi module nội bộ có cohesion cao.
4. **Document không có**. Kiến trúc tồn tại trong đầu 1 người, evolve không kiểm soát.

Cụm 3 fix tư duy về 3 vấn đề đầu (vấn đề 4 thuộc Cụm 7).

## Cụm 3 sẽ dạy gì

Bốn bài:

### Bài 3.2: Architecture vs Design

Phân biệt quyết định nào là architectural (đắt khi sửa, ảnh hưởng QA), quyết định nào là design thuần (dễ sửa, scope module). Đưa framework 3 tiêu chí từ Bài 1.2 vào thực hành: làm bài tập nhận diện trên cases thật. Quan trọng: trình bày "Levels of Knowledge" — phân loại kiến thức của technologist thành 3 mức (stuff you know, stuff you know you don't know, stuff you don't know you don't know), giải thích vì sao architect cần đầu tư vào mức thứ hai.

### Bài 3.3: Trade-off Analysis

Mọi quyết định kiến trúc đều có trade-off. Không có "best architecture", chỉ có "best for current context". Bài này dạy:

- Framework ATAM-lite để liệt kê trade-off một cách có hệ thống.
- Sai lầm phổ biến: chỉ đánh giá theo 1 chiều (vd: chỉ tối ưu performance, bỏ qua maintainability).
- Cách present trade-off cho stakeholder không-kỹ-thuật (PM, business).
- "Architecture is the stuff you can't Google" — quote nổi tiếng giải thích vì sao trade-off là essence của SA.

### Bài 3.4: Modularity

Scale cohesion-coupling từ class (Cụm 2.2) lên module/sub-system/service. Bài này đi qua:

- Tiêu chí nhận diện module boundary đúng (bounded context từ DDD ở mức đơn giản).
- Sai lầm: "horizontal slicing" (chia theo layer: UI/Service/Repo) vs "vertical slicing" (chia theo feature/domain) — và vì sao vertical thường tốt hơn ở mức kiến trúc.
- Pattern thường gặp: deathstar antipattern, big ball of mud, distributed monolith.
- Áp dụng cho monolith (chia thành modules), cho microservices (chia thành services), cho mobile (chia thành features).

## Thứ tự đọc

Đề nghị đọc tuần tự 3.2 → 3.3 → 3.4 vì:

- 3.3 (trade-off) dùng concept "architectural decision" từ 3.2.
- 3.4 (modularity) áp dụng cả 3.2 và 3.3 vào việc chia module.

Mỗi bài 3000-4500 chữ, đọc 1.5-2h.

## Kết nối với cụm sau

- **Cụm 4 (Quality Attributes)** bổ sung *cái cần tối ưu* cho trade-off analysis ở 3.3.
- **Cụm 5-6 (Architecture Styles)** áp khái niệm modularity ở 3.4 vào các style cụ thể (mỗi style là một cách chia module).
- **Cụm 7 (Documenting)** tài liệu hoá kết quả của 3.2-3.3 thông qua ADR.
- **Cụm 8 (Case Studies)** áp toàn bộ tư duy cụm 3 vào dự án thực.

## Mindset shift sau Cụm 3

Sau khi đọc xong cụm này, bạn sẽ:

1. Đọc một PR/design proposal và phân biệt được câu hỏi nào là kiến trúc (đáng cân nhắc kỹ) và câu hỏi nào là implementation detail (để dev tự quyết).
2. Khi gặp xung đột về design giữa 2 team, không vội "chọn 1 bên" mà liệt kê trade-off để team chọn theo priority business.
3. Khi vẽ system diagram, biết cách chia module theo domain (vertical) thay vì layer (horizontal).

Vào [Bài 3.2: Architecture vs Design](02-architecture-vs-design.md) để bắt đầu.
