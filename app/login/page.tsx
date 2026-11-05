import type { Metadata } from "next";
import { ArrowRight, Leaf, ShieldWarning } from "@phosphor-icons/react/dist/ssr";
import { getLabMode } from "@/lib/lab";

export const metadata: Metadata = { title: "Demo sign in" };

export default async function LoginPage() {
  const mode = await getLabMode();
  return (
    <div className="container page-section">
      <div className="login-layout">
        <div className="login-photo"><img src="/images/study-space.jpg" alt="A sunlit campus-inspired space" width={800} height={950} /><div><Leaf size={32} weight="fill" /><h2>A new home<br />for good things.</h2><p>And a small lab for safer websites.</p></div></div>
        <section className="login-form">
          <span className="round-decoration"><Leaf size={30} weight="fill" /></span>
          <h1>Hey, good to<br />see you here<span>.</span></h1>
          <p>Step into a fictional student account. No password or personal information needed.</p>
          <div className="demo-identity"><span className="avatar">AS</span><div><strong>Alex Student</strong><span>alex@campus.example</span></div><span className="demo-label">DEMO</span></div>
          <form action="/api/demo-session" method="post"><button className="button button-primary" type="submit">Continue as demo student <ArrowRight size={20} /></button></form>
          <div className="login-lab-note"><ShieldWarning size={23} /><div><strong>A cookie you can inspect.</strong><p>Opening this page sets a demonstration cookie. In {mode} mode, it {mode === "vulnerable" ? "deliberately omits HttpOnly, Secure, and SameSite." : "includes HttpOnly, Secure, and SameSite=Lax."}</p><a href="/lab">Why this matters <ArrowRight size={14} /></a></div></div>
          <p className="fine-print">This is not real authentication. Never enter a real password into this training app.</p>
        </section>
      </div>
    </div>
  );
}
