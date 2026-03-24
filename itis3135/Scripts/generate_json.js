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

    pageTitle.textContent = 'Introduction JSON';
    form.style.display = 'none';

    const jsonText = JSON.stringify({
      first_name: data.firstName,
      middle_name: data.middleName,
      preferred_name: data.preferredName,
      last_name: data.lastName,
      acknowledgment_statement: data.ackStatement,
      acknowledgment_date: data.ackDate,
      mascot_adjective: data.mascotAdjective,
      mascot_animal: data.mascotAnimal,
      divider: data.divider,
      image: data.picture,
      image_caption: data.pictureCaption,
      personal_statement: data.personalStatement,
      personal_background: data.personalBackground,
      professional_background: data.professionalBackground,
      academic_background: data.academicBackground,
      subject_background: data.subjectBackground,
      primary_computer: data.primaryComputer,
      funny_thing: data.funnyThing,
      share_something: data.shareSomething,
      quote: data.quote,
      quote_author: data.quoteAuthor,
      courses: data.courses,
      links: data.links.map((href, i) => ({ name: `Link ${i + 1}`, href }))
       }, null, 2);

    outputArea.innerHTML = `
      <section>
        <pre><code>${escapeHtml(jsonText)}</code></pre>
        <p><button id="reset-json">Reset progress</button></p>
      </section>
    `;

    document.getElementById('reset-json').addEventListener('click', () => window.location.reload());
  });
}
