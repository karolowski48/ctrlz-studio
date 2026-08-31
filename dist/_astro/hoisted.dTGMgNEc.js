import{s as n}from"./formSubmit.Cb0EyuFk.js";import{i as s}from"./pageInit.kN4SuLGa.js";import"./Layout.astro_astro_type_script_index_0_lang.iHYyb4I2.js";import"./ScrollTrigger.CezCZ8EY.js";s();document.querySelectorAll(".faq-item").forEach(t=>{t.querySelector(".faq-question")?.addEventListener("click",()=>{const a=t.classList.contains("open");document.querySelectorAll(".faq-item").forEach(o=>o.classList.remove("open")),a||t.classList.add("open")})});document.getElementById("audyt-form")?.addEventListener("submit",t=>{t.preventDefault();const a=t.currentTarget,o=new FormData(a),e=r=>(o.get(r)||"").toString();n(a,{formId:"bezplatny-audyt",fallbackSubject:`Bezpłatny audyt — ${e("url")}`,fallbackBody:`Adres strony: ${e("url")}
Email: ${e("email")}
Branża: ${e("branza")}

Co uwiera na obecnej stronie:
${e("problem")}

Zgoda na kontakt: tak`})});
