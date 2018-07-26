
//what's needed
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
