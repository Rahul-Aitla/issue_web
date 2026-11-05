import type { Metadata } from "next";
import { ArrowUpRight, Heart, ShoppingBag, Flask } from "@phosphor-icons/react/dist/ssr";
import { AccountProbe } from "@/components/account-probe";

export const metadata: Metadata = { title: "Demo account" };

export default function AccountPage() {
  return (
    <div className="container page-section">
      <div className="page-heading"><div><h1>Your little corner of campus<span>.</span></h1><p>A fictional profile. No real sign-in is required to view this page.</p></div><span className="avatar large">AS</span></div>
      <div className="account-layout">
        <aside className="profile-panel"><span className="avatar large">AS</span><h2>Alex Student</h2><p>alex@campus.example</p><span className="profile-badge">Fictional student account</span><nav aria-label="Account shortcuts"><a href="/saved"><Heart size={20} />Saved finds<ArrowUpRight size={16} /></a><a href="/bag"><ShoppingBag size={20} />Pickup bag<ArrowUpRight size={16} /></a><a href="/lab"><Flask size={20} />Security lab<ArrowUpRight size={16} /></a></nav><p className="fine-print">No roles or access-control testing is implemented. All account data is intentionally public and fictional.</p></aside>
        <AccountProbe />
      </div>
    </div>
  );
}
