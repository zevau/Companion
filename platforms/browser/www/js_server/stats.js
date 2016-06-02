$("document").ready(function () {
    
    var userDetails = null;
    var postUrl = "http://pb.ingamelandscapes.de/query.php";
    
    
    var sendData = {action: "getuserdetails", userid: localStorage.getItem("USERID")}; //Array

        $.ajax({
            url: postUrl,
            type: "POST",
            data: sendData,
            success: function (data, textStatus, jqXHR)
            {

                var returnData = JSON.parse(data);
                if (returnData.status.status === "ok") {
                    
                    $("#username").html(returnData.userDetails.name);
                    $("#classname").html(returnData.userDetails.class_name);
                    $("#health").attr("aria-valuetransitiongoal",returnData.userDetails.hp);
                    $("#health").html(returnData.userDetails.hp + "%");
                    $("#xp").attr("aria-valuetransitiongoal",returnData.userDetails.xp);
                    $("#xp").html(returnData.userDetails.xp + "%");
                    $("#reaction").attr("aria-valuetransitiongoal",returnData.userDetails.reaction);
                    $("#reaction").html(returnData.userDetails.reaction + "%");
                    $("#stamina").attr("aria-valuetransitiongoal",returnData.userDetails.stamina);
                    $("#stamina").html(returnData.userDetails.stamina + "%");
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
    });