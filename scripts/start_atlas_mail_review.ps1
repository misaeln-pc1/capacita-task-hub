[CmdletBinding()]
param(
    [int]$LookbackDays = 30,
    [switch]$Incremental,
    [switch]$IncludeSystemFolders,
    [int]$MaxMessagesPerFolder = 1000,
    [int]$MaxContentFetches = 300,
    [string]$CredentialsEnv = "$env:USERPROFILE\OneDrive\Documentos\Proyectos\0-Origen\Zoho_Deluge\.env",
    [string]$PrivateDir = "$env:USERPROFILE\OneDrive\Documentos\Proyectos\0-Origen\Atlas_Mail_Ops"
)

$ErrorActionPreference = "Stop"
$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $RepoRoot

try {
    if (-not (Get-Command py -ErrorAction SilentlyContinue)) {
        throw "Python Launcher 'py' no está disponible en PATH."
    }
    if (-not (Test-Path -LiteralPath $CredentialsEnv)) {
        throw "No existe el .env privado esperado: $CredentialsEnv"
    }
    if ($LookbackDays -lt 1) {
        throw "LookbackDays debe ser mayor que cero."
    }

    $Branch = (& git branch --show-current).Trim()
    if ($LASTEXITCODE -eq 0 -and $Branch -eq "main") {
        throw "No ejecutar el piloto desde main. Usa la rama feature/task-hub-atlas-mail-ops-v1."
    }

    $Args = @(
        "scripts\atlas_mail_review.py",
        "review",
        "--credentials-env", $CredentialsEnv,
        "--private-dir", $PrivateDir,
        "--lookback-days", "$LookbackDays",
        "--max-messages-per-folder", "$MaxMessagesPerFolder",
        "--max-content-fetches", "$MaxContentFetches",
        "--rules", "config\atlas_mail_rules.example.json"
    )
    if ($Incremental) {
        $Args += "--incremental"
    }
    if ($IncludeSystemFolders) {
        $Args += "--include-system-folders"
    }

    Write-Host "Ejecutando Atlas Mail Ops en modo READ-only..." -ForegroundColor Cyan
    & py -3 @Args
    if ($LASTEXITCODE -ne 0) {
        throw "Atlas Mail Ops terminó en HOLD. Revisa el código controlado mostrado arriba."
    }

    Write-Host ""
    Write-Host "PASS_START_ATLAS_MAIL_REVIEW" -ForegroundColor Green
    Write-Host "No se respondió, movió, borró, archivó ni marcó correo."
    Write-Host "No se creó ningún issue de GitHub."
    Write-Host "El reporte privado permanece en: $PrivateDir"
}
catch {
    Write-Error $_.Exception.Message
    exit 2
}
