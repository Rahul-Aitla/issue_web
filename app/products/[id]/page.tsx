import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Package, Leaf, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { products, formatPrice } from "@/lib/products";
import { BagButton, SaveButton } from "@/components/marketplace";
import { ProductCard } from "@/components/product-card";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: products.find((product) => product.id === id)?.name || "Find not found" };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();
  return (
    <div className="container page-section">
      <a href="/search" className="back-link"><ArrowLeft size={17} />All good finds</a>
      <div className="product-detail">
        <div className={`detail-image ${product.color}`}><img src={product.image} alt={product.alt} width={1000} height={1000} fetchPriority="high" /></div>
        <div className="detail-copy">
          <div className="detail-kicker"><span>{product.category}</span><span className="condition"><i />{product.condition}</span></div>
          <h1>{product.name}<span>.</span></h1>
          <div className="detail-price"><strong>{formatPrice(product.price)}</strong><s>{formatPrice(product.originalPrice)}</s><span>original price</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="seller"><span className="avatar">{product.initials}</span><div><strong>{product.seller}</strong><span>Fictional campus seller</span></div><span className="seller-note"><Leaf size={17} />Second-life supporter</span></div>
          <div className="pickup-note"><MapPin size={22} /><div><strong>Pickup at {product.location.toLowerCase()}</strong><span>Local handover. No shipping fees.</span></div></div>
          <div className="detail-actions"><BagButton id={product.id} /><SaveButton id={product.id} name={product.name} /></div>
          <p className="fine-print"><ShieldCheck size={17} />Demo listing. No real purchase or seller contact.</p>
        </div>
      </div>
      <div className="section-heading related-heading"><div><h2>A few more good things.</h2><p>Your next find could be right here.</p></div><Package size={30} weight="light" /></div>
      <div className="product-grid">{products.filter((item) => item.id !== product.id).slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}</div>
    </div>
  );
}
