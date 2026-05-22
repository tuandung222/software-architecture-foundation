#!/usr/bin/env python3
"""Build one PDF per lecture cluster from the docs/ markdown files.

Usage:
    python3 scripts/build_lecture_pdfs.py

Output goes to static/pdfs/lectures/. Requires pandoc + xelatex with a Unicode font
(falls back to system default if "Inter" is not installed).
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
OUT_DIR = ROOT / "static" / "pdfs" / "lectures"

# Mapping cluster -> (output filename, ordered list of source markdown files)
CLUSTERS: list[tuple[str, str, list[Path]]] = [
    (
        "Cụm 1 - Giới thiệu Software Architecture",
        "cum-1-introduction-full.pdf",
        [
            DOCS / "intro.md",
            DOCS / "01-introduction" / "01-overview.md",
            DOCS / "01-introduction" / "02-what-is-software-architecture.md",
            DOCS / "01-introduction" / "03-aims-and-outcomes.md",
            DOCS / "01-introduction" / "04-roadmap.md",
        ],
    ),
    (
        "Cụm 2 - Design Principles (SOLID)",
        "cum-2-design-principles-full.pdf",
        [DOCS / "02-design-principles" / f for f in [
            "01-overview.md",
            "02-cohesion-and-coupling.md",
            "03-srp.md",
            "04-ocp.md",
            "05-lsp.md",
            "06-isp.md",
            "07-dip.md",
        ]],
    ),
    (
        "Cụm 3 - Architectural Thinking",
        "cum-3-architectural-thinking-full.pdf",
        [DOCS / "03-architectural-thinking" / f for f in [
            "01-overview.md",
            "02-architecture-vs-design.md",
            "03-tradeoffs-analysis.md",
            "04-modularity.md",
        ]],
    ),
    (
        "Cụm 4 - Quality Attributes",
        "cum-4-quality-attributes-full.pdf",
        [DOCS / "04-quality-attributes" / f for f in [
            "01-overview.md",
            "02-functional-vs-nfr.md",
            "03-identifying-characteristics.md",
            "04-component-based-thinking.md",
        ]],
    ),
    (
        "Cụm 5 - Fundamental Architecture Styles",
        "cum-5-fundamental-styles-full.pdf",
        [DOCS / "05-fundamental-styles" / f for f in [
            "01-overview.md",
            "02-monolithic-vs-distributed.md",
            "03-layered-architecture.md",
            "04-pipeline-architecture.md",
            "05-microkernel-architecture.md",
        ]],
    ),
    (
        "Cụm 6 - Distributed Architecture Styles",
        "cum-6-distributed-styles-full.pdf",
        [DOCS / "06-distributed-styles" / f for f in [
            "01-overview.md",
            "02-service-based.md",
            "03-microservices.md",
            "04-event-driven.md",
            "05-space-based.md",
        ]],
    ),
    (
        "Cụm 7 - Documenting Software Architecture",
        "cum-7-documenting-full.pdf",
        [DOCS / "07-documenting" / f for f in [
            "01-overview.md",
            "02-module-views.md",
            "03-component-connector-views.md",
            "04-allocation-views.md",
        ]],
    ),
    (
        "Cụm 8 - Case Studies",
        "cum-8-case-studies-full.pdf",
        [DOCS / "08-case-studies" / f for f in [
            "01-overview.md",
            "02-uams-academic-management.md",
            "03-smart-city-traffic.md",
            "04-exercise-set.md",
        ]],
    ),
    (
        "Tóm tắt toàn khoá",
        "course-summary-full.pdf",
        [DOCS / "resources" / "course-summary.md"],
    ),
]

FRONT_MATTER_RE = re.compile(r"^---\n.*?\n---\n", re.DOTALL)
# Strip Docusaurus :::admonition blocks and replace with quote-like blocks.
# Supports both legacy syntax (`:::tip Title`) and Docusaurus 3+ (`:::tip[Title]`).
ADMONITION_RE = re.compile(
    r":::(tip|note|warning|info|caution|danger)"
    r"(?:\[([^\]]+)\]|[ \t]+([^\n]+))?"  # optional title: [Bracket] or  space-separated
    r"\s*\n"
    r"(.*?)"
    r":::",
    re.DOTALL,
)


def strip_frontmatter(text: str) -> str:
    return FRONT_MATTER_RE.sub("", text, count=1)


def transform_admonitions(text: str) -> str:
    def repl(m: re.Match) -> str:
        kind = m.group(1)
        bracket_title = m.group(2)
        space_title = m.group(3)
        body = m.group(4).strip()
        label = (bracket_title or space_title or kind.upper()).strip()
        prefix = f"> **{label}**\n>\n"
        body_quoted = "\n".join(("> " + ln if ln else ">") for ln in body.splitlines())
        return prefix + body_quoted
    return ADMONITION_RE.sub(repl, text)


MERMAID_PATTERN = re.compile(r"```mermaid\n(.*?)```", re.DOTALL)
_MERMAID_TMPDIR: Path | None = None
_MERMAID_COUNTER = [0]


def _ensure_mermaid_tmpdir() -> Path:
    global _MERMAID_TMPDIR
    if _MERMAID_TMPDIR is None:
        _MERMAID_TMPDIR = ROOT / "scripts" / "_tmp" / "mermaid_renders"
        _MERMAID_TMPDIR.mkdir(parents=True, exist_ok=True)
    return _MERMAID_TMPDIR


def transform_mermaid(text: str) -> str:
    """Render mermaid blocks to PNG using mmdc, replace block with image ref.

    Requires mmdc (@mermaid-js/mermaid-cli) installed. Falls back to a note if
    rendering fails so the build still produces a PDF.
    """
    tmpdir = _ensure_mermaid_tmpdir()

    def repl(m: re.Match) -> str:
        diagram = m.group(1).strip()
        _MERMAID_COUNTER[0] += 1
        idx = _MERMAID_COUNTER[0]
        mmd_path = tmpdir / f"diagram_{idx:03d}.mmd"
        png_path = tmpdir / f"diagram_{idx:03d}.png"
        mmd_path.write_text(diagram, encoding="utf-8")
        try:
            subprocess.run(
                [
                    "npx",
                    "mmdc",
                    "-i", str(mmd_path),
                    "-o", str(png_path),
                    "-b", "white",
                    "-w", "1400",
                ],
                check=True,
                capture_output=True,
                text=True,
                cwd=ROOT,
            )
            if png_path.exists():
                return f"\n\n![Sơ đồ {idx}]({png_path.as_posix()})\n\n"
        except subprocess.CalledProcessError as e:
            print(f"  WARN mermaid render failed for diagram {idx}: {e.stderr[:200]}", file=sys.stderr)
        return (
            "> *Sơ đồ Mermaid (không render được, xem trên web)*\n```\n"
            + diagram
            + "\n```"
        )

    return MERMAID_PATTERN.sub(repl, text)


def transform_details(text: str) -> str:
    """Convert <details><summary>...</summary> ... </details> to readable Markdown."""
    pattern = re.compile(
        r"<details>\s*<summary>(.*?)</summary>(.*?)</details>",
        re.DOTALL,
    )

    def repl(m: re.Match) -> str:
        summary = m.group(1).strip()
        body = m.group(2).strip()
        return f"\n**{summary}**\n\n{body}\n"

    return pattern.sub(repl, text)


def prepare_markdown(files: list[Path]) -> str:
    parts: list[str] = []
    for f in files:
        if not f.exists():
            print(f"WARN: missing {f}", file=sys.stderr)
            continue
        raw = f.read_text(encoding="utf-8")
        raw = strip_frontmatter(raw)
        raw = transform_admonitions(raw)
        raw = transform_mermaid(raw)
        raw = transform_details(raw)
        parts.append(raw.strip())
    return "\n\n\\newpage\n\n".join(parts)


def build_pdf(title: str, content: str, out_path: Path) -> None:
    print(f"[build] {out_path.name} ...")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    # Write combined markdown to a temp file (pandoc needs a file or stdin)
    tmp_md = out_path.with_suffix(".tmp.md")
    # geometry: leave room top/bottom for header/footer
    # subparagraph: false so titlesec can manage subsection spacing
    header = (
        f"---\n"
        f"title: \"{title}\"\n"
        f"lang: vi-VN\n"
        f"geometry: \"margin=2cm,top=2.5cm,bottom=2.2cm\"\n"
        f"fontsize: 11pt\n"
        f"---\n\n"
    )
    tmp_md.write_text(header + content, encoding="utf-8")

    header_tex = ROOT / "scripts" / "_assets" / "pdf-header.tex"

    # Use xelatex for Unicode. Monaco (macOS) has full Vietnamese diacritic
    # coverage including stacked marks like ế, ả, ỗ which Menlo's macOS
    # variant is missing. Helvetica handles body text fine.
    cmd = [
        "pandoc",
        str(tmp_md),
        "-o", str(out_path),
        "--pdf-engine=xelatex",
        "-V", "mainfont=Helvetica",
        "-V", "monofont=Monaco",
        "-V", "monofontoptions=Scale=0.82",
        "-V", "colorlinks=true",
        "-V", "linkcolor=blue",
        "-V", "toccolor=black",
        "--toc",
        "--toc-depth=3",
        "--include-in-header", str(header_tex),
        "--highlight-style=tango",
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
        print(f"  OK {out_path.stat().st_size // 1024} KB")
    except subprocess.CalledProcessError as e:
        print(f"  FAIL: {e.stderr[:500]}", file=sys.stderr)
    finally:
        if tmp_md.exists():
            tmp_md.unlink()


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    # Reset mermaid tmpdir each run to avoid stale renders
    tmpdir = ROOT / "scripts" / "_tmp" / "mermaid_renders"
    if tmpdir.exists():
        for f in tmpdir.glob("*"):
            f.unlink()
    for title, filename, files in CLUSTERS:
        content = prepare_markdown(files)
        out = OUT_DIR / filename
        build_pdf(title, content, out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
