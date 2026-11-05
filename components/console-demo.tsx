"use client";

import { useState } from "react";
import { Terminal, CheckCircle } from "@phosphor-icons/react";
import type { LabMode } from "@/lib/lab";

export function ConsoleDemo({ mode }: { mode: LabMode }) {
  const [message, setMessage] = useState("");
  function demonstrate() {
    if (mode === "vulnerable") {
      console.error("[CampusCart DEMO] Fake diagnostic: /fictional/internal/catalogue.ts:42; demo_user=alex. No real secret or stack trace.");
      setMessage("A deliberately fake diagnostic was logged at error level. Check Sentinel's browser evidence.");
    } else {
      console.info("[CampusCart DEMO] The sample failure was handled without exposing internal diagnostics.");
      setMessage("Handled with a generic message. No diagnostic error was emitted.");
    }
  }
  return (
    <div className="console-demo">
      <button className="button button-outline" onClick={demonstrate}><Terminal size={19} />Run console demonstration</button>
      {message && <p role="status"><CheckCircle size={17} />{message}</p>}
    </div>
  );
}
