/** Simplified-to-Traditional conversion for the zht locale. ASCII, URLs, and tickers stay intact. */
import { Converter } from "opencc-js";

const convert = Converter({ from: "cn", to: "t" });

export function toTraditional(text: string): string {
  if (!text) return text;
  return convert(text);
}

/** OpenCC 臺/台 variants so searches for 台積電 still match 臺積電. */
export function traditionalSearchVariants(text: string): string[] {
  if (!text) return [];
  const trad = toTraditional(text);
  const tai = trad.replaceAll("臺", "台");
  return trad === tai ? [trad] : [trad, tai];
}

export function isZhFamily(locale: string): boolean {
  return locale === "zh" || locale === "zht";
}
