// AJAX Call to the requrested data.json file
function CarApiCall(){

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "Scripts/data.json", true);
    
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            localStorage.setItem('carApiData', this.responseText);
        }
    }
    xhttp.send(null);
}

// Clear local storage onunload
function ClearStorage(){
    localStorage.clear();
}