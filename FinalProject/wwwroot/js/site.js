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
function createStockTblFromJson(jsonData, numCompanies){
  var body = document.getElementById("tableId");
  var stockTbl = document.createElement('table');
  stockTbl.style.width = '100%';
  stockTbl.setAttribute('border', '1');

  parseData = JSON.parse(jsonData);

  for(var i = 0; i < numCompanies; i++){
    if(i == 0){
      var headerRow = stockTbl.insertRow(0);
      var companyNameCell = headerRow.insertCell(0);
      companyNameCell.innerHTML = "Company Name";
      var companySymbolCell = headerRow.insertCell(1);
      companySymbolCell.innerHTML = "Symbol";
      var priceCell = headerRow.insertCell(2);
      priceCell.innerHTML = "Price";
    }else{
      var newRow = stockTbl.insertRow(1);
      var newPriceCell = stockTbl.insertCell(0);
      newPriceCell.innerHTML = parseData.data.quotes.USD.price;
      var newSymbolCell = stockTbl.insertCell(0);
      newSymbolCell.innerHTML = parseData.data.symbol;
      var newNameCell = stockTbl.insertCell(0);
      newNameCell.innerHTML = parseData.data.name;
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

    connection.start()

    $(window).unload(function () {
        connection.invoke("DisconnectedUser", connection.connectionId, "");
    });
}


function user() {
    this.id = "";
    this.color = "";
}
