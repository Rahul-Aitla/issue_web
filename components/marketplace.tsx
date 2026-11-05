"use client";

import { Heart, ShoppingBag, Check, X } from "@phosphor-icons/react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products } from "@/lib/products";

type Collection = "saved" | "bag";
type Store = Record<Collection, string[]>;
type MarketContextValue = Store & {
  ready: boolean;
  toggle: (collection: Collection, id: string) => void;
  announce: (message: string) => void;
};

const MarketContext = createContext<MarketContextValue | null>(null);
const emptyStore: Store = { saved: [], bag: [] };
const storageKey = "campuscart-demo-v1";

function readStore(): Store {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
    const validIds = new Set(products.map((product) => product.id));
    const clean = (value: unknown): string[] =>
      Array.isArray(value)
        ? [...new Set(value.filter((id): id is string => typeof id === "string" && validIds.has(id)))]
        : [];
    return { saved: clean(parsed?.saved), bag: clean(parsed?.bag) };
  } catch {
    return emptyStore;
  }
}

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>(emptyStore);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setStore(readStore());
    setReady(true);
    const sync = () => setStore(readStore());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(store));
    } catch {
      // The shopping flow still works in memory when browser storage is denied.
    }
  }, [store, ready]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function toggle(collection: Collection, id: string) {
    setStore((previous) => ({
      ...previous,
      [collection]: previous[collection].includes(id)
        ? previous[collection].filter((item) => item !== id)
        : [...previous[collection], id],
    }));
  }

  return (
    <MarketContext.Provider value={{ ...store, ready, toggle, announce: setNotice }}>
      {children}
      <div className={`toast ${notice ? "visible" : ""}`} role="status" aria-live="polite">
        {notice && <><Check size={18} aria-hidden="true" /><span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={16} /></button></>}
      </div>
    </MarketContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketContext);
  if (!context) throw new Error("MarketplaceProvider is required.");
  return context;
}

export function SaveButton({ id, name }: { id: string; name: string }) {
  const { saved, toggle, announce, ready } = useMarketplace();
  const active = saved.includes(id);
  return (
    <button
      className={`save-button ${active ? "active" : ""}`}
      aria-label={`${active ? "Unsave" : "Save"} ${name}`}
      aria-pressed={active}
      disabled={!ready}
      onClick={() => {
        toggle("saved", id);
        announce(active ? "Removed from your saved finds." : "Added to your saved finds.");
      }}
    >
      <Heart size={21} weight={active ? "fill" : "regular"} aria-hidden="true" />
    </button>
  );
}

export function BagButton({ id }: { id: string }) {
  const { bag, toggle, announce, ready } = useMarketplace();
  const active = bag.includes(id);
  return (
    <button
      className={`button ${active ? "button-outline" : "button-primary"}`}
      disabled={!ready}
      onClick={() => {
        toggle("bag", id);
        announce(active ? "Removed from your pickup bag." : "Added to your pickup bag. No purchase has been made.");
      }}
    >
      {active ? <Check size={20} /> : <ShoppingBag size={20} />}
      {active ? "In your bag (remove)" : "Add to pickup bag"}
    </button>
  );
}

export function CollectionLinks() {
  const { saved, bag } = useMarketplace();
  return (
    <div className="nav-collections">
      <a href="/saved" className="nav-icon" aria-label={`Saved finds (${saved.length})`}>
        <Heart size={23} aria-hidden="true" /><span className="nav-count">{saved.length}</span>
      </a>
      <a href="/bag" className="bag-link" aria-label={`Pickup bag (${bag.length})`}>
        <ShoppingBag size={22} aria-hidden="true" /><span>My bag</span><b>{bag.length}</b>
      </a>
    </div>
  );
}
