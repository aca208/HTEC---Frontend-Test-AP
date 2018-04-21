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