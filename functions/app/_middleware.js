// Gate: /app/* requires the shared console token (CONSOLE_TOKEN env).
// Exception: /app/c/* is the client portal — it carries its own signed
// link (id/exp/token validated by /api/client), so clients must reach it
// without the console cookie.
// Fail-closed: with no token configured, access is denied rather than exposed.
export async function onRequest({ request, env, next }) {
  const { pathname } = new URL(request.url);
  if (pathname === "/app/c" || pathname.startsWith("/app/c/")) return next();
  const token = (env.CONSOLE_TOKEN || "").trim();
  const cookie = request.headers.get("Cookie") || "";
  const authed = token && cookie.split(";").some((c) => c.trim() === `gab_console=${token}`);
  if (authed) return next();
  return Response.redirect(new URL("/unlock/", request.url), 302);
}
