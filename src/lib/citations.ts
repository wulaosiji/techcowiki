import type { Source } from "../data/types";

const CITE_RE = /\[(s\d+)\]/g;

export function sourceNumber(sources: Source[], id: string): number {
  return sources.findIndex((source) => source.id === id) + 1;
}

export function renderCitedHtml(text: string, sources: Source[]): string {
  const escaped = escapeHtml(text);
  return escaped.replace(CITE_RE, (_match, id: string) => {
    const number = sourceNumber(sources, id);
    if (number < 1) return "";
    return `<sup class="cite"><a href="#source-${id}" data-source="${id}">${number}</a></sup>`;
  });
}

export function stripCitations(text: string): string {
  return text.replace(CITE_RE, "").replace(/\s+/g, " ").trim();
}

/** Truncate sourced prose for meta descriptions and JSON-LD. */
export function clipPlain(text: string, limit: number): string {
  const clean = stripCitations(text).replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const slice = clean.slice(0, limit - 1);
  const breakAt = Math.max(
    slice.lastIndexOf(" "),
    slice.lastIndexOf("，"),
    slice.lastIndexOf("。"),
    slice.lastIndexOf("、"),
    slice.lastIndexOf(","),
  );
  const clipped = breakAt > limit * 0.55 ? slice.slice(0, breakAt) : slice;
  return `${clipped.trimEnd()}…`;
}

export function usedSourceIds(text: string): string[] {
  return [...text.matchAll(CITE_RE)].map((match) => match[1]);
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function citationLine(title: string, url: string, accessed: string): string {
  return `${title}. ${url} (accessed ${accessed}).`;
}

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function isListLine(line: string): boolean {
  return /^[-*]\s+/.test(line);
}

/** Turn sourced encyclopedia prose into paragraphs and lists. */
export function renderCitedBlocks(text: string, sources: Source[]): string {
  return splitParagraphs(text)
    .map((block) => {
      const chunks: { type: "p" | "ul"; lines: string[] }[] = [];
      for (const raw of block.split("\n")) {
        const line = raw.trim();
        if (!line) continue;
        const list = isListLine(line);
        const last = chunks.at(-1);
        if (list && last?.type === "ul") last.lines.push(line);
        else if (!list && last?.type === "p") last.lines.push(line);
        else chunks.push({ type: list ? "ul" : "p", lines: [line] });
      }
      return chunks
        .map((chunk) => {
          if (chunk.type === "ul") {
            const items = chunk.lines
              .map((line) => `<li>${renderCitedHtml(line.replace(/^[-*]\s+/, ""), sources)}</li>`)
              .join("");
            return `<ul class="prose-list">${items}</ul>`;
          }
          return `<p>${renderCitedHtml(chunk.lines.join(" "), sources)}</p>`;
        })
        .join("");
    })
    .join("");
}
