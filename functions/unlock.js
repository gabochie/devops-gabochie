// POST /unlock/ — sets the console cookie when the shared token matches.
export async function onRequestPost({ request, env }) {
  const token = (env.CONSOLE_TOKEN || "").trim();
  if (!token) return new Response("Console token not configured.", { status: 503 });
  let given = "";
  try {
    const form = await request.formData();
    given = String(form.get("token") || "").trim();
  } catch { given = ""; }
  if (!given || given !== token) {
    return new Response("Wrong token.", { status: 401, headers: { "Content-Type": "text/plain" } });
  }
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/os/",
      "Set-Cookie": `gab_console=${token}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}
