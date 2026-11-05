import { ArrowUpRight, Leaf } from "@phosphor-icons/react/dist/ssr";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <a href="/" className="brand"><Leaf size={24} weight="fill" aria-hidden="true" />campus<span>cart.</span></a>
          <p>Good things deserve another semester.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/search">Explore the marketplace <ArrowUpRight size={15} /></a>
          <a href="/lab">Open the security lab <ArrowUpRight size={15} /></a>
          <a href="/account">Demo account <ArrowUpRight size={15} /></a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>A fictional marketplace. A real security demonstration.</span>
        <span>Built for Sentinel <span className="footer-dot" /> Local use only</span>
      </div>
    </footer>
  );
}
