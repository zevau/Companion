$("document").ready(function () {
    $(".loading").fadeIn();

    var postUrl = "http://pb.ingamelandscapes.de/query.php";

    var sendData = {action: "listquestlog", userid: localStorage.getItem("USERID"), done: "2"}; //Array

    $.ajax({
        url: postUrl,
        type: "POST",
        data: sendData,
        success: function (data, textStatus, jqXHR)
        {

            var returnData = JSON.parse(data);
            if (returnData.status.status === "ok") {

                var userQuests = returnData.quests;
                loadQuests(userQuests);

                $(".loading").fadeOut();
            } else {
                document.getElementById("questBox").innerHTML = "<div class='text-center'>" + returnData.status.message + "</div>"
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
    
    function loadQuests(userQuests) {
    console.log(userQuests);
    if (userQuests !== null) {

        for (var quest in userQuests) {
            var qItem = userQuests[quest];
            
            
            var wrapDiv = document.createElement("div");
            wrapDiv.className="wrapQuest";
            var headDiv = document.createElement("div");
            var done = "";
            
            if (qItem.quest_done === "1"){done = " done"}else{done =" undone";}
            headDiv.className = "questHead" + done;
            headDiv.innerHTML = qItem.quest_name;
            
            var descriptionDiv = document.createElement("div");
            descriptionDiv.className = "questDescription";
            descriptionDiv.innerHTML = qItem.quest_description;
            
            wrapDiv.appendChild(headDiv);
            wrapDiv.appendChild(descriptionDiv);
            
            document.getElementById("questBox").appendChild(wrapDiv);
        }

    } else {
        document.getElementById("questBox").innerHTML = "<div class='text-center'>Keine Quests</div>";
    }
}
    
});



function nodeToString(node) {
    var tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    var str = tmpNode.innerHTML;
    tmpNode = node = null;
    return str;
}