/**
 * Substitui o endereco provisorio do site pelo endereco real.
 *
 * Roda em dois modos:
 *
 * 1) AUTOMATICO (na Vercel)
 *    Faz parte do "npm run build". A Vercel expoe o dominio do projeto em
 *    variaveis de ambiente, entao o site ja e publicado com o endereco certo,
 *    sem voce precisar fazer nada. Os arquivos do SEU computador nao mudam.
 *
 * 2) MANUAL (quando voce tiver dominio proprio)
 *    npm run url https://dovale.com.br
 *    Nesse modo os arquivos sao gravados de verdade, para voce commitar.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

/* Endereco provisorio gravado nos arquivos. */
const PROVISORIO = 'https://empresa-dovale.vercel.app';

/* Arquivos que contem o endereco. */
const ARQUIVOS = ['index.html', 'robots.txt', 'sitemap.xml'];

/** Normaliza: garante https:// e remove a barra final. */
function normalizar(valor) {
  if (!valor) return null;
  let u = String(valor).trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  return u.replace(/\/+$/, '');
}

/** Descobre qual endereco usar e de onde ele veio. */
function descobrirDestino() {
  const argumento = normalizar(process.argv[2]);
  if (argumento) {
    return { url: argumento, origem: 'argumento da linha de comando', gravar: true };
  }

  // Dominio de producao do projeto na Vercel (ex.: empresa-dovale.vercel.app)
  const producao = normalizar(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (producao) {
    return { url: producao, origem: 'VERCEL_PROJECT_PRODUCTION_URL', gravar: true };
  }

  // Reserva: URL especifica deste deploy.
  const deploy = normalizar(process.env.VERCEL_URL);
  if (deploy) {
    return { url: deploy, origem: 'VERCEL_URL', gravar: true };
  }

  return null;
}

const destino = descobrirDestino();

if (!destino) {
  console.log('[url] Nenhum endereco informado. Mantendo o provisorio: ' + PROVISORIO);
  console.log('[url] Para definir manualmente:  npm run url https://seusite.com.br');
  process.exit(0);
}

if (destino.url === PROVISORIO) {
  console.log('[url] O endereco ja e ' + PROVISORIO + '. Nada a fazer.');
  process.exit(0);
}

let totalTrocas = 0;
let arquivosAlterados = 0;

for (const nome of ARQUIVOS) {
  const caminho = join(raiz, nome);

  if (!existsSync(caminho)) {
    console.warn('[url] Aviso: ' + nome + ' nao encontrado, pulando.');
    continue;
  }

  const original = readFileSync(caminho, 'utf8');
  const partes = original.split(PROVISORIO);
  const trocas = partes.length - 1;

  if (trocas === 0) continue;

  writeFileSync(caminho, partes.join(destino.url), 'utf8');
  totalTrocas += trocas;
  arquivosAlterados++;
  console.log('[url] ' + nome + ': ' + trocas + ' ocorrencia(s) atualizada(s)');
}

if (totalTrocas === 0) {
  console.log('[url] Nenhuma ocorrencia de ' + PROVISORIO + ' encontrada.');
  console.log('[url] O endereco provavelmente ja foi trocado antes.');
} else {
  console.log(
    '[url] Pronto: ' + totalTrocas + ' ocorrencia(s) em ' +
    arquivosAlterados + ' arquivo(s) apontando para ' + destino.url
  );
  console.log('[url] Origem do endereco: ' + destino.origem);
}
