document.addEventListener("DOMContentLoaded",()=>{const u=document.getElementById("menu-toggle"),f=document.getElementById("nav-menu"),y=document.querySelectorAll(".nav-link");u&&f&&(u.addEventListener("click",()=>{f.classList.toggle("active");const t=f.classList.contains("active");u.innerHTML=t?'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>':'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'}),y.forEach(t=>{t.addEventListener("click",()=>{f.classList.remove("active"),u.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'})}));const h=document.getElementById("header"),E=()=>{window.scrollY>50?h.classList.add("scrolled"):h.classList.remove("scrolled")};window.addEventListener("scroll",E),E();const L=document.querySelectorAll("section, header"),P=()=>{let t=window.scrollY+200;L.forEach(e=>{if(e.id){const o=e.offsetTop,l=e.offsetHeight;t>=o&&t<o+l&&y.forEach(n=>{n.classList.remove("active"),n.getAttribute("href")===`#${e.id}`&&n.classList.add("active")})}})};window.addEventListener("scroll",P);const b=document.querySelectorAll(".filter-btn"),S=document.querySelectorAll(".service-card");b.forEach(t=>{t.addEventListener("click",()=>{b.forEach(o=>o.classList.remove("active")),t.classList.add("active");const e=t.getAttribute("data-filter");S.forEach(o=>{const l=o.getAttribute("data-category");e==="all"||l===e?(o.style.display="flex",setTimeout(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"},50)):(o.style.opacity="0",o.style.transform="translateY(20px) scale(0.95)",setTimeout(()=>{o.style.display="none"},350))})})});const T=document.querySelectorAll(".reveal"),I=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("revealed"),I.unobserve(e.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});T.forEach(t=>{I.observe(t)});const a=document.getElementById("form-service"),w={electricidad:"fields-electricidad",cctv:"fields-cctv",domotica:"fields-domotica"},x=()=>{Object.values(w).forEach(t=>{const e=document.getElementById(t);e&&(e.style.display="none")})};a&&a.addEventListener("change",()=>{x();const t=w[a.value];if(t){const e=document.getElementById(t);e&&(e.style.display="block")}});const p=document.getElementById("whatsapp-contact-form");p&&p.addEventListener("submit",t=>{t.preventDefault();const e=document.documentElement.lang==="en",o=document.getElementById("form-name")?.value.trim()||"",l=document.getElementById("form-role")?.value.trim()||"",n=document.getElementById("form-company")?.value.trim()||"",i=document.getElementById("form-phone")?.value.trim()||"",B=document.getElementById("form-email")?.value.trim()||"",v=document.getElementById("form-project-type")?.value||"",d=a?a.value:"",g=document.getElementById("form-message")?.value.trim()||"";if(!o||!n||!i||!d||!g||!v){alert(e?"Please complete all required fields in the form.":"Por favor complete todos los campos obligatorios del formulario.");return}let c="";if(d==="electricidad"){const s=document.getElementById("form-elec-obra")?.value||"",r=document.getElementById("form-elec-potencia")?.value||"";e?c=`
⚡ *Electrical Details:*
   • Type of Work: ${s||"Not specified"}
   • Estimated Power: ${r?r+" kW":"Not specified"}`:c=`
⚡ *Datos Eléctricos:*
   • Tipo de Obra: ${s||"No especificado"}
   • Potencia Estimada: ${r?r+" kW":"No especificada"}`}else if(d==="cctv"){const s=document.getElementById("form-cctv-puntos")?.value||"",r=document.getElementById("form-cctv-perimetral")?.checked;e?c=`
📷 *Security Details:*
   • Monitoring Points (cameras): ${s||"Not specified"}
   • Perimeter Alarm: ${r?"Yes, required":"Not required"}`:c=`
📷 *Datos de Seguridad:*
   • Puntos de Monitoreo (cámaras): ${s||"No especificado"}
   • Alarma Perimetral: ${r?"Sí, requerida":"No requerida"}`}else if(d==="domotica"){const s=[...document.querySelectorAll('input[name="form-domo-metas"]:checked')].map(r=>r.value);e?c=`
🏠 *Automation Goals:*
   • ${s.length>0?s.join(`
   • `):"Not specified"}`:c=`
🏠 *Metas de Automatización:*
   • ${s.length>0?s.join(`
   • `):"No especificadas"}`}const k=a?.options[a.selectedIndex],M=k?k.text:d,A=e?`*N3i Engineering & Maintenance*
*Technical Budget Request — Website*

👤 *Name:* ${o}
💼 *Title / Role:* ${l||"Not specified"}
🏢 *Company:* ${n}
📞 *Phone:* ${i}
📧 *Email:* ${B||"Not specified"}

🏗️ *Project Category:* ${v}
🛠️ *Service Required:* ${M}${c}

💬 *Project Description:*
${g}`:`*N3i Engineering & Maintenance*
*Solicitud de Presupuesto Técnico — Sitio Web*

👤 *Nombre:* ${o}
💼 *Cargo / Rol:* ${l||"No especificado"}
🏢 *Empresa:* ${n}
📞 *Teléfono:* ${i}
📧 *Correo:* ${B||"No especificado"}

🏗️ *Categoría del Proyecto:* ${v}
🛠️ *Servicio Requerido:* ${M}${c}

💬 *Descripción del Requerimiento:*
${g}`,N=`https://wa.me/5492914168232?text=${encodeURIComponent(A)}`,m=document.getElementById("btn-submit-wp"),C=m.innerHTML;m.innerHTML=e?"Processing...":"Procesando...",m.disabled=!0,window.open(N,"_blank","noopener,noreferrer"),setTimeout(()=>{m.innerHTML=C,m.disabled=!1,p.reset(),x()},800)});const q=document.querySelectorAll(".abono-btn"),$=document.getElementById("form-message");q.forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const o=t.getAttribute("data-abono");if(a){const n=`Abono Mantenimiento - ${o}`;for(let i=0;i<a.options.length;i++)if(a.options[i].value===n){a.selectedIndex=i,a.dispatchEvent(new Event("change"));break}}if($){const n=document.documentElement.lang==="en";let i="";o==="PyME Start"?i=n?"Hello Fabio, I would like to request a quote and personalized advice on the SMB Start Monthly Plan for our shop/office. We would like to schedule an initial preventive visit.":"Hola Fabio, me interesa solicitar una cotización y asesoramiento personalizado sobre el Abono Mensual PyME Start para nuestro local/oficina. Deseamos coordinar una visita preventiva inicial.":o==="PyME Pro"?i=n?"Hello Fabio, we are interested in the SMB Pro Monthly Plan for our mid-size business. We would like to receive a formal technical proposal.":"Hola Fabio, nos interesa el Abono Mensual PyME Pro para nuestra mediana empresa. Quisiéramos recibir una propuesta técnica formal, evaluar la auditoría edilicia quincenal y el soporte en redes/instalaciones.":o==="Industrial 360"?i=n?"Dear Ing. Fabio Gullacci, we are contacting you to request detailed information on the Industrial 360 Monthly Plan for our plant/warehouse.":"Estimado Ing. Fabio Gullacci, nos contactamos para solicitar información detallada sobre el Abono Mensual Industrial 360 para nuestra planta/depósito. Requerimos soporte preventivo en electricidad industrial, neumática, gas certificado y guardias 24/7.":i=n?`Hello Fabio, I am interested in learning more about the monthly maintenance plan: ${o}.`:`Hola Fabio, me interesa recibir más información sobre el abono de mantenimiento mensual: ${o}.`,$.value=i}const l=document.getElementById("contacto");l&&l.scrollIntoView({behavior:"smooth",block:"start"})})})});
