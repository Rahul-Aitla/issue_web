import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Product, formatPrice } from "@/lib/products";
import { SaveButton } from "./marketplace";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className={`product-photo ${product.color}`}>
        <a href={`/products/${product.id}`} tabIndex={-1} aria-hidden="true">
          <img src={product.image} alt={product.alt} width={600} height={480} loading="lazy" />
        </a>
        <SaveButton id={product.id} name={product.name} />
      </div>
      <div className="product-meta">
        <span>{product.category}</span>
        <span className="condition"><i />{product.condition}</span>
      </div>
      <a className="product-title" href={`/products/${product.id}`}>
        <h3>{product.name}</h3><ArrowUpRight size={19} aria-hidden="true" />
      </a>
      <div className="product-price">
        <strong>{formatPrice(product.price)}</strong>
        <s>{formatPrice(product.originalPrice)}</s>
      </div>
      <p className="product-location"><MapPin size={14} aria-hidden="true" />{product.location}</p>
    </article>
  );
}
