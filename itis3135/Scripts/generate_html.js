const generateHtmlBtn = document.getElementById('generate-html-btn');

function toHtmlSafe(str) {
  return window.escapeHtml ? window.escapeHtml(str) : String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtmlCode(data) {
  const fullName = [
    data.firstName,
    data.middleName,
    data.preferredName ? `"${data.preferredName}"` : '',
    data.lastName
  ].filter(Boolean).join(' ');

  let html = `
<h2>Introduction HTML</h2>
<h3>${toHtmlSafe(fullName)} ${toHtmlSafe(data.divider)} ${toHtmlSafe(data.mascotAdjective)} ${toHtmlSafe(data.mascotAnimal)}</h3>

<figure>
  <img src="${toHtmlSafe(data.picture || '../Snowboarding.jpeg')}" alt="${toHtmlSafe(fullName)} - Computer Science Student" width="400" height="450" />
  <figcaption>${toHtmlSafe(data.pictureCaption)}</figcaption>
</figure>
<p class="italic">${toHtmlSafe(data.pictureCaption)}</p>
<hr>
<p>
    ${toHtmlSafe(data.personalStatement)}
</p>
<ul>
  <li><strong>Personal Background:</strong> ${toHtmlSafe(data.personalBackground)}</li>
  <li><strong>Professional Background:</strong> ${toHtmlSafe(data.professionalBackground)}</li>
  <li><strong>Academic Background:</strong> ${toHtmlSafe(data.academicBackground)}</li>
  <li><strong>Technical Skills & Experience:</strong> ${toHtmlSafe(data.subjectBackground)}</li>
  <li><strong>Current Setup:</strong> ${toHtmlSafe(data.primaryComputer)}</li>
  <li><strong>Backup Work Computer & Location Plan:</strong> ${toHtmlSafe(data.backupComputer)}</li>
  ${data.funnyThing ? `<li><strong>Funny Thing:</strong> ${toHtmlSafe(data.funnyThing)}</li>` : ''}
  ${data.shareSomething ? `<li><strong>Something I would like to share:</strong> ${toHtmlSafe(data.shareSomething)}</li>` : ''}
</ul>
<h3>Courses I'm taking, & Why:</h3>
<ol>
`;

  html += data.courses.map((c) => `
  <li>${toHtmlSafe(c.department)} ${toHtmlSafe(c.number)} - ${toHtmlSafe(c.name)}</li>
`).join('\n');

  html += `
</ol>
<h3>Personal Motto</h3>
<blockquote>
  <p>"${toHtmlSafe(data.quote)}" — <cite>${toHtmlSafe(data.quoteAuthor)}</cite></p>
</blockquote>
<p><strong>Acknowledgment:</strong> ${toHtmlSafe(data.ackStatement)} (${toHtmlSafe(data.ackDate)})</p>
`;

  const linkLabels = ['LinkedIn', 'GitHub', 'GitHub Repo', 'FreeCodeCamp', 'CLT Webpage'];

  html += `
<h3>Links</h3>
<ul>
`;

  html += data.links.map((href, i) => `
  <li><a href="${toHtmlSafe(href)}" target="_blank" rel="noopener noreferrer">${toHtmlSafe(linkLabels[i] || href)}</a></li>
`).join('\n');

  html += `
</ul>
`;

  return html;
}

if (generateHtmlBtn) {
  const outputArea = document.getElementById('output-area');
  const pageTitle = document.getElementById('page-title');
  const form = document.getElementById('intro-form');

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

    pageTitle.style.display = 'none';
    form.style.display = 'none';
    const code = buildHtmlCode(data);

    outputArea.innerHTML = `
      <section>
        <pre><code class="language-html">${toHtmlSafe(code)}</code></pre>
        <p><button id="reset-html">Reset progress</button></p>
      </section>
    `;

    document.getElementById('reset-html').addEventListener('click', () => window.location.reload());

    // Apply syntax highlighting
    if (typeof hljs !== 'undefined') {
      hljs.highlightAll();
    }
  });
}