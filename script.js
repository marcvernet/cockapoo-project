// ========================================
// Cockapoo Charm - Interactivity
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Gallery Modal ---
  const modal = document.getElementById('detailModal');
  if (modal) {
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalSize = document.getElementById('modalSize');
    const modalAge = document.getElementById('modalAge');
    const modalColor = document.getElementById('modalColor');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const name = item.dataset.name;
        const size = item.dataset.size;
        const age = item.dataset.age;
        const color = item.dataset.color;

        // Use a higher res version for the modal
        const src = img.src.replace(/w=\d+/, 'w=800').replace(/h=\d+/, 'h=800');

        modalImage.src = src;
        modalImage.alt = `${name} the Cockapoo`;
        modalName.textContent = name;
        modalSize.textContent = size;
        modalAge.textContent = age;
        modalColor.textContent = color;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // --- Breed Tabs ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Intersection Observer for fade-in animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animate gallery items, size cards, color cards, and detail cards
  document.querySelectorAll('.gallery-item, .size-card, .color-card, .detail-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // --- Parallax-like scroll effect for hero ---
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
      }
    });
  }

  // --- Color card interaction ---
  document.querySelectorAll('.color-card').forEach(card => {
    card.addEventListener('click', () => {
      const colorName = card.querySelector('h4').textContent;
      // Visual feedback: briefly scale up
      card.style.transform = 'scale(1.05)';
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    });
  });

});
