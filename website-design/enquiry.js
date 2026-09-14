// Hand the brief to WhatsApp; the visitor reviews and sends it there.
const form = document.querySelector('#project-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = [
    'Hi Uplof, I’d like to discuss a website project.', '',
    `Name: ${data.get('name').trim()}`,
    `Business: ${data.get('business').trim()}`,
    `Project: ${data.get('project')}`,
    `Details: ${data.get('details').trim() || 'Let’s discuss.'}`, '',
    'Please get in touch to discuss the scope and quote.',
  ].join('\n');
  window.location.href = `https://wa.me/917710894943?text=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Continue in WhatsApp to review and send your brief. If WhatsApp did not open, use the direct chat link below.';
});
