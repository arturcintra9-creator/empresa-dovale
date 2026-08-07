# Publica o site pela primeira vez.
# Chamado pelo atalho PUBLICAR.bat (duplo clique).

$ErrorActionPreference = 'Stop'
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

function Ok($texto)    { Write-Host "  [OK] $texto"    -ForegroundColor Green }
function Erro($texto)  { Write-Host "  [ERRO] $texto"  -ForegroundColor Red }
function Aviso($texto) { Write-Host "  [!] $texto"     -ForegroundColor Yellow }
function Passo($texto) { Write-Host "  -> $texto"      -ForegroundColor White }

Titulo "PUBLICAR O SITE - Empresa DoVale"

# ---------- Verificacoes ----------
if (-not (Test-Path (Join-Path $projeto 'index.html'))) {
    Erro "Nao encontrei o index.html. Este atalho precisa ficar na pasta do site."
    exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Erro "O Git nao esta instalado. Baixe em: https://git-scm.com/download/win"
    exit 1
}

$commits = (git rev-list --count HEAD 2>$null)
if (-not $commits -or $commits -eq '0') {
    Erro "Nenhum commit encontrado no projeto."
    exit 1
}
Ok "Projeto pronto, com $commits commit(s) para publicar."

# ---------- Menu ----------
Write-Host ""
Write-Host "  Escolha como quer publicar:" -ForegroundColor White
Write-Host ""
Write-Host "   [1] Enviar para o GitHub  (recomendado)" -ForegroundColor Green
Write-Host "       Depois disso, o site se atualiza sozinho toda vez"
Write-Host "       que voce usar o atalho ATUALIZAR."
Write-Host ""
Write-Host "   [2] Publicar direto na Vercel  (sem GitHub)" -ForegroundColor Yellow
Write-Host "       Mais rapido agora, mas cada atualizacao futura"
Write-Host "       precisa ser feita por aqui de novo."
Write-Host ""

$opcao = Read-Host "  Digite 1 ou 2 e aperte Enter"

# ---------- Opcao 1: GitHub ----------
if ($opcao -eq '1') {
    Titulo "ENVIANDO PARA O GITHUB"

    $remote = (git remote get-url origin 2>$null)
    if (-not $remote) {
        Erro "Nenhum repositorio do GitHub configurado."
        Write-Host ""
        Write-Host "  Rode isto antes (troque SEU-USUARIO):" -ForegroundColor White
        Write-Host "  git remote add origin https://github.com/SEU-USUARIO/empresa-dovale.git" -ForegroundColor Gray
        exit 1
    }
    Ok "Repositorio: $remote"

    Write-Host ""
    Aviso "Pode abrir uma janela pedindo login no GitHub."
    Write-Host "      Escolha 'Sign in with your browser' e autorize."
    Write-Host "      Isso acontece apenas nesta primeira vez."
    Write-Host ""
    Passo "Enviando..."
    Write-Host ""

    git push -u origin main

    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Erro "O envio falhou."
        Write-Host ""
        Write-Host "  Causas mais comuns:" -ForegroundColor White
        Write-Host "   - O login do GitHub foi cancelado ou expirou"
        Write-Host "   - O endereco do repositorio esta errado"
        Write-Host "   - Sem conexao com a internet"
        Write-Host ""
        Write-Host "  Dica: rode este atalho de novo e escolha a opcao 2," -ForegroundColor Yellow
        Write-Host "        que publica sem depender do GitHub."
        exit 1
    }

    Write-Host ""
    Titulo "CODIGO ENVIADO COM SUCESSO"
    Ok "Seus arquivos estao no GitHub."
    Write-Host ""
    Write-Host "  AGORA FALTA SO ISTO:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   1. Volte na aba da Vercel no navegador"
    Write-Host "   2. Feche a mensagem vermelha clicando no X"
    Write-Host "   3. Clique no botao Deploy"
    Write-Host ""
    Write-Host "   Nao mude nenhuma configuracao na tela da Vercel." -ForegroundColor Yellow
    Write-Host "   Em cerca de 1 minuto o link do site aparece."
    Write-Host ""
    exit 0
}

# ---------- Opcao 2: Vercel direto ----------
if ($opcao -eq '2') {
    Titulo "PUBLICANDO DIRETO NA VERCEL"

    if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
        Erro "O Node.js nao esta instalado. Baixe em: https://nodejs.org"
        exit 1
    }

    Write-Host ""
    Aviso "A Vercel vai fazer algumas perguntas. Responda assim:"
    Write-Host ""
    Write-Host "    Set up and deploy?            -> Y" -ForegroundColor Gray
    Write-Host "    Which scope?                  -> Enter" -ForegroundColor Gray
    Write-Host "    Link to existing project?     -> N" -ForegroundColor Gray
    Write-Host "    Project name?                 -> Enter" -ForegroundColor Gray
    Write-Host "    In which directory?           -> Enter" -ForegroundColor Gray
    Write-Host "    Want to modify settings?      -> N   (importante)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Na primeira vez ele pede login. Escolha 'Continue with GitHub'"
    Write-Host "  ou o metodo que voce usa na Vercel."
    Write-Host ""
    Read-Host "  Aperte Enter para comecar"

    npx vercel --prod

    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Erro "A publicacao falhou. Leia a mensagem acima."
        exit 1
    }

    Write-Host ""
    Titulo "SITE PUBLICADO"
    Ok "O link aparece na linha 'Production' logo acima."
    Write-Host ""
    exit 0
}

Erro "Opcao invalida. Rode o atalho de novo e digite 1 ou 2."
exit 1
