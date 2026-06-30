document.addEventListener("DOMContentLoaded",()=>{const y=document.getElementById("menu-toggle"),E=document.getElementById("nav-menu"),N=document.querySelectorAll(".nav-link");y&&E&&(y.addEventListener("click",()=>{E.classList.toggle("active");const e=E.classList.contains("active"),t=document.getElementById("header");t&&(e?t.classList.add("menu-open"):t.classList.remove("menu-open")),y.innerHTML=e?'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>':'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'}),document.querySelectorAll("#nav-menu a, #logo-link").forEach(e=>{e.addEventListener("click",()=>{E.classList.remove("active");const t=document.getElementById("header");t&&t.classList.remove("menu-open"),y.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'})}));const L=document.getElementById("header"),k=()=>{window.scrollY>50?L.classList.add("scrolled"):L.classList.remove("scrolled")};window.addEventListener("scroll",k),k();const S=document.querySelectorAll("section, header"),A=()=>{let o=window.scrollY+200;S.forEach(e=>{if(e.id){const t=e.offsetTop,a=e.offsetHeight;o>=t&&o<t+a&&N.forEach(i=>{i.classList.remove("active"),i.getAttribute("href")===`#${e.id}`&&i.classList.add("active")})}})};window.addEventListener("scroll",A);const $=document.querySelectorAll(".filter-btn"),P=document.querySelectorAll(".service-card");$.forEach(o=>{o.addEventListener("click",()=>{$.forEach(t=>t.classList.remove("active")),o.classList.add("active");const e=o.getAttribute("data-filter");P.forEach(t=>{const a=t.getAttribute("data-category");e==="all"||a===e?(t.style.display="flex",setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0) scale(1)"},50)):(t.style.opacity="0",t.style.transform="translateY(20px) scale(0.95)",setTimeout(()=>{t.style.display="none"},350))})})});const q=document.querySelectorAll(".reveal"),I=new IntersectionObserver(o=>{o.forEach(e=>{e.isIntersecting&&(e.target.classList.add("revealed"),I.unobserve(e.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});q.forEach(o=>{I.observe(o)});const r=document.getElementById("form-service"),x={electricidad:"fields-electricidad",cctv:"fields-cctv",domotica:"fields-domotica"},C=()=>{Object.values(x).forEach(o=>{const e=document.getElementById(o);e&&(e.style.display="none")})};r&&r.addEventListener("change",()=>{C();const o=x[r.value];if(o){const e=document.getElementById(o);e&&(e.style.display="block")}});const b=document.getElementById("whatsapp-contact-form");b&&b.addEventListener("submit",o=>{o.preventDefault();const e=document.documentElement.lang==="en",t=document.getElementById("form-name")?.value.trim()||"",a=document.getElementById("form-role")?.value.trim()||"",i=document.getElementById("form-company")?.value.trim()||"",n=document.getElementById("form-phone")?.value.trim()||"",m=document.getElementById("form-email")?.value.trim()||"",d=document.getElementById("form-project-type")?.value||"",u=r?r.value:"",p=document.getElementById("form-message")?.value.trim()||"";if(!t||!i||!n||!u||!p||!d){alert(e?"Please complete all required fields in the form.":"Por favor complete todos los campos obligatorios del formulario.");return}let l="";if(u==="electricidad"){const h=document.getElementById("form-elec-obra")?.value||"",g=document.getElementById("form-elec-potencia")?.value||"";e?l=`
⚡ *Electrical Details:*
   • Type of Work: ${h||"Not specified"}
   • Estimated Power: ${g?g+" kW":"Not specified"}`:l=`
⚡ *Datos Eléctricos:*
   • Tipo de Obra: ${h||"No especificado"}
   • Potencia Estimada: ${g?g+" kW":"No especificada"}`}else if(u==="cctv"){const h=document.getElementById("form-cctv-puntos")?.value||"",g=document.getElementById("form-cctv-perimetral")?.checked;e?l=`
📷 *Security Details:*
   • Monitoring Points (cameras): ${h||"Not specified"}
   • Perimeter Alarm: ${g?"Yes, required":"Not required"}`:l=`
📷 *Datos de Seguridad:*
   • Puntos de Monitoreo (cámaras): ${h||"No especificado"}
   • Alarma Perimetral: ${g?"Sí, requerida":"No requerida"}`}else if(u==="domotica"){const h=[...document.querySelectorAll('input[name="form-domo-metas"]:checked')].map(g=>g.value);e?l=`
🏠 *Automation Goals:*
   • ${h.length>0?h.join(`
   • `):"Not specified"}`:l=`
🏠 *Metas de Automatización:*
   • ${h.length>0?h.join(`
   • `):"No especificadas"}`}const s=r?.options[r.selectedIndex],c=s?s.text:u,f=e?`*N3i Engineering & Maintenance*
*Technical Budget Request — Website*

👤 *Name:* ${t}
💼 *Title / Role:* ${a||"Not specified"}
🏢 *Company:* ${i}
📞 *Phone:* ${n}
📧 *Email:* ${m||"Not specified"}

🏗️ *Project Category:* ${d}
🛠️ *Service Required:* ${c}${l}

💬 *Project Description:*
${p}`:`*N3i Engineering & Maintenance*
*Solicitud de Presupuesto Técnico — Sitio Web*

👤 *Nombre:* ${t}
💼 *Cargo / Rol:* ${a||"No especificado"}
🏢 *Empresa:* ${i}
📞 *Teléfono:* ${n}
📧 *Correo:* ${m||"No especificado"}

🏗️ *Categoría del Proyecto:* ${d}
🛠️ *Servicio Requerido:* ${c}${l}

💬 *Descripción del Requerimiento:*
${p}`,v=encodeURIComponent(f),j=`https://wa.me/5492914168232?text=${v}`,U=e?`Technical Budget Request - ${t} (${i})`:`Solicitud de Presupuesto Técnico - ${t} (${i})`,D=`mailto:n3ibhi@gmail.com?subject=${encodeURIComponent(U)}&body=${v}`,z=o.submitter.innerHTML;o.submitter.innerHTML=e?"Processing...":"Procesando...",o.submitter.disabled=!0,o.submitter.id==="btn-submit-email"?window.location.href=D:window.open(j,"_blank","noopener,noreferrer"),setTimeout(()=>{o.submitter.innerHTML=z,o.submitter.disabled=!1,b.reset(),C()},800)});const H=document.querySelectorAll(".abono-btn"),M=document.getElementById("form-message");H.forEach(o=>{o.addEventListener("click",e=>{e.preventDefault();const t=o.getAttribute("data-abono");if(r){const i=`Abono Mantenimiento - ${t}`;for(let n=0;n<r.options.length;n++)if(r.options[n].value===i){r.selectedIndex=n,r.dispatchEvent(new Event("change"));break}}if(M){const i=document.documentElement.lang==="en";let n="";t==="PyME Start"?n=i?"Hello Fabio, I would like to request a quote and personalized advice on the SMB Start Monthly Plan for our shop/office. We would like to schedule an initial preventive visit.":"Hola Fabio, me interesa solicitar una cotización y asesoramiento personalizado sobre el Abono Mensual PyME Start para nuestro local/oficina. Deseamos coordinar una visita preventiva inicial.":t==="PyME Pro"?n=i?"Hello Fabio, we are interested in the SMB Pro Monthly Plan for our mid-size business. We would like to receive a formal technical proposal.":"Hola Fabio, nos interesa el Abono Mensual PyME Pro para nuestra mediana empresa. Quisiéramos recibir una propuesta técnica formal, evaluar la auditoría edilicia quincenal y el soporte en redes/instalaciones.":t==="Industrial 360"?n=i?"Dear Ing. Fabio Gullacci, we are contacting you to request detailed information on the Industrial 360 Monthly Plan for our plant/warehouse.":"Estimado Ing. Fabio Gullacci, nos contactamos para solicitar información detallada sobre el Abono Mensual Industrial 360 para nuestra planta/depósito. Requerimos soporte preventivo en electricidad industrial, neumática, gas certificado y guardias 24/7.":n=i?`Hello Fabio, I am interested in learning more about the monthly maintenance plan: ${t}.`:`Hola Fabio, me interesa recibir más información sobre el abono de mantenimiento mensual: ${t}.`,M.value=n}const a=document.getElementById("contacto");a&&a.scrollIntoView({behavior:"smooth",block:"start"})})});const w=o=>o.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[¿?¡!]/g,"");document.querySelectorAll("h2.section-title, .hero-title").forEach(o=>{const e=o.textContent.trim();if(!e)return;o.classList.add("shareable-heading"),o.style.cursor="pointer",o.setAttribute("data-anchor-text",e);const t=o.closest("section");t&&t.id&&o.setAttribute("data-section-id",t.id);const a=document.createElement("div");a.className="heading-share-container",a.addEventListener("click",s=>s.stopPropagation());const i=document.createElement("button");i.className="heading-share-icon",i.setAttribute("aria-label","Compartir sección"),i.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    `;const n=document.createElement("div");n.className="heading-share-menu";const m=document.createElement("button");m.className="heading-share-item copy-item",m.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copiar Enlace
    `;const d=document.createElement("button");d.className="heading-share-item whatsapp-item",d.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      Compartir WhatsApp
    `;const u=document.createElement("button");u.className="heading-share-item email-item",u.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
      Enviar por Correo
    `,n.appendChild(m),n.appendChild(d),n.appendChild(u),a.appendChild(i),a.appendChild(n),o.appendChild(a);const p=()=>t&&t.id?t.id:e,l=()=>{const s=p();return`${window.location.origin}${window.location.pathname}#${encodeURIComponent(s)}`};i.addEventListener("click",s=>{s.stopPropagation(),document.querySelectorAll(".heading-share-menu").forEach(c=>{c!==n&&c.classList.remove("active")}),n.classList.toggle("active")}),m.addEventListener("click",()=>{const s=l(),c=p();navigator.clipboard.writeText(s).then(()=>{window.location.hash=encodeURIComponent(c),i.classList.add("copied"),R(document.documentElement.lang==="en"?"Link copied!":"¡Enlace copiado al portapapeles!"),setTimeout(()=>{i.classList.remove("copied")},1500)}).catch(f=>console.error(f)),n.classList.remove("active")}),d.addEventListener("click",()=>{const s=l(),c=t&&t.id?`Sección ${e}`:e,v=document.documentElement.lang==="en"?`Check out this section from N3i Engineering & Maintenance: ${c} ➔ ${s}`:`Mirá esta sección de N3i Engineering & Maintenance: ${c} ➔ ${s}`,T=`https://api.whatsapp.com/send?text=${encodeURIComponent(v)}`;window.open(T,"_blank","noopener,noreferrer"),window.location.hash=encodeURIComponent(p()),n.classList.remove("active")}),u.addEventListener("click",()=>{const s=l(),c=document.documentElement.lang==="en",f=c?`N3i - ${e}`:`N3i - ${e}`,v=c?`Hi,

I wanted to share this section of N3i Engineering & Maintenance with you:

${e}
Link: ${s}

Regards.`:`Hola,

Te comparto esta sección del sitio de N3i Engineering & Maintenance:

${e}
Enlace: ${s}

Saludos.`;window.location.href=`mailto:?subject=${encodeURIComponent(f)}&body=${encodeURIComponent(v)}`,window.location.hash=encodeURIComponent(p()),n.classList.remove("active")}),o.addEventListener("click",()=>{const s=p();window.location.hash=encodeURIComponent(s)})}),document.addEventListener("click",()=>{document.querySelectorAll(".heading-share-menu").forEach(o=>{o.classList.remove("active")})});const R=o=>{let e=document.getElementById("toast-notification");e||(e=document.createElement("div"),e.id="toast-notification",document.body.appendChild(e)),e.textContent=o,e.classList.remove("show"),e.offsetWidth,e.classList.add("show"),setTimeout(()=>{e.classList.remove("show")},2800)},B=()=>{const o=window.location.hash.substring(1);if(!o)return;const e=decodeURIComponent(o);let t=document.getElementById(e);if(!t){const a=e.replace(/\s+/g,"-").toLowerCase();t=document.getElementById(a)||document.getElementById(e.replace(/\s+/g,"_").toLowerCase())||document.getElementById(e.toLowerCase())}if(!t){const a=document.querySelectorAll("h1, h2, h3, h4, section, div[id]"),i=w(e);for(const n of a){const m=n.getAttribute("data-anchor-text");if(m&&w(m)===i){t=n;break}if(w(n.textContent)===i){t=n;break}const d=n.querySelector(".section-subtitle");if(d&&w(d.textContent)===i){t=n;break}}}if(t){const a=window.innerWidth<=768?95:115,n=t.getBoundingClientRect().top+window.pageYOffset-a;window.scrollTo({top:n,behavior:"smooth"})}};setTimeout(B,250),window.addEventListener("hashchange",B)});
