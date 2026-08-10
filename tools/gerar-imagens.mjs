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

/* CONFIRMAR: trocar [CIDADE] pela cidade-base real antes de publicar. */
const CIDADE = '[CIDADE]';

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grade" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Fundo grafite chapado, sem gradiente -->
  <rect width="1200" height="630" fill="#121519"/>
  <rect width="1200" height="630" fill="url(#grade)"/>

  <!-- Barra superior no acento -->
  <rect x="0" y="0" width="1200" height="8" fill="#e85d04"/>

  <!-- Marca -->
  <g transform="translate(80, 78)">
    <rect width="52" height="52" rx="4" fill="#e85d04"/>
    <g transform="translate(11, 11) scale(1.24)">
      <path d="${RAIO}" fill="none" stroke="#ffffff" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="68" y="35" font-family="${FONTE}" font-size="32" font-weight="800" fill="#ffffff">Do<tspan fill="#89929a">Vale</tspan></text>
  </g>

  <!-- Titulo -->
  <text x="80" y="248" font-family="${FONTE}" font-size="56" font-weight="900" fill="#ffffff">Manutenção de climatização,</text>
  <text x="80" y="316" font-family="${FONTE}" font-size="56" font-weight="900" fill="#ffffff">elétrica, automação e segurança</text>
  <text x="80" y="384" font-family="${FONTE}" font-size="56" font-weight="900" fill="#e85d04">em ${CIDADE}</text>

  <!-- Linha divisoria -->
  <rect x="80" y="428" width="1040" height="1" fill="#2b3036"/>

  <!-- Subtexto -->
  <text x="80" y="472" font-family="${FONTE}" font-size="23" font-weight="500" fill="#b3babf">Uma equipe para os quatro sistemas &#183; Residência, comércio e indústria</text>

  <!-- Rodape: botao WhatsApp + telefone -->
  <g transform="translate(80, 520)">
    <rect width="300" height="52" rx="4" fill="#25d366"/>
    <g transform="translate(24, 14) scale(1.02)">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="62" y="32" font-family="${FONTE}" font-size="18" font-weight="700" fill="#ffffff">Orçamento pelo WhatsApp</text>
  </g>

  <text x="412" y="553" font-family="${FONTE}" font-size="26" font-weight="800" fill="#ffffff">(11) 93806-2320</text>
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
