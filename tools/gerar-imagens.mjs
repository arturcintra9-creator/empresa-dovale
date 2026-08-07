/**
 * Gera os assets de imagem da landing page:
 *   - og-image.png       (1200x630) imagem de compartilhamento (WhatsApp, Facebook, LinkedIn)
 *   - favicon.png        (32x32)    fallback para navegadores antigos
 *   - apple-touch-icon.png (180x180) icone ao salvar na tela inicial do celular
 *
 * Rode com:  npm run imagens
 */

import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

/* Fontes instaladas no Windows — usadas apenas na geracao, nao no site. */
const FONTE = 'Segoe UI, Arial, Helvetica, sans-serif';

/* Icone "zap" (raio) do Lucide, mesmo do cabecalho do site. */
const RAIO =
  'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z';

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#061630"/>
      <stop offset="55%"  stop-color="#0b2447"/>
      <stop offset="100%" stop-color="#0f264d"/>
    </linearGradient>

    <linearGradient id="marca" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#33c6f7"/>
      <stop offset="100%" stop-color="#153468"/>
    </linearGradient>

    <linearGradient id="ciano" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#75dcff"/>
      <stop offset="100%" stop-color="#33c6f7"/>
    </linearGradient>

    <radialGradient id="brilho">
      <stop offset="0%"   stop-color="#0aa9e0" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#0aa9e0" stop-opacity="0"/>
    </radialGradient>

    <pattern id="grade" width="62" height="62" patternUnits="userSpaceOnUse">
      <path d="M62 0H0V62" fill="none" stroke="#ffffff" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Fundo -->
  <rect width="1200" height="630" fill="url(#fundo)"/>
  <rect width="1200" height="630" fill="url(#grade)"/>
  <circle cx="1080" cy="90"  r="420" fill="url(#brilho)"/>
  <circle cx="120"  cy="600" r="320" fill="url(#brilho)" opacity="0.55"/>

  <!-- Barra superior ciano -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#ciano)"/>

  <!-- Marca -->
  <g transform="translate(80, 74)">
    <rect width="62" height="62" rx="16" fill="url(#marca)"/>
    <g transform="translate(11, 11) scale(1.67)">
      <path d="${RAIO}" fill="none" stroke="#ffffff" stroke-width="2.1"
            stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="80" y="29" font-family="${FONTE}" font-size="34" font-weight="800" fill="#ffffff">Do<tspan fill="#33c6f7">Vale</tspan></text>
    <text x="80" y="52" font-family="${FONTE}" font-size="13" font-weight="600"
          fill="#ffffff" fill-opacity="0.5" letter-spacing="2.4">ENGENHARIA &amp; INSTALAÇÕES</text>
  </g>

  <!-- Selo -->
  <g transform="translate(80, 196)">
    <rect width="386" height="38" rx="19" fill="#33c6f7" fill-opacity="0.12" stroke="#33c6f7" stroke-opacity="0.32"/>
    <circle cx="24" cy="19" r="4.5" fill="#33c6f7"/>
    <text x="40" y="24" font-family="${FONTE}" font-size="13.5" font-weight="700"
          fill="#b0eaff" letter-spacing="1.5">ATENDIMENTO RESIDENCIAL E INDUSTRIAL</text>
  </g>

  <!-- Titulo -->
  <text x="80" y="316" font-family="${FONTE}" font-size="62" font-weight="800" fill="#ffffff">Energia, Climatização</text>
  <text x="80" y="386" font-family="${FONTE}" font-size="62" font-weight="800" fill="#ffffff">e Segurança</text>
  <text x="80" y="456" font-family="${FONTE}" font-size="62" font-weight="800" fill="url(#ciano)">em uma única equipe.</text>

  <!-- Servicos -->
  <text x="80" y="516" font-family="${FONTE}" font-size="22" font-weight="500" fill="#d6e4f5" fill-opacity="0.72">Climatização &#183; Elétrica &#183; Automação &#183; Segurança Eletrônica</text>

  <!-- Rodape: botao WhatsApp + telefone -->
  <g transform="translate(80, 548)">
    <rect width="326" height="54" rx="27" fill="#25d366"/>
    <g transform="translate(26, 15) scale(1.05)">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="66" y="33" font-family="${FONTE}" font-size="19" font-weight="700" fill="#ffffff">Orçamento pelo WhatsApp</text>
  </g>

  <text x="440" y="583" font-family="${FONTE}" font-size="27" font-weight="800" fill="#ffffff">(11) 93806-2320</text>
</svg>`;

async function gerar() {
  mkdirSync(raiz, { recursive: true });

  // 1) Imagem de compartilhamento
  await sharp(Buffer.from(ogSvg, 'utf8'))
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(join(raiz, 'og-image.png'));
  console.log('  og-image.png          1200x630  criado');

  // 2) Favicon PNG (fallback) e icone de celular, a partir do favicon.svg
  const faviconSvg = readFileSync(join(raiz, 'favicon.svg'));

  await sharp(faviconSvg, { density: 384 })
    .resize(32, 32)
    .png()
    .toFile(join(raiz, 'favicon.png'));
  console.log('  favicon.png           32x32     criado');

  await sharp(faviconSvg, { density: 384 })
    .resize(180, 180)
    .png()
    .toFile(join(raiz, 'apple-touch-icon.png'));
  console.log('  apple-touch-icon.png  180x180   criado');
}

gerar().catch((erro) => {
  console.error('Falha ao gerar imagens:', erro);
  process.exit(1);
});
