import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export function SearchForm({
  query = "",
  compact = false,
}: {
  query?: string;
  compact?: boolean;
}) {
  return (
    <form action="/search" method="get" role="search" className={`search-form ${compact ? "compact" : ""}`}>
      <MagnifyingGlass size={21} aria-hidden="true" />
      <label className="sr-only" htmlFor={compact ? "nav-search" : "catalogue-search"}>
        Search the marketplace
      </label>
      <input
        id={compact ? "nav-search" : "catalogue-search"}
        name="q"
        defaultValue={query}
        placeholder="A laptop, a lamp, your next good find..."
        maxLength={160}
        type="search"
      />
      <button type="submit" aria-label="Search">
        <ArrowRight size={20} aria-hidden="true" />
      </button>
    </form>
  );
}
