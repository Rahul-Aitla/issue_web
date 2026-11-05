import { getLabMode } from "@/lib/lab";
import { corsHeaders } from "@/lib/lab-policy.mjs";

export async function GET() {
  const mode = await getLabMode();
  const response = Response.json({
    user: { name: "Alex Student", email: "alex@campus.example" },
    mode,
    note: "Fictional, publicly accessible data. This endpoint does not implement authentication.",
  });
  for (const [name, value] of Object.entries(corsHeaders(mode))) {
    if (value) response.headers.set(name, value);
  }
  return response;
}
