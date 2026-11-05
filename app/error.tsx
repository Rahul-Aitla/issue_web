"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="container empty-state"><h1>A small bump in the road.</h1><p>Something went wrong while loading this page. Your demo bag is stored in your browser.</p><button className="button button-primary" onClick={reset}>Try again</button><a href="/">Back to campus</a></div>;
}
