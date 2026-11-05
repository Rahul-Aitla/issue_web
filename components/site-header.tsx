import { ArrowUpRight, Flask, Leaf } from "@phosphor-icons/react/dist/ssr";
import type { LabMode } from "@/lib/lab";
import { CollectionLinks } from "./marketplace";

export function SiteHeader({ mode, currentPath }: { mode: LabMode; currentPath: string }) {
  return (
    <>
      <div className={`lab-banner ${mode}`}>
        <div className="container lab-banner-inner">
          <span><span className="status-dot" /><strong>LOCAL DEMO</strong><span className="banner-detail">Intentionally insecure. Fake data only.</span></span>
          <div className="mode-controls">
            <a href="/lab">Lab guide <ArrowUpRight size={13} aria-hidden="true" /></a>
            <form action="/api/lab/mode" method="post">
              <input type="hidden" name="mode" value={mode === "vulnerable" ? "hardened" : "vulnerable"} />
              <input type="hidden" name="returnTo" value={currentPath} />
              <button type="submit" aria-label={`Switch to ${mode === "vulnerable" ? "hardened" : "vulnerable"} mode`}>
                <span className="mode-indicator" />
                {mode === "vulnerable" ? "Vulnerable" : "Hardened"}
                <span className="toggle-track"><i /></span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-main">
          <a href="/" className="brand" aria-label="CampusCart home">
            <span className="brand-mark"><Leaf weight="fill" size={25} aria-hidden="true" /></span>
            campus<span>cart</span><span className="brand-period">.</span>
          </a>
          <nav aria-label="Main navigation" className="main-nav">
            <a href="/search">Explore finds</a>
            <a href="/#how-it-works">How it works</a>
            <a href="/lab"><Flask size={17} aria-hidden="true" />Demo lab</a>
          </nav>
          <div className="nav-actions">
            <CollectionLinks />
            <a href="/login" className="sign-in-link">Demo sign in <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </header>
    </>
  );
}
