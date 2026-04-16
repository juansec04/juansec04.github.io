const formhtml = document.getElementById('intro-form');
const outputAreahtml = document.getElementById('output-area');
const pageTitlehtml = document.getElementById('page-title');
const pictureInput = document.getElementById('picture');
const picturePreview = document.getElementById('picture-preview');
const addCourseBtn = document.getElementById('add-course');
const coursesWrapper = document.getElementById('courses-wrapper');
const clearBtn = document.getElementById('clear-btn');

let courseIndex = 0;

function createCourseRow(courseData = {}) {
  const index = courseIndex++;
  const wrapper = document.createElement('div');
  wrapper.className = 'course-entry';
  wrapper.dataset.index = index;
  wrapper.style.marginBottom = '0.5rem';

  wrapper.innerHTML = `
    <label>Dept</label>
    <input type="text" name="courseDept" value="${courseData.department || 'ITIS'}" required placeholder="ITIS" />
    <label>Number</label>
    <input type="text" name="courseNumber" value="${courseData.number || '3135'}" required placeholder="3135" />
    <label>Name</label>
    <input type="text" name="courseName" value="${courseData.name || 'Introduction to Web'}" required placeholder="Course Name" />
    <label>Reason</label>
    <input type="text" name="courseReason" value="${courseData.reason || 'I need this course.'}" required placeholder="Reason" />
    <button type="button" class="remove-course">Delete course</button>
  `;

  wrapper.querySelector('.remove-course').addEventListener('click', () => {
    wrapper.remove();
  });

  coursesWrapper.appendChild(wrapper);
}

function setInitialCourses() {
  coursesWrapper.innerHTML = '';
  createCourseRow({
    department: 'ITIS',
    number: '3135',
    name: 'Web App Design and Development',
    reason: 'This course teaches practical web development skills essential for modern software development.'
  });
  createCourseRow({
    department: 'ITIS',
    number: '3200',
    name: 'Intro to Info Security & Priv',
    reason: 'Required for my cybersecurity concentration, focusing on information security fundamentals.'
  });
  createCourseRow({
    department: 'MATH',
    number: '2164',
    name: 'Matrices & Linear Algebra',
    reason: 'Required mathematics course for computer science degree, essential for understanding algorithms and graphics.'
  });
  createCourseRow({
    department: 'ITSC',
    number: '3155',
    name: 'Software Engineering',
    reason: 'Provides knowledge of software development processes and best practices for team projects.'
  });
  createCourseRow({
    department: 'ITSC',
    number: '2600',
    name: 'Computer Science Program, Identity, Career',
    reason: 'Helps understand the computer science field and career opportunities available.'
  });
}

function gatherIntroData() {
  const formData = new FormData(formhtml);
  const courseElements = coursesWrapper.querySelectorAll('.course-entry');

  const courses = Array.from(courseElements).map((entry) => {
    return {
      department: entry.querySelector('[name="courseDept"]').value.trim(),
      number: entry.querySelector('[name="courseNumber"]').value.trim(),
      name: entry.querySelector('[name="courseName"]').value.trim(),
      reason: entry.querySelector('[name="courseReason"]').value.trim()
    };
  });

  return {
    firstName: formData.get('firstName').trim(),
    middleName: formData.get('middleName').trim(),
    preferredName: formData.get('preferredName').trim(),
    lastName: formData.get('lastName').trim(),
    ackStatement: formData.get('ackStatement').trim(),
    ackDate: formData.get('ackDate'),
    mascotAdjective: formData.get('mascotAdjective').trim(),
    mascotAnimal: formData.get('mascotAnimal').trim(),
    divider: formData.get('divider').trim(),
    picture: pictureInput.files && pictureInput.files[0]
      ? picturePreview.src
      : '../Snowboarding.jpeg',
    pictureCaption: formData.get('pictureCaption').trim(),
    personalStatement: formData.get('personalStatement').trim(),
    personalBackground: formData.get('personalBackground').trim(),
    professionalBackground: formData.get('professionalBackground').trim(),
    academicBackground: formData.get('academicBackground').trim(),
    subjectBackground: formData.get('subjectBackground').trim(),
    primaryComputer: formData.get('primaryComputer').trim(),
    backupComputer: formData.get('backupComputer').trim(),
    funnyThing: formData.get('funnyThing').trim(),
    shareSomething: formData.get('shareSomething').trim(),
    quote: formData.get('quote').trim(),
    quoteAuthor: formData.get('quoteAuthor').trim(),
    links: [
      formData.get('link1').trim(),
      formData.get('link2').trim(),
      formData.get('link3').trim(),
      formData.get('link4').trim(),
      formData.get('link5').trim()
    ],
    courses
  };
}

function validateIntroData(data) {
  const requiredStrings = [
    'firstName', 'lastName', 'ackStatement', 'ackDate', 'mascotAdjective', 'mascotAnimal', 'divider',
    'pictureCaption', 'personalStatement', 'personalBackground', 'professionalBackground', 'academicBackground',
    'subjectBackground', 'primaryComputer', 'quote', 'quoteAuthor'
  ];

  for (const key of requiredStrings) {
    if (!data[key] || data[key].length === 0) {
      return `${key} is required.`;
    }
  }

  if (!data.links.every((link) => link.length > 0)) {
    return 'All 5 links are required.';
  }

  if (!data.courses.length) {
    return 'At least one course is required.';
  }

  for (const [idx, course] of data.courses.entries()) {
    if (!course.department || !course.number || !course.name || !course.reason) {
      return `Course #${idx + 1} is missing required fields.`;
    }
  }

  return '';
}

function renderIntroductionHTML(data) {
  const fullName = [
    data.firstName,
    data.middleName,
    data.preferredName ? `"${data.preferredName}"` : '',
    data.lastName
  ].filter(Boolean).join(' ');

  const courseItems = data.courses
    .map((c) => `<li>${c.department} ${c.number} - ${c.name}</li>`)
    .join('\n');

  const linkLabels = ['LinkedIn', 'GitHub', 'GitHub Repo', 'FreeCodeCamp', 'CLT Webpage'];

  const linkItems = data.links
    .map((href, i) =>
      `<li><a href="${href}" target="_blank" rel="noopener noreferrer">${linkLabels[i] || href}</a></li>`
    )
    .join('\n');

  return `
    <h2>Introduction</h2>
    <figure>
      <img src="${data.picture}" alt="${fullName} - Computer Science Student" width="400" height="450">
      <figcaption>${data.pictureCaption}</figcaption>
    </figure>
    <p class="italic">${data.pictureCaption}</p>
    <hr>
    <p>
        ${data.personalStatement}
    </p>
    <ul>
        <li><strong>Personal Background:</strong> ${data.personalBackground}</li>
        <li><strong>Professional Background:</strong> ${data.professionalBackground}</li>
        <li><strong>Academic Background:</strong> ${data.academicBackground}</li>
        <li><strong>Technical Skills & Experience:</strong> ${data.subjectBackground}</li>
        <li><strong>Current Setup:</strong> ${data.primaryComputer}</li>
        <li><strong>Backup Work Computer & Location Plan:</strong> ${data.backupComputer}</li>
        ${data.funnyThing ? `<li><strong>Funny Thing:</strong> ${data.funnyThing}</li>` : ''}
        ${data.shareSomething ? `<li><strong>Something I would like to share:</strong> ${data.shareSomething}</li>` : ''}
    </ul>
    <h3>Courses I'm taking, & Why:</h3>
    <ol>${courseItems}</ol>
    <h3>Personal Motto</h3>
    <blockquote>
        <p>"${data.quote}" — <cite>${data.quoteAuthor}</cite></p>
    </blockquote>
    <p><strong>Acknowledgment:</strong> ${data.ackStatement} (${data.ackDate})</p>
  `;
}

function doSubmit() {
  const data = gatherIntroData();
  const validationError = validateIntroData(data);

  if (validationError) {
    alert(`Form validation failed: ${validationError}`);
    return;
  }

  pageTitlehtml.style.display = 'none';
  document.getElementById('form-instruction').style.display = 'none';
  formhtml.style.display = 'none';
  outputAreahtml.innerHTML = renderIntroductionHTML(data) + '<p><button id="reset-progress">Reset progress</button></p>';

  document.getElementById('reset-progress').addEventListener('click', () => {
    window.location.reload();
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function clearFormFields() {
  Array.from(formhtml.querySelectorAll('input, textarea')).forEach((el) => {
    if (el.type === 'file') return;
    if (el.type === 'reset') return;
    if (el.type === 'button') return;
    if (el.type === 'submit') return;
    el.value = '';
  });

  coursesWrapper.innerHTML = '';
  picturePreview.src = '../Snowboarding.jpeg';
  picturePreview.alt = 'Default headshot';
}

function loadPicturePreview() {
  const file = pictureInput.files && pictureInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      picturePreview.src = e.target.result;
      picturePreview.alt = 'Uploaded preview';
    };
    reader.readAsDataURL(file);
  } else {
    picturePreview.src = '../Snowboarding.jpeg';
    picturePreview.alt = 'Default headshot';
  }
}

function initialize() {
  setInitialCourses();

  formhtml.addEventListener('submit', function (e) {
    e.preventDefault();
    doSubmit();
  });

  formhtml.addEventListener('reset', function (e) {
    // Reset the courses and picture when reset button is clicked
    setInitialCourses();
    picturePreview.src = '../Snowboarding.jpeg';
    picturePreview.alt = 'Default headshot';
    // Show the form and instruction again
    pageTitlehtml.style.display = 'block';
    pageTitlehtml.textContent = 'Introduction Form';
    document.getElementById('form-instruction').style.display = 'block';
    formhtml.style.display = 'block';
    outputAreahtml.innerHTML = '';
  });

  clearBtn.addEventListener('click', clearFormFields);
  addCourseBtn.addEventListener('click', () =>
    createCourseRow({ department: '', number: '', name: '', reason: '' })
  );
  pictureInput.addEventListener('change', loadPicturePreview);
}

window.gatherIntroData = gatherIntroData;
window.validateIntroData = validateIntroData;
window.renderIntroductionHTML = renderIntroductionHTML;
window.escapeHtml = escapeHtml;

initialize();