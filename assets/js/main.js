James={goRetro:function(e){e.preventDefault();let t=document.getElementById("goRetro").getElementsByTagName("p")[0];"eighties"===document.body.classList.value?(document.body.classList.remove("eighties"),document.body.classList.add("terminal"),t.innerHTML="Go Retro",document.cookie="type=terminal; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/"):(document.body.classList.add("eighties"),document.body.classList.remove("terminal"),t.innerHTML="Launch Terminal",document.cookie="type=retro; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/")},retroLoad:function(){document.cookie.includes("retro")&&(document.body.classList.add("eighties"),document.body.classList.remove("terminal"),navigationElement.innerHTML="Launch Terminal")},navigation:function(e){e.preventDefault();let t=document.getElementById("navigation").nextElementSibling;for(;t;)t.classList.contains("active")?t.classList.remove("active"):t.classList.add("active"),t=t.nextElementSibling}},document.addEventListener("DOMContentLoaded",James.retroLoad,!1),document.getElementById("goRetro").addEventListener("click",James.goRetro,!1),document.getElementById("navigation").addEventListener("click",James.navigation,!1);