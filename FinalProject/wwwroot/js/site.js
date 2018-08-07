//what's needed
//getting data out to give to js charts

//this needs to accept preferably a list of names and quantity
function displayChart(compData1, compData2, compData3, chartChoice) {
  //parse the JSON data
  parseData1 = JSON.parse(compData1);
  parseData2 = JSON.parse(compData2);
  parseData3 = JSON.parse(compData3);
  var currencyNames = [parseData1.data.name, parseData2.data.name, parseData3.data.name];

  //get and clear the canvas
  var c = document.getElementById("displayChart");
  var ctx = c.getContext("2d");
  // ctx.clearRect(0, 0, 600, 600);
  //read list
  //give it to the chart
  if(chartChoice = "bar"){
    var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [], //these need to be filled in, pulled in from each day or something since purchase
      datasets: [{
        label: currencyNames[0], //this should be the name of the first company
        backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(0, 0, 0)',
        data: [] // currency value at each label
      },
      {
        label: currencyNames[1], //this should be the name of the second company
        backgroundColor: 'rgb(0, 255, 0)',
        borderColor: 'rgb(0, 0, 0)',
        data: [] // currency value at each label
      },
      {
        label: currencyNames[2], //this should be the name of the third company
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(0, 0, 0)',
        data: [] // currency value at each label
      }]
    },

    options: {
      responsive: false,
      // maintainAspectRatio: true
    }
    });
  }else if(chartChoice = "pie"){
    var chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: currencyNames, //this needs to be the names of the currency
      datasets: [{
        label: "User Pie Chart",
        backgroundColor: [
          window.chartColors.red,
					window.chartColors.blue,
					window.chartColors.yellow,
        ],
        borderColor: 'rgb(0, 0, 0)',
        data: [parseData1.data.quotes.USD.price, parseData2.data.quotes.USD.price, parseData3.data.quotes.USD.price] // current value of each currency
      }]
    },

    options: {
      responsive: false,
      // maintainAspectRatio: true
    }
    });
  }else if(chartChoice = "line"){
    var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], //these need to be filled in, pulled in from each day or something since purchase
      datasets: [{
        label: currencyNames[0], //this should be the name of the first company
        backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(0, 0, 0)',
        data: [] // currency value at each label
      },
      {
        label: currencyNames[1], //this should be the name of the second company
        backgroundColor: 'rgb(0, 255, 0)',
        borderColor: 'rgb(0, 0, 0)',
        data: [] // currency value at each label
      },
      {
        label: currencyNames[2], //this should be the name of the third company
        backgroundColor: 'rgb(255, 0, 0)',
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

function requestCoinListData() {
    connection.invoke("getCoinList", connection.connectionId);
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

var hash = function (s) {
    /* Simple hash function. */
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a << 6 & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ c >> 21 : a;
        }
    }
    return String(a);
};
