# Visual QA screenshots

Captured 23 August 2026 against a **production build** (`pnpm build` + `pnpm start`), and reviewed
by eye — not only asserted in tests.

Eight principal routes × four breakpoints:

| Breakpoint | Represents | Capture |
|---|---|---|
| `390x844` | iPhone-class phone — the primary audience | Full page |
| `768x1024` | Tablet portrait | Viewport |
| `1440x900` | Laptop — the primary desktop review size | Full page |
| `1920x1080` | Large desktop | Viewport |

Full-page captures are kept for the two breakpoints reviewers actually work in; the other two are
viewport captures, which document the breakpoint without adding a megabyte per file.

Findings from this review, and the fixes applied, are listed under **Visual QA** in
[`../QA_REPORT.md`](../QA_REPORT.md).
