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

    if(!document.querySelectorAll(".selected")[0]){

        document.getElementById("carOne").innerHTML = "";
        document.getElementById("carOne").classList.remove("activeCar");

    }

    if(!document.querySelectorAll(".selected")[1]){

        document.getElementById("carTwo").innerHTML = "";
        document.getElementById("carTwo").classList.remove("activeCar");

    }
    if(!document.querySelectorAll(".selected")[2]){

        document.getElementById("carThree").innerHTML = "";
        document.getElementById("carThree").classList.remove("activeCar");

    }

    for(var i = 0; i<document.getElementsByClassName("selected").length; i++){
        if(i == 0){

            var car_id = document.querySelectorAll(".selected .carID")[0].value;

            if(!document.querySelector("#carOne").classList.contains("activeCar")){

                document.querySelector("#carOne").classList.add("activeCar");

            }

            var car_pic = "";
            var data = JSON.parse(localStorage.getItem("carApiData"));


                carImage: for(var j = 0; j < data.cars.length; j++){
                if(data.cars[j].id == car_id){
                    car_pic = data.cars[j].image;
                    break carImage;
                }
            }

            document.getElementById("carOne").innerHTML="<input type='hidden' id='firstCarData' value ='" + car_id + "' /> <img src='" + car_pic + "' alt='first car'/> ";

        }
        if(i == 1){
            var car_id = document.querySelectorAll(".selected .carID")[1].value;

            if(!document.querySelector("#carTwo").classList.contains("activeCar")){

                document.querySelector("#carTwo").classList.add("activeCar");
                
            }

            var car_pic = "";
            var data = JSON.parse(localStorage.getItem("carApiData"));


                carImage: for(var j = 0; j < data.cars.length; j++){
                if(data.cars[j].id == car_id){
                    car_pic = data.cars[j].image;
                    break carImage;
                }
            }

            document.getElementById("carTwo").innerHTML="<input type='hidden' id='secondCarData' value ='" + car_id + "' /> <img src='" + car_pic + "' alt='first car'/> ";
        }
        if(i == 2){

            var car_id = document.querySelectorAll(".selected .carID")[2].value;

            if(!document.querySelector("#carThree").classList.contains("activeCar")){

                document.querySelector("#carThree").classList.add("activeCar");
                
            }

            var car_pic = "";
            var data = JSON.parse(localStorage.getItem("carApiData"));


                carImage: for(var j = 0; j < data.cars.length; j++){
                if(data.cars[j].id == car_id){
                    car_pic = data.cars[j].image;
                    break carImage;
                }
            }

            document.getElementById("carThree").innerHTML="<input type='hidden' id='thirdCarData' value ='" + car_id + "' /> <img src='" + car_pic + "' alt='first car'/> ";


        }
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

    DrawingTrafficLight(localStorage.getItem("carApiData"), [canvContx, rectX, rectY, rectWidth, rectHeight]);
    
    SetCarLocation([canvContx, rectX, rectY, rectWidth, rectHeight]);

}


// Drawing Speed limits
function DrawingSpeedLimit(carData, context){

    var data = JSON.parse(carData);

    var rectWidth = context[3];
    var rectHeight = context[4];
    var rectX = context[1];
    var rectY = context[2];

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

// Drawing Traffic Lights
function DrawingTrafficLight(carData, context){

    var data = JSON.parse(carData);

    var rectWidth = context[3];
    var rectHeight = context[4];
    var rectX = context[1];
    var rectY = context[2];
    
    var tlRectWidth = 50;
    var tlRectHeight = 100;
    var tlCornRad = 10;

    for(var i = 0; i < data.speed_limits.length - 1; i++){

        var tlRectX = (rectX + ( (rectWidth * data.traffic_lights[i].position) / data.distance)) - (tlRectWidth /2);
        var tlRectY = rectY + rectHeight +40;

        // Drawing dashing lines
        context[0].beginPath();
        context[0].lineWidth = 4;
        context[0].strokeStyle="#000";
        context[0].setLineDash([40, 10]);
        context[0].moveTo(rectX + ( (rectWidth * data.traffic_lights[i].position) / data.distance), rectY);
        context[0].lineTo(rectX + ( (rectWidth * data.traffic_lights[i].position) / data.distance), rectY + rectHeight +40);
        context[0].stroke();
        context[0].closePath();

        // Drawing traffic light
        context[0].beginPath();
        context[0].setLineDash([0]);
        context[0].moveTo( tlRectX + tlCornRad, tlRectY);
        context[0].lineTo(tlRectX + tlRectWidth - tlCornRad, tlRectY);
        context[0].arcTo(tlRectX + tlRectWidth, tlRectY,  tlRectX + tlRectWidth, tlRectY + tlCornRad, tlCornRad );
        context[0].lineTo(tlRectX + tlRectWidth, (tlRectY + tlRectHeight) - tlCornRad);
        context[0].arcTo(tlRectX + tlRectWidth, tlRectY + tlRectHeight, (tlRectX + tlRectWidth) - tlCornRad, tlRectY + tlRectHeight, tlCornRad );
        context[0].lineTo(tlRectX + tlCornRad, tlRectY + tlRectHeight);
        context[0].arcTo(tlRectX, tlRectY + tlRectHeight,  tlRectX, tlRectY + tlRectHeight - tlCornRad, tlCornRad );
        context[0].lineTo(tlRectX, tlRectY + tlCornRad);
        context[0].arcTo(tlRectX, tlRectY,  tlRectX + tlCornRad, tlRectY, tlCornRad );
        context[0].lineWidth = 1;
        context[0].stroke();
        context[0].closePath();
        // Red Light
        context[0].beginPath();
        context[0].fillStyle = "#990000";
        context[0].arc(tlRectX + (tlRectWidth/2) , tlRectY + (tlRectHeight/4), 15, 0, 2*Math.PI);
        context[0].fill();
        context[0].closePath();
        document.getElementById("redLight").style.setProperty("left", (tlRectX + (tlRectWidth/2) ) - 15);
        document.getElementById("redLight").style.setProperty("top", tlRectY + (tlRectHeight/4) - 15);
        // Green Light
        context[0].beginPath();
        context[0].fillStyle = "#009900";
        context[0].arc(tlRectX + (tlRectWidth/2) , tlRectY + (3 * (tlRectHeight/4)), 15, 0, 2*Math.PI);
        context[0].fill();
        context[0].closePath();
        document.getElementById("greenLight").style.setProperty("left", tlRectX + (tlRectWidth/2) - 15);
        document.getElementById("greenLight").style.setProperty("top", tlRectY + (3 * (tlRectHeight/4)) - 15);

        AnimateTrafficLight(localStorage.getItem("carApiData"), i);
    }

}

// Set three car divs on the starting line
function SetCarLocation(context){

    var rectWidth = context[3];
    var rectHeight = context[4];
    var rectX = context[1];
    var rectY = context[2];

    var carOne = document.getElementById("carOne");
    var carTwo = document.getElementById("carTwo");
    var carThree = document.getElementById("carThree");

    // Getting width and height from css
    var carOneW = window.getComputedStyle(carOne).getPropertyValue("width").replace("px", "");
    var carOneH = window.getComputedStyle(carOne).getPropertyValue("height").replace("px", "");
    
    var carTwoW = window.getComputedStyle(carTwo).getPropertyValue("width").replace("px", "");
    var carTwoH = window.getComputedStyle(carTwo).getPropertyValue("height").replace("px", "");
    
    var carThreeW = window.getComputedStyle(carThree).getPropertyValue("width").replace("px", "");
    var carThreeH = window.getComputedStyle(carThree).getPropertyValue("height").replace("px", "");

    // Setting correct positioning
    carOne.style.setProperty("left", (rectX + (rectWidth/10 - carOneW) /2) + "px");
    carOne.style.setProperty("top", (rectY + ((rectHeight/3) - carOneH) /2) + "px");

    carTwo.style.setProperty("left", (rectX + (rectWidth/10 - carTwoW) /2) + "px");
    carTwo.style.setProperty("top", (rectY + (rectHeight/3) + ((rectHeight/3) - carTwoH) /2) + "px");

    carThree.style.setProperty("left", (rectX + (rectWidth/10 - carThreeW) /2) + "px");
    carThree.style.setProperty("top", (rectY + 2*(rectHeight/3) + ((rectHeight/3) - carThreeH) /2) + "px");

}

// Animate Traffic Lights
function AnimateTrafficLight(carData, i){

    var data = JSON.parse(carData);

    var greenLight = document.getElementById("greenLight");
    var redLight = document.getElementById("redLight");

    var id = setInterval(frame, data.traffic_lights[i].duration);

    // Toggling the class each by x time, defaulted to start with red light
    function frame() {
        greenLight.classList.toggle("currentLight");
        redLight.classList.toggle("currentLight");
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