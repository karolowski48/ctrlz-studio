import{i as s}from"./pageInit.PQTZBQ_c.js";import"./Layout.astro_astro_type_script_index_0_lang.B3qmfO6G.js";import"./ScrollTrigger.CezCZ8EY.js";s();document.querySelectorAll(".faq-item").forEach(t=>{t.querySelector(".faq-question")?.addEventListener("click",()=>{const o=t.classList.contains("open");document.querySelectorAll(".faq-item").forEach(n=>n.classList.remove("open")),o||t.classList.add("open")})});document.getElementById("audyt-form")?.addEventListener("submit",t=>{t.preventDefault();const o=t.currentTarget,n=new FormData(o),e=c=>(n.get(c)||"").toString(),a=encodeURIComponent(`Bezpłatny audyt — ${e("url")}`),r=encodeURIComponent(`Adres strony: ${e("url")}
Email: ${e("email")}
Branża: ${e("branza")}

Co uwiera na obecnej stronie:
${e("problem")}

Zgoda na kontakt: tak`);window.location.href=`mailto:kontakt@ctrlzstudio.pl?subject=${a}&body=${r}`});
