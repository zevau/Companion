/* GLOBAL*/
var userInventar = null;
var userQuests = null;

var serverIP = null;
var userID = null;
var teamID = null;
var classID = null;

var reloadInterval;
var reloadIntervalRunning = false;
var currentPage = "inventory";

function getLocalStorage() {

    serverIP = localStorage.getItem("SERVERIP");

    userID = localStorage.getItem("USERID");

    teamID = localStorage.getItem("TEAMID");
    classID = localStorage.getItem("CLASSID");
}
function liveStats() {
    if (!reloadIntervalRunning) {
        reloadIntervalRunning = true;
        reloadInterval = setInterval(function () {
            reloadStats(userID);
        }, 5000);
    }
}

function reloadStats(uID) {
    var sendData = {action: "getuserdetails", userid: uID}; //Array
    $.ajax({
        url: localStorage.getItem("SERVERIP") + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            var returnData = JSON.parse(data);
            if (returnData.status.status === "ok") {
                console.log("Page: " + currentPage + " HP: " + returnData.userDetails.hp);
                loadCoins(returnData.userInventar, currentPage);


                $("#" + currentPage).find("#health").attr("aria-valuenow", returnData.userDetails.hp);
                $("#" + currentPage).find("#health").find("span").html("HP: " + returnData.userDetails.hp);
                $("#" + currentPage).find("#health").css("width", returnData.userDetails.hp + "%");

                $("#" + currentPage).find("#xp").attr("aria-valuenow", returnData.userDetails.xp);
                $("#" + currentPage).find("#xp").find("span").html("XP: " + returnData.userDetails.xp);
                $("#" + currentPage).find("#xp").css("width", returnData.userDetails.xp + "%");

                $("#" + currentPage).find("#reaction").attr("aria-valuenow", returnData.userDetails.reaction);
                $("#" + currentPage).find("#reaction").find("span").html("Reaction: " + returnData.userDetails.reaction);
                $("#" + currentPage).find("#reaction").css("width", returnData.userDetails.reaction + "%");

                $("#" + currentPage).find("#stamina").attr("aria-valuenow", returnData.userDetails.stamina);
                $("#" + currentPage).find("#stamina").find("span").html("Stamina: " + returnData.userDetails.stamina.toString());
                $("#" + currentPage).find("#stamina").css("width", returnData.userDetails.stamina + "%");

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

        }
    });
}
/* POST TO SERVER */
function connectToServer(url, sendData) {
    $.mobile.loading("show");
    $.ajax({
        url: url + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            if (data !== null) {

                var returnData = JSON.parse(data);

                if (returnData.status.status === "ok") {

                    localStorage.setItem("SERVERIP", url);
                    forwardUser(url, localStorage.getItem("USERID"));
                    /*$.mobile.changePage("login.html", {
                     reloadPage: false,
                     transition: "fade",
                     reverse: false,
                     changeHash: false
                     });*/
                } else {
                    alert(returnData.status.message);
                }
            } else {
                alert("Falscher Server");
            }
            $.mobile.loading("hide");
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
            $.mobile.loading("hide");
        }
    });
}
function forwardUser(url, uID) {
    $.mobile.loading("show");
    var sendData = {action: "getuserdetails", userid: uID};
    $.ajax({
        url: url + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            var returnData = JSON.parse(data);


            if (returnData.status.status === "ok") {
                if (returnData.userDetails !== null) {



                    if (returnData.userDetails.class_id === "0") {
                        $.mobile.changePage("classes.html", {
                            reloadPage: false,
                            transition: "fade",
                            reverse: false,
                            changeHash: false
                        });
                    } else {

                        localStorage.setItem("TEAMID", returnData.userDetails.team);

                        localStorage.setItem("CLASSID", returnData.userDetails.class_id);
                        loadPage("inventory");

                    }

                } else {
                    $.mobile.changePage("login.html", {
                        reloadPage: false,
                        transition: "fade",
                        reverse: false,
                        changeHash: false
                    });
                }

            } else {
                $.mobile.changePage("login.html", {
                    reloadPage: false,
                    transition: "fade",
                    reverse: false,
                    changeHash: false
                });
                $.mobile.loading("hide");
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
            $.mobile.loading("hide");
        }
    });
}
function loginUser(url, uName, uPass) {
    $.mobile.loading("show");

    var sendData = {action: "loginuser", username: uName, password: uPass};
    $.ajax({
        url: localStorage.getItem("SERVERIP") + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            var returnData = JSON.parse(data);


            if (returnData.status.status === "ok") {
                localStorage.setItem("USERID", returnData.userInfo.id);
                forwardUser(localStorage.getItem("SERVERIP"), returnData.userInfo.id);
            } else {
                alert(returnData.status.message);
                $.mobile.loading("hide");
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
            alert("Serverfehler(login: " + sendData + "): " + url + "-" + localStorage.getItem("SERVERIP") + "-" + msg);
            alert(jqXHR.responseText);
            $.mobile.loading("hide");
        }
    });
}
function registerUser(url, uName, uPass, uPass2) {
    $.mobile.loading("show");
    var sendData = {action: "createuser", username: uName, password: uPass, password2: uPass2}; //Array
    $.ajax({
        url: url + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            var returnData = JSON.parse(data);


            if (returnData.status.status === "ok") {
                localStorage.setItem("USERID", returnData.userInfo.id);
                alert("Registrierung abgeschlossen!");
                forwardUser(serverIP, returnData.userInfo.id);
            } else {
                alert(returnData.status.message);
                $.mobile.loading("hide");
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
            $.mobile.loading("hide");
        }
    });
}
/*function selectFaction(url, uID, teamID) {
 $.mobile.loading("show");
 var sendData = {action: "selectteam", teamid: teamID, userid: uID};
 $.ajax({
 url: url + "/query.php",
 type: "POST",
 data: sendData,
 success: function (data, textStatus, jqXHR)
 {
 var returnData = JSON.parse(data);
 
 
 
 if (returnData.status.status === "ok") {
 
 if (teamID === "1") {
 localStorage.setItem("TEAMID", teamID);
 forwardUser(serverIP, uID);
 } else if (teamID === "2") {
 localStorage.setItem("TEAMID", teamID);
 forwardUser(serverIP, uID);
 } else {
 alert("Kein Team gewählt");
 $.mobile.loading("hide");
 }
 
 } else {
 alert(returnData.status.message);
 $.mobile.loading("hide");
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
 $.mobile.loading("hide");
 }
 });
 }*/
function selectClass(url, uID, classID) {
    $.mobile.loading("show");
    var sendData = {action: "selectclass", classid: classID, userid: uID};
    $.ajax({
        url: url + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            var returnData = JSON.parse(data);



            if (returnData.status.status === "ok") {

                localStorage.setItem("CLASSID", classID);
                forwardUser(serverIP, uID);

            } else {
                alert(returnData.status.message);
                $.mobile.loading("hide");
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
            $.mobile.loading("hide");
        }
    });
}

function getUserStats(url, uID, page) {
    $.mobile.loading("show");
    var sendData = {action: "getuserdetails", userid: uID}; //Array
    $.ajax({
        url: url + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            var returnData = JSON.parse(data);
            if (returnData.status.status === "ok") {

                userDetails = returnData.userDetails;
                loadCoins(returnData.userInventar, page);

                $("#" + page).find("#usernameDiv").html(returnData.userDetails.name);
                $("#" + page).find("#classnameDiv").html(returnData.userDetails.class_name);
                $("#" + page).find("#userImage").attr("src", returnData.userDetails.class_img);
                $("#" + page).find("#health").attr("aria-valuenow", returnData.userDetails.hp);
                $("#" + page).find("#health").find("span").html("HP: " + returnData.userDetails.hp);
                $("#" + page).find("#health").css("width", returnData.userDetails.hp + "%");

                $("#" + page).find("#xp").attr("aria-valuenow", returnData.userDetails.xp);
                $("#" + page).find("#xp").find("span").html("XP: " + returnData.userDetails.xp);
                $("#" + page).find("#xp").css("width", returnData.userDetails.xp + "%");

                $("#" + page).find("#reaction").attr("aria-valuenow", returnData.userDetails.reaction);
                $("#" + page).find("#reaction").find("span").html("Reaction: " + returnData.userDetails.reaction);
                $("#" + page).find("#reaction").css("width", returnData.userDetails.reaction + "%");

                $("#" + page).find("#stamina").attr("aria-valuenow", returnData.userDetails.stamina);
                $("#" + page).find("#stamina").find("span").html("Stamina: " + returnData.userDetails.stamina.toString());
                $("#" + page).find("#stamina").css("width", returnData.userDetails.stamina + "%");




                if (page === "inventory") {
                    loadInventar(url, uID, page);
                } else if (page === "quests") {
                    loadQuests(url, uID, page);
                }

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
            $.mobile.loading("hide");
        }
    });
}
function loadQuests(url, uID, page) {
    $.mobile.loading("show");

    var sendData = {action: "getuserdetails", userid: uID}; //Array
    $.ajax({
        url: url + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            var returnData = JSON.parse(data);
            if (returnData.status.status === "ok") {

                userDetails = returnData.userDetails;
                userQuests = returnData.quests;

                if (userQuests !== null) {

                    for (var quest in userQuests) {
                        var qItem = userQuests[quest];

                        var wrapDiv = document.createElement("div");
                        wrapDiv.className = "wrapQuest";
                        var headDiv = document.createElement("div");
                        var done = "";

                        if (qItem.quest_done === "1") {
                            done = " done";
                        } else {
                            done = " undone";
                        }
                        headDiv.className = "questHead" + done;
                        headDiv.innerHTML = qItem.quest_name;

                        var descriptionDiv = document.createElement("div");
                        descriptionDiv.className = "questDescription";
                        descriptionDiv.innerHTML = qItem.quest_description;

                        wrapDiv.appendChild(headDiv);
                        wrapDiv.appendChild(descriptionDiv);
                        $("#" + page).find("#questBox").append(wrapDiv);
                    }
                } else {
                    $("#" + page).find("#questBox").html("<div class='text-center'>Keine Quests angenommen</div>");
                }

                $.mobile.loading("hide");
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
            $.mobile.loading("hide");
        }
    });











}
function loadInventar(url, uID, page) {
    var sendData = {action: "getuserdetails", userid: uID}; //Array
    $.ajax({
        url: url + "/query.php",
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {
            var returnData = JSON.parse(data);
            if (returnData.status.status === "ok") {

                userDetails = returnData.userDetails;
                userInventar = returnData.userInventar;

                if (userInventar !== null) {

                    for (var item in userInventar) {

                        var cItem = userInventar[item];

                        var wrapDiv = document.createElement("div");
                        wrapDiv.className = "col-xs-4";

                        var itemDiv = document.createElement("div");
                        itemDiv.className = "inventoryItem";
                        itemDiv.setAttribute('onclick', 'showItem(\'' + cItem.item_id + '\');');



                        var itemImageDiv = document.createElement("div");
                        itemImageDiv.className = "itemImageDiv";

                        var itemImage = document.createElement("img");
                        if (cItem.item_image === null) {
                            itemImage.src = "item_images/default.png";
                        } else {
                            itemImage.src = "item_images/" + cItem.item_image;
                        }

                        var itemCount = document.createElement("div");
                        itemCount.className = "itemCount";
                        itemCount.innerHTML = cItem.item_amount;

                        var itemName = document.createElement("div");
                        itemName.className = "itemName";
                        itemName.appendChild(itemCount);
                        itemName.innerHTML = itemName.innerHTML + cItem.item_name;




                        itemDiv.appendChild(itemImageDiv);

                        itemImageDiv.appendChild(itemImage);

                        itemDiv.appendChild(itemName);


                        wrapDiv.appendChild(itemDiv);

                        $("#" + page).find("#inventoryBox").append(wrapDiv);
                    }
                } else {
                    $("#" + page).find("#inventoryBox").html("<div class='text-center'>Keine Items</div>");
                }

                $.mobile.loading("hide");
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
            $.mobile.loading("hide");
        }
    });



}
function loadCoins(userInventar, page) {

    if (userInventar !== null) {
        for (var item in userInventar) {
            var cItem = userInventar[item];
            if (cItem.item_class === "money") {
                $("#" + page).find("#kronkorken").html(cItem.item_amount);
                return;
            }
        }
    }
}
function logout() {

    userID = null;
    teamID = null;
    classID = null;


    localStorage.removeItem("USERID");
    localStorage.removeItem("TEAMID");
    localStorage.removeItem("CLASSID");
    localStorage.removeItem("SERVERIP");

    window.location = "index.html";
    /*
     $.mobile.changePage("index.html", {
     reloadPage: true,
     transition: "fade",
     reverse: false,
     changeHash: false
     });
     */
}
/* INDEX */


$('#index').on('pageinit', function () {
    $.mobile.loading("show");

    getLocalStorage();

    if (serverIP !== null) {

        $("#serverIp").val(serverIP);
        connectToServer(serverIP, {action: "checkserver"});
    } else {

        $("#serverIp").val("http://pb.ingamelandscapes.de");
        $.mobile.loading("hide");
    }

});

function connect() {
    connectToServer($("#index").find("#serverIp").val(), {action: "checkserver"});
}

/* LOGIN / REGISTER */
$(document).on('pagebeforeshow', '#login', function () {
    /*getLocalStorage();
     if (userID !== null && userID > 0) {
     forwardUser(serverIP, userID);
     } else {
     $.mobile.loading("hide");
     }*/
});
$(document).on('pageinit', '#login', function () {
    getLocalStorage();
    if (userID !== null && userID > 0) {
        forwardUser(serverIP, userID);
    } else {
        $.mobile.loading("hide");
    }
});

var register = false;
$(document).on('click', '#login-btn', function (e) {
    if (register) {
        $("#reg-pw").slideUp();
        register = false;
    }
    var loginStr = $("#username").val();
    var passwordStr = $("#password").val();
    loginUser(serverIP, loginStr, passwordStr);

});


$(document).on('click', '#register-btn', function (e) {
    if (register) {
        var loginStr = $("#username").val();
        var passwordStr = $("#password").val();
        var passwordStr2 = $("#password2").val();
        registerUser(serverIP, loginStr, passwordStr, passwordStr2);
    } else {
        register = true;
        $("#reg-pw").slideDown();
    }
});

/* FACTION */
$(document).on('pageinit', '#faction', function () {
    $.mobile.loading("hide");
    getLocalStorage();
});

$(document).on('click', '.team-select', function () {
    $(".team-overlay").hide();

    var title = $(this).children(".team-title-info").html();
    var info = $(this).children(".team-description-info").html();
    var classid = $(this).children(".team-id").html();

    $(".team-overlay").find(".team-title").find("h1").html(title);
    $(".team-overlay").find(".team-description").html(info);
    $(".team-overlay").find("input").attr("id", classid);

    $(".team-overlay").fadeIn();
});

function teamClose() {
    $(".team-overlay").fadeOut();
}
$(document).on('click', "#select-team", function () {
    var tID = $(this).find("input").attr("id");
    selectFaction(serverIP, userID, tID);
});

/* CLASS */

$(document).on('pageinit', '#classes', function () {
    $.mobile.loading("hide");
    getLocalStorage();
});

$(document).on('click', '.faction-select', function () {
    $(".class-overlay").hide();

    var title = $(this).children(".class-title-info").html();
    var info = $(this).children(".class-description-info").html();
    var classid = $(this).children(".class-id").html();

    $(".class-overlay").find(".class-title").find("h1").html(title);
    $(".class-overlay").find(".class-description").html(info);
    $(".class-overlay").find("input").attr("id", classid);

    $(".class-overlay").fadeIn();

});
function classClose() {
    $(".class-overlay").fadeOut();
}
$(document).on('click', "#select-class", function () {
    var cID = $(this).find("input").attr("id");
    selectClass(serverIP, userID, cID);
});

/* INVENTORY */
$(document).on('pageinit', '#inventory', function () {

    console.log("Page: Inventory");
    currentPage = "inventory";
    getLocalStorage();
    if (userID !== null && classID !== null && teamID !== null && serverIP !== null) {
        getUserStats(serverIP, userID, "inventory");
    } else {
        alert("Datenfehler");
    }
});


/* QUESTS */
$(document).on('pageshow', '#quests', function () {

});

$(document).on('pagebeforeshow', '#quests', function () {
    $.mobile.loading("show");
    console.log("Page: Quests");
    currentPage = "quests";
    getLocalStorage();
    if (userID !== null && classID !== null && teamID !== null && serverIP !== null) {
        getUserStats(serverIP, userID, "quests");
    } else {
        alert("Datenfehler");
    }
});

/* MINIMAP*/
$(document).on('pageinit', '#minimap', function () {

    console.log("Page: Map");
    currentPage = "minimap";
    getLocalStorage();
    if (userID !== null && classID !== null && teamID !== null && serverIP !== null) {
        getUserStats(serverIP, userID, "minimap");

    } else {
        alert("Datenfehler");
    }
});

/*TABS*/

function loadPage(page) {
    $.mobile.loading("show");
    $.mobile.changePage(page + "screen.html", {
        reloadPage: false,
        transition: "false",
        reverse: false,
        changeHash: false
    });
    liveStats();
}

/* ITEM*/
function showItem(item) {
    $.mobile.loading("show");
    for (var i in userInventar) {
        var cItem = userInventar[i];
        if (cItem.item_id === item) {
            $(".class-overlay").find(".class-title").find("h2").html(cItem.item_name);
            $(".class-overlay").fadeIn();
        }
    }
    $.mobile.loading("hide");
}