document.addEventListener("DOMContentLoaded",()=>{const L=(n,t="success")=>{let e=document.getElementById("toast-notification");e||(e=document.createElement("div"),e.id="toast-notification",document.body.appendChild(e)),e.textContent=n,t==="warning"?e.classList.add("warning"):e.classList.remove("warning"),e.classList.remove("show"),e.offsetWidth,e.classList.add("show"),setTimeout(()=>{e.classList.remove("show")},3200)},y=document.getElementById("menu-toggle"),E=document.getElementById("nav-menu"),k=document.querySelectorAll(".nav-link");y&&E&&(y.addEventListener("click",()=>{E.classList.toggle("active");const t=E.classList.contains("active"),e=document.getElementById("header");e&&(t?e.classList.add("menu-open"):e.classList.remove("menu-open")),y.innerHTML=t?'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>':'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'}),document.querySelectorAll("#nav-menu a, #logo-link").forEach(t=>{t.addEventListener("click",()=>{E.classList.remove("active");const e=document.getElementById("header");e&&e.classList.remove("menu-open"),y.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'})}));const $=document.getElementById("header"),I=()=>{window.scrollY>50?$.classList.add("scrolled"):$.classList.remove("scrolled")};window.addEventListener("scroll",I),I();const x=window.location.pathname.replace(/\/$/,"")||"/";if(x==="/"||x==="/en"){const n=document.querySelectorAll("section, header"),t=()=>{let e=window.scrollY+200;n.forEach(a=>{if(a.id){const i=a.offsetTop,o=a.offsetHeight;e>=i&&e<i+o&&k.forEach(r=>{const c=r.getAttribute("href");(c===`#${a.id}`||c===`/#${a.id}`||c===`/en#${a.id}`)&&(k.forEach(d=>d.classList.remove("active")),r.classList.add("active"))})}})};window.addEventListener("scroll",t)}const C=document.querySelectorAll(".filter-btn"),A=document.querySelectorAll(".service-card");C.forEach(n=>{n.addEventListener("click",()=>{C.forEach(e=>e.classList.remove("active")),n.classList.add("active");const t=n.getAttribute("data-filter");A.forEach(e=>{const a=e.getAttribute("data-category");t==="all"||a===t?(e.style.display="flex",setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0) scale(1)"},50)):(e.style.opacity="0",e.style.transform="translateY(20px) scale(0.95)",setTimeout(()=>{e.style.display="none"},350))})})});const q=document.querySelectorAll(".reveal"),M=new IntersectionObserver(n=>{n.forEach(t=>{t.isIntersecting&&(t.target.classList.add("revealed"),M.unobserve(t.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});q.forEach(n=>{M.observe(n)});const l=document.getElementById("form-service"),B={electricidad:"fields-electricidad",cctv:"fields-cctv",domotica:"fields-domotica"},T=()=>{Object.values(B).forEach(n=>{const t=document.getElementById(n);t&&(t.style.display="none")})};l&&l.addEventListener("change",()=>{T();const n=B[l.value];if(n){const t=document.getElementById(n);t&&(t.style.display="block")}});const b=document.getElementById("whatsapp-contact-form");b&&b.addEventListener("submit",n=>{n.preventDefault();const t=document.documentElement.lang==="en",e=document.getElementById("form-name")?.value.trim()||"",a=document.getElementById("form-role")?.value.trim()||"",i=document.getElementById("form-company")?.value.trim()||"",o=document.getElementById("form-phone")?.value.trim()||"",r=document.getElementById("form-email")?.value.trim()||"",c=document.getElementById("form-project-type")?.value||"",d=l?l.value:"",p=document.getElementById("form-message")?.value.trim()||"";if(!e||!i||!o||!d||!p||!c){L(t?"Please complete all required fields in the form.":"Por favor complete todos los campos obligatorios del formulario.","warning");return}let m="";if(d==="electricidad"){const h=document.getElementById("form-elec-obra")?.value||"",f=document.getElementById("form-elec-potencia")?.value||"";t?m=`
⚡ *Electrical Details:*
   • Type of Work: ${h||"Not specified"}
   • Estimated Power: ${f?f+" kW":"Not specified"}`:m=`
⚡ *Datos Eléctricos:*
   • Tipo de Obra: ${h||"No especificado"}
   • Potencia Estimada: ${f?f+" kW":"No especificada"}`}else if(d==="cctv"){const h=document.getElementById("form-cctv-puntos")?.value||"",f=document.getElementById("form-cctv-perimetral")?.checked;t?m=`
📷 *Security Details:*
   • Monitoring Points (cameras): ${h||"Not specified"}
   • Perimeter Alarm: ${f?"Yes, required":"Not required"}`:m=`
📷 *Datos de Seguridad:*
   • Puntos de Monitoreo (cámaras): ${h||"No especificado"}
   • Alarma Perimetral: ${f?"Sí, requerida":"No requerida"}`}else if(d==="domotica"){const h=[...document.querySelectorAll('input[name="form-domo-metas"]:checked')].map(f=>f.value);t?m=`
🏠 *Automation Goals:*
   • ${h.length>0?h.join(`
   • `):"Not specified"}`:m=`
🏠 *Metas de Automatización:*
   • ${h.length>0?h.join(`
   • `):"No especificadas"}`}const s=l?.options[l.selectedIndex],u=s?s.text:d,v=t?`*N3i Engineering & Maintenance*
*Technical Budget Request — Website*

👤 *Name:* ${e}
💼 *Title / Role:* ${a||"Not specified"}
🏢 *Company:* ${i}
📞 *Phone:* ${o}
📧 *Email:* ${r||"Not specified"}

🏗️ *Project Category:* ${c}
🛠️ *Service Required:* ${u}${m}

💬 *Project Description:*
${p}`:`*N3i Engineering & Maintenance*
*Solicitud de Presupuesto Técnico — Sitio Web*

👤 *Nombre:* ${e}
💼 *Cargo / Rol:* ${a||"No especificado"}
🏢 *Empresa:* ${i}
📞 *Teléfono:* ${o}
📧 *Correo:* ${r||"No especificado"}

🏗️ *Categoría del Proyecto:* ${c}
🛠️ *Servicio Requerido:* ${u}${m}

💬 *Descripción del Requerimiento:*
${p}`,g=encodeURIComponent(v),R=`https://wa.me/5492914168232?text=${g}`,j=t?`Technical Budget Request - ${e} (${i})`:`Solicitud de Presupuesto Técnico - ${e} (${i})`,U=`mailto:n3ibhi@gmail.com?subject=${encodeURIComponent(j)}&body=${g}`,D=n.submitter.innerHTML;n.submitter.innerHTML=t?"Processing...":"Procesando...",n.submitter.disabled=!0,n.submitter.id==="btn-submit-email"?window.location.href=U:window.open(R,"_blank","noopener,noreferrer"),setTimeout(()=>{n.submitter.innerHTML=D,n.submitter.disabled=!1,b.reset(),T()},800)});const H=document.querySelectorAll(".abono-btn"),N=document.getElementById("form-message");H.forEach(n=>{n.addEventListener("click",t=>{t.preventDefault();const e=n.getAttribute("data-abono");if(l){const i=`Abono Mantenimiento - ${e}`;for(let o=0;o<l.options.length;o++)if(l.options[o].value===i){l.selectedIndex=o,l.dispatchEvent(new Event("change"));break}}if(N){const i=document.documentElement.lang==="en";let o="";e==="PyME Start"?o=i?"Hello Fabio, I would like to request a quote and personalized advice on the SMB Start Monthly Plan for our shop/office. We would like to schedule an initial preventive visit.":"Hola Fabio, me interesa solicitar una cotización y asesoramiento personalizado sobre el Abono Mensual PyME Start para nuestro local/oficina. Deseamos coordinar una visita preventiva inicial.":e==="PyME Pro"?o=i?"Hello Fabio, we are interested in the SMB Pro Monthly Plan for our mid-size business. We would like to receive a formal technical proposal.":"Hola Fabio, nos interesa el Abono Mensual PyME Pro para nuestra mediana empresa. Quisiéramos recibir una propuesta técnica formal, evaluar la auditoría edilicia quincenal y el soporte en redes/instalaciones.":e==="Industrial 360"?o=i?"Dear Ing. Fabio Gullacci, we are contacting you to request detailed information on the Industrial 360 Monthly Plan for our plant/warehouse.":"Estimado Ing. Fabio Gullacci, nos contactamos para solicitar información detallada sobre el Abono Mensual Industrial 360 para nuestra planta/depósito. Requerimos soporte preventivo en electricidad industrial, neumática, gas certificado y guardias 24/7.":o=i?`Hello Fabio, I am interested in learning more about the monthly maintenance plan: ${e}.`:`Hola Fabio, me interesa recibir más información sobre el abono de mantenimiento mensual: ${e}.`,N.value=o}const a=document.getElementById("contacto");a&&a.scrollIntoView({behavior:"smooth",block:"start"})})});const w=n=>n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[¿?¡!]/g,"");document.querySelectorAll("h2.section-title").forEach(n=>{const t=n.textContent.trim();if(!t)return;n.classList.add("shareable-heading"),n.style.cursor="pointer",n.setAttribute("data-anchor-text",t);const e=n.closest("section");e&&e.id&&n.setAttribute("data-section-id",e.id);const a=document.createElement("div");a.className="heading-share-container",a.addEventListener("click",s=>s.stopPropagation());const i=document.createElement("button");i.className="heading-share-icon",i.setAttribute("aria-label","Compartir sección"),i.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    `;const o=document.createElement("div");o.className="heading-share-menu";const r=document.createElement("button");r.className="heading-share-item copy-item",r.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copiar Enlace
    `;const c=document.createElement("button");c.className="heading-share-item whatsapp-item",c.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      Compartir WhatsApp
    `;const d=document.createElement("button");d.className="heading-share-item email-item",d.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
      Enviar por Correo
    `,o.appendChild(r),o.appendChild(c),o.appendChild(d),a.appendChild(i),a.appendChild(o),n.appendChild(a);const p=()=>e&&e.id?e.id:t,m=()=>{const s=p();return`${window.location.origin}${window.location.pathname}#${encodeURIComponent(s)}`};i.addEventListener("click",s=>{s.stopPropagation(),document.querySelectorAll(".heading-share-menu").forEach(g=>{g!==o&&g.classList.remove("active")});const u=i.getBoundingClientRect(),v=window.innerWidth;u.left+200>v?(o.style.left="auto",o.style.right="0"):(o.style.left="0",o.style.right="auto"),o.classList.toggle("active")}),r.addEventListener("click",()=>{const s=m(),u=p();navigator.clipboard.writeText(s).then(()=>{window.location.hash=encodeURIComponent(u),i.classList.add("copied"),L(document.documentElement.lang==="en"?"Link copied!":"¡Enlace copiado al portapapeles!"),setTimeout(()=>{i.classList.remove("copied")},1500)}).catch(v=>console.error(v)),o.classList.remove("active")}),c.addEventListener("click",()=>{const s=m(),u=e&&e.id?`Sección ${t}`:t,g=document.documentElement.lang==="en"?`Check out this section from N3i Engineering & Maintenance:
*${u}*

${s}`:`Mirá esta sección de N3i Engineering & Maintenance:
*${u}*

${s}`,S=`https://api.whatsapp.com/send?text=${encodeURIComponent(g)}`;window.open(S,"_blank","noopener,noreferrer"),window.location.hash=encodeURIComponent(p()),o.classList.remove("active")}),d.addEventListener("click",()=>{const s=m(),u=document.documentElement.lang==="en",v=u?`N3i - ${t}`:`N3i - ${t}`,g=u?`Hi,

I wanted to share this section of N3i Engineering & Maintenance with you:

${t}
Link: ${s}

Regards.`:`Hola,

Te comparto esta sección del sitio de N3i Engineering & Maintenance:

${t}
Enlace: ${s}

Saludos.`;window.location.href=`mailto:?subject=${encodeURIComponent(v)}&body=${encodeURIComponent(g)}`,window.location.hash=encodeURIComponent(p()),o.classList.remove("active")}),n.addEventListener("click",()=>{const s=p();window.location.hash=encodeURIComponent(s)})}),document.addEventListener("click",()=>{document.querySelectorAll(".heading-share-menu").forEach(n=>{n.classList.remove("active")})});const P=()=>{const n=window.location.hash.substring(1);if(!n)return;const t=decodeURIComponent(n);let e=document.getElementById(t);if(!e){const a=t.replace(/\s+/g,"-").toLowerCase();e=document.getElementById(a)||document.getElementById(t.replace(/\s+/g,"_").toLowerCase())||document.getElementById(t.toLowerCase())}if(!e){const a=document.querySelectorAll("h1, h2, h3, h4, section, div[id]"),i=w(t);for(const o of a){const r=o.getAttribute("data-anchor-text");if(r&&w(r)===i){e=o;break}if(w(o.textContent)===i){e=o;break}const c=o.querySelector(".section-subtitle");if(c&&w(c.textContent)===i){e=o;break}}}if(e){const a=window.innerWidth<=768?95:115,o=e.getBoundingClientRect().top+window.pageYOffset-a;window.scrollTo({top:o,behavior:"smooth"})}};setTimeout(P,250),window.addEventListener("hashchange",P)});
