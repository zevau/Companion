$("document").ready(function () {
    var postUrl = "http://pb.ingamelandscapes.de/query.php";
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
    });*/
    $(".confirm").click(function(){
      var class_str = $(this).attr('id');
      var class_id;
      if(class_str === "inf"){//infanterist
        class_id = 1;
      } else if(class_str === "amb"){ //ambidexter
        class_id = 2;
      } else if(class_str === "enf"){//enforcer
        class_id = 3;
      } else if(class_str === "dis"){//disassembler
        class_id = 4;
      } else if(class_str === "min"){//mindscaper
        class_id = 5;
      } else if(class_str === "hkt"){//hacker(tech)
        class_id = 6;
      } else if(class_str === "avj"){//average joe
        class_id = 7;
      } else if(class_str === "pst"){//pistolero
        class_id = 8;
      } else if(class_str === "spc"){//specialist
        class_id = 9;
      } else if(class_str === "brw"){//brawler
        class_id = 10;
      } else if(class_str === "lib"){//limit breaker
        class_id = 11;
      } else if(class_str === "hka"){//hacker(avan)
        class_id = 12;
      }
      var sendData = {action: "selectclass", classid: class_id, userid: localStorage.getItem("USERID")}
      $.ajax({
          url: postUrl,
          type: "POST",
          data: sendData,
          success: function (data, textStatus, jqXHR)
          {
            var returnData = JSON.parse(data);
            localStorage.setItem("CLASSID", returnData.userInfo.class);
            alert("Klasse ausgewählt!");
            window.location = "inventoryscreen.html";
          },
          error: function (jqXHR, textStatus, errorThrown)
          {
              alert("Connection failed");
          }
        });
    });
    $(".confirm_faction").click(function(){
      var faction_str = $(this).attr('id');
      var faction_id;
      if(faction_str === "tec"){//technokraten
        faction_id = 1;
      } else if(faction_str === "ava"){ //avangardisten
        faction_id = 2;
      }
      var sendData = {action: "selectteam", teamid: faction_id, userid: localStorage.getItem("USERID")}
      $.ajax({
          url: postUrl,
          type: "POST",
          data: sendData,
          success: function (data, textStatus, jqXHR)
          {
            var returnData = JSON.parse(data);
            localStorage.setItem("TEAMID", returnData.userInfo.team);
            alert("Fraktion ausgewählt!");
            if (faction_id = 1){
              window.location = "classest.html";
            } else if (faction_id = 2){
              window.location = "classesa.html";
            }
          },
          error: function (jqXHR, textStatus, errorThrown)
          {
              alert("Connection failed");
          }
        });
    })
});
