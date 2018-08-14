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

//used when the update button is clicked, should get the share values and pass them to csharp for updating
//or math can be done here
function updateUserDataFromChart() {
  //get new shar
  var newShares1 = document.getElementById("CompCurrShares1").value;
  var newShares2 = document.getElementById("CompCurrShares2").value;
  var newShares3 = document.getElementById("CompCurrShares3").value;
  //either do the math here

  //or just pass it to the server
  connection.invoke("updateUserData", connection.connectionId, newShares1, newShares2, newShares3);
}

//displaying purchased stocks on user page
function createStockTblFromJson(jsonDataComp1, jsonDataComp2, jsonDataComp3){
  //parse incoming json
  parseData1 = JSON.parse(jsonDataComp1);
  parseData2 = JSON.parse(jsonDataComp2);
  parseData3 = JSON.parse(jsonDataComp3);
  console.log(parseData1);
  console.log(parseData2);
  console.log(parseData3);

  //company 1
  document.getElementById("CompCurPrice1").innerHTML = parseData1.data.quotes.USD.price;
  document.getElementById("CompSymbol1").innerHTML = parseData1.data.symbol;
  document.getElementById("CompName1").innerHTML = parseData1.data.name;

  //company 2
  document.getElementById("CompCurPrice2").innerHTML = parseData2.data.quotes.USD.price;
  document.getElementById("CompSymbol2").innerHTML = parseData2.data.symbol;
  document.getElementById("CompName2").innerHTML = parseData2.data.name;

  //company 3
  document.getElementById("CompCurPrice3").innerHTML = parseData3.data.quotes.USD.price;
  document.getElementById("CompSymbol3").innerHTML = parseData3.data.symbol;
  document.getElementById("CompName3").innerHTML = parseData3.data.name;
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

    connection.clientMethods["ParseAndReturnJson"] = (socketId, jsonStr) => {
      console.log("incoming JSON data: \n");
      console.log("jsonStr");
      //parse the JSON object
      parseData = JSON.parse(jsonStr);
      //get whatever we want out of JSON
      var compName = parseData.data.companyName;
      //send it back to the server
      connection.invoke("parsedDataFromJS", connection.connectionId, compName); //add whatever variables we want
    }

    connection.clientMethods["ParseValueAndCreateTable"] = (socketId, jsonData) => {
      console.log("incoming json data: \n");
      console.log(jsonData);
      JSON.stringify(jsonData);
      parseData = JSON.parse(jsonData);
      console.log("\n transformed json data: \n");
      console.log(parseData)
      createStockTblFromJson();
    }

    connection.clientMethods["ReceiveJSONChartData"] = (socketId, jsonComp1, jsonComp2, jsonComp3) => {
      displayChart(jsonComp1, jsonComp2, jsonComp3);
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

function simpleHash() {
    s = document.getElementById("Pword").value;
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
    // return String(a);
    document.getElementById("Pword").value = String(a);
};
