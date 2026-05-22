---
id: intro
title: Giới thiệu khoá học
sidebar_position: 0
description: Tổng quan toàn bộ khoá Software Architecture Foundation, đối tượng người đọc, cách dùng tài liệu và lộ trình đọc gợi ý.
---

# Software Architecture Foundation

Chào mừng bạn đến với khoá **Software Architecture Foundation**, một bộ tài liệu mở Tiếng Việt về Kiến trúc Phần mềm ở mức nền tảng sau đại học. Tài liệu này không cố gắng thay thế các sách kinh điển như *Clean Architecture* của Robert C. Martin hay *Software Architecture in Practice* của Bass-Clements-Kazman, mà đóng vai trò một người dẫn đường: giải thích trực giác trước khi đi vào định nghĩa hình thức, sắp xếp các khái niệm thành lộ trình dễ tiêu hoá, và minh hoạ bằng ví dụ thực tế đủ sát để bạn áp được vào dự án ngay.

## Vì sao có khoá này?

Software Architecture là một trong những lĩnh vực mà người mới rất dễ bị ngợp. Mở một quyển sách bất kỳ, bạn sẽ thấy hàng chục thuật ngữ: SOLID, ATAM, 4+1 views, hexagonal, layered, microservices, event-driven, CQRS, saga, BFF, sidecar, service mesh... Mỗi thuật ngữ lại dẫn tới một họ kỹ thuật con. Người học hay bị mất phương hướng: không rõ thuật ngữ nào dùng cho tình huống nào, đâu là cốt lõi đâu là biến thể, và quan trọng nhất, đâu là *cách suy nghĩ* của một software architect chứ không chỉ là *danh mục công cụ* mà họ dùng.

Khoá này được biên soạn để giải quyết đúng vấn đề đó. Toàn bộ nội dung được sắp xếp theo một mạch logic duy nhất:

1. **Bắt đầu bằng nguyên lý nhỏ** (Cụm 2: SOLID, Cohesion-Coupling) vì kiến trúc tốt luôn bắt đầu từ code tốt.
2. **Lùi lại để nhìn bức tranh lớn** (Cụm 3: Architectural Thinking) để hiểu vì sao kiến trúc khác thiết kế.
3. **Hiểu cái cần tối ưu** (Cụm 4: Quality Attributes) trước khi chọn cách tối ưu.
4. **Học các công cụ chuẩn** (Cụm 5-6: Architecture Styles) — từ đơn giản tới phức tạp.
5. **Biết cách truyền đạt** (Cụm 7: Documenting) — kiến trúc không tài liệu hoá là kiến trúc chết.
6. **Áp toàn bộ vào case thực** (Cụm 8: Case Studies) để xem khi nào dùng cái gì.

## Đối tượng người đọc

Khoá này được viết với giả định bạn đã có:

- Tối thiểu 1-2 năm viết code production (bất kỳ ngôn ngữ nào, thuận lợi nhất là Java/C#/Python/TypeScript).
- Hiểu cơ bản về OOP (class, interface, inheritance), HTTP/REST, database SQL/NoSQL.
- Đã từng làm việc trong team từ 3 người trở lên (vì đó là lúc kiến trúc bắt đầu quan trọng).

Nếu bạn còn thiếu một trong các yếu tố trên, các bài đầu vẫn đọc được nhưng phần code minh hoạ có thể hơi khó. Đừng vội bỏ — hãy quay lại sau khi đã có kinh nghiệm.

Đối tượng phù hợp nhất:

- **Học viên cao học** ngành Khoa học Máy tính / Kỹ thuật Phần mềm cần một tài liệu Tiếng Việt mạch lạc để ôn cho môn Kiến trúc Phần mềm.
- **Lập trình viên 2-5 năm kinh nghiệm** đang chuẩn bị bước lên vai trò Tech Lead, Senior Engineer, hoặc Architect.
- **Người tự học** muốn lấp khoảng trống giữa "biết viết code" và "biết thiết kế hệ thống".

## Cấu trúc tài liệu

Khoá gồm **tám cụm bài giảng** + **một bài tóm tắt toàn khoá** + **các tài nguyên tra cứu** (glossary, cross-reference, PDF index, exam checklist).

| Cụm | Tên | Số bài | Trọng tâm |
|---|---|---|---|
| 1 | Giới thiệu Software Architecture | 4 | SA là gì, vì sao học, lộ trình |
| 2 | Design Principles (SOLID) | 7 | Cohesion/coupling + 5 nguyên lý SOLID |
| 3 | Architectural Thinking | 4 | Architecture vs Design, trade-off, modularity |
| 4 | Quality Attributes | 4 | NFR, architecture characteristics, ATAM, component-based |
| 5 | Fundamental Styles | 5 | Layered, Pipeline, Microkernel, Monolithic vs Distributed |
| 6 | Distributed Styles | 5 | Service-based, Microservices, Event-Driven, Space-Based |
| 7 | Documenting Architecture | 4 | Module/C&C/Allocation views, ADR |
| 8 | Case Studies | 4 | UAMS, Smart City, bài tập tổng hợp |

Mỗi cụm bắt đầu bằng một bài **01-overview.md** giải thích tổng quan cụm: cụm này dạy gì, vì sao cần, kết nối ra sao với các cụm khác.

## Cách đọc tài liệu

Có ba kiểu người đọc, mỗi kiểu nên đi một đường khác nhau:

### Người đọc lần đầu (chuyên sâu)

Đọc theo thứ tự tự nhiên: Cụm 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8. Mỗi cụm khoảng 2-4 giờ đọc kỹ. Tổng cộng khoảng 30-40 giờ đọc + 10-20 giờ làm bài tập. Sau Cụm 4 bạn đã có nền tảng đủ vững để hiểu Cụm 5-6. Sau Cụm 6 bạn đủ trình để vẽ kiến trúc cho hệ thống cỡ trung. Sau Cụm 7-8 bạn có thể tự tin trình bày kiến trúc cho team.

### Người ôn thi (nhanh)

Vào thẳng [Tóm tắt toàn khoá](resources/course-summary.md), đọc trong 1-2 giờ. Sau đó đọc [Exam Checklist](resources/exam-checklist.md) để biết các chủ đề thường được hỏi. Cuối cùng quay lại từng bài cụ thể nếu cần đào sâu.

### Người tham chiếu nhanh (đã làm SA)

Vào thẳng cụm hoặc bài cần xem. Mỗi bài tự đứng độc lập (có nhắc lại nền tảng cần thiết) nên bạn không cần đọc tuần tự. [Glossary](resources/glossary.md) liệt kê alphabet các thuật ngữ với link tới bài chi tiết.

## Triết lý biên soạn

Bốn nguyên tắc xuyên suốt:

1. **Trực giác trước hình thức**. Mỗi khái niệm mới đều bắt đầu bằng một câu hỏi đời thường hoặc ví dụ ngắn, rồi mới định nghĩa chặt. Đọc bạn sẽ thấy nhịp điệu kiểu "Hãy tưởng tượng bạn đang xây..." trước khi gặp định nghĩa SOLID hay event sourcing.
2. **Ví dụ chạy được, không phải pseudo-code**. Code minh hoạ dùng Python, TypeScript, Java thật — không lý thuyết suông kiểu "giả sử class A...". Bạn có thể copy chạy thử.
3. **Trade-off luôn rõ ràng**. Không có "best practice" tuyệt đối. Mỗi style/pattern/principle đều có *khi nào nên dùng*, *khi nào không*, và *cái giá bạn phải trả*. Một software architect giỏi không thuộc nhiều pattern hơn — họ chọn đúng pattern hơn.
4. **Tài liệu hoá là first-class**. Cụm 7 nguyên một cụm dành cho documenting vì kiến trúc không truyền đạt được là kiến trúc chỉ tồn tại trong đầu một người, và sẽ chết khi người đó rời team.

## Quy ước hiển thị

- **Box xanh "Tóm tắt một dòng"**: ý cốt lõi của bài, đọc cái này nếu chỉ có 30 giây.
- **Box vàng "Sai lầm thường gặp"**: cảnh báo về cách hiểu sai phổ biến.
- **Code block**: ví dụ thực tế, đa số đã được kiểm tra cú pháp.
- **Mermaid diagram**: sơ đồ topology/flow, render được trực tiếp trên web.
- **"Khi nào dùng / khi nào không"**: bảng so sánh giúp quyết định nhanh.

## Bắt đầu từ đâu?

Nếu bạn đọc lần đầu, click ngay vào [Cụm 1: Tổng quan](01-introduction/01-overview.md) để bắt đầu. Nếu chưa chắc khoá này hợp với mình không, đọc thử [Bài 1.2: Software Architecture là gì?](01-introduction/02-what-is-software-architecture.md) để xem cách viết có khớp với gu của bạn không.

Nếu bạn đã biết Software Architecture và chỉ tra cứu, vào [Glossary](resources/glossary.md) hoặc [Course Summary](resources/course-summary.md) để xem index.

Chúc bạn đọc vui và học hiệu quả.
