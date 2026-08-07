# Envia para o ar as alteracoes feitas no site.
# Chamado pelo atalho ATUALIZAR.bat (duplo clique).

$ErrorActionPreference = 'Continue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$projeto = Split-Path -Parent $PSScriptRoot
Set-Location $projeto

function Titulo($texto) {
    Write-Host ""
    Write-Host ("=" * 62) -ForegroundColor DarkCyan
    Write-Host "  $texto" -ForegroundColor Cyan
    Write-Host ("=" * 62) -ForegroundColor DarkCyan
    Write-Host ""
}

function Ok($texto)    { Write-Host "  [OK] $texto"   -ForegroundColor Green }
function Erro($texto)  { Write-Host "  [ERRO] $texto" -ForegroundColor Red }
function Aviso($texto) { Write-Host "  [!] $texto"    -ForegroundColor Yellow }
function Passo($texto) { Write-Host "  -> $texto"     -ForegroundColor White }

Titulo "ATUALIZAR O SITE - Empresa DoVale"

if (-not (Test-Path (Join-Path $projeto 'index.html'))) {
    Erro "Nao encontrei o index.html. Este atalho precisa ficar na pasta do site."
    exit 1
}

# ---------- O que mudou ----------
$mudancas = git status --porcelain
if (-not $mudancas) {
    Ok "Nenhuma alteracao encontrada. O site ja esta atualizado."
    Write-Host ""
    Write-Host "  Edite o index.html, salve, e rode este atalho de novo."
    exit 0
}

Write-Host "  Arquivos que voce alterou:" -ForegroundColor White
Write-Host ""
foreach ($linha in $mudancas) {
    $arquivo = $linha.Substring(3)
    Write-Host "   - $arquivo" -ForegroundColor Gray
}
Write-Host ""

# ---------- Recompila o CSS ----------
if (Test-Path (Join-Path $projeto 'node_modules')) {
    Passo "Recompilando o visual do site..."
    npm run build 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Ok "Visual recompilado."
    } else {
        Aviso "Nao consegui recompilar o CSS, mas a publicacao continua."
        Aviso "A Vercel recompila sozinha no servidor."
    }
} else {
    Aviso "Pasta node_modules ausente - pulando a recompilacao local."
    Aviso "A Vercel recompila sozinha no servidor."
}

# ---------- Descricao ----------
Write-Host ""
$descricao = Read-Host "  Descreva em poucas palavras o que mudou"
if ([string]::IsNullOrWhiteSpace($descricao)) {
    $descricao = "Atualiza o site"
}

# ---------- Enviar ----------
Write-Host ""
Passo "Salvando as alteracoes..."

git add -A
git commit -q -m $descricao

if ($LASTEXITCODE -ne 0) {
    Erro "Nao consegui salvar as alteracoes."
    exit 1
}
Ok "Alteracoes salvas."

$remote = (git remote get-url origin 2>$null)
if (-not $remote) {
    Write-Host ""
    Aviso "Este projeto nao esta ligado ao GitHub."
    Write-Host "      Suas alteracoes foram salvas, mas nao foram publicadas."
    Write-Host "      Use o atalho PUBLICAR e escolha a opcao 2."
    exit 0
}

Passo "Enviando para o ar..."
Write-Host ""
git push

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Erro "O envio falhou. Verifique sua conexao e tente de novo."
    Write-Host "  Suas alteracoes ficaram salvas - nada foi perdido."
    exit 1
}

Write-Host ""
Titulo "ATUALIZACAO ENVIADA"
Ok "A Vercel ja esta republicando o site."
Write-Host ""
Write-Host "  Em cerca de 1 minuto as mudancas estarao no ar." -ForegroundColor White
Write-Host "  Se nao aparecer, atualize a pagina com Ctrl + F5." -ForegroundColor Gray
Write-Host ""
