param(
    [string]$Output = 'exports/SOVRA-Portal.pdf',
    [string]$HugoPath,
    [string]$BrowserPath
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
if (-not $HugoPath) {
    $command = Get-Command hugo -ErrorAction SilentlyContinue
    if ($command) { $HugoPath = $command.Source }
    else { $HugoPath = Join-Path (Split-Path $projectRoot -Parent) 'hugo.exe' }
}
if (-not (Test-Path -LiteralPath $HugoPath)) { throw 'Hugo not found. Supply -HugoPath with the path to hugo.exe.' }
if (-not $BrowserPath) {
    $BrowserPath = @(
        "${env:ProgramFiles(x86)}/Microsoft/Edge/Application/msedge.exe",
        "$env:ProgramFiles/Microsoft/Edge/Application/msedge.exe",
        "$env:ProgramFiles/Google/Chrome/Application/chrome.exe"
    ) | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
}
if (-not $BrowserPath -or -not (Test-Path -LiteralPath $BrowserPath)) { throw 'Edge or Chrome not found. Supply -BrowserPath.' }
if (-not [IO.Path]::IsPathRooted($Output)) { $Output = Join-Path $projectRoot $Output }
$Output = [IO.Path]::GetFullPath($Output)
$work = Join-Path ([IO.Path]::GetTempPath()) ('sovra-pdf-' + [guid]::NewGuid().ToString('N'))
$printLayouts = Join-Path $work 'layouts'
$site = Join-Path $work 'site'
New-Item -ItemType Directory -Path $printLayouts -Force | Out-Null
Copy-Item -Path (Join-Path $projectRoot 'layouts/*') -Destination $printLayouts -Recurse
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'pdf-home.html') -Destination (Join-Path $printLayouts 'home.html')
New-Item -ItemType Directory -Path (Join-Path $printLayouts '_markup') -Force | Out-Null
Set-Content -LiteralPath (Join-Path $printLayouts '_markup/render-codeblock-mermaid.html') -Encoding UTF8 -Value '<pre class="mermaid">{{ .Inner }}</pre>'

Write-Host 'Building the combined document...'
& $HugoPath --source $projectRoot --layoutDir $printLayouts --destination $site --baseURL '/' --cacheDir (Join-Path $work 'cache')
if ($LASTEXITCODE -ne 0) { throw 'Hugo build failed. Fix the content errors shown above and retry.' }
$htmlPath = Join-Path $site 'index.html'
if (-not (Select-String -LiteralPath $htmlPath -SimpleMatch 'sovra-pdf-document' -Quiet)) { throw 'The print template was not rendered.' }
$pdfPath = Join-Path $work 'document.pdf'
$uri = ([uri]$htmlPath).AbsoluteUri
$arguments = @('--headless', '--disable-gpu', '--no-first-run', '--allow-file-access-from-files',
    '--no-pdf-header-footer', '--virtual-time-budget=20000',
    ('--user-data-dir="' + (Join-Path $work 'browser-profile') + '"'),
    ('--print-to-pdf="' + $pdfPath + '"'), ('"' + $uri + '"'))
Write-Host 'Printing PDF...'
$process = Start-Process -FilePath $BrowserPath -ArgumentList $arguments -WindowStyle Hidden -PassThru
if (-not $process.WaitForExit(60000)) {
    $process.Kill()
    throw "PDF printing timed out. Intermediate document: $htmlPath"
}
if (-not (Test-Path -LiteralPath $pdfPath) -or (Get-Item -LiteralPath $pdfPath).Length -lt 1000) {
    throw "PDF was not generated. Intermediate document: $htmlPath"
}
New-Item -ItemType Directory -Path (Split-Path $Output -Parent) -Force | Out-Null
Copy-Item -LiteralPath $pdfPath -Destination $Output -Force
Write-Host "PDF: $Output"
Write-Host "Intermediate files: $work"
