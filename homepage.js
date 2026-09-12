// Hand the brief to WhatsApp; the visitor reviews and sends it there.
const form = document.querySelector('#project-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = [
    'Hi Uplof, I’d like to find where I’m losing leads.', '',
    `Name: ${data.get('name').trim()}`,
    `Business: ${data.get('business').trim()}`,
    `Website / GBP: ${data.get('site').trim() || 'Not provided yet'}`,
    `Phone: ${data.get('phone').trim()}`,
    `What I'd like to improve: ${data.get('details').trim() || 'Let’s discuss.'}`, '',
    'Please get in touch to discuss the scope and free lead audit.',
  ].join('\n');
  window.location.href = `https://wa.me/918828447664?text=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Continue in WhatsApp to review and send your details. If WhatsApp did not open, use the direct chat link below.';
});
