document.addEventListener("DOMContentLoaded",()=>{const m=document.getElementById("menu-toggle"),u=document.getElementById("nav-menu"),g=document.querySelectorAll(".nav-link");m&&u&&(m.addEventListener("click",()=>{u.classList.toggle("active");const e=u.classList.contains("active");m.innerHTML=e?'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>':'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'}),g.forEach(e=>{e.addEventListener("click",()=>{u.classList.remove("active"),m.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'})}));const y=document.getElementById("header"),h=()=>{window.scrollY>50?y.classList.add("scrolled"):y.classList.remove("scrolled")};window.addEventListener("scroll",h),h();const L=document.querySelectorAll("section, header"),P=()=>{let e=window.scrollY+200;L.forEach(t=>{if(t.id){const o=t.offsetTop,l=t.offsetHeight;e>=o&&e<o+l&&g.forEach(n=>{n.classList.remove("active"),n.getAttribute("href")===`#${t.id}`&&n.classList.add("active")})}})};window.addEventListener("scroll",P);const b=document.querySelectorAll(".filter-btn"),S=document.querySelectorAll(".service-card");b.forEach(e=>{e.addEventListener("click",()=>{b.forEach(o=>o.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-filter");S.forEach(o=>{const l=o.getAttribute("data-category");t==="all"||l===t?(o.style.display="flex",setTimeout(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"},50)):(o.style.opacity="0",o.style.transform="translateY(20px) scale(0.95)",setTimeout(()=>{o.style.display="none"},350))})})});const T=document.querySelectorAll(".reveal"),E=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("revealed"),E.unobserve(t.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});T.forEach(e=>{E.observe(e)});const a=document.getElementById("form-service"),$={electricidad:"fields-electricidad",cctv:"fields-cctv",domotica:"fields-domotica"},w=()=>{Object.values($).forEach(e=>{const t=document.getElementById(e);t&&(t.style.display="none")})};a&&a.addEventListener("change",()=>{w();const e=$[a.value];if(e){const t=document.getElementById(e);t&&(t.style.display="block")}});const f=document.getElementById("whatsapp-contact-form");f&&f.addEventListener("submit",e=>{e.preventDefault();const t=document.documentElement.lang==="en",o=document.getElementById("form-name")?.value.trim()||"",l=document.getElementById("form-role")?.value.trim()||"",n=document.getElementById("form-company")?.value.trim()||"",i=document.getElementById("form-phone")?.value.trim()||"",x=document.getElementById("form-email")?.value.trim()||"",p=document.getElementById("form-project-type")?.value||"",d=a?a.value:"",v=document.getElementById("form-message")?.value.trim()||"";if(!o||!n||!i||!d||!v||!p){alert(t?"Please complete all required fields in the form.":"Por favor complete todos los campos obligatorios del formulario.");return}let c="";if(d==="electricidad"){const s=document.getElementById("form-elec-obra")?.value||"",r=document.getElementById("form-elec-potencia")?.value||"";t?c=`
⚡ *Electrical Details:*
   • Type of Work: ${s||"Not specified"}
   • Estimated Power: ${r?r+" kW":"Not specified"}`:c=`
⚡ *Datos Eléctricos:*
   • Tipo de Obra: ${s||"No especificado"}
   • Potencia Estimada: ${r?r+" kW":"No especificada"}`}else if(d==="cctv"){const s=document.getElementById("form-cctv-puntos")?.value||"",r=document.getElementById("form-cctv-perimetral")?.checked;t?c=`
📷 *Security Details:*
   • Monitoring Points (cameras): ${s||"Not specified"}
   • Perimeter Alarm: ${r?"Yes, required":"Not required"}`:c=`
📷 *Datos de Seguridad:*
   • Puntos de Monitoreo (cámaras): ${s||"No especificado"}
   • Alarma Perimetral: ${r?"Sí, requerida":"No requerida"}`}else if(d==="domotica"){const s=[...document.querySelectorAll('input[name="form-domo-metas"]:checked')].map(r=>r.value);t?c=`
🏠 *Automation Goals:*
   • ${s.length>0?s.join(`
   • `):"Not specified"}`:c=`
🏠 *Metas de Automatización:*
   • ${s.length>0?s.join(`
   • `):"No especificadas"}`}const B=a?.options[a.selectedIndex],k=B?B.text:d,A=t?`*N3i Engineering & Maintenance*
*Technical Budget Request — Website*

👤 *Name:* ${o}
💼 *Title / Role:* ${l||"Not specified"}
🏢 *Company:* ${n}
📞 *Phone:* ${i}
📧 *Email:* ${x||"Not specified"}

🏗️ *Project Category:* ${p}
🛠️ *Service Required:* ${k}${c}

💬 *Project Description:*
${v}`:`*N3i Engineering & Maintenance*
*Solicitud de Presupuesto Técnico — Sitio Web*

👤 *Nombre:* ${o}
💼 *Cargo / Rol:* ${l||"No especificado"}
🏢 *Empresa:* ${n}
📞 *Teléfono:* ${i}
📧 *Correo:* ${x||"No especificado"}

🏗️ *Categoría del Proyecto:* ${p}
🛠️ *Servicio Requerido:* ${k}${c}

💬 *Descripción del Requerimiento:*
${v}`,M=encodeURIComponent(A),N=`https://wa.me/5492914168232?text=${M}`,C=t?`Technical Budget Request - ${o} (${n})`:`Solicitud de Presupuesto Técnico - ${o} (${n})`,H=`mailto:n3ibhi@gmail.com?subject=${encodeURIComponent(C)}&body=${M}`,j=e.submitter.innerHTML;e.submitter.innerHTML=t?"Processing...":"Procesando...",e.submitter.disabled=!0,e.submitter.id==="btn-submit-email"?window.location.href=H:window.open(N,"_blank","noopener,noreferrer"),setTimeout(()=>{e.submitter.innerHTML=j,e.submitter.disabled=!1,f.reset(),w()},800)});const q=document.querySelectorAll(".abono-btn"),I=document.getElementById("form-message");q.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const o=e.getAttribute("data-abono");if(a){const n=`Abono Mantenimiento - ${o}`;for(let i=0;i<a.options.length;i++)if(a.options[i].value===n){a.selectedIndex=i,a.dispatchEvent(new Event("change"));break}}if(I){const n=document.documentElement.lang==="en";let i="";o==="PyME Start"?i=n?"Hello Fabio, I would like to request a quote and personalized advice on the SMB Start Monthly Plan for our shop/office. We would like to schedule an initial preventive visit.":"Hola Fabio, me interesa solicitar una cotización y asesoramiento personalizado sobre el Abono Mensual PyME Start para nuestro local/oficina. Deseamos coordinar una visita preventiva inicial.":o==="PyME Pro"?i=n?"Hello Fabio, we are interested in the SMB Pro Monthly Plan for our mid-size business. We would like to receive a formal technical proposal.":"Hola Fabio, nos interesa el Abono Mensual PyME Pro para nuestra mediana empresa. Quisiéramos recibir una propuesta técnica formal, evaluar la auditoría edilicia quincenal y el soporte en redes/instalaciones.":o==="Industrial 360"?i=n?"Dear Ing. Fabio Gullacci, we are contacting you to request detailed information on the Industrial 360 Monthly Plan for our plant/warehouse.":"Estimado Ing. Fabio Gullacci, nos contactamos para solicitar información detallada sobre el Abono Mensual Industrial 360 para nuestra planta/depósito. Requerimos soporte preventivo en electricidad industrial, neumática, gas certificado y guardias 24/7.":i=n?`Hello Fabio, I am interested in learning more about the monthly maintenance plan: ${o}.`:`Hola Fabio, me interesa recibir más información sobre el abono de mantenimiento mensual: ${o}.`,I.value=i}const l=document.getElementById("contacto");l&&l.scrollIntoView({behavior:"smooth",block:"start"})})})});
