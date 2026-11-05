import {
  ArrowRight, ArrowUpRight, BookOpen, Headphones, Laptop,
  Leaf, MapPin, Package, Recycle, Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <p className="eyebrow"><span />THE CAMPUS CIRCULAR</p>
          <h1>Good finds.<br /><span>Better prices.</span></h1>
          <p className="hero-description">Pre-loved things. Student-friendly prices. Your next great find is probably just across campus.</p>
          <div className="hero-actions">
            <a href="#fresh-finds" className="button button-primary">Explore the finds <ArrowUpRight size={20} /></a>
            <a href="#how-it-works" className="text-link">How it works <ArrowRight size={17} /></a>
          </div>
          <div className="hero-note"><span className="small-round-icon"><Leaf weight="fill" size={19} /></span><p>A little kinder to your wallet.<br /><strong>A lot kinder to the planet.</strong></p></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-image-frame">
            <img src="/images/study-space.jpg" width={900} height={720} alt="A bright study space with a desk, plants, and well-loved furniture" fetchPriority="high" />
          </div>
          <div className="hero-find">
            <img src="/images/headphones.jpg" alt="Pre-loved over-ear headphones" width={150} height={150} />
            <div><span>A good find, a new chapter.</span><strong>Less new. More you.</strong><a href="/products/studio-headphones">Meet your next study buddy <ArrowUpRight size={15} /></a></div>
          </div>
          <span className="hero-sparkle" aria-hidden="true"><Sparkle size={42} weight="light" /></span>
        </div>
      </section>

      <div className="value-strip">
        <div className="container">
          <span><MapPin size={20} />Made for campus life</span>
          <span><Package size={20} />Local pickup. No shipping.</span>
          <span><Recycle size={20} />Pre-loved, not passed over</span>
          <span><Leaf size={20} />Small choices. Less waste.</span>
        </div>
      </div>

      <section className="container finds-section" id="fresh-finds">
        <div className="section-heading">
          <div><h2>Fresh finds, second lives<span>.</span></h2><p>Your room, your classes, your everyday. Sorted for less.</p></div>
          <a className="text-link" href="/search">See all finds <ArrowUpRight size={18} /></a>
        </div>
        <div className="catalogue-toolbar">
          <nav className="category-tabs" aria-label="Product categories">
            {categories.map((category, index) => (
              <a key={category} className={index === 0 ? "selected" : ""} href={index === 0 ? "/search" : `/search?category=${encodeURIComponent(category)}`}>
                {category}
              </a>
            ))}
          </nav>
          <span className="listing-count">{products.length} good finds</span>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
        <div className="browse-more"><a href="/search" className="button button-outline">There&apos;s more to discover <ArrowRight size={19} /></a></div>
      </section>

      <section className="container campus-edit">
        <div className="edit-title"><span className="edit-stamp"><Recycle size={23} />THE SECOND-LIFE CLUB</span><h2>New semester.<br />Not everything<br />needs to be new.</h2><a href="/search?category=Room%20essentials" className="text-link">Find your room essentials <ArrowUpRight size={19} /></a></div>
        <div className="edit-photo"><img src="/images/desk.jpg" alt="A simple desk ready for another semester" width={850} height={650} loading="lazy" /></div>
        <div className="edit-side"><BookOpen size={29} weight="light" /><p>From your first<br />lecture to your<br />last late night.</p><div className="edit-icons"><Laptop size={23} /><Headphones size={23} /><Leaf size={23} /></div><span>Keep the good stuff going.</span></div>
      </section>

      <section className="container how-section" id="how-it-works">
        <div className="section-heading"><div><h2>A good find. A simple handover.</h2><p>No shipping labels. No complicated anything.</p></div><span className="how-flower" aria-hidden="true"><Sparkle size={44} /></span></div>
        <div className="how-grid">
          <article><span>1</span><h3>Find your thing.</h3><p>Browse the campus collection. Save what catches your eye.</p></article>
          <article><span>2</span><h3>Make a little plan.</h3><p>Add a find to your pickup bag and check the meeting spot.</p></article>
          <article><span>3</span><h3>Give it a second life.</h3><p>In a real marketplace, you&apos;d meet and inspect it. Here, it&apos;s all a demo.</p></article>
        </div>
      </section>
      <section className="container demo-callout">
        <div><span className="status-dot" /><p>A marketplace on the outside.<br /><strong>A security lab underneath.</strong></p></div>
        <p>Explore planted issues, inspect evidence, then switch modes to compare.</p>
        <a href="/lab" className="button button-outline">Open the lab guide <ArrowUpRight size={19} /></a>
      </section>
    </>
  );
}
