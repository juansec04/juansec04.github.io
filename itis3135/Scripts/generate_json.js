const generateJsonBtn = document.getElementById('generate-json-btn');
const outputArea = document.getElementById('output-area');
const pageTitle = document.getElementById('page-title');
const form = document.getElementById('intro-form');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

if (generateJsonBtn) {
  generateJsonBtn.addEventListener('click', () => {
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

    const linkLabels = ['LinkedIn', 'GitHub', 'GitHub Repo', 'FreeCodeCamp', 'CLT Webpage'];

    pageTitle.style.display = 'none';
    form.style.display = 'none';

    const jsonObj = {
      'first_name': data.firstName,
      'last_name': data.lastName,
      'acknowledgment_statement': data.ackStatement,
      'acknowledgment_date': data.ackDate,
      'mascot_adjective': data.mascotAdjective,
      'mascot_animal': data.mascotAnimal,
      'divider': data.divider,
      'image': data.picture || '../Snowboarding.jpeg',
      'image_caption': data.pictureCaption,
      'personal_statement': data.personalStatement,
      'personal_background': data.personalBackground,
      'professional_background': data.professionalBackground,
      'academic_background': data.academicBackground,
      'subject_background': data.subjectBackground,
      'primary_computer': data.primaryComputer,
      'quote': data.quote,
      'quote_author': data.quoteAuthor,
      'courses': data.courses,
      'links': data.links.map((href, i) => ({
        'name': linkLabels[i] || href,
        'href': href
      }))
    };

    // Add optional fields only if they have values
    if (data.middleName) jsonObj['middle_initial'] = data.middleName;
    if (data.preferredName) jsonObj['preferred_name'] = data.preferredName;
    if (data.backupComputer) jsonObj['backup_computer'] = data.backupComputer;
    if (data.funnyThing) jsonObj['funny_thing'] = data.funnyThing;
    if (data.shareSomething) jsonObj['something_to_share'] = data.shareSomething;

    const jsonText = JSON.stringify(jsonObj, null, 2);

    outputArea.innerHTML = `
      <section>
        <pre><code class="language-json">${escapeHtml(jsonText)}</code></pre>
        <p><button id="reset-json">Reset progress</button></p>
      </section>
    `;

    document.getElementById('reset-json').addEventListener('click', () => window.location.reload());

    // Apply syntax highlighting
    if (typeof hljs !== 'undefined') {
      hljs.highlightAll();
    }
  });
}