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

      const submitBtn = document.getElementById('btn-submit-wp');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = isEnglish ? 'Processing...' : 'Procesando...';
      submitBtn.disabled = true;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
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
});
