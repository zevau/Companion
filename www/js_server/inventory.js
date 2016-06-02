$("document").ready(function () {
     $(".loading").fadeIn();
     
     var postUrl = "http://pb.ingamelandscapes.de/query.php";
     
     var sendData = {action: "listinventar", userid: localStorage.getItem("USERID")}; //Array

        $.ajax({
            url: postUrl,
            type: "POST",
            data: sendData,
            success: function (data, textStatus, jqXHR)
            {

                var returnData = JSON.parse(data);
                if (returnData.status.status === "ok") {
                    
                    var userInventar = returnData.userInventar;
                    loadInventory(userInventar);
                    
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

function loadInventory(userInventar) {
    console.log(userInventar);
     if (userInventar !== null) {

        for (var item in userInventar) {
            
            var cItem = userInventar[item];
            var wrapDiv = document.createElement("div");
            wrapDiv.className = "col-xs-4";
 
            var itemDiv = document.createElement("div");
            itemDiv.className = "inventoryItem";
            itemDiv.innerHTML = cItem.item_name;
            
         
            wrapDiv.appendChild(itemDiv);
            document.getElementById("inventoryBox").appendChild(wrapDiv);

        }

    } else {
        document.getElementById("inventoryBox").innerHTML = "<div class='text-center'>Keine Items</div>"
    }
}

function nodeToString(node) {
    var tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    var str = tmpNode.innerHTML;
    tmpNode = node = null;
    return str;
}