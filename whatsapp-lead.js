// A wa.me link navigates away without submitting the form, so the enquiry is captured here first.
// Without this the lead only ever exists inside WhatsApp, and is lost entirely when the visitor
// never presses Send there.
const FIELDS = ['name', 'business', 'email', 'website', 'phone', 'message'];
let lastSent = '';

function readEnquiry() {
  const form = document.querySelector('form[action="/api/lead"]');
  if (!form) return null;
  const data = new FormData();
  for (const field of FIELDS) {
    const input = form.querySelector(`[name="${field}"]`);
    const value = input && input.value.trim();
    if (value) data.append(field, value);
  }
  // The endpoint requires these, and a blank beacon is worse than sending nothing.
  if (!data.get('name') || !data.get('email') || !data.get('business')) return null;
  data.append('source', 'whatsapp');
  return data;
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href*="wa.me"]');
  if (!link) return;
  const data = readEnquiry();
  if (!data) return;
  const fingerprint = [...data.entries()].map(([key, value]) => `${key}=${value}`).join('&');
  if (fingerprint === lastSent) return;
  lastSent = fingerprint;
  // keepalive lets the request outlive the navigation to WhatsApp.
  fetch('/api/lead', { method: 'POST', body: data, keepalive: true }).catch(() => {});
}, true);
