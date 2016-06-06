$("document").ready(function () {
    
    if (localStorage.getItem("SERVERIP") !== null) {
        $("#serverIp").val(localStorage.getItem("SERVERIP"));
        checkServer(localStorage.getItem("SERVERIP"));
    }
    $(".loading").fadeOut();
    
    $(".log-bwn").on("click", function () {
        checkServer($("#serverIp").val());
    });

    function checkServer(url){
        $(".loading").fadeIn();   
        var sendData = {action: "checkserver"}; //Array
        $.ajax({
            url: url + "/query.php",
            type: "POST",
            data: sendData,
            success: function (data, textStatus, jqXHR)
            {
                if (data !== null) {
                    console.log(data);
                    var returnData = JSON.parse(data);
                    
                    if (returnData.status === "ok") {

                        localStorage.setItem("SERVERIP", url);
                        window.location = "login.html";

                    } else {
                        //nur zum debuggen
                        alert("Serverfehler");
                        $(".loading").fadeOut();
                    }
                } else {
                    alert("Null als Antwort");
                    $(".loading").fadeOut();
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
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
                alert("Serverfehler: " + msg);
                $(".loading").fadeOut();
            }
        });
    }

});
