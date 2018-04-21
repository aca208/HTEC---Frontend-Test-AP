function CarData(){

    var jsonCarData = JsonParseCars();

    return jsonCarData;
}

function CreateCarElements(data){

    for(i in data.cars){
        document.getElementById("carContainer").innerHTML += 
        "<div class='car'><div class='info'><p> " + data.cars[i].name + "</p></div></div>";
    }
}

// AJAX Call to the requrested data.json file
function JsonParseCars(){

    var jcar = null;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "Scripts/data.json", false);
    
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            jcar = JSON.parse(this.responseText);
        }
    }
    xhttp.send(null);

    if(jcar == null)
    console.log("it is null");

    return jcar;

}