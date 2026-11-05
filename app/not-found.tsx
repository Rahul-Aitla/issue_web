import { ArrowRight, Binoculars } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return <div className="container empty-state not-found"><Binoculars size={54} weight="light" /><p className="muted">404 / NOT FOUND</p><h1>This find has wandered off.</h1><p>That page or listing does not exist in our little campus collection.</p><a href="/search" className="button button-primary">Back to the good finds <ArrowRight size={19} /></a></div>;
}
