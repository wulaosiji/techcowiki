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
