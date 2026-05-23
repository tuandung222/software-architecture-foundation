---
id: 01-overview
title: 1.1 Tổng quan Cụm 1
sidebar_position: 1
description: Cụm 1 giới thiệu cách suy nghĩ về Software Architecture, vì sao nó là bước trưởng thành tiếp theo của một lập trình viên giỏi, và cách bố trí khoá học.
---

# 1.1 Tổng quan Cụm 1: Giới thiệu Software Architecture

> **Tóm tắt một dòng**: Software Architecture là tập hợp các quyết định khó-thay-đổi-nhất của một hệ phần mềm, và cụm này dạy bạn cách nhận ra những quyết định đó, đặt tên cho chúng, và bắt đầu cân nhắc chúng một cách có hệ thống.

## Vì sao Cụm 1 cần đứng trước

Có một sai lầm rất phổ biến khi học Software Architecture: nhảy ngay vào học microservices, event-driven, hay DDD vì nghe có vẻ "kiến trúc". Hậu quả là người học thuộc nhiều pattern nhưng không biết khi nào dùng, không biết vì sao pattern này lại sinh ra, và quan trọng nhất, không biết phân biệt vấn đề kiến trúc với vấn đề thiết kế thuần tuý. Cụm 1 sửa sai lầm này bằng cách bắt đầu từ câu hỏi cơ bản nhất: "Software Architecture rốt cuộc là gì?".

Sau khi đọc xong cụm này, bạn sẽ:

1. Phân biệt được Architecture với Design ở mức câu hỏi (Architecture trả lời "shape of system", Design trả lời "shape of code inside a module").
2. Hiểu vì sao những quyết định kiến trúc lại đắt khi sửa, và do đó vì sao chúng đáng để bỏ thời gian cân nhắc kỹ.
3. Có một lộ trình rõ ràng cho 7 cụm còn lại: cụm nào trả lời câu hỏi gì.
4. Biết cách dùng tài liệu này hiệu quả nhất theo nhu cầu (đọc lần đầu, ôn thi, hay tra cứu).

## Bốn bài trong cụm

Cụm 1 ngắn nhất khoá, chỉ có 4 bài, vì mục tiêu là "khởi động" chứ không phải "đi sâu". Đào sâu sẽ bắt đầu từ Cụm 2.

### Bài 1.2: Software Architecture là gì?

Bài này định nghĩa Software Architecture qua ba góc nhìn bổ sung cho nhau: định nghĩa hình thức (theo Bass-Clements-Kazman), định nghĩa thực dụng (theo Martin Fowler), và định nghĩa "operational" (cái gì bạn phải làm khi bạn là một architect). Đặc biệt nhấn mạnh điểm: architecture không phải là "cái diagram đẹp", mà là *tập hợp các quyết định khó sửa*.

### Bài 1.3: Mục tiêu và kết quả học tập

Bài này nói rõ khoá học định cho bạn cái gì khi kết thúc: bạn sẽ biết tên gọi và bản chất 9 architecture styles phổ biến nhất, có thể đọc một bộ documentation kiến trúc bất kỳ và nhận ra đó là kiểu view nào, và đặc biệt là biết cách lập luận trade-off khi chọn style cho dự án mới. Bài cũng giải thích vì sao khoá không dạy *tất cả* (CQRS, Event Sourcing, Saga, hexagonal... đều bị bỏ ra) và bạn nên học gì tiếp theo.

### Bài 1.4: Lộ trình đọc tài liệu

Bài này vẽ một sơ đồ phụ thuộc giữa các cụm, đề xuất 3 lộ trình khác nhau (chuyên sâu, ôn thi, tra cứu), và gợi ý thời gian ước lượng cho mỗi lộ trình. Đặc biệt có "shortcut paths" cho ai chỉ quan tâm tới một focus area cụ thể (vd: chỉ muốn học microservices, hoặc chỉ muốn ôn cho phỏng vấn).

## Cách đọc Cụm 1

Cụm 1 dài tổng cộng chỉ khoảng 6000-8000 chữ. Đọc nghiêm túc mất khoảng 1-1.5 giờ. Đây là cụm bạn nên đọc *tuần tự* và *không skip*, vì nó set lên framework tư duy cho toàn khoá. Đặc biệt Bài 1.2 là bài quan trọng nhất, nếu bạn chỉ đọc một bài trong cả khoá, hãy đọc bài đó.

Sau khi đọc xong Cụm 1, bạn nên thấy một sự "click": các thuật ngữ và khái niệm rời rạc bạn từng nghe sẽ bắt đầu có chỗ đứng trong một bản đồ chung. Nếu chưa thấy click, đừng vội đi tiếp, đọc lại Bài 1.2 và Bài 1.4 thêm một lần.

## Kết nối với các cụm sau

Cụm 1 không có nội dung kỹ thuật, nó chỉ làm nhiệm vụ "đặt khung". Toàn bộ kiến thức kỹ thuật bắt đầu từ Cụm 2:

- **Cụm 2 (SOLID)** trả lời câu hỏi: "Kiến trúc tốt bắt đầu từ đâu?", câu trả lời là "từ code tốt".
- **Cụm 3 (Architectural Thinking)** mở rộng từ code lên hệ thống: "Khi nào một quyết định trở thành kiến trúc?".
- **Cụm 4 (Quality Attributes)** trả lời: "Tối ưu cái gì?", vì bạn không thể tối ưu mọi thứ cùng lúc.
- **Cụm 5-6 (Architecture Styles)** dạy các "công cụ" chuẩn: 9 cách phổ biến để tổ chức một hệ thống.
- **Cụm 7 (Documenting)** dạy cách truyền đạt: kiến trúc không nói ra được là kiến trúc chết.
- **Cụm 8 (Case Studies)** áp dụng toàn bộ vào case thật.

## Sai lầm cần tránh ngay từ đầu

Trước khi sang Bài 1.2, hãy ghi nhớ ba sai lầm phổ biến nhất khi tiếp cận Software Architecture:

1. **Coi architecture là "high-level design"**. Sai. Architecture không phải là design ở zoom level lớn hơn. Architecture là *một loại* quyết định khác, đặc trưng bởi tính khó-thay-đổi và ảnh hưởng tới quality attributes của toàn hệ. Bài 1.2 và Cụm 3 sẽ làm rõ điểm này.
2. **Coi architecture là "việc của architect"**. Sai. Trong một team trưởng thành, mọi engineer đều cần hiểu kiến trúc của hệ mình làm, chỉ là họ không tự quyết những thứ ở mức kiến trúc thôi. Bài 1.3 sẽ nói rõ.
3. **Coi architecture là cuộc đua đến microservices**. Sai cực kỳ phổ biến trong 5 năm gần đây. Microservices là *một* style, có chỗ dùng đúng và rất nhiều chỗ dùng sai. Phần lớn dự án bắt đầu nên là monolith (Cụm 5 sẽ giải thích). Đừng bị quyến rũ bởi pattern thời thượng, phải hiểu trade-off trước.

Nếu bạn đã thấy mình đang phạm một trong ba sai lầm trên, đừng lo. Hết Cụm 1 bạn sẽ gỡ được tất cả. Cùng bắt đầu với [Bài 1.2: Software Architecture là gì?](02-what-is-software-architecture.md).
