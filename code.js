// Attach language switch behavior to any .language-button on the page.
const languageButtons = document.querySelectorAll('.language-button');

languageButtons.forEach(btn => {
  const target = btn.getAttribute('data-target');
  if (target) {
    btn.addEventListener('click', () => { window.location.href = target; });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') window.location.href = target; });
  } else {
    // Fallback: toggle between index-en.html and index-es.html based on current location
    btn.addEventListener('click', () => {
      const path = window.location.pathname.split('/').pop();
      if (path.includes('en') || path === '' || path === 'index.html') {
        window.location.href = 'index-es.html';
      } else {
        window.location.href = 'index-en.html';
      }
    });
  }
});

// Dark/Light mode toggle
const themeButton = document.querySelector('.theme-button');
const themeIcon = themeButton ? themeButton.querySelector('i') : null;

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    localStorage.setItem('siteTheme', 'dark');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('siteTheme', 'light');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  }
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  applyTheme(isDark ? 'light' : 'dark');
}

if (themeButton) {
  themeButton.addEventListener('click', toggleTheme);
  themeButton.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') toggleTheme(); });
}

const savedTheme = localStorage.getItem('siteTheme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // default to light
  applyTheme('light');
}
