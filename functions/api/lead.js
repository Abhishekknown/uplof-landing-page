export async function onRequestPost({ request, env }) {
  const data = await request.formData();
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const business = String(data.get('business') || '').trim();
  const website = String(data.get('website') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const message = String(data.get('message') || '').trim();
  if (!name || !email || !business) return new Response('Please complete the required fields.', { status: 400 });
  if (!env.EMAIL || typeof env.EMAIL.send !== 'function') return new Response('Email service is not configured yet. Please continue on WhatsApp.', { status: 503 });
  const body = [`New Uplof lead audit enquiry`, `Name: ${name}`, `Business: ${business}`, `Email: ${email}`, `Website: ${website || '—'}`, `Phone: ${phone || '—'}`, '', message || 'No additional message.'].join('\n');
  await env.EMAIL.send({ from: 'hello@uplof.me', to: ['kumarabhishekbuild@gmail.com'], subject: 'New Uplof lead audit enquiry', text: body, replyTo: email });
  return Response.redirect(new URL('/?submitted=1#contact', request.url), 303);
}
