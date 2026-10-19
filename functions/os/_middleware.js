// Gate: /os/* requires the shared console token (CONSOLE_TOKEN env).
// Fail-closed: with no token configured, access is denied rather than exposed.
export async function onRequest({ request, env, next }) {
  const token = (env.CONSOLE_TOKEN || "").trim();
  const cookie = request.headers.get("Cookie") || "";
  const authed = token && cookie.split(";").some((c) => c.trim() === `gab_console=${token}`);
  if (authed) return next();
  return Response.redirect(new URL("/unlock/", request.url), 302);
}
