# Demo-mode read-only scan — zero writes, zero deploys, zero commits
# Run: powershell -File demo-scan.ps1
$roots = @("C:\Users\user\Documents\GitHub", "C:\AI")
Write-Output "=== DIRTY REPOS ==="
foreach ($r in $roots) {
  Get-ChildItem -Directory -LiteralPath $r -ErrorAction SilentlyContinue |
    Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName ".git") } |
    ForEach-Object {
      $s = git -C $_.FullName status --porcelain 2>$null
      if ($s) { Write-Output "$($_.Name): $($s.Count) items" }
    }
}
Write-Output "=== D1 PLACEHOLDERS (should be 0) ==="
rg -l "REPLACE_WITH|placeholder-replace" "C:\Users\user\Documents\GitHub" 2>$null | Select-Object -First 10
Write-Output "=== LIVE URLS TO CHECK ==="
@("https://buildcostgh.com","https://www.sporafind.com","https://studio.gabochie.com","https://ghbc.gabochie.com","https://devops.gabochie.com","https://mywa.gabochie.com") | ForEach-Object { Write-Output $_ }
Write-Output "=== DONE (read-only, nothing changed) ==="
