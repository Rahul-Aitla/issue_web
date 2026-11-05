"use client";

import { useEffect, useState } from "react";
import { ArrowClockwise, CheckCircle, WarningCircle } from "@phosphor-icons/react";

interface AccountResponse {
  user: { name: string; email: string };
  mode: "vulnerable" | "hardened";
  note: string;
}

export function AccountProbe() {
  const [data, setData] = useState<AccountResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(signal?: AbortSignal) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/account", { cache: "no-store", signal });
      if (!response.ok) throw new Error("The demo account API did not respond. Try again.");
      setData(await response.json());
    } catch (failure) {
      if (signal?.aborted) return;
      setError(failure instanceof Error ? failure.message : "Could not load the demo account.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <section className="account-api">
      <div className="panel-heading"><h2>The account API</h2><button className="text-link" onClick={() => void load()} disabled={loading}><ArrowClockwise size={17} />Refresh</button></div>
      <p>This page makes a real, same-origin request to <code>/api/account</code>. Sentinel can observe its response headers.</p>
      <div className={`api-status ${error ? "error" : ""}`} role="status">
        {loading ? "Loading the fictional account..." : error ? <><WarningCircle size={19} />{error}</> : <><CheckCircle size={19} />Demo account response received</>}
      </div>
      {data && !loading && !error && <dl className="api-details"><div><dt>Account</dt><dd>{data.user.name}</dd></div><div><dt>Email</dt><dd>{data.user.email}</dd></div><div><dt>Lab mode</dt><dd>{data.mode}</dd></div><div><dt>Data</dt><dd>Fictional, public demo data</dd></div></dl>}
      <p className="fine-print">Wildcard CORS combined with credentials is a configuration signal. Browsers reject that combination for credentialed cross-origin reads; it does not prove data theft.</p>
    </section>
  );
}
