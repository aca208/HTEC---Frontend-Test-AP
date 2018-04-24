// Filling elements of car container with id, name and image
function CreateCarElements(carData){

    var data = JSON.parse(carData);

    for(i in data.cars){
        document.getElementById("carContainer").innerHTML += 
        "<div class='car'> <input type='hidden' class='carID' value='" + data.cars[i].id + "'/> <div class='info'>"+
        "<div class='carName'> <p>"
         + data.cars[i].name + 
         "</p></div><div class='carPicute'> <img src='"+ data.cars[i].image +"' alt = '" + data.cars[i].name + "'/></div></div></div>";
    }
}

// Filtering cars using search
function FilterCars(carData, name){

    var data = JSON.parse(carData);

    // Clearing out containers
    for(j in document.getElementsByClassName("car")){
        document.getElementsByClassName("car")[j].innerHTML = "";
    }

    // Populating empty containers
    carFor: for(i in data.cars){
        if(data.cars[i].name.toUpperCase().startsWith(name.toUpperCase())){
            container: for(k in document.getElementsByClassName("car")){
                if(document.getElementsByClassName("car")[k].innerHTML ==""){
                    document.getElementsByClassName("car")[k].innerHTML = 
                    "<div class='flip_container vertical disable_transitions_anims' onclick='SelectCar(this)' onmouseover='EnableTransAnims(this)'>" + 
                        " <div class ='flipper'>" + "<input type='hidden' class='carID' value='" + data.cars[i].id + "'/> <div class='info front'>"+
                        "<div class='carName'> <p>"
                        + data.cars[i].name + 
                        "</p></div><div class='carPicute'> <img src='"+ data.cars[i].image +"' alt = '" + data.cars[i].name + "'/></div></div>" + 
                        "<div class='flippedInfo back'>" + 
                        "<p>Description: " + data.cars[i].description +" <br/>" +
                    "Speed:" + data.cars[i].speed +"</p></div> </div> </div>";  
                    k=0;
                    break container;
                }
            }
        }
    }

}

// Creating containers for car info to be flipped
function FlipCars(carData){

    var data = JSON.parse(carData);
    var elements = document.getElementsByClassName("car");

    for( var i = 0; i < elements.length; i++){

        var car_id = 0;
        var hidden_id = document.querySelectorAll (".car .carID")[i];
        var info_div = document.querySelectorAll(".car .info")[i];
        
        info_div.classList.add("front");
        
        for(j in data.cars){
            if(data.cars[j].id == hidden_id){
                car_id = j;
            }
        }

        var infoInnerHtlm = elements[i].innerHTML;
        elements[i].innerHTML = 
        "<div class='flip_container vertical disable_transitions_anims' onclick='SelectCar(this)' onmouseover='EnableTransAnims(this)'>" + 
            " <div class ='flipper'>" + infoInnerHtlm + 
            "<div class='flippedInfo back'>" + 
            "<p>Description: " + data.cars[car_id].description +" <br/>" +
        "Speed:" + data.cars[car_id].speed +"</p></div> </div> </div>";
    }  
}


// Trigger event for enabling animations and transitions
function EnableTransAnims(node){
    
    if(node.classList.contains("disable_transitions_anims"))
    {
        node.classList.remove("disable_transitions_anims");
    }
}


// Selecting data
function SelectCar(node){

    // Remove class only if another one exist
    if(document.getElementsByClassName("selected").length < 3){
        node.classList.toggle("selected");
    }else{
        node.classList.remove("selected");
    }
}

//Drawing Scale
function DrawScale(){
    
    SetDistance(localStorage.getItem("carApiData"));

    var canv = document.getElementById("canvasScale");
    var canvContx = canv.getContext("2d");
    canvContx.fillStyle = "#000000";
    
    // Scale parameters
    var rectWidth = 750;
    var rectHeight = 210;
    var rectX = 0;
    var rectY = 40;
    var cornerRadius = 10;

    // Drawing scale of distance
    canvContx.beginPath();
    canvContx.moveTo(rectX + cornerRadius, rectY);
    canvContx.lineTo(rectX + rectWidth - (2 * cornerRadius), rectY);
    canvContx.arcTo(rectX + rectWidth, rectY,  rectX + rectWidth, rectY + cornerRadius, cornerRadius );
    canvContx.lineTo(rectX + rectWidth, (rectY + rectHeight) - cornerRadius);
    canvContx.arcTo(rectX + rectWidth, rectY + rectHeight, (rectX + rectWidth) - cornerRadius, rectY + rectHeight, cornerRadius );
    canvContx.lineTo(rectX + cornerRadius, rectY + rectHeight);
    canvContx.arcTo(rectX, rectY + rectHeight,  rectX, rectY + rectHeight - cornerRadius, cornerRadius );
    canvContx.lineTo(rectX, rectY + cornerRadius);
    canvContx.arcTo(rectX, rectY,  rectX + cornerRadius, rectY, cornerRadius );
    canvContx.lineWidth = 1;
    canvContx.stroke();
    canvContx.closePath();

    //Drawing horizontal lines
    for(var i=1; i<=2; i++){
        canvContx.fillRect(rectX,rectY + i*70,rectWidth,1); 
    }

    for(var i=1; i <= 10; i++){
        canvContx.fillRect(rectX + i*75, rectY, 1, rectHeight);
    }

    canvContx.textBaseline = "middle";
    canvContx.textAlign = "center";
    canvContx.font = "20px Arial";

    for(var i=1; i<=9; i++){
        canvContx.fillText( i + "x" + (document.getElementsByClassName("distanceHidden")[0].value /10), i*(rectWidth/10) ,rectY - 20);
    }

    DrawingSpeedLimit(localStorage.getItem("carApiData"), [canvContx, rectX, rectY, rectWidth, rectHeight]);

}


// Drawing Speed limits
function DrawingSpeedLimit(carData, context){

    var data = JSON.parse(carData);

    var rectWidth = context[3];
    var rectHeight = context[4];
    var rectX = context[1];
    var rectY = context[2];
    var lineLength = 100;

    for(i in data.speed_limits){
        
        // Drawing dashed lines on its distance
        context[0].beginPath();
        context[0].lineWidth = 4;
        context[0].strokeStyle="#777";
        context[0].setLineDash([40, 10]);
        context[0].moveTo(rectX + ( (750 * data.speed_limits[i].position) / data.distance), rectY);
        context[0].lineTo(rectX + ( (750 * data.speed_limits[i].position) / data.distance), rectY + rectHeight +40);
        context[0].stroke();
        context[0].closePath();

        // Drawing sign for speed limit
        context[0].beginPath();
        context[0].setLineDash([0]);
        context[0].lineWidth = 10;
        context[0].arc(rectX + ( (750 * data.speed_limits[i].position) / data.distance), rectY + rectHeight +80, 40,0,2*Math.PI);
        context[0].stroke();
        context[0].closePath();
        context[0].textBaseline = "middle";
        context[0].textAlign = "center";
        context[0].font = "40px Arial";
        context[0].fillText(data.speed_limits[i].speed, rectX + ( (750 * data.speed_limits[i].position) / data.distance), rectY + rectHeight +80);
        context[0].stroke();
        context[0].closePath();
                
    }
}

function SetDistance(carData){
    
    var data = JSON.parse(carData);

    document.getElementsByClassName("distanceHidden")[0].value = data.distance;
    
}

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