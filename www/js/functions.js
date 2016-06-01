$("document").ready(function () {
    var postUrl = "http://pb.ingamelandscapes.de/query.php";
    alert("script loaded");//debug


    $(".log-bwn").on("click", function () {

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

                    if(returnData.userInfo.team === "0"){
                        //user hat noch kein team gew�hlt, weiterleitung zur team seite
                        alert("Team wählen!");
                    }else if(returnData.userInfo.class === "0"){
                        //user hat noch keine klasse gew�hlt, weiterleitung zur klassen seite
                        alert("Klasse wählen!");
                    }else{
                        //user hat bereits alles gew�hlt weiterleitung zum profil
                        alert("Anmeldung abgeschlossen!");
                    }

                    //hier jetzt zum testen und weil ich nicht weis wie genau und wann man team und klasse w�hlt leiten wir einfach an irgendeine seite weiter
                    //auf allen seiten  au�er der login seite m�sste am anfang bevor alles andere kommt erst mal abgefragt werden ob bereits ein user eingeloggt ist ich denke hier reicht die abfrage ob im localStorage die USERID gesetzt ist oder nicht, wenn ja kennen wir ja den user und k�nnen alle funktionen mit diesder ID abrufen
                    window.location = "faction.html";

                } else {
                    //nur zum debuggen
                    alert(returnData.status.status + ": " + returnData.status.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("Connection failed");
            }
        });
    });//No register-btn
    /*$("#register-btn").click(function(){
      var loginStr = $("#inputUser").val();
      var passwordStr = $("#inputPassword").val();

      var sendData = {action: "createuser", username: loginStr, password: passwordStr}; //Array
      $.ajax({
        url: postUrl,
        type: "POST",
        data: sendData,
        success: function, (data, textStatus, jqXHR)
        {
          $.ajax({
            url: postUrl,
            type: "POST",
            data: sendData,
            success: function (data, textStatus, jqXHR)
            {
                var returnData = JSON.parse(data);
                if (returnData.status.status === "ok") {
                  localStorage.setItem("USERID", returnData.userInfo.id);
                  if(returnData.userInfo.team === "0"){
                        alert("Team w�hlen!");
                  }else if(returnData.userInfo.class === "0"){
                        alert("Klasse w�hlen!");
                  }else{
                        alert("Anmeldung abgeschlossen!");
                  }
                  window.location = "faction.html";

                } else {
                  alert(returnData.status.status + ": " + returnData.status.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("Connection failed");
            }
          });
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert("Connection failed");
        }
      })
    })*/
});
