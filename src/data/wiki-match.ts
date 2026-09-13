import type { Localized } from "./types";
import type { WikiExtractRecord, WikiGloss } from "./wiki-extracts";

export interface WikiSubject {
  kind: "company" | "person";
  slug: string;
  name: Localized;
  aliases?: string[];
  extraNames?: string[];
}

const WD_REJECT =
  /scientific article|academic article|chess player|punishment|published on|family name|given name|disambiguation|wikimedia|genus\b|village\b|asteroid|hvac|baseball player|footballer|cricketer|basketball player/i;

function hasCjk(value: string): boolean {
  return /[\u4e00-\u9fff]/.test(value);
}

export function subjectNeedles(subject: WikiSubject): string[] {
  const raw = [subject.name.en, subject.name.zh, ...(subject.aliases ?? []), ...(subject.extraNames ?? [])];
  if (subject.kind === "company") {
    raw.push(subject.slug.replace(/-/g, " "));
  }
  const needles: string[] = [];
  for (const item of raw) {
    const value = item?.trim();
    if (!value) continue;
    if (hasCjk(value) && value.length >= 2) needles.push(value);
    else if (value.length >= 3) needles.push(value);
  }
  const english = subject.name.en.trim();
  if (english) needles.push(english);
  return [...new Set(needles)];
}

export function textMentionsSubject(text: string, subject: WikiSubject): boolean {
  const hay = text.toLowerCase();
  return subjectNeedles(subject).some((needle) =>
    hasCjk(needle) ? text.includes(needle) : hay.includes(needle.toLowerCase()),
  );
}

export function glossMatchesSubject(gloss: WikiGloss, subject: WikiSubject): boolean {
  return textMentionsSubject(`${gloss.title}\n${gloss.description ?? ""}\n${gloss.extract}`, subject);
}

function tokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 4),
  );
}

export function wikidataDescriptionMatches(
  description: string,
  subject: WikiSubject,
  wikiShort?: string,
): boolean {
  if (!description || WD_REJECT.test(description)) return false;
  if (textMentionsSubject(description, subject)) return true;
  if (!wikiShort) return false;
  const left = tokens(description);
  const right = tokens(wikiShort);
  let overlap = 0;
  for (const token of left) {
    if (right.has(token)) overlap += 1;
  }
  return overlap >= 2;
}

export function matchWikiRecord(
  subject: WikiSubject,
  record: WikiExtractRecord | undefined,
): WikiExtractRecord | undefined {
  if (!record) return undefined;
  const en = record.en && glossMatchesSubject(record.en, subject) ? record.en : undefined;
  const zh = record.zh && glossMatchesSubject(record.zh, subject) ? record.zh : undefined;
  const wikiShort = en?.description ?? zh?.description;
  const wdEn =
    record.wikidataDescription?.en &&
    wikidataDescriptionMatches(record.wikidataDescription.en, subject, wikiShort)
      ? record.wikidataDescription.en
      : undefined;
  const wdZh =
    record.wikidataDescription?.zh &&
    wikidataDescriptionMatches(record.wikidataDescription.zh, subject, wikiShort)
      ? record.wikidataDescription.zh
      : undefined;
  const wikidataDescription = wdEn || wdZh ? { en: wdEn, zh: wdZh } : undefined;
  if (!en && !zh && !wikidataDescription) return undefined;
  return { en, zh, wikidataDescription };
}
