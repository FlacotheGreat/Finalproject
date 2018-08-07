//what's needed
//getting data out to give to js charts

//this needs to accept preferably a list of names and quantity
function displayChart(compData1, compData2, compData3, chartChoice) {
  //get and clear the canvas
  var c = document.getElementById("displayChart");
  var ctx = c.getContext("2d");
  // ctx.clearRect(0, 0, 600, 600);
  //read list
  //give it to the chart
  if(chartChoice = "bar"){

  }else if(chartChoice = "pie"){

  }else if(chartChoice = "line"){
    var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], //these need to be filled in, pulled in from each day or something since purchase
      datasets: [{
        label: "Company Line Chart",
        backgroundColor: 'rgb(0, 122, 122)',
        borderColor: 'rgb(0, 0, 0)',
        data: [] // currency value at each label
      }]
    },

    options: {
      responsive: false,
      // maintainAspectRatio: true
    }
    });
  }
}

function requestJSONData(){
  connection.invoke("giveJSONData", connection.connectionId);
}

//displaying purchased stocks on user page
function createStockTblFromJson(jsonDataComp1, jsonDataComp2, jsonDataComp3){
  //parse incoming json
  parseData1 = JSON.parse(jsonDataComp1);
  parseData2 = JSON.parse(jsonDataComp2);
  parseData3 = JSON.parse(jsonDataComp3);

  //company 1
  CompCurPrice1.innerHTML = parseData1.data.quotes.USD.price;
  CompSymbol1.innerHTML = parseData1.data.symbol;
  CompName1.innerHTML = parseData1.data.name;

  //company 2
  CompCurPrice2.innerHTML = parseData2.data.quotes.USD.price;
  CompSymbol2.innerHTML = parseData2.data.symbol;
  CompName2.innerHTML = parseData2.data.name;

  //company 3
  CompCurPrice3.innerHTML = parseData3.data.quotes.USD.price;
  CompSymbol3.innerHTML = parseData3.data.symbol;
  CompName3.innerHTML = parseData3.data.name;
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

    connection.clientMethods["ReceiveUserChoicesJson"] = (socketId, jsonComp1, jsonComp2, jsonComp3) => {
      createStockTblFromJson(jsonComp1, jsonComp2, jsonComp3);
    }

    connection.clientMethods["ReceiveJSONChartData"] = (socketId, jsonComp1, jsonComp2, jsonComp3) => {
      displayChart(jsonComp1, jsonComp2, jsonComp3, )
    }

    connection.start()

    $(window).unload(function () {
        connection.invoke("DisconnectedUser", connection.connectionId, "");
    });
}


function user() {
    this.id = "";
    this.color = "";
}
