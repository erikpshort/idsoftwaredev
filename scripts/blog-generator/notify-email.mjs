// Emails a freshly generated blog draft to the reviewer through Resend, with a
// link to the pull request. Runs after the pull request step.
//
// Missing RESEND_API_KEY or EMAIL_FROM is not an error: the pull request is
// already open, so the step logs a notice and passes. A send that Resend
// rejects does fail the step, so a bad key or sender is visible.
import fs from 'node:fs';

const { RESEND_API_KEY: apiKey, EMAIL_FROM: from, EMAIL_TO: to, PR_URL: prUrl = '', DRAFT_FILE: draftFile } = process.env;

if (!apiKey || !from || !to) {
  console.log('RESEND_API_KEY, EMAIL_FROM, or EMAIL_TO is not set. Skipping the review email.');
  process.exit(0);
}
if (!draftFile || !fs.existsSync(draftFile)) {
  throw new Error(`Draft file not found: ${draftFile}`);
}

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const post = JSON.parse(fs.readFileSync(draftFile, 'utf8'));
const button = prUrl
  ? `<p style="margin:24px 0;"><a href="${escapeHtml(prUrl)}" style="display:inline-block;background:#1c1917;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:8px;">Review and merge on GitHub</a></p>`
  : '<p style="margin:24px 0;color:#b91c1c;">No pull request link was returned. Check the repository for the blog-draft branch.</p>';

const html = `<!doctype html>
<html>
<body style="margin:0;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1c1917;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:#ffffff;border-radius:12px;padding:28px;">
      <p style="margin:0 0 4px;font-size:13px;color:#78716c;">New blog draft for review</p>
      <h1 style="margin:0 0 6px;font-size:24px;line-height:1.25;">${escapeHtml(post.title)}</h1>
      ${post.description ? `<p style="margin:0;color:#78716c;font-size:15px;">${escapeHtml(post.description)}</p>` : ''}
      ${button}
      <p style="margin:0 0 20px;color:#78716c;font-size:13px;">Merging publishes the post. Leaving the pull request open holds it, and nothing new is generated while it is open.</p>
      <hr style="border:none;border-top:1px solid #e7e5e4;margin:0 0 20px;">
      <div style="font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(post.markdown ?? '')}</div>
      ${button}
    </div>
  </div>
</body>
</html>`;

const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ from, to: [to], subject: `New blog draft: ${post.title}`, html }),
});

if (!response.ok) {
  throw new Error(`Resend send failed (HTTP ${response.status}): ${(await response.text()).slice(0, 500)}`);
}
const data = await response.json().catch(() => ({}));
console.log(`Review email sent to ${to} (id: ${data.id ?? 'unknown'}).`);
