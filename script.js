const locale = localStorage.getItem('locale') || 'fr';
const siteData = await fetch('./content/site.json').then((r) => r.json());
const projectsData = await fetch('./content/projects.json').then((r) => r.json());

const page = document.body.dataset.page;
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get('category');

function t(value) {
  return value?.[locale] || value?.fr || '';
}

function setLanguageButton() {
  const button = document.getElementById('lang-toggle');
  button.textContent = locale === 'fr' ? 'Switch to English' : 'Passer en français';
  button.addEventListener('click', () => {
    localStorage.setItem('locale', locale === 'fr' ? 'en' : 'fr');
    window.location.reload();
  });
}

function renderStaticContent() {
  document.documentElement.lang = locale;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(siteData.ui[key]);
  });
}

function renderNavigation() {
  const nav = document.getElementById('category-links');
  nav.innerHTML = `
    <li><a href="index.html">${t(siteData.ui.allCategories)}</a></li>
    ${siteData.categories
      .map(
        (category) =>
          `<li><a href="category.html?category=${encodeURIComponent(category.slug)}">${t(
            category.name,
          )}</a></li>`,
      )
      .join('')}
  `;

  const chips = document.getElementById('category-buttons');
  chips.innerHTML = siteData.categories
    .map(
      (category) =>
        `<a class="chip" href="category.html?category=${encodeURIComponent(category.slug)}">${t(
          category.name,
        )}</a>`,
    )
    .join('');
}

function filteredProjects() {
  if (page === 'category' && selectedCategory) {
    return projectsData.projects.filter((project) => project.category === selectedCategory);
  }
  return projectsData.projects;
}

function renderCategoryTitle() {
  if (page !== 'category') return;
  const titleNode = document.getElementById('category-title');
  const category = siteData.categories.find((item) => item.slug === selectedCategory);
  titleNode.textContent = category ? t(category.name) : t(siteData.ui.allProjects);
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  const projects = filteredProjects();

  if (!projects.length) {
    container.innerHTML = `<p>${t(siteData.ui.noProjects)}</p>`;
    return;
  }

  container.innerHTML = projects
    .map((project) => {
      const images = project.images.filter(Boolean);
      const mainImage = images[0];
      const rightTop = images[1] || mainImage;
      const rightBottom = images[2] || rightTop;
      return `
      <article class="project-card">
        <div class="project-content">
          <div class="project-gallery">
            <img class="left" src="${mainImage}" alt="${t(project.title)}" loading="lazy" />
            <div class="right">
              <img src="${rightTop}" alt="${t(project.title)}" loading="lazy" />
              <img src="${rightBottom}" alt="${t(project.title)}" loading="lazy" />
            </div>
          </div>
          <div class="project-description">
            <h3>${t(project.title)}</h3>
            <div class="description-box">
              <p>${t(project.description)}</p>
            </div>
          </div>
        </div>
      </article>`;
    })
    .join('');
}

setLanguageButton();
renderStaticContent();
renderNavigation();
renderCategoryTitle();
renderProjects();
