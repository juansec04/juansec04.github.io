const generateHtmlBtn = document.getElementById('generate-html-btn');
const outputArea = document.getElementById('output-area');
const pageTitle = document.getElementById('page-title');
const form = document.getElementById('intro-form');

function toHtmlSafe(str) {
  return window.escapeHtml ? window.escapeHtml(str) : String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtmlCode(data) {
  const fullName = [data.firstName, data.middleName, data.preferredName ? `\"${data.preferredName}\"` : '', data.lastName]
    .filter(Boolean).join(' ');

  let html = `
<h2>Introduction HTML</h2>
<h3>${toHtmlSafe(fullName)} ${toHtmlSafe(data.divider)} ${toHtmlSafe(data.mascotAdjective)} ${toHtmlSafe(data.mascotAnimal)}</h3>
<figure>
  <img src="${toHtmlSafe(data.picture)}" alt="${toHtmlSafe(fullName)}" />
  <figcaption>${toHtmlSafe(data.pictureCaption)}</figcaption>
</figure>
<ul>
  <li><strong>Personal Statement:</strong> ${toHtmlSafe(data.personalStatement)}</li>
  <li><strong>Personal Background:</strong> ${toHtmlSafe(data.personalBackground)}</li>
  <li><strong>Professional Background:</strong> ${toHtmlSafe(data.professionalBackground)}</li>
  <li><strong>Academic Background:</strong> ${toHtmlSafe(data.academicBackground)}</li>
  <li><strong>Subject Background:</strong> ${toHtmlSafe(data.subjectBackground)}</li>
  <li><strong>Primary Computer:</strong> ${toHtmlSafe(data.primaryComputer)}</li>
  <li><strong>Quote:</strong> “${toHtmlSafe(data.quote)}” — ${toHtmlSafe(data.quoteAuthor)}</li>
</ul>
<h4>Courses</h4>
<ul>
`;
  html += data.courses.map((c) => `  <li><strong>${toHtmlSafe(c.department)} ${toHtmlSafe(c.number)} ${toHtmlSafe(c.name)}:</strong> ${toHtmlSafe(c.reason)}</li>`).join('\n');
  html += '\n</ul>\n<h4>Links</h4>\n<ul>\n';
  html += data.links.map((link, idx) => `  <li><a href="${toHtmlSafe(link)}">Link ${idx + 1}</a></li>`).join('\n');
  html += '\n</ul>\n';
  return html;
}

if (generateHtmlBtn) {
  generateHtmlBtn.addEventListener('click', () => {
    const data = window.gatherIntroData ? window.gatherIntroData() : null;
    if (!data) {
      alert('Cannot find form data. Please ensure the intro form script is loaded first.');
      return;
    }

    const validationError = window.validateIntroData ? window.validateIntroData(data) : '';
    if (validationError) {
      alert(`Validation error: ${validationError}`);
      return;
    }

    pageTitle.textContent = 'Introduction HTML';
    form.style.display = 'none';
    const code = buildHtmlCode(data);

    outputArea.innerHTML = `
      <section>
        <pre><code>${toHtmlSafe(code)}</code></pre>
        <p><button id="reset-html">Reset progress</button></p>
      </section>
    `;

    document.getElementById('reset-html').addEventListener('click', () => window.location.reload());
  });
}
