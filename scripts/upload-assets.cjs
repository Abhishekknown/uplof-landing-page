// Upload only the public files used by the site. The Pages deployment is created separately.
const fs = require('node:fs');
const path = require('node:path');
const { hash } = require(process.env.UPLOF_BLAKE3_MODULE || 'blake3-wasm');
const root = path.resolve(__dirname, '..');
const names = [
  'index.html', 'support.js', 'style.css', 'homepage.js',
  'assets/geist-latin.woff2', 'assets/geist-mono-latin.woff2',
  'assets/founder-desk.png', 'assets/ill-banner.png', 'assets/ill-form.png',
  'assets/ill-found.png', 'assets/ill-gap.png', 'assets/ill-next.png',
  'assets/ill-portrait.png', 'assets/ill-reason.png',
  'assets/step-1.png', 'assets/step-2.png', 'assets/step-3.png', 'assets/step-4.png',
  'assets/svc-01.png', 'assets/svc-02.png', 'assets/svc-03.png',
  'assets/svc-04.png', 'assets/svc-05.png', 'assets/svc-06.png',
  'assets/svc-07.png', 'assets/svc-08.png', 'assets/svc-09.png',
  'website-design/index.html', 'website-design/style.css', 'website-design/enquiry.js',
  'website-design/taste.css', 'website-design/assets/website-concept.webp',
  'website-design/assets/design-workspace.webp', 'website-design/assets/geist-latin.woff2',
  'website-design/assets/geist-mono-latin.woff2',
];
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const files = names.map(name => {
  const data = fs.readFileSync(path.join(root, name));
  return { name, data, hash: hash(data.toString('base64') + path.extname(name).slice(1)).toString('hex').slice(0, 32), type: mime[path.extname(name)] };
});
async function request(endpoint, body) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/pages/assets/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CF_PAGES_UPLOAD_JWT}` },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(JSON.stringify(result.errors));
  return result.result;
}
async function main() {
  if (!process.env.CF_PAGES_UPLOAD_JWT) throw new Error('A temporary Pages upload token is required.');
  const hashes = files.map(file => file.hash);
  const missing = await request('check-missing', { hashes });
  const uploads = files.filter(file => missing.includes(file.hash));
  if (uploads.length) await request('upload', uploads.map(file => ({
    key: file.hash, value: file.data.toString('base64'), metadata: { contentType: file.type }, base64: true,
  })));
  await request('upsert-hashes', { hashes });
  console.log(JSON.stringify(Object.fromEntries(files.map(file => [`/${file.name}`, file.hash]))));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
