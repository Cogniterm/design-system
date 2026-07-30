// 라이트/다크 전환 — localStorage에 기억
function toggleTheme() {
  const root = document.documentElement;
  const dark = root.getAttribute('data-theme') !== 'dark';
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (icon) icon.textContent = dark ? '☀' : '☾';
  if (label) label.textContent = dark ? 'Light' : 'Dark';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  window.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    if (icon) icon.textContent = '☀';
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
