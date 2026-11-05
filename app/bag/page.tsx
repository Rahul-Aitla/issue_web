import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";

export const metadata: Metadata = { title: "Your pickup bag" };

export default function BagPage() {
  return <div className="container page-section"><div className="page-heading"><div><h1>A bag full of second chances<span>.</span></h1><p>A few good finds, ready for their next chapter.</p></div></div><CollectionPage collection="bag" /></div>;
}
