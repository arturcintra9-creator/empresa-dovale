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
| Abertura | Título com os 4 serviços, fatos objetivos e espaço para foto real |
| Serviços | Os 4 serviços descritos pelo problema do cliente, não pela técnica |
| Como trabalhamos | Os 4 passos do primeiro contato até a entrega |
| Diferenciais | 4 fatos verificáveis, sem adjetivo solto |
| Depoimentos | Estrutura pronta para 3 depoimentos reais |
| Antes e depois | Espaço para 3 fotos de serviços executados |
| Onde atendemos | Lista de bairros por extenso (ajuda na busca do Google) |
| Orçamento | Formulário que abre o WhatsApp com a mensagem pronta |
| Rodapé | Razão social, CNPJ, responsável técnico, contato e horário |

**Também incluído:** ícone na aba do navegador, miniatura ao compartilhar o link
no WhatsApp, dados estruturados para o Google, endereço automático no build
e cabeçalhos de segurança.

---

## O que falta confirmar com o cliente

Tudo que ainda não foi confirmado aparece **marcado em laranja tracejado na
própria tela** e como `<!-- CONFIRMAR: ... -->` no código. São 35 marcações.
Nada foi inventado.

### Dados da empresa
1. Razão social
2. CNPJ
3. Nome do responsável técnico + registro CREA ou CFT
4. Tem endereço fixo? Qual?
5. Anos de mercado
6. E-mail
7. Instagram

### Atendimento
8. Cidade-base (aparece no título, no H1 e no Google — hoje está `[CIDADE]`)
9. Lista de bairros e cidades atendidos, por extenso
10. Taxa de deslocamento fora da área
11. Horário de atendimento real
12. Existe plantão de emergência? Qual o prazo de chegada?
13. Atende fim de semana e madrugada?

### Comercial
14. Prazo real de retorno do orçamento
15. Visita técnica tem custo?
16. Garantia do serviço — quantos dias?
17. Periodicidade e valor do contrato de manutenção
18. Quantos técnicos na equipe
19. Marcas com que trabalha

### Provas
20. 2 ou 3 clientes que autorizem depoimento (nome, bairro, serviço feito)
21. Fotos reais de serviços — antes e depois
22. Foto da equipe trabalhando

> **Importante:** os textos foram escritos sem superlativo sem prova.
> "Atendimento rápido" só entra quando houver um prazo real para colocar junto.

---

## Como o cliente atualiza sozinho

### Para mudar textos

1. Abrir a pasta do site
2. Abrir `index.html` no Bloco de Notas (ou VS Code)
3. Usar `Ctrl + F` para achar o texto, ou procurar por `CONFIRMAR`
4. Trocar o texto e salvar

### Para publicar a mudança

**Duplo clique em `ATUALIZAR.bat`.**

Ele mostra o que foi alterado, pede uma descrição curta e envia.
Cerca de 1 minuto depois já está no ar.

Não precisa de terminal nem de comando digitado.

### Ao substituir um marcador

Trocar o bloco inteiro, incluindo a marcação laranja. Exemplo:

```html
<!-- antes -->
<span class="pendente">CONFIRMAR: horário</span>

<!-- depois -->
<span>Segunda a sexta, 8h às 18h</span>
```

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

- **Cor de acento:** laranja `#E85D04`, usado só em CTA, números e destaques
- **Base:** grafite `#121519` e branco
- **Fonte:** Inter, um peso para título (800/900) e um para corpo (400)
- **Formulário:** não usa servidor — monta o texto e abre o WhatsApp
- **Publicação:** Vercel, republicação automática a cada envio

### Comandos (opcionais, só para quem for editar o visual)

| Comando | O que faz |
|---|---|
| `npm run dev` | Recompila o CSS enquanto edita |
| `npm run build` | Gera o CSS final |
| `npm run imagens` | Regera a miniatura de compartilhamento |
| `npm run url <endereço>` | Grava o domínio próprio no site |

> Ao mudar apenas texto, nada disso é necessário — a Vercel recompila sozinha.

---

## Antes de apresentar ao cliente

- [ ] Confirmar a cidade e trocar `[CIDADE]` (aparece no título, H1 e miniatura)
- [ ] Rodar `npm run imagens` depois de trocar a cidade
- [ ] Conferir se o nome é **Do Vale** ou **Do Valle**
- [ ] Testar o formulário pelo celular
- [ ] Mandar o link no WhatsApp e ver se a miniatura carrega
