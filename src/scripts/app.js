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
      
      const headerEl = document.getElementById('header');
      if (headerEl) {
        if (isActive) {
          headerEl.classList.add('menu-open');
        } else {
          headerEl.classList.remove('menu-open');
        }
      }

      menuToggle.innerHTML = isActive 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when a link is clicked
    const allMenuLinks = document.querySelectorAll('#nav-menu a, #logo-link');
    allMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const headerEl = document.getElementById('header');
        if (headerEl) headerEl.classList.remove('menu-open');
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
  // 6. Contact Form — Conditional Fields Logic
  // =========================================================================
  const serviceSelect = document.getElementById('form-service');

  const conditionalMap = {
    'electricidad': 'fields-electricidad',
    'cctv':         'fields-cctv',
    'domotica':     'fields-domotica',
  };

  const hideAllConditionals = () => {
    Object.values(conditionalMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  };

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      hideAllConditionals();
      const targetId = conditionalMap[serviceSelect.value];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.style.display = 'block';
      }
    });
  }

  // =========================================================================
  // 6b. Contact Form to WhatsApp compilation & redirect
  // =========================================================================
  const contactForm = document.getElementById('whatsapp-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isEnglish = document.documentElement.lang === 'en';

      // Core fields
      const name        = document.getElementById('form-name')?.value.trim() || '';
      const role        = document.getElementById('form-role')?.value.trim() || '';
      const company     = document.getElementById('form-company')?.value.trim() || '';
      const phone       = document.getElementById('form-phone')?.value.trim() || '';
      const email       = document.getElementById('form-email')?.value.trim() || '';
      const projectType = document.getElementById('form-project-type')?.value || '';
      const service     = serviceSelect ? serviceSelect.value : '';
      const message     = document.getElementById('form-message')?.value.trim() || '';

      // Basic validation
      if (!name || !company || !phone || !service || !message || !projectType) {
        alert(isEnglish
          ? 'Please complete all required fields in the form.'
          : 'Por favor complete todos los campos obligatorios del formulario.');
        return;
      }

      // Build conditional technical data block
      let technicalData = '';

      if (service === 'electricidad') {
        const obraType = document.getElementById('form-elec-obra')?.value || '';
        const potencia = document.getElementById('form-elec-potencia')?.value || '';
        if (isEnglish) {
          technicalData = `\n⚡ *Electrical Details:*\n   • Type of Work: ${obraType || 'Not specified'}\n   • Estimated Power: ${potencia ? potencia + ' kW' : 'Not specified'}`;
        } else {
          technicalData = `\n⚡ *Datos Eléctricos:*\n   • Tipo de Obra: ${obraType || 'No especificado'}\n   • Potencia Estimada: ${potencia ? potencia + ' kW' : 'No especificada'}`;
        }
      } else if (service === 'cctv') {
        const puntos = document.getElementById('form-cctv-puntos')?.value || '';
        const perimetral = document.getElementById('form-cctv-perimetral')?.checked;
        if (isEnglish) {
          technicalData = `\n📷 *Security Details:*\n   • Monitoring Points (cameras): ${puntos || 'Not specified'}\n   • Perimeter Alarm: ${perimetral ? 'Yes, required' : 'Not required'}`;
        } else {
          technicalData = `\n📷 *Datos de Seguridad:*\n   • Puntos de Monitoreo (cámaras): ${puntos || 'No especificado'}\n   • Alarma Perimetral: ${perimetral ? 'Sí, requerida' : 'No requerida'}`;
        }
      } else if (service === 'domotica') {
        const metas = [...document.querySelectorAll('input[name="form-domo-metas"]:checked')].map(cb => cb.value);
        if (isEnglish) {
          technicalData = `\n🏠 *Automation Goals:*\n   • ${metas.length > 0 ? metas.join('\n   • ') : 'Not specified'}`;
        } else {
          technicalData = `\n🏠 *Metas de Automatización:*\n   • ${metas.length > 0 ? metas.join('\n   • ') : 'No especificadas'}`;
        }
      }

      // Resolve service display name
      const serviceOption = serviceSelect?.options[serviceSelect.selectedIndex];
      const serviceLabel = serviceOption ? serviceOption.text : service;

      // Build full WhatsApp message
      const wpMessage = isEnglish
        ? `*N3i Engineering & Maintenance*
*Technical Budget Request — Website*

👤 *Name:* ${name}
💼 *Title / Role:* ${role || 'Not specified'}
🏢 *Company:* ${company}
📞 *Phone:* ${phone}
📧 *Email:* ${email || 'Not specified'}

🏗️ *Project Category:* ${projectType}
🛠️ *Service Required:* ${serviceLabel}${technicalData}

💬 *Project Description:*
${message}`
        : `*N3i Engineering & Maintenance*
*Solicitud de Presupuesto Técnico — Sitio Web*

👤 *Nombre:* ${name}
💼 *Cargo / Rol:* ${role || 'No especificado'}
🏢 *Empresa:* ${company}
📞 *Teléfono:* ${phone}
📧 *Correo:* ${email || 'No especificado'}

🏗️ *Categoría del Proyecto:* ${projectType}
🛠️ *Servicio Requerido:* ${serviceLabel}${technicalData}

💬 *Descripción del Requerimiento:*
${message}`;

      const encodedText = encodeURIComponent(wpMessage);
      const phoneNumber = '5492914168232';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

      // Email formatting
      const emailSubject = isEnglish 
        ? `Technical Budget Request - ${name} (${company})`
        : `Solicitud de Presupuesto Técnico - ${name} (${company})`;
      // The body of the email doesn't need urlencoding the same way if we just let the email client handle linebreaks,
      // but we do need encodeURIComponent to make the mailto link valid.
      const mailtoUrl = `mailto:n3ibhi@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodedText}`;

      const originalText = e.submitter.innerHTML;
      e.submitter.innerHTML = isEnglish ? 'Processing...' : 'Procesando...';
      e.submitter.disabled = true;

      if (e.submitter.id === 'btn-submit-email') {
        window.location.href = mailtoUrl;
      } else {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      setTimeout(() => {
        e.submitter.innerHTML = originalText;
        e.submitter.disabled = false;
        contactForm.reset();
        hideAllConditionals();
      }, 800);
    });
  }

  // =========================================================================
  // 7. Abono CTA Autofill & Smooth Scroll
  // =========================================================================
  const abonoBtns = document.querySelectorAll('.abono-btn');
  const messageTextarea = document.getElementById('form-message');

  abonoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const abonoName = btn.getAttribute('data-abono');
      
      // Set the select dropdown option
      if (serviceSelect) {
        const targetValue = `Abono Mantenimiento - ${abonoName}`;
        
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value === targetValue) {
            serviceSelect.selectedIndex = i;
            // Trigger change event to reset conditional fields
            serviceSelect.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
      
      // Pre-fill the description textarea with customized text
      if (messageTextarea) {
        const isEnglish = document.documentElement.lang === 'en';
        let prepopulatedText = '';
        if (abonoName === 'PyME Start') {
          prepopulatedText = isEnglish
            ? 'Hello Fabio, I would like to request a quote and personalized advice on the SMB Start Monthly Plan for our shop/office. We would like to schedule an initial preventive visit.'
            : 'Hola Fabio, me interesa solicitar una cotización y asesoramiento personalizado sobre el Abono Mensual PyME Start para nuestro local/oficina. Deseamos coordinar una visita preventiva inicial.';
        } else if (abonoName === 'PyME Pro') {
          prepopulatedText = isEnglish
            ? 'Hello Fabio, we are interested in the SMB Pro Monthly Plan for our mid-size business. We would like to receive a formal technical proposal.'
            : 'Hola Fabio, nos interesa el Abono Mensual PyME Pro para nuestra mediana empresa. Quisiéramos recibir una propuesta técnica formal, evaluar la auditoría edilicia quincenal y el soporte en redes/instalaciones.';
        } else if (abonoName === 'Industrial 360') {
          prepopulatedText = isEnglish
            ? 'Dear Ing. Fabio Gullacci, we are contacting you to request detailed information on the Industrial 360 Monthly Plan for our plant/warehouse.'
            : 'Estimado Ing. Fabio Gullacci, nos contactamos para solicitar información detallada sobre el Abono Mensual Industrial 360 para nuestra planta/depósito. Requerimos soporte preventivo en electricidad industrial, neumática, gas certificado y guardias 24/7.';
        } else {
          prepopulatedText = isEnglish
            ? `Hello Fabio, I am interested in learning more about the monthly maintenance plan: ${abonoName}.`
            : `Hola Fabio, me interesa recibir más información sobre el abono de mantenimiento mensual: ${abonoName}.`;
        }
        messageTextarea.value = prepopulatedText;
      }
      
      // Smooth scroll to contact section
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =========================================================================
  // 8. Shareable Headings & Hash Deep Linking (Premium Sharing System)
  // =========================================================================
  
  // Normalize text for clean comparisons
  const normalizeText = (text) => {
    return text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // removes accents
      .replace(/[¿?¡!]/g, ""); // removes punctuation
  };

  // Find all main titles
  const shareableTitles = document.querySelectorAll('h2.section-title, .hero-title');

  shareableTitles.forEach(title => {
    const text = title.textContent.trim();
    if (!text) return;

    // Make the title container interactive
    title.classList.add('shareable-heading');
    title.style.cursor = 'pointer';

    // Store original text for matching
    title.setAttribute('data-anchor-text', text);

    // If the section/parent has an ID, store that too
    const parentSection = title.closest('section');
    if (parentSection && parentSection.id) {
      title.setAttribute('data-section-id', parentSection.id);
    }

    // Create share container and button
    const shareContainer = document.createElement('div');
    shareContainer.className = 'heading-share-container';
    // Prevent title click events from bubbling if they click the dropdown
    shareContainer.addEventListener('click', (e) => e.stopPropagation());

    const shareButton = document.createElement('button');
    shareButton.className = 'heading-share-icon';
    shareButton.setAttribute('aria-label', 'Compartir sección');
    shareButton.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    `;
    
    // Create sharing dropdown menu
    const shareMenu = document.createElement('div');
    shareMenu.className = 'heading-share-menu';
    
    // Create menu options
    const copyOption = document.createElement('button');
    copyOption.className = 'heading-share-item copy-item';
    copyOption.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copiar Enlace
    `;

    const whatsappOption = document.createElement('button');
    whatsappOption.className = 'heading-share-item whatsapp-item';
    whatsappOption.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      Compartir WhatsApp
    `;

    const emailOption = document.createElement('button');
    emailOption.className = 'heading-share-item email-item';
    emailOption.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
      Enviar por Correo
    `;

    shareMenu.appendChild(copyOption);
    shareMenu.appendChild(whatsappOption);
    shareMenu.appendChild(emailOption);
    
    shareContainer.appendChild(shareButton);
    shareContainer.appendChild(shareMenu);
    title.appendChild(shareContainer);

    // Generate hash anchor text (use section ID if available for standard sections, else use title text)
    const getAnchorHash = () => {
      if (parentSection && parentSection.id) {
        return parentSection.id;
      }
      return text;
    };

    const getShareUrl = () => {
      const hash = getAnchorHash();
      return `${window.location.origin}${window.location.pathname}#${encodeURIComponent(hash)}`;
    };

    // Toggle menu open
    shareButton.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Close all other share menus first
      document.querySelectorAll('.heading-share-menu').forEach(menu => {
        if (menu !== shareMenu) menu.classList.remove('active');
      });

      shareMenu.classList.toggle('active');
    });

    // Option 1: Copy Link
    copyOption.addEventListener('click', () => {
      const url = getShareUrl();
      const hash = getAnchorHash();
      
      navigator.clipboard.writeText(url).then(() => {
        // Update browser hash
        window.location.hash = encodeURIComponent(hash);
        
        shareButton.classList.add('copied');
        showToastNotification(document.documentElement.lang === 'en' ? 'Link copied!' : '¡Enlace copiado al portapapeles!');
        
        setTimeout(() => {
          shareButton.classList.remove('copied');
        }, 1500);
      }).catch(err => console.error(err));
      
      shareMenu.classList.remove('active');
    });

    // Option 2: Share via WhatsApp
    whatsappOption.addEventListener('click', () => {
      const url = getShareUrl();
      const titleText = parentSection && parentSection.id ? `Sección ${text}` : text;
      const isEnglish = document.documentElement.lang === 'en';
      const msg = isEnglish
        ? `Check out this section from N3i Engineering & Maintenance: ${titleText} ➔ ${url}`
        : `Mirá esta sección de N3i Engineering & Maintenance: ${titleText} ➔ ${url}`;
      
      const wpUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
      window.open(wpUrl, '_blank', 'noopener,noreferrer');
      
      // Update hash in browser
      window.location.hash = encodeURIComponent(getAnchorHash());
      
      shareMenu.classList.remove('active');
    });

    // Option 3: Share via Email
    emailOption.addEventListener('click', () => {
      const url = getShareUrl();
      const isEnglish = document.documentElement.lang === 'en';
      const subject = isEnglish 
        ? `N3i - ${text}`
        : `N3i - ${text}`;
      const body = isEnglish
        ? `Hi,\n\nI wanted to share this section of N3i Engineering & Maintenance with you:\n\n${text}\nLink: ${url}\n\nRegards.`
        : `Hola,\n\nTe comparto esta sección del sitio de N3i Engineering & Maintenance:\n\n${text}\nEnlace: ${url}\n\nSaludos.`;
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Update hash in browser
      window.location.hash = encodeURIComponent(getAnchorHash());
      
      shareMenu.classList.remove('active');
    });

    // Title text click scroll and copy shortcut
    title.addEventListener('click', () => {
      const hash = getAnchorHash();
      window.location.hash = encodeURIComponent(hash);
    });
  });

  // Global click to close any open share menus
  document.addEventListener('click', () => {
    document.querySelectorAll('.heading-share-menu').forEach(menu => {
      menu.classList.remove('active');
    });
  });

  // Premium Toast Notification System
  const showToastNotification = (message) => {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    
    // Trigger animation frame
    toast.classList.remove('show');
    void toast.offsetWidth; // Force reflow
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // Scroll to hash function supporting IDs and text matches
  const scrollToHash = () => {
    const rawHash = window.location.hash.substring(1);
    if (!rawHash) return;

    const decodedHash = decodeURIComponent(rawHash);
    
    // 1. Try finding by ID directly
    let element = document.getElementById(decodedHash);

    // 2. Try normalized ID matching (replace spaces with hyphens)
    if (!element) {
      const normalizedHash = decodedHash.replace(/\s+/g, '-').toLowerCase();
      element = document.getElementById(normalizedHash) || 
                document.getElementById(decodedHash.replace(/\s+/g, '_').toLowerCase()) ||
                document.getElementById(decodedHash.toLowerCase());
    }

    // 3. Try finding by Heading Text / Subtitle Text
    if (!element) {
      const headings = document.querySelectorAll('h1, h2, h3, h4, section, div[id]');
      const targetNormalized = normalizeText(decodedHash);
      
      for (const h of headings) {
        // Match cached data-anchor-text
        const anchorText = h.getAttribute('data-anchor-text');
        if (anchorText && normalizeText(anchorText) === targetNormalized) {
          element = h;
          break;
        }
        // Match exact text content
        if (normalizeText(h.textContent) === targetNormalized) {
          element = h;
          break;
        }
        // Match subtitle if parent has it
        const subtitle = h.querySelector('.section-subtitle');
        if (subtitle && normalizeText(subtitle.textContent) === targetNormalized) {
          element = h;
          break;
        }
      }
    }

    // 4. Scroll smoothly to target with header offset
    if (element) {
      const headerOffset = window.innerWidth <= 768 ? 95 : 115;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Check on load with short delay to allow layout calculation
  setTimeout(scrollToHash, 250);

  // Check on hashchange
  window.addEventListener('hashchange', scrollToHash);
});

