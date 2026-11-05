export const modes = new Set(["vulnerable", "hardened"]);
export const managedHeaders = [
  "Content-Security-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Cross-Origin-Resource-Policy",
];

export function isAllowedHost(host, port) {
  return [`127.0.0.1:${port}`, `localhost:${port}`, `[::1]:${port}`].includes(host);
}

export function isSameOrigin(origin, host) {
  return origin === `http://${host}`;
}

export function safeReturnPath(referer, origin) {
  try {
    const url = new URL(referer);
    if (url.origin === origin && !url.pathname.startsWith("/api/")) {
      return url.pathname + url.search;
    }
  } catch {
    // A missing or invalid Referer simply returns to the lab guide.
  }
  return "/lab";
}

export function documentCsp(nonce, dev = false) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${dev ? " ws://127.0.0.1:* ws://localhost:*" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
  ].join("; ");
}

export const reflectionCsp = [
  "sandbox allow-forms",
  "default-src 'none'",
  "style-src 'unsafe-inline'",
  "form-action 'self'",
  "base-uri 'none'",
  "frame-ancestors 'self'",
].join("; ");

export function securityHeaders(mode, nonce, dev = false, reflection = false) {
  const result = {};
  if (mode === "hardened") {
    Object.assign(result, {
      "Content-Security-Policy": documentCsp(nonce, dev),
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
      "Cross-Origin-Resource-Policy": "same-origin",
    });
  }
  // Containment never switches off, even when the lab reflects raw markup.
  if (reflection) {
    result["Content-Security-Policy"] = reflectionCsp;
    result["Referrer-Policy"] = "no-referrer";
    if (mode === "hardened") result["X-Frame-Options"] = "SAMEORIGIN";
  }
  return result;
}

export function demoCookie(mode) {
  const base = "campuscart_demo=fictional-student-only; Path=/; Max-Age=3600";
  return mode === "hardened" ? `${base}; HttpOnly; Secure; SameSite=Lax` : base;
}

export function corsHeaders(mode) {
  return mode === "vulnerable"
    ? {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      }
    : {};
}
