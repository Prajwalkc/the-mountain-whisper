#!/usr/bin/env node
// Builds /zh/ and /nl/ from the English index.html plus i18n/strings.json.
//
// English is the source of truth: edit index.html, add any new string to
// i18n/strings.json, run this. Anything missing falls back to English and is
// listed in the report, so a half-translated page is visible rather than silent.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'apps/frontend/public/index.html');
const MAP = join(root, 'i18n/strings.json');
// The translations are Simplified Chinese, so the tag is zh-Hans rather than
// the bare zh — it tells a browser and a search engine which script this is.
const LANGS = { zh: { tag: 'zh-Hans', dir: 'ltr' }, nl: { tag: 'nl', dir: 'ltr' } };

const strings = JSON.parse(readFileSync(MAP, 'utf8'));
delete strings._meta;
const english = readFileSync(SRC, 'utf8');

// Attributes worth translating. Everything else (href, src, class) is left alone.
// Names, handles and platforms stay as they are in every language.
const KEEP = new Set([
  'EN', 'NL',  // the switcher's own labels
  'Mountain Whisper', 'Prajwal', 'Pokhara', 'Instagram', 'TikTok', 'Facebook',
  'WhatsApp', 'prajwalkc1994@gmail.com', '@mountainwhisper.nepal',
  'WhatsApp \u00b7 +977 970-203-7055',
  'Instagram \u00b7 @mountainwhisper.nepal',
  'TikTok \u00b7 @mountainwhisper.nepal',
  '\u00a9 2026 Mountain Whisper',
]);

const ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
const META = ['description', 'og:title', 'og:description', 'twitter:title', 'twitter:description'];

function build(lang) {
  const missing = new Set();
  const t = (s) => {
    // The source is hand-wrapped, so a sentence arrives with newlines and
    // indentation inside it. Collapse that before looking the string up.
    const key = s.trim().replace(/\s+/g, ' ');
    if (!key || !/[A-Za-z]/.test(key)) return s;              // numbers, punctuation, times
    if (KEEP.has(key)) return s;                              // names, handles, platforms
    const row = strings[key];
    const lead = /^\s*/.exec(s)[0], tail = /\s*$/.exec(s)[0];
    if (row && row[lang]) return lead + row[lang] + tail;
    if (key.length > 1) missing.add(key);
    return s;
  };

  // Split the document into tags and text, so text is only ever translated
  // outside <script> and <style>.
  let out = '';
  let inRaw = null;
  const parts = english.split(/(<[^>]*>)/);
  for (const part of parts) {
    if (part.startsWith('<')) {
      const tag = /^<\/?([a-zA-Z0-9]+)/.exec(part);
      const name = tag ? tag[1].toLowerCase() : '';
      if (!part.startsWith('</') && (name === 'script' || name === 'style')) inRaw = name;
      else if (part.startsWith('</') && name === inRaw) inRaw = null;
      out += translateTag(part, t);
    } else {
      out += inRaw ? part : t(part);
    }
  }

  out = translateScenes(out, t);
  out = rootAssets(out);
  out = localiseHead(out, lang);
  return { html: out, missing: [...missing] };
}

function translateTag(tag, t) {
  let next = tag;
  for (const attr of ATTRS) {
    next = next.replace(new RegExp(`(${attr}=")([^"]+)(")`, 'g'), (_m, a, v, c) => a + t(v) + c);
  }
  // <meta name="description" content="..."> and the social cards
  const which = /(?:name|property)="([^"]+)"/.exec(next);
  if (which && META.includes(which[1])) {
    next = next.replace(/(content=")([^"]+)(")/, (_m, a, v, c) => a + t(v) + c);
  }
  return next;
}

// The hero carousel keeps its copy in a JS array. Only literals inside that
// array are touched — elsewhere a short key like 'and' could match a variable.
function translateScenes(html, t) {
  const start = html.indexOf('var scenes=[');
  if (start === -1) throw new Error('hero carousel data not found — did the markup change?');
  const end = html.indexOf('\n    ];', start);
  if (end === -1) throw new Error('could not find the end of the carousel data');
  const block = html.slice(start, end);
  const translated = block.replace(/'([^'\\]*)'/g, (m, v) => {
    if (!/[A-Za-z]/.test(v) || /^(fr-|img|lab|sub)/.test(v)) return m;
    const next = t(v);
    return next === v ? m : "'" + next.replace(/'/g, "\\'") + "'";
  });
  return html.slice(0, start) + translated + html.slice(end);
}

// The translated pages live one directory down, so every relative asset path
// has to be rooted or the browser looks for /zh/img/… and finds nothing.
// This also catches the hero <img> that the carousel script builds as a string.
function rootAssets(html) {
  return html
    .replace(/="img\//g, '="/img/')
    .replace(/="video\//g, '="/video/')
    .replace(/="(favicon|apple-touch-icon)/g, '="/$1');
}

function localiseHead(html, lang) {
  const base = 'https://www.themountainwhisper.com';
  return html
    .replace(/<html lang="en"/, `<html lang="${LANGS[lang].tag}" dir="${LANGS[lang].dir}"`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${base}/${lang}/$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${base}/${lang}/$2`)
    // Mark the current language, and turn EN back into a plain link home.
    .replace(`<a class="lang-opt" href="/${lang}/"`, `<a class="lang-opt on" aria-current="true" href="/${lang}/"`)
    .replace('<a class="lang-opt on" href="/" aria-current="true">EN</a>', '<a class="lang-opt" href="/">EN</a>');
}

const report = [];
for (const lang of Object.keys(LANGS)) {
  const { html, missing } = build(lang);
  const dir = join(root, 'apps/frontend/public', lang);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  report.push({ lang, missing });
}

let bad = 0;
for (const { lang, missing } of report) {
  if (!missing.length) { console.log(`${lang}: complete`); continue; }
  bad += missing.length;
  console.log(`\n${lang}: ${missing.length} string(s) fell back to English`);
  for (const m of missing.slice(0, 60)) console.log(`   ${JSON.stringify(m)}`);
  if (missing.length > 60) console.log(`   … and ${missing.length - 60} more`);
}
process.exit(0);
