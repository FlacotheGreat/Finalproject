//what's needed
//getting data out to give to js charts

//this needs to accept preferably a list of names and quantity
function displayChart(companyAndPriceList, chartChoice) {
  //get and clear the canvas
  var c = document.getElementById("displayChart");
  var ctx = c.getContext("2d");
  // ctx.clearRect(0, 0, 600, 600);
  //read list
  //give it to the chart
  if(chartChoice = "bar"){

  }else if(chartChoice = "pie"){

  }else if(chartChoice = "line"){

  }
}

//displaying purchased stocks on user page
function createStockTblFromJson(){

}

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
