document.addEventListener("DOMContentLoaded",()=>{const m=document.getElementById("menu-toggle"),u=document.getElementById("nav-menu"),B=document.querySelectorAll(".nav-link");m&&u&&(m.addEventListener("click",()=>{u.classList.toggle("active");const e=u.classList.contains("active"),t=document.getElementById("header");t&&(e?t.classList.add("menu-open"):t.classList.remove("menu-open")),m.innerHTML=e?'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>':'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'}),document.querySelectorAll("#nav-menu a, #logo-link").forEach(e=>{e.addEventListener("click",()=>{u.classList.remove("active");const t=document.getElementById("header");t&&t.classList.remove("menu-open"),m.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'})}));const g=document.getElementById("header"),y=()=>{window.scrollY>50?g.classList.add("scrolled"):g.classList.remove("scrolled")};window.addEventListener("scroll",y),y();const M=document.querySelectorAll("section, header"),P=()=>{let o=window.scrollY+200;M.forEach(e=>{if(e.id){const t=e.offsetTop,l=e.offsetHeight;o>=t&&o<t+l&&B.forEach(n=>{n.classList.remove("active"),n.getAttribute("href")===`#${e.id}`&&n.classList.add("active")})}})};window.addEventListener("scroll",P);const h=document.querySelectorAll(".filter-btn"),S=document.querySelectorAll(".service-card");h.forEach(o=>{o.addEventListener("click",()=>{h.forEach(t=>t.classList.remove("active")),o.classList.add("active");const e=o.getAttribute("data-filter");S.forEach(t=>{const l=t.getAttribute("data-category");e==="all"||l===e?(t.style.display="flex",setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0) scale(1)"},50)):(t.style.opacity="0",t.style.transform="translateY(20px) scale(0.95)",setTimeout(()=>{t.style.display="none"},350))})})});const T=document.querySelectorAll(".reveal"),E=new IntersectionObserver(o=>{o.forEach(e=>{e.isIntersecting&&(e.target.classList.add("revealed"),E.unobserve(e.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});T.forEach(o=>{E.observe(o)});const a=document.getElementById("form-service"),b={electricidad:"fields-electricidad",cctv:"fields-cctv",domotica:"fields-domotica"},$=()=>{Object.values(b).forEach(o=>{const e=document.getElementById(o);e&&(e.style.display="none")})};a&&a.addEventListener("change",()=>{$();const o=b[a.value];if(o){const e=document.getElementById(o);e&&(e.style.display="block")}});const f=document.getElementById("whatsapp-contact-form");f&&f.addEventListener("submit",o=>{o.preventDefault();const e=document.documentElement.lang==="en",t=document.getElementById("form-name")?.value.trim()||"",l=document.getElementById("form-role")?.value.trim()||"",n=document.getElementById("form-company")?.value.trim()||"",i=document.getElementById("form-phone")?.value.trim()||"",w=document.getElementById("form-email")?.value.trim()||"",p=document.getElementById("form-project-type")?.value||"",d=a?a.value:"",v=document.getElementById("form-message")?.value.trim()||"";if(!t||!n||!i||!d||!v||!p){alert(e?"Please complete all required fields in the form.":"Por favor complete todos los campos obligatorios del formulario.");return}let c="";if(d==="electricidad"){const s=document.getElementById("form-elec-obra")?.value||"",r=document.getElementById("form-elec-potencia")?.value||"";e?c=`
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
   • `):"No especificadas"}`}const x=a?.options[a.selectedIndex],L=x?x.text:d,A=e?`*N3i Engineering & Maintenance*
*Technical Budget Request — Website*

👤 *Name:* ${t}
💼 *Title / Role:* ${l||"Not specified"}
🏢 *Company:* ${n}
📞 *Phone:* ${i}
📧 *Email:* ${w||"Not specified"}

🏗️ *Project Category:* ${p}
🛠️ *Service Required:* ${L}${c}

💬 *Project Description:*
${v}`:`*N3i Engineering & Maintenance*
*Solicitud de Presupuesto Técnico — Sitio Web*

👤 *Nombre:* ${t}
💼 *Cargo / Rol:* ${l||"No especificado"}
🏢 *Empresa:* ${n}
📞 *Teléfono:* ${i}
📧 *Correo:* ${w||"No especificado"}

🏗️ *Categoría del Proyecto:* ${p}
🛠️ *Servicio Requerido:* ${L}${c}

💬 *Descripción del Requerimiento:*
${v}`,k=encodeURIComponent(A),N=`https://wa.me/5492914168232?text=${k}`,C=e?`Technical Budget Request - ${t} (${n})`:`Solicitud de Presupuesto Técnico - ${t} (${n})`,H=`mailto:n3ibhi@gmail.com?subject=${encodeURIComponent(C)}&body=${k}`,j=o.submitter.innerHTML;o.submitter.innerHTML=e?"Processing...":"Procesando...",o.submitter.disabled=!0,o.submitter.id==="btn-submit-email"?window.location.href=H:window.open(N,"_blank","noopener,noreferrer"),setTimeout(()=>{o.submitter.innerHTML=j,o.submitter.disabled=!1,f.reset(),$()},800)});const q=document.querySelectorAll(".abono-btn"),I=document.getElementById("form-message");q.forEach(o=>{o.addEventListener("click",e=>{e.preventDefault();const t=o.getAttribute("data-abono");if(a){const n=`Abono Mantenimiento - ${t}`;for(let i=0;i<a.options.length;i++)if(a.options[i].value===n){a.selectedIndex=i,a.dispatchEvent(new Event("change"));break}}if(I){const n=document.documentElement.lang==="en";let i="";t==="PyME Start"?i=n?"Hello Fabio, I would like to request a quote and personalized advice on the SMB Start Monthly Plan for our shop/office. We would like to schedule an initial preventive visit.":"Hola Fabio, me interesa solicitar una cotización y asesoramiento personalizado sobre el Abono Mensual PyME Start para nuestro local/oficina. Deseamos coordinar una visita preventiva inicial.":t==="PyME Pro"?i=n?"Hello Fabio, we are interested in the SMB Pro Monthly Plan for our mid-size business. We would like to receive a formal technical proposal.":"Hola Fabio, nos interesa el Abono Mensual PyME Pro para nuestra mediana empresa. Quisiéramos recibir una propuesta técnica formal, evaluar la auditoría edilicia quincenal y el soporte en redes/instalaciones.":t==="Industrial 360"?i=n?"Dear Ing. Fabio Gullacci, we are contacting you to request detailed information on the Industrial 360 Monthly Plan for our plant/warehouse.":"Estimado Ing. Fabio Gullacci, nos contactamos para solicitar información detallada sobre el Abono Mensual Industrial 360 para nuestra planta/depósito. Requerimos soporte preventivo en electricidad industrial, neumática, gas certificado y guardias 24/7.":i=n?`Hello Fabio, I am interested in learning more about the monthly maintenance plan: ${t}.`:`Hola Fabio, me interesa recibir más información sobre el abono de mantenimiento mensual: ${t}.`,I.value=i}const l=document.getElementById("contacto");l&&l.scrollIntoView({behavior:"smooth",block:"start"})})})});
