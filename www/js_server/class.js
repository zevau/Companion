$("document").ready(function () {
    var postUrl = "http://pb.ingamelandscapes.de/query.php";
    $("#inf").click(function () {
        selectClass(1);
    }); //infanterist
    $("#amb").click(function () {
        selectClass(2);
    }); //ambidexter
    $("#enf").click(function () {
        selectClass(3);
    }); //enforcer
    $("#dis").click(function () {
        selectClass(4);
    }); //disassembler
    $("#min").click(function () {
        selectClass(5);
    }); //mindscaper
    $("#hkt").click(function () {
        selectClass(6);
    }); //hacker(tech)
    $("#avj").click(function () {
        selectClass(7);
    }); //average joe
    $("#pst").click(function () {
        selectClass(8);
    }); //pistolero
    $("#spc").click(function () {
        selectClass(9);
    }); //specialist
    $("#brw").click(function () {
        selectClass(10);
    });//brawler
    $("#lib").click(function () {
        selectClass(11);
    });//limit breaker
    $("#hka").click(function () {
        selectClass(12);
    });//hacker(avan)

    function selectClass(classid) {
        var sendData = {action: "selectclass", classid: classid, userid: localStorage.getItem("USERID")};
        $.ajax({
            url: postUrl,
            type: "POST",
            data: sendData,
            success: function (data, textStatus, jqXHR)
            {
                //Query
                var returnData = JSON.parse(data);
                if (returnData.status.status === "ok") {
                    localStorage.setItem("CLASSID", returnData.userInfo.class);

                    window.location = "inventoryscreen.html";
                }else{
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
