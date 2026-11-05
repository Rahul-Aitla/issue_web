import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";
import next from "next";
import {
  modes, managedHeaders, isAllowedHost, isSameOrigin, safeReturnPath,
  documentCsp, securityHeaders, demoCookie,
} from "./lib/lab-policy.mjs";

const hostname = "127.0.0.1";
const port = Number(process.env.PORT || 4567);
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error("PORT must be an integer between 1024 and 65535.");
}
const dev = !process.argv.includes("--production");
const app = next({ dev, hostname, port, dir: fileURLToPath(new URL(".", import.meta.url)) });
const handle = app.getRequestHandler();
let mode = "vulnerable";

function writeJson(res, status, value) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(value));
}

function copyHeaders(res, supplied) {
  if (Array.isArray(supplied)) {
    for (let i = 0; i < supplied.length; i += 2) res.appendHeader(supplied[i], supplied[i + 1]);
  } else if (supplied) {
    for (const [name, value] of Object.entries(supplied)) {
      if (value !== undefined) res.setHeader(name, value);
    }
  }
}

function installResponsePolicy(req, res, pathname, requestMode, nonce) {
  const originalWriteHead = res.writeHead;
  res.writeHead = function (status, messageOrHeaders, suppliedHeaders) {
    const statusMessage = typeof messageOrHeaders === "string" ? messageOrHeaders : undefined;
    copyHeaders(this, statusMessage ? suppliedHeaders : messageOrHeaders);
    const isDocument = String(this.getHeader("Content-Type") || "").includes("text/html");
    const reflection = pathname === "/lab/reflection";
    // Apply at writeHead so framework defaults cannot mask the planted scenario.
    for (const name of managedHeaders) this.removeHeader(name);
    for (const [name, value] of Object.entries(securityHeaders(requestMode, nonce, dev, reflection))) {
      this.setHeader(name, value);
    }
    this.setHeader("X-CampusCart-Mode", requestMode);
    this.setHeader("X-Robots-Tag", "noindex, nofollow");
    if (isDocument || pathname.startsWith("/api/")) this.setHeader("Cache-Control", "no-store");
    if (isDocument && (pathname === "/login" || pathname === "/account")) {
      this.setHeader("Set-Cookie", demoCookie(requestMode));
    }
    return statusMessage
      ? originalWriteHead.call(this, status, statusMessage)
      : originalWriteHead.call(this, status);
  };
  // Next reads the request CSP to attach matching nonces to its bootstrap scripts.
  delete req.headers["content-security-policy"];
  req.headers["x-campuscart-mode"] = requestMode;
  req.headers["x-campuscart-path"] = req.url;
  req.headers["x-campuscart-nonce"] = nonce;
  if (requestMode === "hardened") req.headers["content-security-policy"] = documentCsp(nonce, dev);
}

async function changeMode(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return writeJson(res, 405, { error: "Use the lab mode form (POST)." });
  }
  if (!String(req.headers["content-type"]).startsWith("application/x-www-form-urlencoded")) {
    return writeJson(res, 415, { error: "Expected a URL-encoded form." });
  }
  let body = "";
  for await (const chunk of req) {
    body += chunk.toString();
    if (Buffer.byteLength(body) > 2048) return writeJson(res, 413, { error: "Form too large." });
  }
  const selected = new URLSearchParams(body).get("mode");
  if (!modes.has(selected)) return writeJson(res, 400, { error: "Unknown lab mode." });
  mode = selected;
  const origin = `http://${req.headers.host}`;
  const returnTo = new URLSearchParams(body).get("returnTo");
  const location = returnTo
    ? safeReturnPath(new URL(returnTo, origin).href, origin)
    : safeReturnPath(req.headers.referer, origin);
  res.writeHead(303, { Location: location, "Cache-Control": "no-store" });
  res.end();
}

await app.prepare();
const server = createServer(async (req, res) => {
  if (!isAllowedHost(req.headers.host, port)) {
    return writeJson(res, 403, { error: "Local lab only. Use the loopback URL printed in the terminal." });
  }
  const pathname = new URL(req.url, `http://${hostname}:${port}`).pathname;
  const nonce = randomBytes(18).toString("base64");
  installResponsePolicy(req, res, pathname, mode, nonce);
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method) && !isSameOrigin(req.headers.origin, req.headers.host)) {
    return writeJson(res, 403, { error: "State changes require a same-origin browser form." });
  }
  try {
    if (pathname === "/api/lab/mode") return await changeMode(req, res);
    if (pathname === "/api/lab/status") {
      return writeJson(res, 200, { mode, localOnly: true, fictionalData: true, transport: "http" });
    }
    await handle(req, res);
  } catch (error) {
    console.error("[CampusCart] Request failed:", error);
    if (!res.headersSent) writeJson(res, 500, { error: "The local demo request failed." });
    else res.end();
  }
});

server.on("upgrade", (req, socket, head) => {
  if (!isAllowedHost(req.headers.host, port) ||
      (req.headers.origin && !isSameOrigin(req.headers.origin, req.headers.host))) {
    socket.destroy();
    return;
  }
  app.getUpgradeHandler()(req, socket, head);
});
server.on("error", async (error) => {
  console.error(`[CampusCart] Cannot listen on ${hostname}:${port}:`, error.message);
  await app.close();
  process.exit(1);
});
server.listen(port, hostname, () => {
  console.log(`\n  CampusCart / Sentinel local lab`);
  console.log(`  http://${hostname}:${port}`);
  console.log(`  ${dev ? "Development" : "Production"} | Starts in VULNERABLE mode | Fake data only`);
  console.log("  Do not expose this server through a tunnel or deploy it publicly.\n");
});

let stopping = false;
async function shutdown() {
  if (stopping) return;
  stopping = true;
  server.close();
  server.closeAllConnections();
  await app.close();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
