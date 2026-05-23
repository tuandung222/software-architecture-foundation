---
id: pdfs
title: PDF tham chiếu
sidebar_position: 4
description: Các file PDF gộp theo phần để tải về đọc offline hoặc in. Sinh tự động từ markdown source, có mục lục, header/footer chuẩn.
---

# PDF tham chiếu và tải về

Trang này cung cấp các file PDF của tài liệu để bạn tải về đọc offline hoặc in ra.

## PDF gộp theo phần (bản chính)

Các file PDF dưới đây gộp toàn bộ nội dung của mỗi phần bài giảng, có mục lục, sinh tự động từ markdown source. Phù hợp để in và đọc offline.

| Phần | Nội dung | File |
|---|---|---|
| Phần 1 | Giới thiệu Software Architecture | [cum-1-introduction-full.pdf](pathname:///pdfs/lectures/cum-1-introduction-full.pdf) |
| Phần 2 | Design Principles (SOLID + Cohesion/Coupling) | [cum-2-design-principles-full.pdf](pathname:///pdfs/lectures/cum-2-design-principles-full.pdf) |
| Phần 3 | Architectural Thinking | [cum-3-architectural-thinking-full.pdf](pathname:///pdfs/lectures/cum-3-architectural-thinking-full.pdf) |
| Phần 4 | Quality Attributes | [cum-4-quality-attributes-full.pdf](pathname:///pdfs/lectures/cum-4-quality-attributes-full.pdf) |
| Phần 5 | Fundamental Architecture Styles | [cum-5-fundamental-styles-full.pdf](pathname:///pdfs/lectures/cum-5-fundamental-styles-full.pdf) |
| Phần 6 | Distributed Architecture Styles | [cum-6-distributed-styles-full.pdf](pathname:///pdfs/lectures/cum-6-distributed-styles-full.pdf) |
| Phần 7 | Documenting Software Architecture | [cum-7-documenting-full.pdf](pathname:///pdfs/lectures/cum-7-documenting-full.pdf) |
| Phần 8 | Case Studies | [cum-8-case-studies-full.pdf](pathname:///pdfs/lectures/cum-8-case-studies-full.pdf) |
| Phần 9 | Seminar Advanced Topics | [cum-9-seminar-advanced-topics-full.pdf](pathname:///pdfs/lectures/cum-9-seminar-advanced-topics-full.pdf) |
| Bonus | Tóm tắt toàn khoá | [course-summary-full.pdf](pathname:///pdfs/lectures/course-summary-full.pdf) |

Mỗi PDF có:

- Mục lục (Table of Contents) tự động, depth 3.
- Running header (tên section hiện tại) ở top mỗi trang.
- Footer "Trang X / Y" ở center.
- Mermaid diagram render thành PNG nhúng.
- Font Monaco (Vietnamese diacritics), Helvetica body.

## Cách build PDF từ source

Nếu bạn fork repo và muốn rebuild PDF từ markdown source:

```bash
# Yêu cầu: pandoc + xelatex (LaTeX), Python 3, mmdc (Mermaid CLI)
python3 scripts/build_lecture_pdfs.py
```

Output ở `static/pdfs/lectures/`.

Reference: [`scripts/build_lecture_pdfs.py`](https://github.com/tuandung222/software-architecture-foundation/blob/main/scripts/build_lecture_pdfs.py).
