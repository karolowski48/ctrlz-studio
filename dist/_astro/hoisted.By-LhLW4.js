import{s as n}from"./formSubmit.Cb0EyuFk.js";import{i as r}from"./pageInit.kN4SuLGa.js";import"./Layout.astro_astro_type_script_index_0_lang.iHYyb4I2.js";import"./ScrollTrigger.CezCZ8EY.js";r();document.getElementById("kontakt-form")?.addEventListener("submit",e=>{e.preventDefault();const a=e.currentTarget,o=new FormData(a),t=m=>(o.get(m)||"").toString();n(a,{formId:"kontakt",fallbackSubject:`Zapytanie ze strony — ${t("name")}`,fallbackBody:`Imię: ${t("name")}
Firma: ${t("company")}
Email: ${t("email")}
Telefon: ${t("phone")}
Usługa: ${t("service")}

Wiadomość:
${t("message")}`})});
