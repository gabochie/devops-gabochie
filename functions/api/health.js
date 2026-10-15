export async function onRequest() {
  return Response.json({ ok: true, time: new Date().toISOString() });
}
