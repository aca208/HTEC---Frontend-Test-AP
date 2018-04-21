// Filling elements of car container with id, name and image
function CreateCarElements(data){

    for(i in data.cars){
        document.getElementById("carContainer").innerHTML += 
        "<div class='car'> <input type='hidden' name='carID' value='" + data.cars[i].id + "'/> <div class='info'>"+
        "<div class='carName'> <p>"
         + data.cars[i].name + 
         "</p></div><div class='carPicute'> <img src='"+ data.cars[i].image +"' alt = '" + data.cars[i].name + "'/></div></div></div>";
    }
}

// AJAX Call to the requrested data.json file
function CarApiCall(CallbackFunc, data = ""){

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "Scripts/data.json", true);
    
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            CallbackFunc(JSON.parse(this.response), data);
        }
    }
    xhttp.send(null);

}