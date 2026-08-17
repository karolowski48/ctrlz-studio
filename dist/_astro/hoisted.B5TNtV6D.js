import{i as r}from"./pageInit.PQTZBQ_c.js";import"./Layout.astro_astro_type_script_index_0_lang.B3qmfO6G.js";import"./ScrollTrigger.CezCZ8EY.js";r();document.getElementById("kontakt-form")?.addEventListener("submit",e=>{e.preventDefault();const o=e.currentTarget,n=new FormData(o),t=i=>(n.get(i)||"").toString(),a=encodeURIComponent(`Zapytanie ze strony — ${t("name")}`),m=encodeURIComponent(`Imię: ${t("name")}
Firma: ${t("company")}
Email: ${t("email")}
Telefon: ${t("phone")}
Usługa: ${t("service")}

Wiadomość:
${t("message")}`);window.location.href=`mailto:kontakt@ctrlzstudio.pl?subject=${a}&body=${m}`});
