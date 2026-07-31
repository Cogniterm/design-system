const SUN = '<svg class="lic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>'
const MOON = '<svg class="lic" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"/></svg>'

// 라이트/다크 전환 — localStorage에 기억
function toggleTheme() {
  const root = document.documentElement;
  const dark = root.getAttribute('data-theme') !== 'dark';
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (icon) icon.innerHTML = dark ? SUN : MOON;
  if (label) label.textContent = dark ? 'Light' : 'Dark';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  window.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    if (icon) icon.innerHTML = SUN;
    if (label) label.textContent = 'Light';
  });
}

// 코드 복사 버튼
function copyCode(btn) {
  const code = btn.parentElement.querySelector('code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied ✓';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
}
