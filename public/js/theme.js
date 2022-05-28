const btn = document.querySelector('.toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme');
const html = document.querySelector('html');

let theme = 'dark';

if (currentTheme === 'dark') {
  html.classList.toggle('dark-theme');
} else if (currentTheme === 'light') {
  html.classList.toggle('light-theme');
}

btn.addEventListener('click', () => {
  if (prefersDarkScheme.matches) {
    html.classList.toggle('light-theme');
    theme = html.classList.contains('light-theme') ? 'light' : 'dark';
  } else {
    html.classList.toggle('dark-theme');
    theme = html.classList.contains('dark-theme') ? 'dark' : 'light';
  }
  localStorage.setItem('theme', theme);
});
