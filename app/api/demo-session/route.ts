import { getLabMode } from "@/lib/lab";
import { demoCookie } from "@/lib/lab-policy.mjs";

export async function POST(request: Request) {
  const mode = await getLabMode();
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/account", request.url).toString(),
      "Set-Cookie": demoCookie(mode),
      "Cache-Control": "no-store",
    },
  });
}
