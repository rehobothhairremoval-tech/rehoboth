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

  // 4. CUSTOMER REVIEWS & RATING SYSTEM (STRICTLY USER SUBMISSIONS)
  const reviewModal = document.getElementById('reviewModal');
  const openReviewBtn = document.getElementById('openReviewBtn');
  const closeReviewModal = document.getElementById('closeReviewModal');
  const reviewForm = document.getElementById('reviewForm');
  const starOpts = document.querySelectorAll('#starRatingInput .star-opt');
  const selectedRatingInput = document.getElementById('selectedRating');
  const reviewsContainer = document.getElementById('reviewsContainer');
  const ratingSummaryContainer = document.getElementById('ratingSummaryContainer');

  const getStoredReviews = () => {
    try {
      const data = localStorage.getItem('rehoboth_customer_reviews');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading stored reviews:', err);
    }
    return [];
  };

  const saveReviews = (reviews) => {
    localStorage.setItem('rehoboth_customer_reviews', JSON.stringify(reviews));
  };

  const renderCustomerReviews = () => {
    const reviews = getStoredReviews();

    if (!reviewsContainer) return;

    if (reviews.length === 0) {
      reviewsContainer.innerHTML = `
        <div class="empty-reviews-box">
          <i class="ri-chat-smile-2-line" style="font-size:2.8rem; color:var(--accent); margin-bottom:0.6rem; display:block;"></i>
          <h4 style="color:var(--primary); font-size:1.15rem; font-weight:700; margin-bottom:0.4rem; font-family:var(--font-heading);">No customer reviews submitted yet</h4>
          <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:1.2rem;">Be the first valued customer to write a review and rate Rehoboth Beauty Studio!</p>
          <button class="btn btn-pink" id="emptyWriteReviewBtn" style="font-size:0.85rem; padding:0.6rem 1.4rem;">
            <i class="ri-edit-line"></i> Write the First Review
          </button>
        </div>
      `;

      if (ratingSummaryContainer) {
        ratingSummaryContainer.innerHTML = '';
      }

      const emptyBtn = document.getElementById('emptyWriteReviewBtn');
      if (emptyBtn && reviewModal) {
        emptyBtn.addEventListener('click', () => {
          reviewModal.classList.add('active');
        });
      }
      return;
    }

    const totalRating = reviews.reduce((sum, r) => sum + parseInt(r.rating, 10), 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);

    if (ratingSummaryContainer) {
      ratingSummaryContainer.innerHTML = `
        <div style="display:flex; align-items:center; gap:1.2rem; background:#FDF2F7; padding:1.2rem 1.6rem; border-radius:var(--radius-md); border:1px solid #F6E2EE; margin-bottom:1rem;">
          <div style="font-size:2.2rem; font-weight:800; color:var(--primary); font-family:var(--font-heading); line-height:1;">
            ${avgRating} <span style="font-size:1.1rem; color:#888; font-weight:normal;">/ 5</span>
          </div>
          <div>
            <div style="color:#FFB800; font-size:1rem; margin-bottom:0.2rem;">
              ${Array.from({ length: 5 }, (_, i) => `<i class="${i < Math.round(avgRating) ? 'ri-star-fill' : 'ri-star-line'}"></i>`).join('')}
            </div>
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">
              Based on ${reviews.length} customer review${reviews.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      `;
    }

    reviewsContainer.innerHTML = reviews.map((r, index) => `
      <div class="review-user-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div class="review-user-stars">
              ${Array.from({ length: 5 }, (_, i) => `<i class="${i < parseInt(r.rating, 10) ? 'ri-star-fill' : 'ri-star-line'}"></i>`).join('')}
            </div>
            <button class="delete-review-btn" data-index="${index}" title="Delete this review"><i class="ri-delete-bin-line"></i> Delete</button>
          </div>
          <p class="review-user-text">"${escapeHTML(r.comment)}"</p>
        </div>
        <div class="review-user-author">
          <span>- ${escapeHTML(r.name)}</span>
          <span class="review-user-date">${r.date}</span>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.delete-review-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        if (confirm('Are you sure you want to delete this review?')) {
          const currentReviews = getStoredReviews();
          currentReviews.splice(idx, 1);
          saveReviews(currentReviews);
          renderCustomerReviews();
        }
      });
    });
  };

  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  };

  if (openReviewBtn && reviewModal) {
    openReviewBtn.addEventListener('click', () => {
      reviewModal.classList.add('active');
    });
  }

  if (closeReviewModal && reviewModal) {
    closeReviewModal.addEventListener('click', () => {
      reviewModal.classList.remove('active');
    });
  }

  if (reviewModal) {
    reviewModal.addEventListener('click', (e) => {
      if (e.target === reviewModal) {
        reviewModal.classList.remove('active');
      }
    });
  }

  const updateStarVisuals = (ratingVal) => {
    starOpts.forEach(star => {
      const r = parseInt(star.getAttribute('data-rating'), 10);
      star.style.color = r <= ratingVal ? '#FFB800' : '#DDD';
    });
  };

  starOpts.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-rating'), 10);
      selectedRatingInput.value = val;
      updateStarVisuals(val);
    });

    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-rating'), 10);
      updateStarVisuals(val);
    });
  });

  const starInputContainer = document.getElementById('starRatingInput');
  if (starInputContainer) {
    starInputContainer.addEventListener('mouseleave', () => {
      const currentVal = parseInt(selectedRatingInput.value || 5, 10);
      updateStarVisuals(currentVal);
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reviewerName').value.trim();
      const rating = selectedRatingInput.value || 5;
      const comment = document.getElementById('reviewComment').value.trim();

      if (!name || !comment) return;

      const newReview = {
        name,
        rating,
        comment,
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      const existing = getStoredReviews();
      existing.unshift(newReview);
      saveReviews(existing);

      renderCustomerReviews();

      reviewModal.classList.remove('active');
      alert(`Thank you ${name}! Your review and rating have been submitted successfully.`);
      reviewForm.reset();
      selectedRatingInput.value = 5;
      updateStarVisuals(5);
    });
  }

  renderCustomerReviews();

  // 5. Service Detail Modal
  const serviceDetailModal = document.getElementById('serviceDetailModal');
  const closeServiceModal = document.getElementById('closeServiceModal');
  const serviceDetailContent = document.getElementById('serviceDetailContent');
  const learnMoreBtns = document.querySelectorAll('.service-learn-more');

  const serviceData = {
    'electrolysis': {
      title: 'Permanent Hair Removal by Electrolysis',
      description: 'Permanently remove unwanted facial & body hair with medical electrolysis. The only FDA-approved 100% permanent hair removal technology suitable for all skin tones and hair types, performed by an expert specialist.',
      image: '/assets/electrolysis.jpg'
    },
    'microblading': {
      title: 'Microblading',
      description: 'Natural, hair-like brows that enhance your facial features using hyper-realistic feathering strokes.',
      image: '/assets/microblading.jpg'
    },
    'ombre-brows': {
      title: 'Ombre Brows',
      description: 'Soft shaded powder brows for a defined, elegant makeup look lasting up to 3 years.',
      image: '/assets/ombre_brows.jpg'
    },
    'eyeliner': {
      title: 'Permanent Eyeliner',
      description: 'Beautiful, smudge-proof permanent eyeliner that defines your natural eyes effortlessly.',
      image: '/assets/eyeliner.jpg'
    },
    'dark-lip': {
      title: 'Dark Lip Correction',
      description: 'Improve lip tone and restore natural soft pinkness with specialized pigment neutralization.',
      image: '/assets/dark_lip.jpg'
    },
    'bb-glow': {
      title: 'BB Glow Treatment',
      description: 'Achieve glowing, even-toned, flawless skin naturally with semi-permanent nutrient serum infusion.',
      image: '/assets/bb_glow.jpg'
    },
    'hydrafacial': {
      title: 'Advanced Hydrafacial',
      description: 'Deep vortex cleansing & hydration for healthy, radiant skin with antioxidant nourishment.',
      image: '/assets/hydrafacial.jpg'
    },
    'mesotherapy': {
      title: 'Mesotherapy Facial',
      description: 'Rejuvenate your skin with vitamins, nutrients, and bio-stimulants delivered directly into dermal layers.',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80'
    },
    'hair-regrowth': {
      title: 'Hair Regrowth Therapy',
      description: 'Stimulate dormant hair roots and reduce hair fall effectively with clinical growth factor therapy.',
      image: '/assets/hair_regrowth.jpg'
    },
    'organic-peel': {
      title: 'Organic Skin Peel',
      description: 'Natural botanical peel to remove dead skin cells and reveal radiant, refreshed skin.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
    },
    'wart-removal': {
      title: 'Wart & Tag Removal',
      description: 'Safe, hygienic and effective removal of skin warts and tags using advanced technology.',
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
          <img src="${info.image}" alt="${info.title}" style="width:100%; height:200px; object-fit:cover; border-radius: var(--radius-md); margin-bottom: 1rem;">
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; line-height:1.5;">${info.description}</p>
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
});
