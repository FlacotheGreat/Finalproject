
﻿//what's needed
//button control for logging in or creating a new user
function createNewUser(){

}

function login(){
  console.log("login attempt made");
  var username = document.getElementById("userName").value;
  var password = document.getElementById("password").value;
  //send this to the server
  //if result is successful
  window.location = "~/Views/Home/chart.cshtml";
}

//pass name of stock or company to add it as one of the users companies

//getting data out to give to js charts

//displaying purchased stocks on user page

﻿var connection;
var user;
var users = [];

window.onload = function () {

    connection = new WebSocketManager.Connection("ws://localhost:5000/server");

    user = new user();

    connection.connectionMethods.onConnected = () => {
        user.id = connection.connectionId;
        //("Name of Method to invoke on server",SocketID,Content to pass)
        connection.invoke("ConnectedUser", connection.connectionId, JSON.stringify(user));

    }

    connection.connectionMethods.onDisconnected = () => {

        connection.invoke("DisconnectedUser", connection.connectionId, "");

    }

    connection.clientMethods["pingUsers"] = (serUsers) => {
        users = JSON.parse(serUser);
        console.log(users);
    };

    connection.start()

    $(window).unload(function () {
        connection.invoke("DisconnectedUser", connection.connectionId, "");
    });
}


function user() {
    this.id = "";
    this.color = "";
}

function block() {
    this.x = "";
    this.y = "";
    this.alive = "";
}



function Start() {
    startGame = true;
    connection.invoke("startGame", connection.connectionId, JSON.stringify(startGame));
}

function Stop() {
    startGame = false;
    connection.invoke("stopGame", connection.connectionId, JSON.stringify(startGame));
}

window.onload = function () {

    connection = new WebSocketManager.Connection("ws://localhost:5000/server");

    user = new user();

    connection.connectionMethods.onConnected = () => {
        user.id = connection.connectionId;
        //("Name of Method to invoke on server",SocketID,Content to pass)
        connection.invoke("ConnectedUser", connection.connectionId, JSON.stringify(user));

    }

    connection.connectionMethods.onDisconnected = () => {

        connection.invoke("DisconnectedUser", connection.connectionId, "");

    }

    connection.clientMethods["pingUsers"] = (serUsers) => {
        users = JSON.parse(serUser);
        console.log(users);
    };

    connection.clientMethods["ReceiveUpdateAsXYColor"] = (socketId, x, y, r, g, b) => {
        // console.log(r + " " + g + " " + b);
        var colorToUse = "#" + r + g + b;
        // console.log(colorToUse + "(" + x + "," + y + ")");
        assignColorToSquare(x, y, colorToUse);
    };

    connection.start()

    $(window).unload(function () {
        connection.invoke("DisconnectedUser", connection.connectionId, "");
    });
}
