$("document").ready(function () {
    //check ob eingeloggt:
    if (localStorage.getItem("USERID") === null) {
        window.location = "login.html";
    }
  });
