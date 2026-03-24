const form = document.getElementById('intro-form');
const outputArea = document.getElementById('output-area');
const pageTitle = document.getElementById('page-title');
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
  createCourseRow({ department: 'ITIS', number: '3135', name: 'Web Development', reason: 'Required for class' });
}

function gatherIntroData() {
  const formData = new FormData(form);
  const courseElements = coursesWrapper.querySelectorAll('.course-entry');

  const courses = Array.from(courseElements).map((entry) => {
    return {
      department: entry.querySelector('[name="courseDept"]').value.trim(),
      number: entry.querySelector('[name="courseNumber"]').value.trim(),
      name: entry.querySelector('[name="courseName"]').value.trim(),
      reason: entry.querySelector('[name="courseReason"]').value.trim()
    };
  });

  const data = {
    firstName: formData.get('firstName').trim(),
    middleName: formData.get('middleName').trim(),
    preferredName: formData.get('preferredName').trim(),
    lastName: formData.get('lastName').trim(),
    ackStatement: formData.get('ackStatement').trim(),
    ackDate: formData.get('ackDate'),
    mascotAdjective: formData.get('mascotAdjective').trim(),
    mascotAnimal: formData.get('mascotAnimal').trim(),
    divider: formData.get('divider').trim(),
    picture: picturePreview.src,
    pictureCaption: formData.get('pictureCaption').trim(),
    personalStatement: formData.get('personalStatement').trim(),
    personalBackground: formData.get('personalBackground').trim(),
    professionalBackground: formData.get('professionalBackground').trim(),
    academicBackground: formData.get('academicBackground').trim(),
    subjectBackground: formData.get('subjectBackground').trim(),
    primaryComputer: formData.get('primaryComputer').trim(),
    funnyThing: formData.get('funnyThing').trim(),
    shareSomething: formData.get('shareSomething').trim(),
    quote: formData.get('quote').trim(),
    quoteAuthor: formData.get('quoteAuthor').trim(),
    links: [
      formData.get('link1').trim(),
      formData.get('link2').trim(),
      formData.get('link3').trim(),
      formData.get('link4').trim(),
      formData.get('link5').trim(),
    ],
    courses,
  };

  return data;
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
  const fullName = [data.firstName, data.middleName, data.preferredName ? `"${data.preferredName}"` : '', data.lastName]
    .filter(Boolean).join(' ');

  const courseItems = data.courses.map((c) => `<li><strong>${c.department} ${c.number} ${c.name}:</strong> ${c.reason}</li>`).join('\n');
  const linkItems = data.links.map((href, i) => `<li><a href="${href}" target="_blank" rel="noopener noreferrer">Link ${i + 1}</a></li>`).join('\n');

  return `
    <h3>${fullName} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}</h3>
    <figure>
      <img src="${data.picture}" alt="${fullName} image" style="max-width:150px;" />
      <figcaption>${data.pictureCaption}</figcaption>
    </figure>
    <ul>
      <li><strong>Personal Statement:</strong> ${data.personalStatement}</li>
      <li><strong>Personal Background:</strong> ${data.personalBackground}</li>
      <li><strong>Professional Background:</strong> ${data.professionalBackground}</li>
      <li><strong>Academic Background:</strong> ${data.academicBackground}</li>
      <li><strong>Subject Background:</strong> ${data.subjectBackground}</li>
      <li><strong>Primary Computer:</strong> ${data.primaryComputer}</li>
      ${data.funnyThing ? `<li><strong>Funny Thing:</strong> ${data.funnyThing}</li>` : ''}
      ${data.shareSomething ? `<li><strong>Share Something:</strong> ${data.shareSomething}</li>` : ''}
      <li><strong>Quote:</strong> “${data.quote}” — ${data.quoteAuthor}</li>
      <li><strong>Acknowledgment:</strong> ${data.ackStatement} (${data.ackDate})</li>
    </ul>
    <h4>Courses</h4>
    <ul>${courseItems}</ul>
    <h4>Links</h4>
    <ul>${linkItems}</ul>
  `;
}

function doSubmit() {
  const data = gatherIntroData();
  const validationError = validateIntroData(data);
  if (validationError) {
    alert(`Form validation failed: ${validationError}`);
    return;
  }

  pageTitle.textContent = 'Introduction HTML';
  form.style.display = 'none';
  outputArea.innerHTML = renderIntroductionHTML(data) + '<p><button id="reset-progress">Reset progress</button></p>';

  document.getElementById('reset-progress').addEventListener('click', () => {
    window.location.reload();
  });
}

function escapeHtml(str) {
  if (!str) { return ''; }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function clearFormFields() {
  Array.from(form.querySelectorAll('input, textarea')).forEach((el) => {
    if (el.type === 'file') return;
    if (el.type === 'reset') return;
    if (el.type === 'button') return;
    if (['submit'].includes(el.type)) return;
    el.value = '';
  });
  setInitialCourses();
  picturePreview.src = 'images/headshot.jpeg';
}

function loadPicturePreview() {
  const file = pictureInput.files && pictureInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      picturePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function initialize() {
  setInitialCourses();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    doSubmit();
  });

  clearBtn.addEventListener('click', clearFormFields);

  addCourseBtn.addEventListener('click', () => createCourseRow({ department: '', number: '', name: '', reason: '' }));

  pictureInput.addEventListener('change', loadPicturePreview);
}

window.gatherIntroData = gatherIntroData;
window.validateIntroData = validateIntroData;
window.renderIntroductionHTML = renderIntroductionHTML;
window.escapeHtml = escapeHtml;

initialize();
