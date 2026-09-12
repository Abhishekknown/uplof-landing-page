import nodemailer from 'nodemailer';

export async function onRequestPost({ request, env }) {
  const data = await request.formData();
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const business = String(data.get('business') || '').trim();
  const website = String(data.get('website') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const message = String(data.get('message') || '').trim();
  const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'landing_page'];
  const attribution = attributionKeys
    .map((key) => [key, String(data.get(key) || '').trim()])
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`);
  if (!name || !email || !business) return new Response('Please complete the required fields.', { status: 400 });
  if (!env.GMAIL_USER || !env.GMAIL_APP_PASSWORD) return new Response('Email service is not configured yet. Please continue on WhatsApp.', { status: 503 });
  const body = [`New Uplof lead audit enquiry`, `Name: ${name}`, `Business: ${business}`, `Email: ${email}`, `Website: ${website || '—'}`, `Phone: ${phone || '—'}`, '', message || 'No additional message.', '', 'Campaign context (non-personal):', ...(attribution.length ? attribution : ['No campaign parameters captured.'])].join('\n');
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD } });
  const sender = { name: 'Abhishek Manjhi', address: 'hello@uplof.me' };
  await transporter.sendMail({ from: sender, to: 'kumarabhishekbuild@gmail.com', subject: 'New Uplof lead audit enquiry', text: body, replyTo: email });
  await transporter.sendMail({ from: sender, to: email, subject: 'We received your Uplof enquiry', text: `Hi ${name},\n\nThanks for contacting Uplof. We received your enquiry and will reply shortly.\n\n— Abhishek Manjhi`, replyTo: 'hello@uplof.me' });
  return Response.redirect(new URL('/?submitted=1#contact', request.url), 303);
}
