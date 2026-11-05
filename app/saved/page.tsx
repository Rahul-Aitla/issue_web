import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";

export const metadata: Metadata = { title: "Your saved finds" };

export default function SavedPage() {
  return <div className="container page-section"><div className="page-heading"><div><h1>The ones you had your eye on<span>.</span></h1><p>Your saved finds, all in one place. Stored only in this browser.</p></div></div><CollectionPage collection="saved" /></div>;
}
