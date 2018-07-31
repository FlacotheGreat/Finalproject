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

  }
}

function requestJSONData(){
  connection.invoke("giveJSONData", connection.connectionId);
}

//displaying purchased stocks on user page
function createStockTblFromJson(jsonDataComp1, jsonDataComp2, jsonDataComp3){
  var body = document.getElementById("tableId");
  var stockTbl = document.createElement('table');
  stockTbl.style.width = '100%';
  stockTbl.setAttribute('border', '1');

  parseData1 = JSON.parse(jsonDataComp1);
  parseData2 = JSON.parse(jsonDataComp2);
  parseData3 = JSON.parse(jsonDataComp3);

  var headerRow = stockTbl.insertRow(0);
  var companyNameCell = headerRow.insertCell(0);
  companyNameCell.innerHTML = "Company Name";
  var companySymbolCell = headerRow.insertCell(1);
  companySymbolCell.innerHTML = "Symbol";
  var priceCell = headerRow.insertCell(2);
  priceCell.innerHTML = "Price";
  for(var i = 0; i < 3; i++){
    if(i == 0){
      var newRow = stockTbl.insertRow(1);
      var newPriceCell = stockTbl.insertCell(0);
      newPriceCell.innerHTML = parseData1.data.quotes.USD.price;
      var newSymbolCell = stockTbl.insertCell(0);
      newSymbolCell.innerHTML = parseData1.data.symbol;
      var newNameCell = stockTbl.insertCell(0);
      newNameCell.innerHTML = parseData1.data.name;
    }else if(i == 1){
      var newRow = stockTbl.insertRow(1);
      var newPriceCell = stockTbl.insertCell(0);
      newPriceCell.innerHTML = parseData2.data.quotes.USD.price;
      var newSymbolCell = stockTbl.insertCell(0);
      newSymbolCell.innerHTML = parseData2.data.symbol;
      var newNameCell = stockTbl.insertCell(0);
      newNameCell.innerHTML = parseData2.data.name;
    }else{
      var newRow = stockTbl.insertRow(1);
      var newPriceCell = stockTbl.insertCell(0);
      newPriceCell.innerHTML = parseData3.data.quotes.USD.price;
      var newSymbolCell = stockTbl.insertCell(0);
      newSymbolCell.innerHTML = parseData3.data.symbol;
      var newNameCell = stockTbl.insertCell(0);
      newNameCell.innerHTML = parseData3.data.name;
    }
  }
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
