$("document").ready(function(){
    
    checkLogin();
    
    var userID = localStorage.getItem("USERID");
    var loginMode = true;
    var postUrl = "http://pb.ingamelandscapes.de/query.php";
    
    $("#reg-pw").hide();
    $("#login-btn").on("click", function () {
      if(loginMode){
        var loginStr = $("#username").val();
        var passwordStr = $("#password").val();

        //Daten die gesendet werden m�ssen f�r die funktion "loginuser"
        //Vergleiche mit quellcode von: http://pb.ingamelandscapes.de/

        var sendData = {action: "loginuser", username: loginStr, password: passwordStr}; //Array

        $.ajax({
            url: postUrl,
            type: "POST",
            data: sendData,
            success: function (data, textStatus, jqXHR)
            {
                //data ist die r�ckgabe vom server, zur�ckgegeben wird ein JSON Array (bestimmte art der Formatierung)
                //man kann dann einfach drauf zugreifen z.b via returnData.status (gibt das Array zur�ck mit dem Inhalt "status" und "userInfo")
                //returnData.status.status ist entweder "ok" oder "error" was genau f�r antworten kommen kannst du auch oben auf der testseite ausprobieren und danach dann die funktionen schreiben

                var returnData = JSON.parse(data);

                //Ist der login ok?

                if (returnData.status.status === "ok") {
                    //Login ist richtig
                    //hier m�ssen wir jetzt der App sagen, dass sie die ID speichern soll damit wir auf jeder "Seite" wissen, dass der User eingeloggt ist
                    /*
                     speichern:
                     localStorage.setItem("pref1", "val1");

                     lesen:
                     var pref1 = localStorage.getItem("pref1");
                     */

                    localStorage.setItem("USERID", returnData.userInfo.id);


                    // !!! eigentlich m�ssten wir hier jetzt testen ob der user bereits in einem team ist und  schon eine klasse hat wenn nicht, dann weiterleitung an die jeweilige seite, wenn doch dann leiten wir direkt zur profil�bersicht weiter

                    if (returnData.userInfo.team === "0") {
                        //user hat noch kein team gew�hlt, weiterleitung zur team seite
                        window.location = "faction.html";
                    } else if (returnData.userInfo.class === "0") {
                        //user hat noch keine klasse gew�hlt, weiterleitung zur klassen seite
                       if(returnData.userInfo.team === "1"){
                           window.location = "classest.html";
                       }else if(returnData.userInfo.team === "2"){
                           window.location = "classesa.html";
                       }else{
                           alert("What");
                       }
                    } else {
                        //user hat bereits alles gew�hlt weiterleitung zum profil
                       window.location = "inventoryscreen.html";
                    }

                    //hier jetzt zum testen und weil ich nicht weis wie genau und wann man team und klasse w�hlt leiten wir einfach an irgendeine seite weiter
                    //auf allen seiten  au�er der login seite m�sste am anfang bevor alles andere kommt erst mal abgefragt werden ob bereits ein user eingeloggt ist ich denke hier reicht die abfrage ob im localStorage die USERID gesetzt ist oder nicht, wenn ja kennen wir ja den user und k�nnen alle funktionen mit diesder ID abrufen


                } else {
                    //nur zum debuggen
                    alert(returnData.status.status + ": " + returnData.status.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                var msg = '';
                if (jqXHR.status == 0) {
                    msg = 'Not connected.\n Verify Network.';
                } else if (jqXHR.status === 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status === 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert(msg);
            }
        });
      } else {
        loginMode = true;
        $("#reg-pw").hide();
        $("#headline").html("Login");
      }
    });
    $("#register-btn").click(function(){
       if (loginMode == false){
        var loginStr = $("#username").val();
        var passwordStr = $("#password").val();
        var passwordStr2 = $("#password2").val();

        var sendData = {action: "createuser", username: loginStr, password: passwordStr, password2: passwordStr2}; //Array
        $.ajax({
          url: postUrl,
          type: "POST",
          data: sendData,
          success: function (data, textStatus, jqXHR)
          {
            var returnData = JSON.parse(data);
            if (returnData.status.status === "ok") {
              localStorage.setItem("USERID", returnData.userInfo.id);
              alert("Registrierung abgeschlossen!");
              window.location = "faction.html";
            } else {
              alert(returnData.status.status + ": " + returnData.status.message);
            }
          },
          error: function (jqXHR, textStatus, errorThrown){
            alert("Connection failed");
          }
        });
  } else {
    loginMode = false;
    $("#reg-pw").show();
    $("#headline").html("Register");
    //do somethign
  }
});
});
  function userAlreadyLoggedIn(){
              console.log("User eingeloggt");
              //Weiterleitung an jeweilige Seite.
  };
 function checkLogin() {

        if (localStorage.getItem("USERID") !== null) {
            var postUrl = "http://pb.ingamelandscapes.de/query.php";


            var sendData = {action: "getuserdetails", userid: localStorage.getItem("USERID")}; //Array

            $.ajax({
                url: postUrl,
                type: "POST",
                data: sendData,
                success: function (data, textStatus, jqXHR)
                {

                    var returnData = JSON.parse(data);
                    
                    console.log(returnData);
                    if (returnData.status.status === "ok") {
                        if (returnData.userDetails !== null) {
                            if (returnData.userDetails.team === "0") {
                                window.location = "faction.html";
                            } else if (returnData.userDetails.class === "0") {
                                if (returnData.userInfo.team === "1") {
                                    window.location = "classest.html";
                                } else if (returnData.userInfo.team === "2") {
                                    window.location = "classesa.html";
                                } else {
                                    alert("What");
                                }
                            }else if (returnData.userDetails.class !== "0" || returnData.userDetails.team !== "0") {
                                window.location = "inventoryscreen.html";
                            }

                        }else{
                            $(".loading").fadeOut();
                        }

                    } else {
                        alert(returnData.status.message);
                        $(".loading").fadeOut();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    var msg = '';
                    if (jqXHR.status == 0) {
                        msg = 'Not connected.\n Verify Network.';
                    } else if (jqXHR.status === 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status === 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                }
            });
        }
    }
