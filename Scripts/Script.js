function CarData(){

    var jsonCarData = CarApiCall();
    
    return jsonCarData;
}

// AJAX Call to the requrested data.json file
function CarApiCall(){

    var jcar = null;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "Scripts/data.json", false);
    
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            jcar = JSON.parse(this.responseText);
        }
    }
    xhttp.send(null);

    return jcar;

}