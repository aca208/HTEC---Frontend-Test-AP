function CarData(){

    var jsonCarData = JsonParseCars();

    return jsonCarData;
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