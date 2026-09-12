(() => {
  const key = 'uplof-cookie-choice';
  if (localStorage.getItem(key)) return;
  const banner = document.createElement('aside');
  banner.setAttribute('aria-label', 'Cookie notice');
  banner.className = 'cookie-consent';
  banner.innerHTML = '<div><strong>Small cookie note</strong><p>We use essential browser storage to remember this choice. No advertising or analytics cookies are active.</p><a href="/cookie-tracking-notice/">Read the Cookie and Tracking Notice ↗</a></div><div class="cookie-actions"><button type="button" data-choice="declined">Decline</button><button type="button" data-choice="accepted">Accept</button></div>';
  const style = document.createElement('style');
  style.textContent = '.cookie-consent{position:fixed;z-index:50;left:20px;right:20px;bottom:20px;max-width:760px;margin:auto;display:flex;gap:22px;align-items:center;justify-content:space-between;padding:16px 18px;background:#121713;color:#f2f1ea;border:1px solid #354239;border-radius:10px;box-shadow:0 16px 50px #0009;font:14px/1.45 Geist,system-ui,sans-serif}.cookie-consent strong{font-size:15px}.cookie-consent p{margin:4px 0;color:#b7c0b8}.cookie-consent a{color:#35d07a}.cookie-actions{display:flex;gap:8px;flex-shrink:0}.cookie-actions button{border:1px solid #526057;border-radius:6px;padding:9px 13px;background:transparent;color:#f2f1ea;cursor:pointer;font:inherit}.cookie-actions button:last-child{background:#35d07a;color:#07120b;border-color:#35d07a}@media(max-width:620px){.cookie-consent{left:12px;right:12px;bottom:12px;display:block}.cookie-actions{margin-top:12px}.cookie-actions button{width:50%}}';
  document.head.append(style);
  banner.addEventListener('click', (event) => { const button = event.target.closest('[data-choice]'); if (!button) return; localStorage.setItem(key, button.dataset.choice); banner.remove(); });
  document.body.append(banner);
})();
