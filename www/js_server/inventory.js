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

            var itemImageDiv = document.createElement("div");
            itemImageDiv.className = "itemImageDiv";

            var itemImage = document.createElement("img");
            if (cItem.item_image === null) {
                itemImage.src = "item_images/default.png"
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
            document.getElementById("inventoryBox").appendChild(wrapDiv);

            /*Coins*/
            if (cItem.item_class === "money") {
                $("#kronkorken").html(cItem.item_amount);
            }

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