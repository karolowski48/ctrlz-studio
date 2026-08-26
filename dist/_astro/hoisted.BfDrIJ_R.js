import{i}from"./pageInit.kN4SuLGa.js";import"./Layout.astro_astro_type_script_index_0_lang.iHYyb4I2.js";import"./ScrollTrigger.CezCZ8EY.js";i();document.querySelectorAll(".faq-item").forEach(e=>{e.querySelector(".faq-question")?.addEventListener("click",()=>{const o=e.classList.contains("open");document.querySelectorAll(".faq-item").forEach(n=>n.classList.remove("open")),o||e.classList.add("open")})});document.getElementById("audyt-form")?.addEventListener("submit",e=>{e.preventDefault();const o=e.currentTarget,n=new FormData(o),t=c=>(n.get(c)||"").toString(),a=encodeURIComponent(`Bezpłatny audyt — ${t("url")}`),r=encodeURIComponent(`Adres strony: ${t("url")}
Email: ${t("email")}
Branża: ${t("branza")}

Co uwiera na obecnej stronie:
${t("problem")}

Zgoda na kontakt: tak`);window.czTrack?.("generate_lead",{form_id:"bezplatny-audyt"}),window.location.href=`mailto:kontakt@ctrlzstudio.pl?subject=${a}&body=${r}`});
