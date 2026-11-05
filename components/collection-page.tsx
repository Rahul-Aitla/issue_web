"use client";

import { useState } from "react";
import { ArrowRight, Heart, ShoppingBag, X, CheckCircle, MapPin } from "@phosphor-icons/react";
import { products, formatPrice } from "@/lib/products";
import { ProductCard } from "./product-card";
import { useMarketplace } from "./marketplace";

export function CollectionPage({ collection }: { collection: "saved" | "bag" }) {
  const market = useMarketplace();
  const [reserved, setReserved] = useState(false);
  const items = products.filter((product) => market[collection].includes(product.id));
  const isBag = collection === "bag";
  const total = items.reduce((sum, product) => sum + product.price, 0);

  if (!market.ready) return <div className="collection-loading" role="status">Getting your finds ready...</div>;
  if (!items.length) return (
    <div className="empty-state">
      {isBag ? <ShoppingBag size={48} weight="light" /> : <Heart size={48} weight="light" />}
      <h2>{isBag ? "Your next find is out there." : "Keep the good ones close."}</h2>
      <p>{isBag ? "Your pickup bag is empty. Find something worth a second life." : "Tap the heart on a listing to save it for later."}</p>
      <a href="/search" className="button button-primary">Explore the finds <ArrowRight size={18} /></a>
    </div>
  );
  if (!isBag) return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;

  return (
    <div className="bag-layout">
      <div className="bag-items">
        {items.map((product) => (
          <article className="bag-item" key={product.id}>
            <a href={`/products/${product.id}`}><img src={product.image} alt={product.alt} width={160} height={160} /></a>
            <div><span className="muted">{product.category}</span><a href={`/products/${product.id}`}><h2>{product.name}</h2></a><p><MapPin size={15} />{product.location}</p><strong>{formatPrice(product.price)}</strong></div>
            <button aria-label={`Remove ${product.name} from bag`} onClick={() => { market.toggle("bag", product.id); setReserved(false); }}><X size={19} /></button>
          </article>
        ))}
      </div>
      <aside className="bag-summary">
        <h2>Your pickup plan</h2><div><span>{items.length} pre-loved {items.length === 1 ? "find" : "finds"}</span><strong>{formatPrice(total)}</strong></div>
        <div><span>Shipping</span><span>Not needed</span></div>
        <div className="bag-total"><strong>Total</strong><strong>{formatPrice(total)}</strong></div>
        <button className="button button-primary" onClick={() => setReserved(true)} disabled={reserved}>{reserved ? <><CheckCircle size={20} />Demo plan created</> : <>Try demo reservation <ArrowRight size={18} /></>}</button>
        <p className="fine-print">Simulation only. No payment, message, or real reservation is made.</p>
        {reserved && <div role="status" className="reservation-note">That&apos;s the flow! Your demo pickup plan is ready. In a real marketplace, you would arrange a handover with each seller.</div>}
      </aside>
    </div>
  );
}
