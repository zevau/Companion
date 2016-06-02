$("document").ready(function () {
    var postUrl = "http://pb.ingamelandscapes.de/query.php";


    $("#select-t").click(function () {

        selectTeam(1);

    });
    $("#select-a").click(function () {

        selectTeam(2);

    });

    function selectTeam(teamid) {
        var sendData = {action: "selectteam", teamid: teamid, userid: localStorage.getItem("USERID")};

        $.ajax({
            url: postUrl,
            type: "POST",
            data: sendData,
            success: function (data, textStatus, jqXHR)
            {
                //Query
                var returnData = JSON.parse(data);
                if (returnData.status.status === "ok") {

                    if (teamid === 1) {
                        window.location = "classest.html";
                    } else {
                        window.location = "classesa.html";
                    }
                    localStorage.setItem("TEAMID", teamid);
                } else {
                    alert(returnData.status.message);
                }







            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
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

});
