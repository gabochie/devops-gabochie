
const D=[
{id:"buildcostgh",t:"Construction Cost Estimator",n:"Ghana house/commercial estimator with PDF/XLSX + MoMo/cards",s:"Next16 Prisma PG NextAuth",d:"Vercel → buildcostgh.com",u:"buildcostgh.com",sc:5,cat:"sell",fix:"Verify Prisma migrate on Vercel build",sell:"Show to contractors/realtors. Record 60-sec PDF demo."},
{id:"sporafind",t:"Diaspora Intelligence SaaS",n:"Ghanaian diaspora people/org search + Stripe Free/$29/$99",s:"Express EJS + FastAPI + Supabase",d:"Vercel",u:"www.sporafind.com + api.sporafind.com",sc:5,cat:"sell",fix:"Keep CORS/env in sync",sell:"Show to recruiters/NGOs. Already sellable."},
{id:"studio.gabochie",t:"School of Creativity LMS",n:"Courses, payments, subs, certs, email automation",s:"Static + CF Pages Functions + D1 + R2",d:"Cloudflare Pages",u:"studio.gabochie.com",sc:5,cat:"sell",fix:"Run npm run predeploy (lint+FK check)",sell:"Show to schools/churches/coaches."},
{id:"ghbc",t:"Building Code Compliance AI",n:"GS1207:2018 27k requirements search - your architect edge",s:"Next15 SQLite FTS + OpenNext CF + Clerk",d:"Cloudflare",u:"ghbc.gabochie.com",sc:5,cat:"sell",fix:"Verify corpus ingest + D1 seed in prod",sell:"Show to architects/assemblies/lawyers."},
{id:"muse",t:"Music Commerce OS",n:"African music rights/licensing + USDC rails",s:"Turbo monorepo Prisma Wrangler",d:"Cloudflare",u:"muse.gabochie.com (to route)",sc:5,cat:"sell",fix:"Pin per-app deploy (web/admin/worker)",sell:"Show to labels/artists."},
{id:"devops-gabochie",t:"DevOps Services Landing",n:"Your productized hardening service + portfolio console",s:"Static + Pages Functions",d:"Cloudflare Pages",u:"devops.gabochie.com",sc:4,cat:"fix",fix:"Add GITHUB_TOKEN secret, confirm prod deploy",sell:"Proof you do DevOps."},
{id:"web.gabochie",t:"Web Design Agency + 161 leads",n:"CRO sales platform, proposals, client portal",s:"Static + Functions + D1 (ID placeholder!)",d:"Cloudflare Pages",u:"web.gabochie.com",sc:4,cat:"fix",fix:"BROKEN RISK: fill D1 database_id, add README, fix npm test",sell:"Your own lead machine."},
{id:"KlagonOrg",t:"Klagon College + Maps",n:"Courses + MapLibre maps + Supabase content",s:"Next15 Supabase MapLibre",d:"Undecided → use Vercel",u:"—",sc:4,cat:"fix",fix:"Add README + deploy target",sell:"Template for schools/NGOs."},
{id:"neogh",t:"Youth Platform",n:"Learn/play/jobs gamified",s:"Static + Functions + D1",d:"Cloudflare Pages",u:"neogh.org",sc:4,cat:"fix",fix:"Pick canonical domain, add README",sell:"Show to youth orgs."},
{id:"cosolo",t:"GTM Executor for Solos",n:"Verifiable task + audit trail",s:"Hono CF Workers D1",d:"Cloudflare Workers",u:"—",sc:4,cat:"fix",fix:"Add README + domain route",sell:"Show to indie hackers."},
{id:"gtpm",t:"Tech & Power Map",n:"Company monitoring + alerts",s:"Hono D1",d:"Cloudflare Workers",u:"gtpm.gabochie.com",sc:4,cat:"fix",fix:"Commit alert routes + README",sell:"Show to investors/research."},
{id:"lutterodt",t:"Family Archive (paid work)",n:"Lutterodt.org directory for PL Missions",s:"Next16 D1/KV OpenNext MCP",d:"Cloudflare Workers",u:"lutterodt.org",sc:4,cat:"fix",fix:"Add custom domain route",sell:"Proof: NGO paid you."},
{id:"kog",t:"Biblical Law Library",n:"613 mitzvot + KJV + giving",s:"Next16 Clerk OpenNext CF",d:"Cloudflare",u:"kog.gabochie.com",sc:4,cat:"fix",fix:"Confirm Clerk prod keys + DNS",sell:"Show to churches."},
{id:"OmniRoute",t:"AI Gateway (fork)",n:"291 providers / 516 models one endpoint",s:"Node Next Express MCP",d:"npm/Docker",u:"omniroute.online",sc:5,cat:"fix",fix:"Clarify fork, add demo link",sell:"DevOps story, not SaaS product."},
{id:"Gh2047",t:"Ghana 2047 Civic OS",n:"Vision-to-results + admin command center",s:"Next FastAPI pgvector agents",d:"Self-host undecided",u:"—",sc:4,cat:"fix",fix:"Commit admin changes, pin deploy",sell:"Moonshot - show vision."},
{id:"aiw",t:"SME RevOps CRM",n:"Pipeline + CRM for Ghana SMEs",s:"FastAPI + npm workspaces",d:"Undecided",u:"—",sc:3,cat:"fix",fix:"Split api/web deploys",sell:"Show to SMEs."},
{id:"calcgh",t:"9 Free Ghana Calculators",n:"WAEC VAT loans BMI etc",s:"Vanilla JS Playwright",d:"Static",u:"— (deploy me)",sc:3,cat:"fix",fix:"Deploy to Pages, link README",sell:"Lead magnet - free tools → paid builds."},
{id:"ofl",t:"Travel + AI Voice Agent",n:"Sabre + Stripe booking MVP",s:"Next14 Supabase Stripe",d:"Vercel inferred",u:"—",sc:3,cat:"fix",fix:"Add README + env docs",sell:"Show to travel agencies."},
{id:"trustinfraos",t:"Contractor Infra OS",n:"Contractor tooling + CF Access auth",s:"Next15 Supabase",d:"Vercel + CF Access",u:"—",sc:3,cat:"fix",fix:"Add README + vercel.json",sell:"Show to contractors."},
{id:"green",t:"Stewardship Platform",n:"Voice agent + academy + properties",s:"pnpm Turbo Prisma Docker",d:"Undecided",u:"—",sc:3,cat:"all",fix:"Commit worktree, add README",sell:"Merge or park."},
{id:"toolsgh",t:"SME Tools Marketplace",n:"Membership + Appwrite",s:"Express Appwrite",d:"VPS/Render",u:"—",sc:3,cat:"all",fix:"Add README + Procfile",sell:"Show to SME hubs."},
{id:"guitarwaa",t:"Learn Guitar 30 Days",n:"Gamified browser app",s:"Vanilla JS",d:"Static",u:"— (deploy me)",sc:3,cat:"all",fix:"Deploy + live URL",sell:"Fun demo, low priority."},
{id:"cleanup",t:"🧹 GitHub Cleanup (12 folders)",n:"Delete/merge: _localwp-backups, infra, worktrees, DB-backups, gabochie-deploy→GabochieNew, GAWhatsapp-React→GAWhatsapp, beth≈build duplicate, InfraGabochie rename. PRIVATE: DBGabochie (real leads - keep local). Zero-commit: airevops, plf, temafind, farlord, WAOutreach - git init or delete.",s:"Hygiene",d:"—",u:"—",sc:1,cat:"clean",fix:"Do this to look professional before sharing GitHub",sell:"Clean GitHub = higher rate."},
{id:"cai-aec-cc",t:"AEC Command Center [C:\\AI]",n:"Agentic OS for 1-person architecture practice: brief → next-actions with approval",s:"Next15 + FastAPI + PG16 + Docker",d:"Docker local :3000/:8000",u:"— (local only)",sc:3,cat:"cai",fix:"Zero commits - git add/commit, rotate JWT keys, pick VPS deploy",sell:"Solo-architect copilot - your architect edge."},
{id:"cai-aec-os",t:"AEC Project OS [C:\\AI]",n:"AI-native AEC intelligence: status/blockers/risks/cost + 3D views",s:"Next16 Three.js FastAPI IfcOpenShell Docker",d:"Docker local",u:"— (local only)",sc:4,cat:"cai",fix:"No git - git init, wire envs, choose deploy + persistent DB",sell:"BIM-lite for small firms."},
{id:"cai-builder",t:"AI App Builder OS [C:\\AI]",n:"No-code builder: dashboards + sprint planner + 200 prompts",s:"React19 Vite6 Express Gemini",d:"Node dist + Docker",u:"— (local only)",sc:4,cat:"cai",fix:"No root README, dirty tree - commit + add README",sell:"Vibe-to-prod factory demo."},
{id:"cai-mywa",t:"WhatsApp Lead Miner [C:\\AI]",n:"Extract contacts incl groups, E164 dedupe, segment lists + scoring",s:"Python zero-deps CLI + CF Worker + D1",d:"Cloudflare Worker",u:"mywa.gabochie.com",sc:4,cat:"cai",fix:"Dirty tree - pytest, commit, verify D1 deploy",sell:"Real-estate lead miner - HIGH value."},
{id:"cai-sales",t:"AI Sales Cold-Caller [C:\\AI]",n:"Prospects → AI calls → scoring → CRM + booking, Demo/Dry/Live",s:"FastAPI PG Electron Twilio Ollama HubSpot",d:"Docker VM :8001 + Electron",u:"— (VM only)",sc:4,cat:"cai",fix:"Set webhook URL, rotate secrets, verify telephony",sell:"Compliant AI SDR - cost-per-meeting."},
{id:"cai-vibe",t:"Vibe-to-Prod Toolkit [C:\\AI]",n:"Harden prototypes to prod: 19-item gate + CI + PWA + Ghana pay",s:"Node/Next PWA + OpenCode plugin",d:"Toolkit (CF/Pages/Vercel adapters)",u:"— (toolkit)",sc:4,cat:"cai",fix:"Run self-check.mjs per repo, pick 1 adapter",sell:"Sell as harden-audit service."},
{id:"cai-ghdfih",t:"Ghana Freedom Index [C:\\AI]",n:"Regulatory intel: instruments, consultations, claims, scoring",s:"Next16 Prisma SQLite",d:"Next start (needs vercel.json)",u:"— (local only)",sc:4,cat:"cai",fix:"Boilerplate README, no git, SQLite - init + PG for prod",sell:"Policy SaaS for NGOs/startups."},
{id:"cai-mvp",t:"MVP Testing Pack [C:\\AI]",n:"Solo-dev PWA ops: prompts + checklists + Ghana payments",s:"Docs-kit + Supabase + Paystack",d:"Vercel implied",u:"— (docs kit)",sc:3,cat:"cai",fix:"Fill price IDs + Stripe human step",sell:"Launch-QA system for freelancers."},
{id:"cai-wagru",t:"WhatsApp Group Miner [C:\\AI]",n:"Group reports + auth API + React web",s:"Express SQLite JWT React Vite",d:"Docker :3001 or :8787",u:"— (local only)",sc:3,cat:"cai",fix:"Add README, rotate JWT, lock CORS *",sell:"Lead-group miner + marketplace."},
{id:"cai-call",t:"Call Spec (merge me) [C:\\AI]",n:"2557-line voice-agent spec only, no code",s:"Markdown spec",d:"—",u:"—",sc:1,cat:"cai",fix:"Merge into sales-voice-agent, delete folder",sell:"SOP only, not product."},
{id:"cai-scaf",t:"🧹 CAI Scaffolds (5 empties)",n:"apps, packages, scripts, infrastructure, docs = empty .gitkeep only. backups = DB snapshot only.",s:"Empty",d:"—",u:"—",sc:1,cat:"clean",fix:"Scaffold or delete - currently clutter",sell:"No value until built."},
];
const tabs=[["execute","▶ Execute Now",1],["top8","⭐ Top 8 + Cases",8],["ready","🟢 Ready Check",1],["repos","📁 Repos Clean/Dirty",45],["sell","💰 Sell Now",5],["fix","🔧 Needs Fix",14],["cai","🤖 C:\\AI Mine",11],["live","🌐 Live Check",13],["clean","🧹 Cleanup",18],["plan","✅ 7-Step Plan",1],["all","📦 All",67]];
let active="execute";
function renderNav(){
const navEl=document.getElementById("nav"),mnavEl=document.getElementById("mnav");
if(navEl)navEl.innerHTML=tabs.map(t=>`<button class="${active===t[0]?'active':''}" data-go="${t[0]}">${t[1]}<span class="c">${t[2]}</span></button>`).join('');
if(mnavEl)mnavEl.innerHTML=tabs.map(t=>`<button class="${active===t[0]?'active':''}" data-go="${t[0]}">${t[1]}</button>`).join('');
}
function badge(c){return c==='sell'?'<span class="badge g">SELL</span>':c==='fix'?'<span class="badge a">FIX</span>':c==='clean'?'<span class="badge r">CLEAN</span>':c==='cai'?'<span class="badge b">C:\\AI</span>':'<span class="badge b">INFO</span>'}
function go(c){active=c;document.getElementById('detail').classList.remove('show');renderNav();render();document.querySelector('.content').scrollTop=0}
function render(){
const q=document.getElementById('q').value.toLowerCase();
if(active==='plan'){document.getElementById('cards').innerHTML='';showPlan();return}
if(active==='top8'){document.getElementById('cards').innerHTML='';showTop8();return}
if(active==='ready'){document.getElementById('cards').innerHTML='';showReady();return}
if(active==='repos'){document.getElementById('cards').innerHTML='';showRepos(q);return}
if(active==='execute'){document.getElementById('cards').innerHTML='';showExecute();return}
let list=[];
if(active==='all'){list=D.slice()}
else if(active==='live'){list=D.filter(x=>(x.u||'').includes('.'))}
else if(active==='fix'){list=D.filter(x=>x.cat==='fix'||(x.cat==='all'))}
else{list=D.filter(x=>x.cat===active)}
if(q)list=list.filter(x=>(x.t+x.n+x.s+x.id).toLowerCase().includes(q));
document.getElementById('static').innerHTML='';
document.getElementById('cards').innerHTML=list.map(x=>`<div class="card" data-open="${x.id}" role="button" tabindex="0"><div style="display:flex;justify-content:space-between;align-items:center">${badge(x.cat)}<span style="font-size:12px;color:var(--mut)">★ ${x.sc}/5</span></div><h3>${x.t}</h3><p><b style="color:var(--txt)">${x.id}</b> — ${x.n}</p><p>🛠 ${x.s}<br>🚀 ${x.d}<br>🌐 ${x.u}</p></div>`).join('')||'<p style="color:var(--mut)">No matches. Try another search.</p>';
}
function openD(id){
const x=D.find(y=>y.id===id);if(!x)return;
const el=document.getElementById('detail');
el.innerHTML=`<div style="display:flex;justify-content:space-between"><h2>${x.t}</h2><button class="btn ghost" data-close>✕ Close</button></div>
<div class="row">${badge(x.cat)}<span class="badge b">★ ${x.sc}/5</span><span class="badge b">${x.s}</span></div>
<div class="kv"><div>What it is</div><div>${x.n}</div><div>Deploy</div><div>${x.d}</div><div>Live URL</div><div>${x.u}</div></div>
<div class="fixbox"><b>🔧 Fix to sell:</b> ${x.fix}</div><div class="sellbox"><b>💰 Sell angle:</b> ${x.sell}</div>
<div class="row" style="margin-top:12px"><button class="btn" data-verify-one="${x.u}">Open live link</button></div>`;
el.classList.add('show');el.scrollIntoView({behavior:'smooth'});
}
function store(k){try{return JSON.parse(localStorage.getItem(k)||"{}")}catch(e){try{localStorage.removeItem(k)}catch(_){}return{}}}
function showExecute(){
const SHOWCASE=["buildcostgh","sporafind","GhBuildingCode","mywa","gtpm","web.gabochie.com","lutterodt","studio-gabochie"];
const PROOF=["buildcostgh","mywa","GhBuildingCode"];
const HUMAN=["LinkedIn headline + banner + featured (human: your account)","Upwork 3 Projects live (human: your account)","DM pilots — contractors / realtors / firms (human: your voice)","Record 3×60s Looms (human: your face)"];
let auto=store("gab_auto");
let sec=store("gab_sec");
const keys=["live","feed","flow","public","push","proof"];
const n=keys.filter(k=>auto[k]&&auto[k].ok===true).length, pct=Math.round(n/keys.length*100);
const tick=(ok)=>ok===true?"✅":ok===false?"❌":"⏳";
const row=(k,label)=>`<div class="sellbox">${tick(auto[k]&&auto[k].ok)} <b>${label}</b>${auto[k]&&auto[k].detail?" — <small>"+auto[k].detail+"</small>":""}</div>`;
document.getElementById('static').innerHTML=`<div class="detail show"><h2>▶ Execute — ${n}/${keys.length} auto-verified (${pct}%)</h2><div style="background:var(--bg);border-radius:10px;height:14px;overflow:hidden"><div style="width:${pct}%;height:100%;background:linear-gradient(90deg,var(--acc),var(--grn))"></div></div>
<h3>🤖 Event-driven — system verifies, you only do security <button class="btn ghost" data-run-auto>Run auto-verify</button> <small style="color:var(--mut)">${auto.ts?"last: "+auto.ts:"never run"}</small></h3>
${row("live","6 lives responding")}${row("feed","Audit feed fresh + green")}${row("flow","Nightly audit succeeding")}${row("public","8 showcase repos public")}${row("push","Showcase pushes on GitHub (Oct 16+)")}${row("proof","README proof blocks live")}
<h3>🔒 Security gate — human only <label style="display:flex;gap:10px;padding:8px;border:1px solid var(--line);border-radius:8px;margin:6px 0;cursor:pointer"><input type="checkbox" ${sec.del?"checked":""} data-toggle-sec style="width:18px;height:18px"><span style="${sec.del?"text-decoration:line-through;opacity:.6":""}">I reviewed + deleted the 11 no-git clutter folders (deletes are irreversible)</span></label></h3>
<h3>🔍 Public frontend audit vs facts.txt — 6.5/10 → all 4 gaps FIXED Oct 16 (8366308, live)</h3><div class="sellbox"><b>PASS:</b> hybrid positioning (no junior signals) · 4 PR-linked cases + live stats · free magnets · MoMo · monitoring in gate.</div><div class="fixbox"><b>4 load-bearing gaps:</b> 1) architect identity ABSENT · 2) agentic story ABSENT · 3) no price anchors ($1,500–2,500 never stated) · 4) no human face. Fix: founder strip → market Gate 3 as triage-agent demo → guardrails insight post → starting-at prices.</div>
<h3>🔒 Consoles gated Oct 16 (live)</h3><div class="fixbox"><b>Done:</b> /os/ + /app/ behind CONSOLE_TOKEN cookie gate (fail-open until set), /unlock/ page, shared nav, noindex on /os/. <b>Your 2-min step:</b> Pages → devops-gabochie → Settings → Variables → secret CONSOLE_TOKEN → Redeploy → open /unlock/ once.</div>
<h3>🧍 Human lane — no ticks needed, excluded from %</h3>${HUMAN.map(h=>`<div class="fixbox">${h}</div>`).join("")}
<p><button class="btn ghost" data-reset-exec>Reset</button> Progress saves in this browser.</p><h3>🤖 Autonomy — supervised, not self-driving</h3><div class="sellbox"><b>Gate 2 ✅ LIVE Oct 16:</b> Demo→Dry→Live contract live — <code>data/mode.json</code> + <code>scripts/mode.mjs</code> + <code>audit.mjs</code> reports <code>fleet_mode</code>. Current mode: <b>${(auto.mode||"demo").toUpperCase()}</b> (from metrics.json). Mutating scripts call <code>assertLive()</code> and refuse anything beyond demo. Flipping to live is a human act: edit mode.json + commit.</div><div class="fixbox"><b>Never automate:</b> push, deploys, deletes, DMs, posts, billing, lead data — human approve every time.<br><b>Safe to automate:</b> status scans, live checks, README proof-checks, audit writes to own data/.<br><b>Professional =</b> every claim has file:line evidence + green gate re-run + rollback plan. Automate proof capture, not promises.</div>
<div class="sellbox"><b>Demo scan ✅ Oct 16 12:10 (read-only, file: demo-scan.ps1):</b> Dirty 2 by design (DBGabochie 3 private, freellmapi 2 third-party). D1 placeholders 0 in fixed files; new finds: lutterodt preview DB/KV (2), calcgh Flutterwave test fallback (1). Lives 6/6 listed for check. Next: Dry-mode (diffs only, no apply).</div>
<div class="sellbox"><b>Gate 1 ✅ APPLIED + PUSHED Oct 16:</b> Guards committed + pushed (mywa ec3e185, aec 601aa85 → new PRIVATE gabochie/aec-command-center). Compose fail-loud on JWT/ENCRYPTION_KEY. <b>Push wave ✅:</b> all 14 in sync — web, buildcostgh, ghbc, gtpm, Gh2047, green, beth (remote fixed), GDFII, airevops, plf, ai-builder. New repos private; flip showcase ones public when ready.</div>
<div class="sellbox"><b>Gate 3 ✅ LIVE Oct 16 (95a0f50, pushed):</b> True loop running — scripts/audit.mjs checks 6 lives + placeholders + .env guard, appends data/audit-log.jsonl, updates data/metrics.json. First run: 100% live, 0 placeholders, guard pass. Schedule: Sun 06:00 UTC + manual dispatch; commits only data/*.json. Weekly numbers: live %, placeholders, guard. Feed public ✅ metrics.json readable (100/0/pass). First Actions run ✅ success 16s Oct 16 (workflow_dispatch). Both checkouts synced.</div>
<div class="fixbox"><b>Dry-mode diff — lutterodt preview (NOT applied Oct 16):</b><br>Prod OK: D1 97d98aca… + KV 260a… real. Preview has 2 placeholders → PR previews fail, prod fine.<br>Proposed diff: comment out env.preview block (6 lines) + note “preview disabled — D1 limit”. Zero cloud changes, zero prod risk. Say GO to apply.</div></div>`;
}
function toggleSec(){let s=store("gab_sec");s.del=!s.del;localStorage.setItem("gab_sec",JSON.stringify(s));showExecute()}
async function runAutoVerify(){
const SHOWCASE=["buildcostgh","sporafind","GhBuildingCode","mywa","gtpm","web.gabochie.com","lutterodt","studio-gabochie"];
const PROOF=["buildcostgh","mywa","GhBuildingCode"];
const LIVES=["https://buildcostgh.com","https://www.sporafind.com","https://studio.gabochie.com","https://ghbc.gabochie.com","https://devops.gabochie.com","https://mywa.gabochie.com"];
const auto=store("gab_auto");
const j=async(u)=>{const r=await fetch(u,{cache:"no-store"});if(!r.ok)throw new Error(r.status);return r.json()};
const t=async(u)=>{const r=await fetch(u,{cache:"no-store"});if(!r.ok)throw new Error(r.status);return r.text()};
const ping=async(u)=>{try{const c=new AbortController();const s=setTimeout(()=>c.abort(),12000);await fetch(u,{mode:"no-cors",signal:c.signal});clearTimeout(s);return true}catch(e){return false}};
// 1. lives
const ups=await Promise.all(LIVES.map(ping));const n=ups.filter(Boolean).length;
auto.live={ok:n===LIVES.length,detail:n+"/"+LIVES.length+" reachable"};
// 2+3. audit feed (fresh <8d + green)
try{
const m=await j("https://raw.githubusercontent.com/gabochie/devops-gabochie/master/data/metrics.json");
const fresh=(Date.now()-new Date(m.updated).getTime())<8*864e5;
auto.feed={ok:fresh&&m.live_pct===100,detail:"live "+m.live_pct+"% · "+String(m.updated).slice(0,10)};
auto.guard={ok:m.guard_pass===true&&m.placeholders===0,detail:"placeholders "+m.placeholders+" · guard "+(m.guard_pass?"pass":"FAIL")};
auto.mode=m.fleet_mode||"demo";
}catch(e){auto.feed={ok:false,detail:"metrics.json unreachable"};auto.guard={ok:null,detail:"waiting on audit feed"}}
// 4. workflow succeeding (public repo)
try{
const r=await j("https://api.github.com/repos/gabochie/devops-gabochie/actions/runs?per_page=1");
const w=r.workflow_runs[0];
auto.flow={ok:w&&(w.conclusion==="success"||w.status==="in_progress"),detail:w?w.name+" "+(w.conclusion||w.status):"no runs"};
}catch(e){auto.flow={ok:null,detail:"actions API unreachable (rate limit?)"}}
// 5+6. showcase visibility + pushes + proof (public repos only; private = blocked, flip to unlock)
const pub=[],priv=[];
for(const name of SHOWCASE){
try{
const r=await j("https://api.github.com/repos/gabochie/"+name);
if(r.private){priv.push(name)}else{pub.push({name,branch:r.default_branch,pushed:r.pushed_at})}
}catch(e){priv.push(name+"?")}
}
auto.public={ok:priv.length===0,detail:priv.length?("private: "+priv.join(", ")):(pub.length+" public")};
const freshOk=pub.filter(p=>p.pushed&&p.pushed>="2026-10-16");
auto.push={ok:pub.length>0&&freshOk.length===pub.length,detail:freshOk.length+"/"+pub.length+" pushed Oct16+"+(priv.length?" · private skipped: "+priv.join(", "):"")};
let proofOk=[],proofMiss=[];
for(const p of pub.filter(p=>PROOF.includes(p.name))){
try{const body=await t("https://raw.githubusercontent.com/gabochie/"+p.name+"/"+p.branch+"/README.md");(body.includes("Live Demo")?proofOk:proofMiss).push(p.name)}catch(e){proofMiss.push(p.name+"?")}
}
auto.proof={ok:proofOk.length>0&&proofMiss.length===0,detail:proofOk.length?("proof in: "+proofOk.join(", ")):"no public proof yet"+(proofMiss.length?" · missing: "+proofMiss.join(", "):"")};
auto.ts=new Date().toISOString().slice(0,16).replace("T"," ");
localStorage.setItem("gab_auto",JSON.stringify(auto));showExecute();
}
function showRepos(q){
const dirty=["airevops-gabochie|14?? first commit|GitHub","plf|6?? first commit|GitHub","aec-command-center|6?? first commit|C:AI","beth.gabochie|15D cache purge|GitHub","DBGabochie|3M PRIVATE do not commit|GitHub","GDFII|1?? gdfii/|GitHub","Gh2047|15+M admin|GitHub","green.gabochie|15+M app|GitHub","gtpm|9M+7?? alerts|GitHub","web.gabochie.com|1M wrangler fixed|GitHub","_deleted-backup|15D delete folder|GitHub","ai-builder|5M+3??|C:AI","mywa|4M+3??|C:AI","freellmapi|2?? third-party ignore|C:AI"];
const clean=["buildcostgh|GitHub","sporafind|GitHub","studio.gabochie|GitHub","ghbc.gabochie.com|GitHub","muse.gabochie|GitHub","devops-gabochie|GitHub","KlagonOrg|GitHub","neogh|GitHub","cosolo|GitHub","lutterodt|GitHub","knowledge-of-god|GitHub","godnology|GitHub","mimetai|GitHub","calcgh|GitHub","guitarwaa|GitHub","gabochie|GitHub","GabochieNew|GitHub","GAWhatsappOutreach|GitHub","gbp-revenue-recovery|GitHub","TheNewGhanaX|GitHub","toolsgabochie|GitHub","toolsgabochiedesign|GitHub","trustinfraos|GitHub","temafind?no-git|GitHub","psalms.gabochie|GitHub","oflyfomvp?no-git-fix|GitHub","sales-voice-agent|C:AI","vibe-to-prod-toolkit|C:AI","mywa?see dirty|C:AI","Gh2047?see dirty|—","plus 12 no-git folders (delete/merge list in Cleanup tab)"];
const f=(s)=>!q||s.toLowerCase().includes(q);
document.getElementById('static').innerHTML=`<div class="detail show"><h2>📁 Repos — Clean (31) vs Dirty (14) — scan 11:55</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${["<div><h3 style=color:#fca5a5>🔴 Dirty — fix me</h3>"+dirty.filter(f).map(d=>{const[a,b,c]=d.split("|");return `<div class="fixbox"><b>${a}</b> <small>${c}</small><br>${b}</div>`}).join("")+"</div>","<div><h3 style=color:#4ade80>🟢 Clean — shareable</h3>"+clean.filter(f).map(d=>{const[a,b]=d.split("|");return `<div class="sellbox"><b>${a}</b> <small>${b}</small></div>`}).join("")+"</div>"].join("")}</div><p style="color:var(--mut)">Search filters both columns. Dirty = git status non-empty. Clean = git status empty.</p></div>`;
}
function showReady(){
document.getElementById('static').innerHTML=`<div class="detail show">
<h2>🟢 Are We Tech-Stack Ready? 95% — Clean Oct 16 12:05</h2>
<p><b>Fixed today (15 commits):</b> web D1, buildcostgh/ghbc/mywa docs, mywa/ai-builder/gtpm/Gh2047/green/beth code, GDFII, airevops/plf/aec first commits, ignores. <b>Left dirty by design (3):</b> DBGabochie 3M private — never commit, _deleted-backup 236 — delete folder, freellmapi 2?? third-party — ignore.</p>
<p><b>Done today:</b> build.gabochie duplicate → renamed to _deleted-build.gabochie-duplicate-backup (identical file names confirmed). beth + web now reuse gabochie-db f5c24c14… (D1 limit hit, cannot create new). Split to dedicated DBs later after deleting unused D1.</p>
<ol>
<li><b>FIXED:</b> placeholders replaced — beth DB + web RJ_DB both point to gabochie-db. No more 500 on missing ID.</li>
<li><b>DIRTY NOW (14 repos, fresh scan Oct 16 11:55):</b> airevops (14?? first commit), plf (6?? first commit), aec-command-center (6?? first commit), beth (15D cache clean), DBGabochie (3M private — DO NOT COMMIT), GDFII (1?? gdfii/), Gh2047 (15+M admin), green (15+M app), gtpm (9M+7?? alerts), web (1M wrangler — already fixed, commit me), _deleted-backup (15D — delete folder), ai-builder (5M+3??), mywa (4M+3??), freellmapi (2?? third-party — ignore).</li>
</ol>
<h2>🔧 Fix Roadmap (started Oct 16) — Sell = services, not code</h2>
<div class="sellbox"><b>Sell means:</b> PRIMARY = use builds as case studies to sell $900-2,200 fixed services. You keep IP, reuse templates. SECONDARY later = SaaS rent ($29-99/mo). Do services first for cash, SaaS after 3 clients. Do NOT sell source outright.</div>
<h2>Should we change socials? Yes — 1h</h2>
<div class="fixbox">LinkedIn headline → Solutions Architect & Full-Stack Engineer | Next Supabase Cloudflare | Ghana SaaS | Ex-Architect. Banner → trilogy screenshots. Featured → 3 case links. GitHub pin → buildcostgh, sporafind, mywa, ghbc, devops-gabochie. Bio line 1 → Fixed-price MVPs $900-2,200.</div>
<h2>Marketing content? Yes — 2-week sprint</h2>
<div class="sellbox">Wk1 Mon/Wed/Fri = LI-1/2/3 already in Top 8 tab. Wk2 = demo Looms (60 sec each) + before/after screenshots + 1 hardening post from devops-gabochie console. No new code, just proof.</div>
<h2>Proactive outreach? Yes, but AFTER 4h fixes</h2>
<div class="fixbox">Day 1-2 fix blockers. Day 3 post LI-1 + 10 DMs to contractors with free 10-item demo offer. Day 5 post LI-2 + 10 DMs to realtors with 100 free cleaned contacts. Day 7 post LI-3 + 5 pilot DMs to firms. Track in web.gabochie.com leads (161 already).</div>
<h2>Portfolio optimized? Partially — 6/10</h2>
<div class="fixbox">Top 8 scored + cards done. Missing: live verify ticks, READMEs as blueprints, cleanup merges (12 folders), custom-domain HTTPS ticks. Do Ready fixes → 9/10.</div>
<p><b>Next 3 moves in order:</b> 1) 4h delivery fixes, 2) 1h socials, 3) start LI + DM sprint. Want me to start with the 4h fix list?</p>
<h2>📦 Commit Plan (Oct 16) — copy-paste, safe</h2>
<div class="fixbox"><b>Rule:</b> commit code, IGNORE machine junk (.omo/, .wrangler/state, *.sqlite-wal, .playwright-mcp).<br>
mywa: git add START_DASHBOARD.bat cloud/public/index.html mywa/landing.html mywa/server.py tests/test_server.py tests/fixtures + echo .omo/ >> .gitignore → commit "feat(mywa): dashboard + landing + server + tests"<br>
ai-builder: git add src/server tests + echo .omo/ >> .gitignore → commit "feat(builder): agent + validation + security hardening"<br>
Gh2047: git add apps/web → commit "feat(admin): command-center shell"<br>
gtpm: git add public src wrangler.jsonc → commit "feat(gtpm): alerts + discovery routes"<br>
green: git add apps → commit "feat(green): properties + academy pages"</div>
<h2>📘 README Blueprints — trilogy already strong, just append</h2>
<div class="sellbox">buildcostgh (113 lines OK), mywa (99 lines OK), ghbc (98 lines OK) — do NOT rewrite. Append at bottom: ## Live Demo [link] + ## Case Study (Problem/Build/Result/CTA from Top 8 tab) + architecture diagram. I checked — only ghdfih/temafind need full rewrites.</div>
</div>`;
}
function showPlan(){
document.getElementById('static').innerHTML=`<div class="detail show"><h2>✅ 7-Step Nocoder Plan (20-25h this week)</h2>
<ol><li><b>Open each Sell-Now link (3h):</b> screenshot if loads, note error if not.</li><li><b>One-paragraph README (4h):</b> What / who pays / how to run / live link.</li><li><b>Domains + HTTPS (2h):</b> confirm *.gabochie.com, sporafind, neogh.org in Cloudflare DNS.</li><li><b>Replace placeholders (3h):</b> search TODO/placeholder/1234 in beth, build, web.gabochie.</li><li><b>Commit clean (2h):</b> Gh2047, green, gtpm, DBGabochie dirty - commit/stash.</li><li><b>3 case studies (5h):</b> buildcostgh, sporafind, studio - problem/build/screenshot/result.</li><li><b>Update pitch (1h):</b> Say Next+Supabase+Cloudflare+Vercel, not Vercel-only.</li></ol>
<p><b>Copy-paste headline:</b> Solutions Architect & Full-Stack Engineer | Next.js, Supabase, Cloudflare | Ghana-ready SaaS | Ex-Architect</p></div>`;
}
function showTop8(){
document.getElementById('static').innerHTML=`<div class="detail show">
<h2>⭐ Recommendation — Top 8 Across GitHub + C:\\AI (Oct 16 2026)</h2>
<p style="color:var(--mut)">Scored for: fast freelance cash + architect moat + live proof. 20-25h/week, family-first.</p>
<ol>
<li><b>buildcostgh 9.2 [GitHub]</b> — Estimator + PDF. <b>Fix:</b> Vercel Prisma migrate. <b>Sell to:</b> contractors. <button class="btn ghost" data-open="buildcostgh">Open card</button></li>
<li><b>cai-mywa 9.0 [C:\\AI]</b> — WhatsApp → leads. <b>Fix:</b> pytest + commit + D1 verify. <b>Sell to:</b> realtors. <button class="btn ghost" data-open="cai-mywa">Open card</button></li>
<li><b>ghbc 8.8 [GitHub]</b> — Code AI, 27k clauses. <b>Fix:</b> corpus ingest prod. <b>Sell to:</b> architects/assemblies. <button class="btn ghost" data-open="ghbc">Open card</button></li>
<li><b>sporafind 8.7 [GitHub]</b> — Diaspora + Stripe $29-99. <b>Fix:</b> CORS/env sync. <b>Sell to:</b> recruiters. <button class="btn ghost" data-open="sporafind">Open card</button></li>
<li><b>studio.gabochie 8.5</b> — LMS + certs. <b>Fix:</b> predeploy check. <b>Sell to:</b> schools/churches. <button class="btn ghost" data-open="studio.gabochie">Open card</button></li>
<li><b>cai-sales 8.3 [C:\\AI]</b> — AI caller Demo/Dry/Live. <b>Fix:</b> webhook + secrets. <b>Sell as:</b> Agentic DevOps proof. <button class="btn ghost" data-open="cai-sales">Open card</button></li>
<li><b>devops-gabochie 8.0</b> — Hardening console live. <b>Fix:</b> GITHUB_TOKEN. <b>Sell as:</b> process proof. <button class="btn ghost" data-open="devops-gabochie">Open card</button></li>
<li><b>muse 7.8</b> — Music + USDC. Park until 1-5 done. <button class="btn ghost" data-open="muse">Open card</button></li>
</ol>
<h2>📄 First 3 Case Studies — Architect Money Trilogy</h2>
<div class="sellbox"><b>Case 1: BuildCostGH — Quote in minutes, not days</b><br>Problem: guesswork quotes lose jobs. Build: Next16 + Prisma + PDF/XLSX + crons on Vercel. Proof: [add screenshot of estimate + PDF]. Result: contractor sends pro quote same day. CTA: I build cost tools for Ghana builders — $1,500 MVP in 14 days.</div>
<div class="sellbox"><b>Case 2: MyWA Miner — Dead groups → pipeline</b><br>Problem: 5k contacts stuck in WhatsApp. Build: Python CLI + CF Worker + D1, E164 dedupe. Proof: [screenshot mywa.gabochie.com + CSV]. Result: 3 segmented lists in 1 command. CTA: I turn WhatsApp into CRM for realtors.</div>
<div class="sellbox"><b>Case 3: GHBC Code AI — 27k clauses in seconds</b><br>Problem: GS1207 PDF unsearchable. Build: SQLite FTS5 + Clerk + Cloudflare. Proof: [screenshot query + citation]. Result: compliance answer with source. CTA: Ex-architect builds compliance AI.</div>
<h2>💼 LinkedIn Posts (copy-paste, posted Oct 2026)</h2>
<div class="fixbox"><b>LI-1 BuildCostGH:</b> I'm an architect. I got tired of guesswork quotes losing jobs. So I built BuildCostGH: measurements → Ghana-priced estimate + pro PDF same day. Next16 Prisma Vercel. I build cost tools for builders. MVP 14 days $1,500. DM contractors/QS/realtors. #BuildTech #Ghana #SaaS<br><b>LI-2 MyWA:</b> 5k contacts stuck in WhatsApp = $0. I built MyWA: 1 command extracts, dedupes E164, segments. Live mywa.gabochie.com. Python + CF Worker + D1. I turn WhatsApp into CRM. DM. #RealEstate #LeadGen<br><b>LI-3 GHBC:</b> GS1207 27k clauses unsearchable. As architect I built GHBC AI: plain English → answer + citation seconds. Clerk + Cloudflare. Pilot spots open. #ArchTech #GovTech</div>
<h2>💰 Upwork Versions (outcome-priced, shorter)</h2>
<div class="sellbox"><b>UW-1 Title:</b> Ghana Construction Cost Estimator with PDF Quotes | Next.js + Prisma<br>Proposal: I will ship a cost estimator that takes rooms/measurements and outputs a client-ready PDF/XLSX in minutes. Recent work: BuildCostGH (Next16, Prisma, Vercel crons). Fixed $1,500, 14 days, includes RLS security + deploy + 1 revision. Proof: [link buildcostgh.com + PDF sample]. CTA: Send your rate sheet, I will load 10 sample items as demo.</div>
<div class="sellbox"><b>UW-2 Title:</b> WhatsApp Group → Segmented Lead Lists + D1 Dashboard | Python + Cloudflare<br>Proposal: I will turn your WhatsApp groups into deduped E164 lists + searchable dashboard. Recent: MyWA live mywa.gabochie.com. Fixed $900, 7 days, includes CSV import + scoring + Cloudflare deploy. Proof: [link + CSV]. CTA: Share 1 export, I return 100 cleaned contacts free sample.</div>
<div class="sellbox"><b>UW-3 Title:</b> Building Code Search AI (27k Clauses with Citations) | SQLite FTS + Clerk<br>Proposal: I am an architect-engineer. I will make your code/standards searchable with cited answers + role auth. Recent: ghbc.gabochie.com GS1207. Fixed $2,200, 21 days, includes ingest + FTS + Clerk roles + Cloudflare. Proof: [link + query video]. CTA: Send 20-page PDF, I index it as pilot.</div>
<p><b>Next:</b> publish LI 1-3 Mon/Wed/Fri + add UW 1-3 as Upwork Projects + devops.gabochie.com/featured. Then sporafind + studio.</p>
</div>`;
}
function verifyOne(u){if(!u||u.includes('—')){alert('No live URL set for this project yet.');return}let url=u.split(' ')[0];if(!url.startsWith('http'))url='https://'+url;window.open(url,'_blank')}
function verifyLinks(){alert('Opening top 5 sell-now links for manual check. Mark OK / broken.');["https://buildcostgh.com","https://www.sporafind.com","https://studio.gabochie.com","https://ghbc.gabochie.com","https://devops.gabochie.com"].forEach(u=>window.open(u,'_blank'))}
document.getElementById('q').addEventListener('input',render);
document.addEventListener('click',(e)=>{
const g=e.target.closest('[data-go]');if(g){go(g.dataset.go);return}
const o=e.target.closest('[data-open]');if(o){openD(o.dataset.open);return}
const c=e.target.closest('[data-close]');if(c){document.getElementById('detail').classList.remove('show');return}
const v=e.target.closest('[data-verify-one]');if(v){verifyOne(v.dataset.verifyOne);return}
const a=e.target.closest('[data-run-auto]');if(a){runAutoVerify();return}
const r=e.target.closest('[data-reset-exec]');if(r){localStorage.removeItem('gab_exec');showExecute();return}
const l=e.target.closest('[data-verify-links]');if(l){verifyLinks();return}
});
document.addEventListener('change',(e)=>{if(e.target.closest('[data-toggle-sec]'))toggleSec()});
document.addEventListener('keydown',(e)=>{
if(e.key!=='Enter'&&e.key!==' ')return;
const t=e.target.closest('[data-open][role="button"]');if(t){e.preventDefault();openD(t.dataset.open)}
});
try{renderNav();render();document.getElementById("jsstat").textContent="JS: live ✅ "+new Date().toISOString().slice(11,16)}catch(e){document.getElementById("static").innerHTML=`<div class="detail show"><h2>⚠ Dashboard failed to start</h2><p>${String(e).slice(0,300)}</p><p>Hard-refresh (Ctrl+Shift+R). If it persists, open Console (F12) and send the red error text.</p></div>`}
