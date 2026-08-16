# Do Vale — Site

Site institucional de página única. HTML estático com Tailwind CSS.
Sem framework, sem banco de dados, sem mensalidade de servidor.

**No ar em:** https://empresa-dovale.vercel.app

---

## O que o site tem

| Seção | Conteúdo |
|---|---|
| Faixa de emergência | Chamado urgente com WhatsApp direto, no topo de tudo |
| Topo | Telefone, menu e botão de orçamento |
| Abertura | Título, chamada e painel com as quatro áreas de atuação |
| Serviços | Os 4 serviços descritos pelo problema do cliente, não pela técnica |
| Como trabalhamos | Os 4 passos do primeiro contato até a entrega |
| Diferenciais | 3 fatos verificáveis, sem adjetivo solto |
| Orçamento | Formulário que abre o WhatsApp com a mensagem pronta |
| Rodapé | Serviços, telefone e WhatsApp |

**Também incluído:** ícone na aba do navegador, miniatura ao compartilhar o link
no WhatsApp, dados estruturados para o Google, endereço automático no build
e cabeçalhos de segurança.

---

## Regra que vale para qualquer alteração

**Nenhum dado do site foi inventado.** Tudo que aparece na tela é verdade
sabida: os quatro serviços, o telefone, a cidade e a forma de trabalho.

Onde a informação não existia, o trecho foi **removido** em vez de preenchido
com texto genérico. Ao acrescentar qualquer coisa, mantenha o mesmo critério:
só entra o que puder ser sustentado.

---

## O que dá para acrescentar quando houver a informação

Estes itens não estão no site porque os dados ainda não foram confirmados.
Cada um aumenta a credibilidade quando entrar:

**Dados da empresa** — razão social, CNPJ, responsável técnico com registro
CREA ou CFT, endereço fixo, anos de mercado, e-mail e Instagram.

**Atendimento** — horário real, bairros atendidos por extenso (ajuda muito na
busca do Google), taxa de deslocamento, plantão de emergência e prazo de chegada.

**Comercial** — prazo de retorno do orçamento, se a visita técnica tem custo,
garantia do serviço em dias, número de técnicos e marcas com que trabalha.

**Provas** — depoimentos de clientes com autorização e fotos de serviços
executados, antes e depois.

> Ao publicar prova, use material real. Foto de banco de imagens e depoimento
> genérico derrubam a credibilidade em vez de aumentar.

---

## Como o cliente atualiza sozinho

### Para mudar textos

1. Abrir a pasta do site
2. Abrir `index.html` no Bloco de Notas (ou VS Code)
3. Usar `Ctrl + F` para achar o texto
4. Trocar e salvar

### Para publicar a mudança

**Duplo clique em `ATUALIZAR.bat`.**

Ele mostra o que foi alterado, pede uma descrição curta e envia.
Cerca de 1 minuto depois já está no ar. Não precisa de terminal.

### Ao trocar o telefone

Aparece em 4 formatos. Usar `Ctrl + H` (substituir) para cada um:

| Procurar | Onde |
|---|---|
| `wa.me/5511938062320` | links do WhatsApp |
| `(11) 93806-2320` | número visível |
| `tel:+5511938062320` | links de ligar |
| `+55-11-93806-2320` | dados do Google |

---

## Detalhes técnicos

- **Paleta:** azul profundo `#0B2447` com acento em azul gelo `#33C6F7`
- **Fonte:** Inter, um peso para título (800/900) e um para corpo (400)
- **Formulário:** não usa servidor — monta o texto e abre o WhatsApp
- **Publicação:** Vercel, republicação automática a cada envio
- **Movimento:** desligado para quem usa `prefers-reduced-motion`

### Comandos (opcionais, só para quem for editar o visual)

| Comando | O que faz |
|---|---|
| `npm run dev` | Recompila o CSS enquanto edita |
| `npm run build` | Gera o CSS final |
| `npm run imagens` | Regera a miniatura de compartilhamento |
| `npm run url <endereço>` | Grava o domínio próprio no site |

> Ao mudar apenas texto, nada disso é necessário — a Vercel recompila sozinha.

---

## Antes de apresentar

- [x] Cidade definida: São Paulo (título, H1, miniatura e dados do Google)
- [x] Nome confirmado: **Do Vale**
- [x] Site sem campos pendentes e sem espaços de imagem vazios
- [ ] Testar o formulário pelo celular
- [ ] Mandar o link no WhatsApp e ver se a miniatura carrega
