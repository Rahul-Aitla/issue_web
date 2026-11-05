import { headers } from "next/headers";

export type LabMode = "vulnerable" | "hardened";

export async function getLabMode(): Promise<LabMode> {
  return (await headers()).get("x-campuscart-mode") === "hardened"
    ? "hardened"
    : "vulnerable";
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}
