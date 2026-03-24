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
      firstName: data.firstName,
      middleName: data.middleName,
      preferredName: data.preferredName,
      lastName: data.lastName,
      acknowledgmentStatement: data.ackStatement,
      acknowledgmentDate: data.ackDate,
      mascotAdjective: data.mascotAdjective,
      mascotAnimal: data.mascotAnimal,
      divider: data.divider,
      image: data.picture,
      imageCaption: data.pictureCaption,
      personalStatement: data.personalStatement,
      personalBackground: data.personalBackground,
      professionalBackground: data.professionalBackground,
      academicBackground: data.academicBackground,
      subjectBackground: data.subjectBackground,
      primaryComputer: data.primaryComputer,
      funnyThing: data.funnyThing,
      shareSomething: data.shareSomething,
      quote: data.quote,
      quoteAuthor: data.quoteAuthor,
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
