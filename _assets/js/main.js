 James = {
  /**
  * Toggle the body class between the Terminal and Eghties styles
  * and set a cookie for persistance
  * @param {DOM Event} event 
  */
  goRetro: function(event){
    event.preventDefault()
    let navigationElement = document.getElementById("goRetro").getElementsByTagName("p")[0];
    if("eighties" === document.body.classList.value)
    {
      document.body.classList.remove("eighties");
      document.body.classList.add("terminal");
      navigationElement.innerHTML = "Go Retro"
      document.cookie = "type=terminal; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }
    else
    {
      document.body.classList.add("eighties");
      document.body.classList.remove("terminal");
      navigationElement.innerHTML = "Launch Terminal"
      document.cookie = "type=retro; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }
  },

  /**
  * Update the class of the body to Eghties based on cookie values
  */
  retroLoad: function(){
    if(document.cookie.includes("retro")){
      document.body.classList.add("eighties");
      document.body.classList.remove("terminal");
      navigationElement.innerHTML = "Launch Terminal"
    }
  },

  /**
   * Expand and collapse the navigation
   */
  navigation: function(event){
    event.preventDefault();
    let nextSibling = document.getElementById("navigation").nextElementSibling;
    
    while(nextSibling){      
      if(nextSibling.classList.contains("active")){
        nextSibling.classList.remove("active")
      }else{
        nextSibling.classList.add("active")
      }
      nextSibling = nextSibling.nextElementSibling;
    }
  }
}

document.addEventListener("DOMContentLoaded", James.retroLoad, false);
document.getElementById("goRetro").addEventListener("click", James.goRetro, false);
document.getElementById("navigation").addEventListener("click", James.navigation, false);