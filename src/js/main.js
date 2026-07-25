// REHOBOTH BEAUTY STUDIO - INTERACTIVE LOGIC

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll effect & Active link update
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }

  // 3. Booking Modal Handlers
  const bookingModal = document.getElementById('bookingModal');
  const openBookingBtns = document.querySelectorAll('.trigger-booking');
  const closeBookingBtn = document.getElementById('closeBooking');
  const bookingForm = document.getElementById('bookingForm');
  const bookingServiceSelect = document.getElementById('bookingServiceSelect');

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectService = btn.getAttribute('data-service');
      if (preselectService && bookingServiceSelect) {
        bookingServiceSelect.value = preselectService;
      }
      if (bookingModal) bookingModal.classList.add('active');
    });
  });

  if (closeBookingBtn && bookingModal) {
    closeBookingBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
      }
    });
  }

  // Booking Form Submission -> Direct WhatsApp Dispatch (9633395475)
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('patientName').value.trim();
      const phone = document.getElementById('patientPhone').value.trim();
      const service = document.getElementById('bookingServiceSelect').value;
      const date = document.getElementById('bookingDate').value;
      const notes = document.getElementById('patientNotes').value.trim();

      const message = `Hello Rehoboth Beauty Studio! 👋%0A%0AI would like to book an appointment:%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Phone:* ${encodeURIComponent(phone)}%0A✨ *Service:* ${encodeURIComponent(service)}%0A📅 *Preferred Date:* ${encodeURIComponent(date)}%0A📝 *Notes:* ${encodeURIComponent(notes || 'None')}`;

      window.open(`https://wa.me/919633395475?text=${message}`, '_blank');
      
      bookingModal.classList.remove('active');
      alert(`Thank you ${name}! Redirecting you to WhatsApp to confirm your appointment booking for ${service}.`);
      bookingForm.reset();
    });
  }

  // Quick Contact Form Submission in Contact Section
  const quickContactForm = document.getElementById('quickContactForm');
  if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const qName = document.getElementById('quickName').value.trim();
      const qPhone = document.getElementById('quickPhone').value.trim();

      const msg = `Hello Rehoboth Beauty Studio! 👋%0A%0AI have an inquiry:%0A👤 *Name:* ${encodeURIComponent(qName)}%0A📞 *Phone:* ${encodeURIComponent(qPhone)}`;
      window.open(`https://wa.me/919633395475?text=${msg}`, '_blank');
      quickContactForm.reset();
    });
  }

  // 4. Service Detail Modal
  const serviceDetailModal = document.getElementById('serviceDetailModal');
  const closeServiceModal = document.getElementById('closeServiceModal');
  const serviceDetailContent = document.getElementById('serviceDetailContent');
  const learnMoreBtns = document.querySelectorAll('.service-learn-more');

  const serviceData = {
    'electrolysis': {
      title: 'Permanent Hair Removal by Electrolysis',
      description: `
        <p style="margin-bottom: 0.8rem; line-height: 1.5;">Permanently remove unwanted hair with medical electrolysis. The only <strong>FDA-approved 100% permanent hair removal technology</strong> suitable for all skin tones, ages, and hair types, performed by an expert specialist in a hygienic Ladies Only studio.</p>
        <div style="background: var(--primary-subtle); padding: 0.9rem; border-radius: var(--radius-md); border: 1px solid rgba(74, 20, 85, 0.1); margin-bottom: 1.2rem;">
          <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--primary); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 0.4rem;">
            <i class="ri-checkbox-circle-line" style="color:var(--accent);"></i> Treatment Areas Covered:
          </h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.825rem; font-weight: 600; color: var(--text-dark);">
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Eyebrow</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Upper Lip</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Lower Lip</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Chin</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Sideburns</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Underarm</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Abdomen</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Chest</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Full Face</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Neck</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Legs</span>
            <span style="background:#fff; padding:0.35rem 0.6rem; border-radius:var(--radius-sm); border:1px solid #EBE4F0;">✨ Hand</span>
          </div>
        </div>
      `,
      image: '/assets/electrolysis.jpg'
    },
    'microblading': {
      title: 'Microblading',
      description: '<p>Natural, hair-like brows that enhance your facial features using hyper-realistic feathering strokes lasting up to 2-3 years.</p>',
      image: '/assets/microblading.jpg'
    },
    'ombre-brows': {
      title: 'Ombre Brows',
      description: '<p>Soft shaded powder brows for a defined, elegant makeup look lasting up to 3 years.</p>',
      image: '/assets/ombre_brows.jpg'
    },
    'eyeliner': {
      title: 'Permanent Eyeliner',
      description: '<p>Beautiful, smudge-proof permanent eyeliner that defines your natural eyes effortlessly.</p>',
      image: '/assets/eyeliner.jpg'
    },
    'dark-lip': {
      title: 'Dark Lip Correction',
      description: '<p>Improve lip tone and restore natural soft pinkness with specialized pigment neutralization.</p>',
      image: '/assets/dark_lip.jpg'
    },
    'bb-glow': {
      title: 'BB Glow Treatment',
      description: '<p>Achieve glowing, even-toned, flawless skin naturally with semi-permanent nutrient serum infusion.</p>',
      image: '/assets/bb_glow.jpg'
    },
    'hydrafacial': {
      title: 'Advanced Hydrafacial',
      description: '<p>Deep vortex cleansing & hydration for healthy, radiant skin with antioxidant nourishment.</p>',
      image: '/assets/hydrafacial.jpg'
    },
    'mesotherapy': {
      title: 'Mesotherapy Facial',
      description: '<p>Rejuvenate your skin with vitamins, nutrients, and bio-stimulants delivered directly into dermal layers.</p>',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80'
    },
    'hair-regrowth': {
      title: 'Hair Regrowth Therapy',
      description: '<p>Stimulate dormant hair roots and reduce hair fall effectively with clinical growth factor therapy.</p>',
      image: '/assets/hair_regrowth.jpg'
    },
    'hair-spa': {
      title: 'Hair Spa & Deep Conditioning',
      description: '<p>Deep scalp nourishment, moisture therapy, and strand repair for soft, glossy, healthy hair.</p>',
      image: '/assets/hair_spa.jpg'
    },
    'organic-peel': {
      title: 'Organic Skin Peel',
      description: '<p>Natural botanical peel to remove dead skin cells and reveal radiant, refreshed skin.</p>',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
    },
    'wart-removal': {
      title: 'Wart & Tag Removal',
      description: '<p>Safe, hygienic and effective removal of skin warts and tags using advanced technology.</p>',
      image: '/assets/wart_removal.jpg'
    }
  };

  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service-id');
      const info = serviceData[serviceId];
      if (info && serviceDetailContent && serviceDetailModal) {
        serviceDetailContent.innerHTML = `
          <h3 style="font-size: 1.4rem; color: var(--primary); margin-bottom: 0.5rem;">${info.title}</h3>
          <img src="${info.image}" alt="${info.title}" style="width:100%; height:220px; object-fit:cover; border-radius: var(--radius-md); margin-bottom: 1rem;">
          <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; line-height:1.5;">${info.description}</div>
          <button class="btn btn-pink trigger-booking" style="width:100%;" onclick="document.getElementById('serviceDetailModal').classList.remove('active'); document.getElementById('bookingServiceSelect').value='${info.title}'; document.getElementById('bookingModal').classList.add('active');">
            Book Treatment Now <i class="ri-calendar-check-line"></i>
          </button>
        `;
        serviceDetailModal.classList.add('active');
      }
    });
  });

  if (closeServiceModal && serviceDetailModal) {
    closeServiceModal.addEventListener('click', () => {
      serviceDetailModal.classList.remove('active');
    });
  }

  if (serviceDetailModal) {
    serviceDetailModal.addEventListener('click', (e) => {
      if (e.target === serviceDetailModal) {
        serviceDetailModal.classList.remove('active');
      }
    });
  }

  // 5. Clean FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});