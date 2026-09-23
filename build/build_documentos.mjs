import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const documents = [
  { source: '03_laboratorio.md', output: '03_laboratorio.html', section: 'Laboratorio', audience: 'Práctica guiada' },
  { source: '02_apuntes_alumno.md', output: '02_apuntes_alumno.html', section: 'Apuntes', audience: 'Guía de estudio' },
  { source: '05_glosario_chuleta.md', output: '05_glosario_chuleta.html', section: 'Referencia', audience: 'Consulta rápida' },
  { source: '01_guion_instructor.md', output: '01_guion_instructor.html', section: 'Facilitación', audience: 'Guía del instructor' },
  { source: 'practica_ejemplo/LEEME.md', output: 'practica_ejemplo/LEEME.html', section: 'Laboratorio', audience: 'Datos de práctica' },
];

const css = `
:root{color-scheme:light;--ink:#17232b;--muted:#5b6b73;--paper:#fff;--canvas:#f2f5f5;--line:#dce5e5;--teal:#087e73;--teal-dark:#075c56;--lime:#b8f36b;--soft:#e8f4f1;--code:#101e25;--sans:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;--mono:ui-monospace,SFMono-Regular,Consolas,monospace}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:30px}body{margin:0;background:var(--canvas);color:var(--ink);font:16px/1.72 var(--sans);-webkit-font-smoothing:antialiased}a{color:var(--teal-dark);text-underline-offset:3px}.bar{background:#10242a;color:#f4f8f5;border-bottom:1px solid #294148}.barin{max-width:1240px;margin:auto;padding:16px 28px;display:flex;justify-content:space-between;align-items:center;gap:14px}.brand{color:#fff;text-decoration:none;font-size:.83rem;font-weight:700;letter-spacing:.04em}.back{color:#c3ded8;text-decoration:none;font-size:.83rem}.back:hover,.brand:hover{color:var(--lime)}.hero{background:radial-gradient(ellipse at 76% 0%,#17645c 0,transparent 43%),linear-gradient(120deg,#10242a,#183b40);color:#f7fbf8;padding:54px 28px 48px}.hero-in{max-width:1160px;margin:auto}.eyebrow{display:inline-flex;align-items:center;gap:9px;color:var(--lime);font:600 .72rem var(--mono);letter-spacing:.12em;text-transform:uppercase}.eyebrow:before{content:"";width:7px;height:7px;border-radius:50%;background:var(--lime);box-shadow:0 0 15px #b8f36b88}h1{font-size:clamp(2.25rem,5vw,4.3rem);line-height:1.05;letter-spacing:-.055em;max-width:900px;margin:17px 0 15px}.summary{color:#c7d9d7;max-width:720px;margin:0;font-size:1.05rem}.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:25px}.chip{border:1px solid #54716e;border-radius:99px;padding:5px 10px;color:#d8e9e5;font:500 .72rem var(--mono)}.layout{max-width:1240px;margin:36px auto 80px;padding:0 28px;display:grid;grid-template-columns:minmax(0,250px) minmax(0,800px);gap:30px;align-items:start}.toc{position:sticky;top:20px;max-height:calc(100vh - 40px);overflow:auto;background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:18px}.toc h2{font:700 .72rem var(--mono);letter-spacing:.11em;text-transform:uppercase;color:var(--muted);margin:0 0 12px}.toc a{display:block;padding:6px 8px;color:var(--muted);font-size:.82rem;line-height:1.4;text-decoration:none;border-radius:7px}.toc a:hover{background:var(--soft);color:var(--teal-dark)}.toc a.sub{padding-left:19px;font-size:.77rem}.article{min-width:0;background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:clamp(24px,5vw,58px);box-shadow:0 15px 50px #17232b0a}.article>:first-child{margin-top:0}.article h2{font-size:1.55rem;line-height:1.25;letter-spacing:-.025em;margin:2.4em 0 .7em;padding-bottom:.45em;border-bottom:1px solid var(--line);scroll-margin-top:24px}.article h3{font-size:1.18rem;line-height:1.35;margin:1.9em 0 .45em;letter-spacing:-.01em;scroll-margin-top:24px}.article h4{font-size:1rem;margin:1.6em 0 .35em}.article p,.article ul,.article ol{margin:.85em 0}.article li+li{margin-top:.35em}.article strong{color:#162c2d}.article blockquote{margin:1.35em 0;padding:13px 18px;border-left:4px solid var(--teal);border-radius:0 10px 10px 0;background:var(--soft);color:#244b48}.article blockquote>:first-child{margin-top:0}.article blockquote>:last-child{margin-bottom:0}.article code{font: .87em var(--mono);background:#edf2f1;padding:.15em .36em;border-radius:5px;color:#12594f}.article pre{overflow:auto;margin:1.2em 0;padding:19px 21px;background:var(--code);color:#e3efeb;border-radius:12px;font: .83rem/1.65 var(--mono)}.article pre code{background:none;color:inherit;padding:0}.article table{width:100%;border-collapse:separate;border-spacing:0;margin:1.3em 0;font-size:.9rem;line-height:1.5;border:1px solid var(--line);border-radius:10px;overflow:hidden}.article th,.article td{text-align:left;vertical-align:top;padding:10px 12px;border-bottom:1px solid var(--line);border-right:1px solid var(--line)}.article th{background:#eaf2f0;color:#23423e;font-size:.75rem;letter-spacing:.04em}.article tr:last-child td{border-bottom:0}.article th:last-child,.article td:last-child{border-right:0}.article hr{border:0;border-top:1px solid var(--line);margin:2.4em 0}.article img{max-width:100%;height:auto;border-radius:10px}.article input[type=checkbox]{accent-color:var(--teal);margin-right:.45em}.footer{max-width:1240px;margin:-42px auto 0;padding:0 28px 38px;color:var(--muted);font-size:.8rem}.footer a{color:var(--teal-dark)}:focus-visible{outline:3px solid #7abfe5;outline-offset:3px}
@media(max-width:850px){.layout{grid-template-columns:1fr;gap:16px;margin-top:20px}.toc{position:static;max-height:none}.toc nav{display:flex;gap:5px;overflow:auto;padding-bottom:3px}.toc a,.toc a.sub{flex:0 0 auto;padding:7px 9px;background:#f5f8f7}.hero{padding:42px 22px}.barin{padding:13px 20px}.layout{padding:0 16px}.footer{padding-left:16px;padding-right:16px}.article table{display:block;overflow-x:auto;white-space:normal}}
@media(max-width:520px){.barin{align-items:flex-start;flex-direction:column;gap:2px}.hero{padding:34px 19px}.summary{font-size:.97rem}.layout{padding:0 10px}.article{padding:22px 18px;border-radius:13px}.article h2{font-size:1.35rem}.article pre{padding:14px;border-radius:9px}.chips{gap:6px}}
@media print{body{background:#fff;font-size:11pt}.bar,.toc,.footer{display:none!important}.hero{background:#fff;color:#111;padding:0 0 18px;border-bottom:2px solid #087e73}.eyebrow,.summary{color:#444}.chips{margin-top:10px}.chip{color:#444;border-color:#aaa}.layout{display:block;max-width:none;margin:20px 0;padding:0}.article{border:0;box-shadow:none;padding:0;max-width:none}.article h2{break-after:avoid}.article pre,.article blockquote,.article table{break-inside:avoid}.article a{color:#111;text-decoration:none}.article a[href^="http"]:after{content:" (" attr(href) ")";font-size:8pt;overflow-wrap:anywhere}}
`;

function plain(html) { return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim(); }
function slug(text) { return plain(text).toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'seccion'; }

function escapeHtml(text) { return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function inline(text) {
  const codes = [];
  text = text.replace(/`([^`]+)`/g, (_m, value) => { codes.push(`<code>${escapeHtml(value)}</code>`); return `\u0000${codes.length - 1}\u0000`; });
  text = escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^ )]+)(?:\s+"([^"]*)")?\)/g, '<img alt="$1" src="$2" title="$3">')
    .replace(/\[([^\]]+)\]\(([^ )]+)(?:\s+"([^"]*)")?\)/g, '<a href="$2" title="$3">$1</a>')
    .replace(/\*\*(.+?)\*\*|__(.+?)__/g, '<strong>$1$2</strong>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/\*(.+?)\*|_(.+?)_/g, '<em>$1$2</em>')
    .replace(/\[( |x|X)\] /g, (_m, checked) => `<input type="checkbox" disabled${checked.trim() ? ' checked' : ''}> `)
    .replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2">$2</a>');
  return text.replace(/\u0000(\d+)\u0000/g, (_m, n) => codes[Number(n)]);
}

function isRule(line) { return /^\s{0,3}(?:[-*_]\s*){3,}$/.test(line); }
function listMatch(line) { return line.match(/^(\s*)([-+*]|\d+[.)])\s+(.*)$/); }
function cells(line) { return line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(cell => cell.trim().replace(/\\\|/g, '|')); }

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  let i = 0;
  function blocks(stopIndent = -1) {
    let out = '';
    while (i < lines.length) {
      let line = lines[i];
      if (!line.trim()) { i++; continue; }
      const indent = line.match(/^\s*/)[0].length;
      if (stopIndent >= 0 && indent < stopIndent && line.trim()) break;
      const fence = line.match(/^\s*```\s*([\w+-]*)\s*$/);
      if (fence) {
        i++; const code = [];
        while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) code.push(lines[i++]);
        if (i < lines.length) i++;
        out += `<pre><code${fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`;
        continue;
      }
      const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (heading) { out += `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`; i++; continue; }
      if (isRule(line)) { out += '<hr>'; i++; continue; }
      if (/^\s{0,3}>/.test(line)) {
        const quote = [];
        while (i < lines.length && /^\s{0,3}>/.test(lines[i])) quote.push(lines[i++].replace(/^\s{0,3}> ?/, ''));
        out += `<blockquote>${renderMarkdown(quote.join('\n'))}</blockquote>`; continue;
      }
      if (i + 1 < lines.length && line.includes('|') && /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[i + 1])) {
        const head = cells(line); i += 2; const rows = [];
        while (i < lines.length && lines[i].trim() && lines[i].includes('|')) rows.push(cells(lines[i++]));
        out += `<div class="table-wrap"><table><thead><tr>${head.map(x => `<th>${inline(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${head.map((_x, n) => `<td>${inline(row[n] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; continue;
      }
      const firstList = listMatch(line);
      if (firstList) {
        const baseIndent = firstList[1].length, ordered = /^\d/.test(firstList[2]), tag = ordered ? 'ol' : 'ul', items = [];
        while (i < lines.length) {
          const item = listMatch(lines[i]);
          if (!item || item[1].length !== baseIndent || /^\d/.test(item[2]) !== ordered) break;
          let content = item[3]; i++;
          const continuation = [];
          while (i < lines.length && lines[i].trim() && !listMatch(lines[i]) && !/^\s{0,3}(?:#{1,6}\s|>|```)/.test(lines[i])) {
            const currentIndent = lines[i].match(/^\s*/)[0].length;
            if (currentIndent <= baseIndent) break;
            continuation.push(lines[i].trim()); i++;
          }
          if (continuation.length) content += ` ${continuation.join(' ')}`;
          const checkbox = content.match(/^\[([ xX])\]\s+(.*)$/);
          items.push(`<li>${checkbox ? `<input type="checkbox" disabled${checkbox[1].trim() ? ' checked' : ''}> ${inline(checkbox[2])}` : inline(content)}</li>`);
        }
        out += `<${tag}>${items.join('')}</${tag}>`; continue;
      }
      const paragraph = [line.trim()]; i++;
      while (i < lines.length && lines[i].trim() && !/^\s{0,3}(?:#{1,6}\s|>|```)/.test(lines[i]) && !isRule(lines[i]) && !listMatch(lines[i]) && !(lines[i].includes('|') && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}:?/.test(lines[i + 1]))) paragraph.push(lines[i++].trim());
      out += `<p>${inline(paragraph.join(' '))}</p>`;
    }
    return out;
  }
  return blocks();
}

for (const doc of documents) {
  const sourcePath = path.join(root, doc.source);
  const outputPath = path.join(root, doc.output);
  const markdown = fs.readFileSync(sourcePath, 'utf8');
  let body = renderMarkdown(markdown);
  const titleMatch = body.match(/<h1>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? plain(titleMatch[1]) : doc.section;
  if (titleMatch) body = body.replace(titleMatch[0], '');

  const seen = new Map();
  const toc = [];
  body = body.replace(/<h([2-3])>([\s\S]*?)<\/h\1>/gi, (_match, level, text) => {
    const label = plain(text);
    const base = slug(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    toc.push(`<a class="${level === '3' ? 'sub' : ''}" href="#${id}">${label}</a>`);
    return `<h${level} id="${id}">${text}</h${level}>`;
  });

  const wordCount = plain(body).split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 210));
  const cssPath = path.relative(path.dirname(outputPath), path.join(root, 'index.html')).split(path.sep).join('/');
  const sourceHref = path.relative(path.dirname(outputPath), sourcePath).split(path.sep).join('/');
  const navigation = toc.length ? `<aside class="toc"><h2>En esta página</h2><nav>${toc.join('')}</nav></aside>` : '';
  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${title.replace(/&/g, '&amp;').replace(/"/g, '&quot;')} · material del curso Del chat al agente para ingeniería industrial.">
  <meta name="theme-color" content="#10242a">
  <title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')} · Del chat al agente</title>
  <style>${css}</style>
</head>
<body>
  <header class="bar"><div class="barin"><a class="brand" href="${cssPath}">DEL CHAT AL AGENTE <span aria-hidden="true">/</span> INGENIERÍA INDUSTRIAL</a><a class="back" href="${cssPath}">← Volver al curso</a></div></header>
  <section class="hero"><div class="hero-in"><div class="eyebrow">${doc.section} · ${doc.audience}</div><h1>${title}</h1><p class="summary">Material del curso para ingenieros industriales que ya usan chats o bots de IA.</p><div class="chips"><span class="chip">${readTime} min de lectura</span><span class="chip">Material del curso</span></div></div></section>
  <div class="layout">${navigation}<main class="article">${body}</main></div>
  <footer class="footer">Curso online <span aria-hidden="true">·</span> <a href="${cssPath}">Volver a la portada</a> <span aria-hidden="true">·</span> <a href="${sourceHref}">Ver fuente Markdown</a></footer>
</body>
</html>
`;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
  console.log(`${doc.source} → ${doc.output}`);
}
