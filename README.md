# Uplof landing pages

- `/` is the original animated homepage export.
- `/website-design/` is the static service landing page. Its content, styles and WhatsApp brief helper live in `website-design/`.
- Enquiries open WhatsApp for **+91 8828447664** with a prepared brief. The visitor must press Send in WhatsApp. This site does not store form submissions.
- The Northline website shown on the service page is an illustrative concept, not a client case study.

## Preview

Run `python3 -m http.server 4173` from this directory and open `http://localhost:4173/website-design/`.

## Deployment

Cloudflare Pages project: `uplof-landing-page`, production branch: `main`, custom domain: `uplof.me`.

GitHub automatic deployment is not connected because the account's Pages Git installation returned an error. A GitHub push alone does not publish changes.

`scripts/upload-assets.cjs` uploads the explicit public asset list and prints a Pages manifest. It needs a temporary project upload JWT in `CF_PAGES_UPLOAD_JWT` and the `blake3-wasm` module (or its absolute module path in `UPLOF_BLAKE3_MODULE`). Use that manifest to create a Pages deployment through Cloudflare's authenticated deployment endpoint. Add any new public files to the script's allowlist before deploying. Never upload this whole repository as a public asset directory.

For rollback, restore the previous production deployment in Cloudflare Pages. The deployment before the service-page release is `3acaf2f3-53d5-44ca-9aa6-0e860414bd01`.
