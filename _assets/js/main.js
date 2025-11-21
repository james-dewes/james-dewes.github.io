James = {
  /**
  * Toggle the body class between the Terminal and Eghties styles
  * and set a cookie for persistance
  * @param {DOM Event} event 
  */
  goRetro: function (event) {
    event.preventDefault()
    let goRetroElement = document.getElementById("goRetro");
    if (!goRetroElement) return;

    let navigationElement = goRetroElement.getElementsByTagName("p")[0];
    if (!navigationElement) return;

    if ("eighties" === document.body.classList.value) {
      document.body.classList.remove("eighties");
      document.body.classList.add("terminal");
      navigationElement.innerHTML = "Go Retro"
      document.cookie = "type=terminal; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }
    else {
      document.body.classList.add("eighties");
      document.body.classList.remove("terminal");
      navigationElement.innerHTML = "Launch Terminal"
      document.cookie = "type=retro; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }
  },

  /**
  * Update the class of the body to Eghties based on cookie values
  */
  retroLoad: function () {
    if (document.cookie.includes("retro")) {
      document.body.classList.add("eighties");
      document.body.classList.remove("terminal");
      let navigationElement = document.getElementById("goRetro");
      if (navigationElement) {
        let pElement = navigationElement.getElementsByTagName("p")[0];
        if (pElement) {
          pElement.innerHTML = "Launch Terminal";
        }
      }
    }
  },

  /**
   * Expand and collapse the navigation
   */
  navigation: function (event) {
    event.preventDefault();
    let nextSibling = document.getElementById("navigation").nextElementSibling;

    while (nextSibling) {
      if (nextSibling.classList.contains("active")) {
        nextSibling.classList.remove("active")
      } else {
        nextSibling.classList.add("active")
      }
      nextSibling = nextSibling.nextElementSibling;
    }
  }
}

// Initialise on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  // Load retro theme if cookie is set
  James.retroLoad();

  // Add event listeners with error handling
  let goRetroElement = document.getElementById("goRetro");
  if (goRetroElement) {
    goRetroElement.addEventListener("click", James.goRetro, false);
  }

  let navigationElement = document.getElementById("navigation");
  if (navigationElement) {
    navigationElement.addEventListener("click", James.navigation, false);
  }
}, false);