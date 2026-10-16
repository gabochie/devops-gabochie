// Gate: /os/* and /app/* require the shared console token (CONSOLE_TOKEN env).
// Fail-open while unset so the owner is never locked out; enforced once set.
export async function onRequest({ request, env, next }) {
  const token = (env.CONSOLE_TOKEN || "").trim();
  if (!token) return next();
  const cookie = request.headers.get("Cookie") || "";
  if (cookie.split(";").some((c) => c.trim() === `gab_console=${token}`)) return next();
  return Response.redirect(new URL("/unlock/", request.url), 302);
}
