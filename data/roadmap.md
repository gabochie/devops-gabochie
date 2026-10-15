# Progress source of truth (parsed by scripts/collect.mjs → public/data/roadmap.json)

Format: `## Phase N` headings + `- [ ] **id** rest` task lines. Check boxes as rungs land.

## Phase 0 — instant-fail signals

- [x] **0.1** purge secrets/junk (DBGabochie verified clean, buildcostgh log untracked)
- [ ] **0.2** Gitleaks workflows on studio.gabochie, KlagonOrg, sporafind, aiw
- [x] **0.3** key rotation check (no committed keys found in DBGabochie/buildcostgh history)
- [ ] **0.4** delete/archive noise repos

## Phase 1 — hidden gold

- [ ] **1.1** push Gh2047 (after .env/.venv purge)
- [ ] **1.2** make aiw public
- [ ] **1.3** pin + dress profile repos

## Phase 2 — presentation

- [x] **2.0** DBGabochie README + buildcostgh hygiene (Rung 1)
- [ ] **2.1** READMEs for KlagonOrg, ghbc, mimetai
- [ ] **2.2** LICENSEs + badges on pinned four
- [ ] **2.3** oflifodailypsalms truth pass + Worker deploy
- [ ] **2.4** normalize Dockerfiles to aiw pattern

## Phase 3 — proof

- [ ] **3.1** red-then-green CI demo bank
- [ ] **3.2** case study #1 (beth twin hardened, build control)
- [ ] **3.3** rollback rehearsal log + proposal template

## Phase 4 — AWS bridge

- [ ] **4.1** Terraform staging sample
- [ ] **4.2** K8s manifest set
- [ ] **4.3** environment-gated release demo
