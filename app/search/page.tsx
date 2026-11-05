import type { Metadata } from "next";
import { MagnifyingGlass, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { SearchForm } from "@/components/search-form";
import { ProductCard } from "@/components/product-card";
import { categories, findProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Explore the finds" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.slice(0, 160) : "";
  const category = typeof params.category === "string" &&
    categories.some((value) => value === params.category) ? params.category : "All finds";
  const matches = findProducts(query, category);
  return (
    <div className="container page-section">
      <a href="/" className="back-link"><ArrowLeft size={17} />Back to campus</a>
      <div className="page-heading"><div><h1>Find your next good thing<span>.</span></h1><p>A little browsing can go a long way.</p></div><span className="round-decoration"><MagnifyingGlass size={32} /></span></div>
      <SearchForm query={query} />
      <div className="catalogue-toolbar">
        <nav className="category-tabs" aria-label="Product categories">
          {categories.map((item) => (
            <a key={item} className={category === item ? "selected" : ""} aria-current={category === item ? "page" : undefined} href={`/search?${new URLSearchParams({ q: query, category: item })}`}>
              {item}
            </a>
          ))}
        </nav>
        <span className="listing-count">{matches.length} {matches.length === 1 ? "find" : "finds"}</span>
      </div>
      {query && <p className="search-summary">Results for <strong>&quot;{query}&quot;</strong></p>}
      {matches.length ? (
        <div className="product-grid">{matches.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="empty-state"><MagnifyingGlass size={44} weight="light" /><h2>No finds this time.</h2><p>Try &quot;laptop&quot;, &quot;books&quot;, or a different category.</p><a className="button button-primary" href="/search">Explore all finds</a></div>
      )}
    </div>
  );
}
