# Software Architecture Foundation

> Tài liệu mở (Tiếng Việt) về nền tảng Kiến trúc Phần mềm: SOLID, Architectural Thinking, Quality Attributes, Architecture Styles, Documenting Views.

[![Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus%203.10-3578E5?logo=docusaurus)](https://docusaurus.io)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?logo=github)](https://tuandung222.github.io/software-architecture-foundation/)
[![Content License](https://img.shields.io/badge/Content-CC%20BY%204.0-lightgrey?logo=creativecommons)](https://creativecommons.org/licenses/by/4.0/)
[![Code License](https://img.shields.io/badge/Code-MIT-blue.svg)](#license)

**Live site**: <https://tuandung222.github.io/software-architecture-foundation/>

---

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Nội dung khoá học](#nội-dung-khoá-học)
- [Cấu trúc repo](#cấu-trúc-repo)
- [Quick start](#quick-start)
- [Build PDF](#build-pdf)
- [Deploy](#deploy)
- [Đóng góp](#đóng-góp)
- [License](#license)

---

## Giới thiệu

Repo này là bộ tài liệu giảng dạy Tiếng Việt về **Software Architecture** ở mức nền tảng sau đại học. Mục tiêu: giúp người học hiểu cách thiết kế hệ phần mềm có quality attributes phù hợp, áp dụng SOLID + architecture styles + documenting views chuẩn vào dự án thực.

Tài liệu được viết theo phong cách "lecturer": dẫn dắt trực giác trước, hình thức hoá sau, kèm ví dụ code + Mermaid diagram + case study end-to-end. Trình bày bằng Docusaurus 3, hỗ trợ KaTeX, render Mermaid, và xuất PDF gộp theo phần.

## Nội dung khoá học

Chín phần bài giảng phủ toàn bộ pipeline thiết kế kiến trúc:

| Phần | Chủ đề | Trọng tâm |
|---|---|---|
| **1. Giới thiệu** | Software Architecture là gì, mục tiêu khoá, lộ trình | Build framework tư duy |
| **2. Design Principles** | Cohesion-Coupling + 5 SOLID (SRP, OCP, LSP, ISP, DIP) | Foundation cấp module |
| **3. Architectural Thinking** | Arch vs Design, Trade-off (ATAM-lite), Modularity | Tư duy architect |
| **4. Quality Attributes** | FR vs NFR, Identifying, Component-Based Thinking | Cái cần tối ưu |
| **5. Fundamental Styles** | Monolithic vs Distributed, Layered, Pipeline, Microkernel | 3 styles + baseline |
| **6. Distributed Styles** | Service-based, Microservices, Event-Driven, Space-Based | 4 styles distributed |
| **7. Documenting** | Module/C&C/Allocation Views, ADR, Conway's Law | Truyền đạt kiến trúc |
| **8. Case Studies** | UAMS, Smart City, Production ML Feature Store + Exercise Set | Apply end-to-end |
| **9. Seminar - Advanced Topics** | IoT, Web3, MLOps, Digital Twin | Advanced domain case studies |

Plus resources: course summary, glossary, cross-reference, exam checklist, PDF index.

## Cấu trúc repo

```
.
├── docs/                       # Markdown nguồn
│   ├── intro.md
│   ├── 01-introduction/        # Phần 1 - 4 bài
│   ├── 02-design-principles/   # Phần 2 - 7 bài (SOLID)
│   ├── 03-architectural-thinking/  # Phần 3 - 4 bài
│   ├── 04-quality-attributes/  # Phần 4 - 4 bài
│   ├── 05-fundamental-styles/  # Phần 5 - 5 bài
│   ├── 06-distributed-styles/  # Phần 6 - 5 bài
│   ├── 07-documenting/         # Phần 7 - 4 bài
│   ├── 08-case-studies/        # Phần 8 - 5 bài
│   ├── 09-seminar-advanced-topics/  # Phần 9 - 5 bài
│   └── resources/              # Summary, glossary, cross-ref, ...
│
├── src/                        # Component + page + CSS
├── static/                     # Asset tĩnh (img, PDF served)
│   └── pdfs/lectures/          # 10 PDF, deploy cùng site
│
├── pdfs/                       # PDF hiển thị trực tiếp trên GitHub
│   ├── *-full.pdf              # 10 PDF mirror static/
│   └── archive/                # Reference nội bộ, không serve public
│
├── scripts/                    # Tooling Python
│   ├── build_lecture_pdfs.py   # Markdown → PDF (pandoc + xelatex)
│   ├── _review_pdfs.py         # Scan PDF: layout issues
│   ├── _verify_pdf_render.py
│   ├── _scan_dollar.py
│   ├── verify_content.py
│   └── _assets/pdf-header.tex
│
├── docusaurus.config.ts
├── sidebars.ts
└── .github/workflows/deploy.yml
```

## Quick start

Yêu cầu: **Node.js ≥ 20** (LTS hiện tại).

```bash
git clone https://github.com/tuandung222/software-architecture-foundation
cd software-architecture-foundation
npm install
npm start
```

Mở <http://localhost:3000/software-architecture-foundation/> để xem dev site.

```bash
# Build production
npm run build

# Serve thử local
npm run serve
```

## Build PDF

Yêu cầu: `pandoc` + `xelatex` (MacTeX/TeX Live), `python3`, `mmdc` (Mermaid CLI).

```bash
python3 scripts/build_lecture_pdfs.py
# PDF xuất ra static/pdfs/lectures/
cp static/pdfs/lectures/*.pdf pdfs/
```

10 PDF có:

- Mục lục (TOC) tự động, depth 3.
- Running header (section name) ở top mỗi trang.
- Footer "Trang X / Y" ở center.
- Mermaid diagram render thành PNG.
- Font Monaco (Vietnamese diacritics), Helvetica body.

## Deploy

Tự động deploy GitHub Pages qua `.github/workflows/deploy.yml` khi push lên `main`. Site live tại <https://tuandung222.github.io/software-architecture-foundation/>.

## Đóng góp

PR và issue welcome. Trước khi gửi PR:

1. Chạy `python3 scripts/verify_content.py` (link, anonymity, mermaid syntax).
2. Chạy `python3 scripts/_scan_dollar.py` (escape `$` currency).
3. Nếu sửa lecture → rebuild PDF.
4. Giữ phong cách lecturer: trực giác trước, hình thức sau, ví dụ thực.
5. Tránh em-dash `-`; dùng dấu phẩy, ngoặc, hoặc dấu hai chấm.

## License

| Loại | License |
|---|---|
| Văn bản tài liệu (`docs/`) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Code snippet + scripts | [MIT](https://opensource.org/licenses/MIT) |

Tự do dùng, sửa, chia sẻ với điều kiện ghi nguồn.

---

**Sister course**: [Software Security Foundation](https://tuandung222.github.io/software-security-foundation/), tài liệu nền tảng về An toàn Phần mềm (Formal Methods, BMC, SMT, Fuzzing).
