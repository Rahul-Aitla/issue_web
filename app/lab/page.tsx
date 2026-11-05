import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, Flask, ShieldCheck, Info } from "@phosphor-icons/react/dist/ssr";
import { getLabMode } from "@/lib/lab";
import { ConsoleDemo } from "@/components/console-demo";

export const metadata: Metadata = { title: "The security lab" };

const scenarios = [
  {
    number: "01", title: "What the response doesn't say", type: "PASSIVE / HEADERS",
    description: "Browse the marketplace and inspect the main-document response. Vulnerable mode omits selected defensive headers; hardened mode applies them centrally.",
    vulnerable: "Missing CSP, nosniff, frame protection, referrer policy, permissions policy, and CORP.",
    hardened: "Defensive headers restored, including a nonce-based script policy.",
    href: "/", action: "Open the marketplace", limit: "Missing headers are configuration observations, not proof of an exploit.",
  },
  {
    number: "02", title: "A cookie with less protection", type: "PASSIVE / COOKIES",
    description: "Open the demo sign-in page. Its document response sets a fictional session cookie so it can be inspected and re-tested at the same URL.",
    vulnerable: "The campuscart_demo cookie omits HttpOnly, Secure, and SameSite.",
    hardened: "The same cookie name gains HttpOnly, Secure, and SameSite=Lax.",
    href: "/login", action: "Open demo sign in", limit: "No real session exists. On HTTP loopback, inspect Set-Cookie attributes; browser storage of Secure cookies varies.",
  },
  {
    number: "03", title: "An account API with mixed signals", type: "PASSIVE / CORS",
    description: "The account page makes a real same-origin fetch to /api/account. Its response contains only fictional, publicly accessible user data.",
    vulnerable: "Access-Control-Allow-Origin: * combined with Access-Control-Allow-Credentials: true.",
    hardened: "No cross-origin access is advertised; the account API remains same-origin.",
    href: "/account", action: "Open the demo account", limit: "Browsers reject this wildcard/credentials combination for credentialed cross-origin reads. Do not claim data exfiltration.",
  },
  {
    number: "04", title: "Reflection is only the first clue", type: "USER-INITIATED / REFLECTION",
    description: "An isolated HTML response places q into body and attribute contexts. It stays sandboxed in both modes. Try harmless markup, not script payloads.",
    vulnerable: "Input is interpolated directly into the lab response.",
    hardened: "Input is context-escaped before it is rendered.",
    href: "/lab/reflection?q=demo%3Cem%3Ebook%3C%2Fem%3E", action: "Open the isolated reflection lab", limit: "Sentinel's current plain-text canary can match both modes. It cannot by itself prove an encoding failure, XSS, or a verified fix.",
  },
];

export default async function LabPage() {
  const mode = await getLabMode();
  return (
    <div className="container page-section lab-page">
      <div className="lab-intro">
        <div><p className="eyebrow"><Flask size={15} />THE LOCAL TRAINING GROUND</p><h1>A normal shop.<br />A few teachable flaws<span>.</span></h1><p>Browse it like a student. Observe it with Sentinel. Then change the configuration and compare the evidence.</p></div>
        <aside className={`mode-card ${mode}`}><ShieldCheck size={29} weight="light" /><span>SERVER-WIDE LAB MODE</span><strong>{mode === "vulnerable" ? "Vulnerable" : "Hardened"}</strong><p>{mode === "vulnerable" ? "Selected protections are deliberately absent." : "Defensive headers and cookie attributes are enabled."}</p><form action="/api/lab/mode" method="post"><input type="hidden" name="mode" value={mode === "vulnerable" ? "hardened" : "vulnerable"} /><input type="hidden" name="returnTo" value="/lab" /><button className="button button-primary" type="submit">Switch to {mode === "vulnerable" ? "hardened" : "vulnerable"} <ArrowRight size={17} /></button></form><small>Shared across tabs. Resets on restart.</small></aside>
      </div>
      <section className="demo-runbook">
        <h2>Your five-minute demo</h2>
        <ol><li><b>Connect</b><span>Start a Sentinel assessment for this exact loopback origin and confirm authorization.</span></li><li><b>Browse</b><span>Visit home, sign in, and account. Inspect findings and their source evidence.</span></li><li><b>Compare</b><span>Switch to hardened mode, repeat the same pages, and compare the new response headers.</span></li><li><b>Explain</b><span>Export the evidence. Keep observations, verified results, and limitations separate.</span></li></ol>
      </section>
      <div className="lab-section-title"><h2>The planted scenarios</h2><span>Purpose-built for the current Sentinel engine</span></div>
      <div className="scenario-list">
        {scenarios.map((scenario) => (
          <article className="scenario" key={scenario.number}>
            <span className="scenario-number">{scenario.number}</span>
            <div className="scenario-body"><span className="scenario-type">{scenario.type}</span><h3>{scenario.title}</h3><p>{scenario.description}</p><div className="scenario-comparison"><div><span className="scenario-state vulnerable">VULNERABLE</span><p>{scenario.vulnerable}</p></div><div><span className="scenario-state hardened"><Check size={12} />HARDENED</span><p>{scenario.hardened}</p></div></div><p className="scenario-limit"><Info size={16} />{scenario.limit}</p></div>
            <a className="scenario-link" href={scenario.href}>{scenario.action}<ArrowUpRight size={18} /></a>
          </article>
        ))}
        <article className="scenario console-scenario"><span className="scenario-number">05</span><div className="scenario-body"><span className="scenario-type">USER-INITIATED / BROWSER TELEMETRY</span><h3>A little too much diagnostic detail</h3><p>Use the button to log a deliberately fake internal diagnostic in vulnerable mode. Hardened mode handles the sample failure with a generic informational message.</p><ConsoleDemo mode={mode} /><p className="scenario-limit"><Info size={16} />A console error is browser evidence, not automatically a security vulnerability. No real paths or secrets are logged.</p></div></article>
      </div>
      <aside className="lab-boundaries"><Info size={26} /><div><h2>A safe, honest demonstration</h2><p>This server binds to 127.0.0.1, uses fake data, validates mutation origins, and never needs a real password. Keep it off public hosts and tunnels. The default HTTP setup does not demonstrate HSTS, HTTPS mixed content, SQL injection, IDOR, or authentication bypass.</p><p>Switching modes changes shared server configuration. For comparable evidence, navigate to the same URL in each mode. The reflection route retains a restrictive sandbox regardless of mode.</p></div></aside>
    </div>
  );
}
