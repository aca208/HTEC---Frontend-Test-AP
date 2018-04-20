var test1 = "";
var objectTest = {lastname: "Jans", firstname: "Hans"};


function Test(){

    test1 = "Test if works: ";
    document.getElementById("Testh1").innerHTML = test1 + "First name = " + objectTest.firstname + ", Last name = " + objectTest.lastname;
    // return test1;
    
}