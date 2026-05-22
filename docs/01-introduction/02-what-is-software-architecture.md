---
id: 02-what-is-software-architecture
title: 1.2 Software Architecture là gì?
sidebar_position: 2
description: Định nghĩa Software Architecture qua ba góc nhìn hình thức, thực dụng và operational, làm rõ vì sao "kiến trúc" khác với "thiết kế" thông thường.
---

# 1.2 Software Architecture là gì?

> **Tóm tắt một dòng**: Software Architecture là tập hợp các quyết định khó-thay-đổi-nhất của một hệ phần mềm, đặc trưng bởi (a) tính bao trùm toàn hệ thống, (b) ảnh hưởng quyết định tới quality attributes, và (c) chi phí sửa cao tới mức phải cân nhắc rất kỹ ngay từ đầu.

## Một câu hỏi đơn giản, ba câu trả lời khác nhau

Nếu bạn hỏi ba kỹ sư phần mềm "Software Architecture là gì?", rất có thể bạn nhận được ba câu trả lời khác nhau và cả ba đều đúng một phần. Đó không phải lỗi của họ — đó là vì khái niệm này có nhiều lớp ý nghĩa, và mỗi cộng đồng (academia, industry, một dự án cụ thể) nhấn mạnh một lớp khác nhau. Bài này sẽ đi qua ba góc nhìn phổ biến nhất, sau đó tổng hợp lại thành một định nghĩa hành nghề được.

### Góc nhìn 1: Định nghĩa hình thức (Bass-Clements-Kazman)

Trong sách kinh điển *Software Architecture in Practice* (xuất bản lần đầu 1998, đến nay đã ấn bản thứ tư), nhóm tác giả Bass-Clements-Kazman đưa ra định nghĩa sau:

> "The software architecture of a system is the set of structures needed to reason about the system, which comprise software elements, relations among them, and properties of both."

Diễn ra Tiếng Việt và bỏ formal-talk:

- Architecture là **một tập hợp các structure** (cấu trúc) — không phải một structure duy nhất. Một hệ thống có nhiều cấu trúc song song: cấu trúc module, cấu trúc runtime, cấu trúc deployment...
- Mỗi structure gồm **elements** (thành phần) và **relations** (quan hệ giữa chúng).
- Cả elements và relations đều có **properties** (tính chất) đáng quan tâm.

Định nghĩa này tốt vì nó *bao quát*: bất cứ cái gì giúp bạn lý giải về hệ thống đều có thể coi là một phần của architecture. Nhưng nó hơi mơ hồ cho người mới: "structure nào quan trọng" thì câu này không trả lời.

### Góc nhìn 2: Định nghĩa thực dụng (Martin Fowler)

Trong bài *Who Needs an Architect?* (2003), Martin Fowler — một trong những voice ảnh hưởng nhất ngành Software — phỏng vấn nhiều architect đầu ngành và rút ra:

> "Architecture is about the important stuff. Whatever that is."

Câu này nghe đùa nhưng cực kỳ sâu. Ý của Fowler:

- Architecture không phải là một loại đối tượng cụ thể (không phải "diagram", không phải "module list", không phải "API spec").
- Architecture là **whatever decisions are hard to change later**. Cái gì khó sửa, cái đó là kiến trúc. Cái gì dễ sửa, cái đó là thiết kế chi tiết hoặc implementation.
- "Important" ở đây không phải "to bigger" hay "more abstract" — mà là **important to the long-term success** của hệ thống.

Định nghĩa này thực dụng hơn nhiều, và là cách phần lớn architect industry hiểu khái niệm này. Nhưng nó vẫn cần thêm tiêu chí cụ thể để áp được.

### Góc nhìn 3: Định nghĩa operational (cái gì architect thực sự làm)

Nếu nhìn vào công việc hàng ngày của một software architect ở công ty trưởng thành, bạn sẽ thấy họ thực sự dành thời gian cho:

1. **Lựa chọn architecture style cho hệ mới**: monolith hay microservices? Layered hay event-driven? Style nào phù hợp với quality attributes ưu tiên?
2. **Định nghĩa boundary giữa các component**: cái gì là module riêng, cái gì là sub-module, cái gì là phần của một module lớn hơn?
3. **Quyết định technology stack chiến lược**: Java vs Go vs Node? PostgreSQL vs MongoDB? Kafka hay RabbitMQ?
4. **Trade-off khi xung đột quality attributes**: chọn performance hay maintainability? Chọn consistency hay availability?
5. **Documenting và truyền đạt**: viết Architecture Decision Records (ADR), vẽ diagrams chuẩn, review design của team.
6. **Cross-team coordination**: đảm bảo các team build các phần khác nhau của hệ vẫn ghép được với nhau.

Tất cả 6 việc trên đều có một đặc điểm chung: **quyết định một lần ảnh hưởng dài hạn, sửa lại thì rất đắt**. Đó chính là essence của architecture.

## Tổng hợp: Định nghĩa "operational" của tài liệu này

Trong toàn bộ khoá học, chúng ta sẽ dùng định nghĩa sau:

> **Software Architecture** là tập hợp các quyết định thiết kế của một hệ phần mềm thoả mãn cả ba tiêu chí:
> 1. **Bao trùm toàn hệ thống** (system-wide), không thuộc về một module riêng lẻ.
> 2. **Ảnh hưởng quyết định tới quality attributes** (performance, scalability, security, maintainability...) thay vì chỉ tới functional behavior.
> 3. **Chi phí thay đổi cao** — sửa sau khi đã code/deploy rất tốn kém.

Bất cứ quyết định nào đạt cả ba tiêu chí trên là kiến trúc. Cái gì không đạt là design thông thường hoặc implementation detail.

## Ba ví dụ minh hoạ

Để định nghĩa trên trở nên cụ thể, hãy xét ba quyết định và xác định cái nào là architectural, cái nào không.

### Ví dụ 1: Chọn dùng PostgreSQL hay MongoDB cho hệ thương mại điện tử

- Bao trùm toàn hệ? ✓ (mọi service đều đụng tới database này).
- Ảnh hưởng quality attribute? ✓ (consistency, query expressiveness, scalability đều khác nhau giữa hai lựa chọn).
- Chi phí thay đổi cao? ✓ (migrate database sau 2 năm production là một dự án 6-12 tháng).

→ **Architectural decision**. Phải được cân nhắc kỹ ngay đầu dự án.

### Ví dụ 2: Đặt tên biến `userCount` hay `numUsers` trong một function

- Bao trùm toàn hệ? ✗ (chỉ trong scope một function).
- Ảnh hưởng quality attribute? ✗ (cùng lắm là code style).
- Chi phí thay đổi? ✗ (IDE rename, một phím tắt).

→ **Implementation detail**. Đừng tranh cãi tới 30 phút trong code review.

### Ví dụ 3: Dùng JWT hay session cookie cho authentication trong một SaaS B2B

- Bao trùm toàn hệ? ✓ (mọi protected endpoint đều phải verify).
- Ảnh hưởng quality attribute? ✓ (scalability, security, sessions revocation đều khác).
- Chi phí thay đổi? ⚠️ (medium — có thể migrate dần qua dual support nhưng vẫn cần effort).

→ **Architectural** (tier 2). Cần thảo luận team trước khi chốt.

Bài tập nhỏ cho bạn: đặt 5 quyết định gần đây trong dự án bạn đang làm vào framework 3 tiêu chí này. Bạn sẽ thấy phần lớn quyết định *không* là architectural (mặc dù cãi nhau cũng nhiều). Chỉ một số nhỏ thực sự deserve mức attention architectural.

## "Architecture is design" — nhưng không phải mọi design đều architectural

Có một câu nổi tiếng của Grady Booch:

> "All architecture is design, but not all design is architecture."

Hiểu vế đầu: architecture cũng là một dạng design — không có gì huyền bí. Nó vẫn là quyết định "structure this way vs that way". Hiểu vế sau: nhưng chỉ một tập con của design quyết định mới đáng được gọi là architecture — tập con đạt ba tiêu chí ở trên.

Hệ quả: ranh giới giữa architecture và design *không cố định* — nó phụ thuộc context. Cùng một quyết định có thể là architectural trong project A nhưng là implementation detail trong project B. Ví dụ:

- Trong một startup 5 người làm MVP: cấu trúc class hierarchy của một module là implementation detail (vì cả team thuộc, sửa nhanh).
- Trong một enterprise 200 engineers: cùng quyết định đó có thể là architectural (vì 50 người sẽ depend, sửa cần coordinate).

Điều này dẫn tới một insight quan trọng: **vai trò architect không phải để "ra quyết định đúng"** mà là **"nhận ra quyết định nào quan trọng đến mức cần được xem xét nghiêm túc"**.

## Vì sao kiến trúc lại đắt khi sửa?

Có ba lý do chính khiến architectural decisions đắt khi sửa, và hiểu rõ ba lý do này giúp bạn cẩn thận hơn ngay từ đầu:

### 1. Cascade effect

Một quyết định architectural thường được nhiều phần khác depend vào. Đổi database từ MongoDB sang PostgreSQL không chỉ là rewrite data access layer — bạn còn phải đổi schema design, query patterns, ORM, deployment, monitoring, backup strategy, on-call runbook... Mỗi cái lại depend vào hàng tá thứ khác. Cascade này có thể mất hàng tháng untangle.

### 2. Conway's law

Architecture của hệ phản chiếu organization structure của team build nó. Một khi team đã được tổ chức xung quanh một architecture nhất định (vd: 5 team mỗi team own một microservice), đổi architecture thường đồng nghĩa đổi org chart — việc cực kỳ tốn về mặt chính trị và con người. Conway's law sẽ được nhắc lại nhiều lần trong khoá.

### 3. Sunk cost của technology lock-in

Mỗi technology choice tích luỹ "muscle memory" của team: tools, libraries, internal frameworks, training, hiring criteria... Đổi tech stack đồng nghĩa team phải học lại, viết lại tooling, có khi tuyển người mới. Sunk cost này tăng tuyến tính với tuổi project.

## Một "architect" thực sự làm gì?

Tài liệu này tránh dùng từ "architect" như một chức danh, vì:

- Ở một số công ty, architect là chức danh chính thức (vd: Solution Architect, Enterprise Architect).
- Ở công ty khác, không có chức danh này — quyết định kiến trúc được chia cho Tech Lead, Staff Engineer, hoặc CTO.
- Ở startup, một developer 5 năm kinh nghiệm có thể đã đang làm việc của một architect mà không gọi tên thế.

Vai trò "architect" — bất kể chức danh — bao gồm:

1. **Phân biệt architectural decision với design decision**: dành thời gian cho cái thứ nhất, để cái thứ hai cho engineer thực thi tự quyết.
2. **Cân nhắc trade-off đa chiều**: không bao giờ có "best architecture", chỉ có "best for current context".
3. **Truyền đạt và document**: để team hiểu *vì sao* quyết định kia, không chỉ *cái gì* được quyết.
4. **Sẵn sàng review và adjust**: kiến trúc evolve — không có "set and forget".
5. **Code đủ để hiểu pain**: architect xa rời code lâu sẽ ra quyết định lý thuyết, không thực dụng. Cụm 3 sẽ nói rõ.

## Tóm tắt

- Software Architecture là tập hợp **quyết định khó-sửa-nhất** ảnh hưởng toàn hệ và quality attributes.
- Có ba định nghĩa phổ biến (Bass-Clements-Kazman, Fowler, operational), và cả ba bổ sung nhau.
- Phân biệt architectural decisions với implementation details bằng **3 tiêu chí**: bao trùm, ảnh hưởng QA, đắt khi sửa.
- Architecture đắt khi sửa do **cascade effect**, **Conway's law**, và **technology lock-in**.
- "Architect" là một *vai trò*, không phải bắt buộc một *chức danh*.

Bài tiếp theo: [Mục tiêu và kết quả học tập](03-aims-and-outcomes.md) — khoá này định cho bạn cái gì khi kết thúc.
