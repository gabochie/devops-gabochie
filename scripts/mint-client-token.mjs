// mint-client-token.mjs — mint a magic link for a client page (operator only, local).
// Usage: CLIENT_SECRET=<32+ random hex> node scripts/mint-client-token.mjs --id demo-acme [--days 30]
// Token: <id>.<exp>.<hmac-sha256(CLIENT_SECRET, id.exp)>. Never commit the secret.
import crypto from "node:crypto";

const args = Object.fromEntries(
  process.argv.slice(2).flatMap((a, i, arr) => {
    if (!a.startsWith("--")) return [];
    const next = arr[i + 1];
    return [[a.slice(2), next && !next.startsWith("--") ? next : "1"]];
  })
);
const secret = process.env.CLIENT_SECRET || "";
const id = args.id || "";
const days = Number(args.days || 30);
if (secret.length < 32) { console.error("CLIENT_SECRET must be 32+ chars (env only, never commit)"); process.exit(1); }
if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) { console.error("--id must be 1-64 of [A-Za-z0-9_-]"); process.exit(1); }
const exp = Math.floor(Date.now() / 1000) + days * 86400;
const sig = crypto.createHmac("sha256", secret).update(`${id}.${exp}`).digest("hex");
console.log(`https://devops.gabochie.com/app/c/?id=${id}&exp=${exp}&token=${sig}`);
