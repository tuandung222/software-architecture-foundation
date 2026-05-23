# PDF Files

Thư mục này chứa toàn bộ file PDF của tài liệu để bạn dễ download/copy. GitHub render được link trực tiếp tới file PDF.

## PDF gộp theo phần (bản chính, đọc text)

Sinh tự động từ markdown source qua `pandoc + xelatex`. Có mục lục, header/footer chuẩn, font Helvetica + Monaco (Vietnamese).

| File | Phần |
|---|---|
| [`cum-1-introduction-full.pdf`](./cum-1-introduction-full.pdf) | Phần 1 - Giới thiệu Software Architecture |
| [`cum-2-design-principles-full.pdf`](./cum-2-design-principles-full.pdf) | Phần 2 - SOLID + Cohesion/Coupling |
| [`cum-3-architectural-thinking-full.pdf`](./cum-3-architectural-thinking-full.pdf) | Phần 3 - Architectural Thinking |
| [`cum-4-quality-attributes-full.pdf`](./cum-4-quality-attributes-full.pdf) | Phần 4 - Quality Attributes |
| [`cum-5-fundamental-styles-full.pdf`](./cum-5-fundamental-styles-full.pdf) | Phần 5 - Fundamental Styles |
| [`cum-6-distributed-styles-full.pdf`](./cum-6-distributed-styles-full.pdf) | Phần 6 - Distributed Styles |
| [`cum-7-documenting-full.pdf`](./cum-7-documenting-full.pdf) | Phần 7 - Documenting Architecture |
| [`cum-8-case-studies-full.pdf`](./cum-8-case-studies-full.pdf) | Phần 8 - Case Studies |
| [`cum-9-seminar-advanced-topics-full.pdf`](./cum-9-seminar-advanced-topics-full.pdf) | Phần 9 - Seminar Advanced Topics |
| [`course-summary-full.pdf`](./course-summary-full.pdf) | Tóm tắt toàn khoá |

## `archive/` (tham chiếu nội bộ)

Thư mục `archive/` chứa các PDF tham chiếu nội bộ (không xuất bản lên website). Chỉ dùng cho mục đích lưu trữ.

## Download tất cả

```bash
git clone https://github.com/tuandung222/software-architecture-foundation
cp software-architecture-foundation/pdfs/*.pdf ~/Documents/SoftwareArchitecture/
```

Hoặc download zip qua web: vào https://github.com/tuandung222/software-architecture-foundation, click "Code" → "Download ZIP".

## Cách rebuild PDF từ source

Yêu cầu: `pandoc` + `xelatex` (TeX Live trên Linux, MacTeX trên macOS), Python 3, `mmdc` (Mermaid CLI).

```bash
python3 scripts/build_lecture_pdfs.py
```

Output ở `static/pdfs/lectures/`. Copy sang `pdfs/`:

```bash
cp static/pdfs/lectures/*.pdf pdfs/
```
