// script.js - small interactive features:
// - Theme toggle (dark/light)
// - Project filter buttons
// - Lightbox modal for project images
// - Contact form front-end validation + dummy submission handling

document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? 'Light' : 'Dark';
  });

  // Project filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      filterProjects(filter);
    });
  });

  function filterProjects(filter) {
    const items = document.querySelectorAll('.project-item');
    items.forEach(it => {
      const tags = it.dataset.tags ? it.dataset.tags.split(' ') : [];
      if (filter === 'all' || tags.includes(filter)) {
        it.classList.remove('hidden');
      } else {
        it.classList.add('hidden');
      }
    });
  }

  // Lightbox: open modal with large image & title
  const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
  document.querySelectorAll('.view-project').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const img = link.dataset.img || link.closest('.card').querySelector('.project-thumb').src;
      const title = link.dataset.title || 'Project';
      document.getElementById('lightboxImage').src = img;
      document.getElementById('lightboxTitle').textContent = title;
      lightboxModal.show();
    });
  });

  // Contact form validation (front-end)
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple HTML5 check
    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      contactStatus.innerHTML = '<div class="text-danger">Vui lòng sửa lỗi trong form.</div>';
      return;
    }
    // Simulate submission (no backend in this demo)
    const name = document.getElementById('name').value.trim();
    contactStatus.innerHTML = `<div class="text-success">Cảm ơn ${escapeHtml(name)}! Tin nhắn đã được gửi (demo).</div>`;
    contactForm.reset();
    contactForm.classList.remove('was-validated');
  });

  // Simple escape for displayed name
  function escapeHtml(s){
    return s.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
});
