$("document").ready(function () {
    $(".loading").fadeIn();
    $(".logout").click(function(){
        localStorage.removeItem("USERID");
        localStorage.removeItem("CLASSID");
        localStorage.removeItem("TEAMID");
        
        window.location = "index.html";
    });
    
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

                userDetails = returnData.userDetails;
                loadCoins(returnData.userInventar);



                $("#usernameDiv").html(returnData.userDetails.name);
                $("#classnameDiv").html(returnData.userDetails.class_name);
                $("#userImage").attr("src", returnData.userDetails.class_img);
                $("#health").attr("aria-valuenow", returnData.userDetails.hp);
                $("#health").find("span").html("HP: "+returnData.userDetails.hp);
                $("#health").css("width", returnData.userDetails.hp + "%");

                $("#xp").attr("aria-valuenow", returnData.userDetails.xp);
                $("#xp").find("span").html("XP: "+returnData.userDetails.xp);
                $("#xp").css("width", returnData.userDetails.xp + "%");

                $("#reaction").attr("aria-valuenow", returnData.userDetails.reaction);
                $("#reaction").find("span").html("Reaction: "+returnData.userDetails.reaction);
                $("#reaction").css("width", returnData.userDetails.reaction + "%");

                $("#stamina").attr("aria-valuenow", returnData.userDetails.stamina);
                $("#stamina").find("span").html("Stamina: " + returnData.userDetails.stamina.toString());
                $("#stamina").css("width", returnData.userDetails.stamina + "%");
                
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
});

function loadCoins(userInventar) {
    console.log(userInventar);
    if (userInventar !== null) {
        for (var item in userInventar) {
            var cItem = userInventar[item];
            if (cItem.item_class === "money") {
                
                $("#kronkorken").html(cItem.item_amount);
                return;
            }
        }
    }
}