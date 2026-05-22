/**
 * N3i Engineering & Maintenance - Interactive Logic
 * Author: Antigravity AI
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. Mobile Menu Toggle
  // =========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Toggle burger menu icon change
      const isActive = navMenu.classList.contains('active');
      menuToggle.innerHTML = isActive 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // =========================================================================
  // 2. Sticky Header scroll effect
  // =========================================================================
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run in case page starts scrolled

  // =========================================================================
  // 3. Active Link Highlighting on Scroll
  // =========================================================================
  const sections = document.querySelectorAll('section, header');
  
  const activeScrollHighlight = () => {
    let scrollPos = window.scrollY + 200; // Offset for accuracy
    
    sections.forEach(section => {
      if (section.id) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${section.id}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  };

  window.addEventListener('scroll', activeScrollHighlight);

  // =========================================================================
  // 4. Interactive Portfolio Filtering (Services tabs)
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          // Show with elegant animation transition
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          // Hide with exit transition
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350); // Matches CSS transition duration
        }
      });
    });
  });

  // =========================================================================
  // 5. Scroll Reveal Animations (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed to maintain high performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // =========================================================================
  // 6. Contact Form to WhatsApp compilation & redirect
  // =========================================================================
  const contactForm = document.getElementById('whatsapp-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form fields
      const name = document.getElementById('form-name').value.trim();
      const company = document.getElementById('form-company').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const service = document.getElementById('form-service').value;
      const message = document.getElementById('form-message').value.trim();

      // Basic validation
      if (!name || !company || !phone || !service || !message) {
        alert('Por favor complete todos los campos obligatorios del formulario.');
        return;
      }

      // WhatsApp text formatting with markdown
      const wpMessage = 
`*N3i Engineering & Maintenance*
*Nueva Consulta desde el Sitio Web*

👤 *Nombre:* ${name}
🏢 *Empresa:* ${company}
📞 *Teléfono:* ${phone}
📧 *Correo:* ${email ? email : 'No especificado'}
🛠️ *Servicio de Interés:* ${service}

💬 *Detalles del Requerimiento:*
${message}`;

      // Encode for URL safely
      const encodedText = encodeURIComponent(wpMessage);

      // Fabio's phone number in international format (+54 9 291 416-8232)
      const phoneNumber = '5492914168232';

      // WhatsApp API redirect URL
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

      // Show action visual loader on the button
      const submitBtn = document.getElementById('btn-submit-wp');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Procesando Consulta...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Optional: Reset form
        contactForm.reset();
      }, 800);
    });
  }
});
