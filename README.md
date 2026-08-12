# Do Vale — Landing Page

Página de vendas em HTML + Tailwind CSS + JavaScript puro.
Sem framework, sem banco de dados. Rápida de editar e de publicar.

---

## ⚠️ ANTES DE PUBLICAR — dados a confirmar

Nenhum dado foi inventado. Tudo que ainda não foi confirmado está
**marcado em laranja tracejado na própria tela** e como
`<!-- CONFIRMAR: ... -->` no código — são 35 marcações.

A lista completa, agrupada por assunto, está em **[ENTREGA.md](ENTREGA.md)**.

Para achar no código: abra o `index.html` e busque por `CONFIRMAR`.

---

## Atalhos de duplo clique (jeito fácil)

Na pasta do site há dois arquivos que você abre com **duplo clique**,
sem precisar de terminal:

| Atalho | Quando usar |
|---|---|
| **PUBLICAR.bat** | Só na primeira vez, para colocar o site no ar |
| **ATUALIZAR.bat** | Toda vez que você mudar algo e quiser publicar |

O `ATUALIZAR` mostra o que você alterou, recompila o visual, pede uma
descrição curta da mudança e envia. A Vercel republica sozinha em cerca
de 1 minuto.

> Se o Windows mostrar um aviso de segurança na primeira vez,
> clique em **Mais informações → Executar assim mesmo**.
> O aviso aparece porque o arquivo foi baixado/criado agora, não porque há risco.

---

## Como rodar no seu computador

**Modo simples — só ver a página:**
dê duplo clique no `index.html`. Funciona direto, sem instalar nada.

**Modo edição — ao mexer no visual:**

```bash
npm install
```

Depois, deixe este comando rodando enquanto edita:

```bash
npm run dev
```

Ele fica observando os arquivos e recompila o CSS sozinho a cada alteração.
Salve o arquivo, atualize o navegador (`Ctrl + F5`) e a mudança aparece.

---

## Comandos disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Recompila o CSS automaticamente enquanto você edita |
| `npm run build` | Gera o CSS final minificado em `dist/style.css` |
| `npm run url <endereço>` | Grava o endereço do site em todos os arquivos |
| `npm run imagens` | Regera `og-image.png`, `favicon.png` e `apple-touch-icon.png` |

---

## Publicar na Vercel

### Primeira vez

**1. Crie o repositório no GitHub**

O Git já está iniciado e com o primeiro commit feito. Falta só enviar:

```bash
git remote add origin https://github.com/SEU-USUARIO/empresa-dovale.git
```

```bash
git push -u origin main
```

**2. Importe na Vercel**

- Acesse https://vercel.com/new
- Escolha o repositório `empresa-dovale`
- A Vercel lê o `vercel.json` sozinha e já sabe o que fazer — **não mude nada**
- Clique em **Deploy**

Em cerca de um minuto o site estará no ar em `https://algum-nome.vercel.app`.

### Alternativa sem GitHub (mais rápido para testar)

```bash
npx vercel --prod
```

Ele pede login na primeira vez e sobe a pasta direto.

---

## O endereço do site se ajusta sozinho

O site precisa saber o próprio endereço em 10 lugares (miniatura do WhatsApp,
canonical, sitemap, dados do Google). **Isso é automático:** durante o build,
a Vercel informa o domínio do projeto e o script `tools/aplicar-url.mjs`
grava o endereço certo em tudo.

Você não precisa fazer nada. Os arquivos do seu computador continuam com o
endereço provisório — a troca acontece só no servidor, a cada publicação.

### Quando você tiver domínio próprio

Aí sim vale gravar de forma permanente:

```bash
npm run url https://dovale.com.br
```

```bash
git add . ; git commit -m "Atualiza endereco do site" ; git push
```

---

## Como fazer alterações no futuro

1. Edite o `index.html` (textos, telefone, seções)
2. Se mexeu no visual, rode `npm run build`
3. Envie:

```bash
git add . ; git commit -m "Descreva o que mudou" ; git push
```

Pronto — a Vercel detecta o envio e republica o site automaticamente.

---

## Trocar o número de WhatsApp

O número aparece em **18 lugares** no `index.html`, em 4 formatos diferentes.
Use **Localizar e Substituir** (`Ctrl + H`) para cada formato, nesta ordem:

| Procurar por | Ocorrências | Formato |
|---|---|---|
| `wa.me/5511938062320` | 8 | links do WhatsApp |
| `(11) 93806-2320` | 5 | número visível na tela |
| `tel:+5511938062320` | 4 | links de ligar |
| `+55-11-93806-2320` | 1 | dados estruturados do Google |

O formato do WhatsApp é `55` + DDD + número, sem espaços, parênteses ou traços.

---

## Estrutura dos arquivos

```
EmpresaDoValle/
├── index.html              A página inteira (textos e estrutura)
├── src/input.css           Cores, fontes e animações — edite aqui o visual
├── dist/style.css          CSS gerado automaticamente — NÃO edite à mão
├── tools/gerar-imagens.mjs Script que cria a imagem de compartilhamento
├── og-image.png            Miniatura exibida ao compartilhar o link
├── favicon.svg / .png      Ícone da aba do navegador
├── apple-touch-icon.png    Ícone ao salvar na tela inicial do celular
├── robots.txt              Instruções para o Google
├── sitemap.xml             Mapa do site para buscadores
├── vercel.json             Configuração de deploy e cabeçalhos de segurança
└── package.json            Dependências e comandos
```

> `dist/style.css` fica versionado de propósito: assim o site funciona mesmo
> abrindo o `index.html` direto, sem precisar rodar nenhum build.

---

## Mudar as cores

Abra `src/input.css` e edite o bloco `@theme`:

- `--color-navy-*` → azul profundo (elétrica, segurança)
- `--color-ice-*` → azul gelo / ciano (climatização, refrigeração)

Depois rode `npm run build`.

---

## Domínio próprio

Na Vercel: **Settings → Domains → Add**.
Ela mostra os registros de DNS para configurar no seu provedor (Registro.br, GoDaddy etc.).
Depois de apontar o domínio, refaça a troca de endereço descrita acima.
