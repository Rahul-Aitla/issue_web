import { escapeHtml, getLabMode } from "@/lib/lab";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") || "").slice(0, 160);
  const mode = await getLabMode();
  // Intentionally unsafe ONLY in this CSP-sandboxed, localhost-only lab route.
  const renderedQuery = mode === "vulnerable" ? query : escapeHtml(query);
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Isolated Reflection Lab | CampusCart</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 32px 20px; background: #faf9f5; color: #294333; font: 15px/1.65 sans-serif; }
    main { max-width: 780px; margin: auto; }
    a { color: #456a42; }
    .tag { display: inline-block; padding: 5px 9px; background: #ece7ca; border-radius: 4px; font-size: 11px; }
    h1 { font-size: clamp(30px, 7vw, 48px); line-height: 1.1; letter-spacing: -2px; }
    h2 { font-size: 18px; }
    p { color: #737d68; }
    section { background: #eef1e5; padding: 24px; margin: 25px 0; border: 1px solid #dce2cf; border-radius: 8px; overflow-wrap: anywhere; }
    label { display: block; font-size: 13px; margin-bottom: 8px; }
    input { width: 100%; border: 1px solid #c7d1b8; padding: 12px; border-radius: 5px; font: inherit; background: #fff; color: #294333; }
    code { background: #e5e9da; padding: 3px 5px; overflow-wrap: anywhere; }
    .small { font-size: 12px; }
  </style>
</head>
<body><main>
  <a href="/lab">Back to the lab guide</a>
  <p><span class="tag">ISOLATED LAB / ${mode.toUpperCase()} / NO SCRIPT EXECUTION</span></p>
  <h1>Same input. Different output handling.</h1>
  <p>This standalone response is separate from the normal React search page.
  A restrictive CSP sandbox blocks scripts and resource loading in both modes.</p>
  <section>
    <h2>HTML body context</h2>
    <div id="reflection-result">Showing results for: ${renderedQuery}</div>
  </section>
  <section>
    <label for="reflected-query">HTML attribute context</label>
    <input id="reflected-query" value="${renderedQuery}" readonly>
  </section>
  <p>Harmless markup to compare: <code>demo&lt;em&gt;book&lt;/em&gt;</code></p>
  <p><a href="/lab/reflection?q=demo%3Cem%3Ebook%3C%2Fem%3E">Open the harmless markup example</a></p>
  <p class="small"><strong>Measurement limit:</strong> an alphanumeric Sentinel canary
  remains visible even when correctly escaped. Reflection alone does not prove an
  encoding failure or exploitable XSS. Inspect the response source and context.</p>
</main></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
