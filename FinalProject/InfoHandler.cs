using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.WebSockets;
using System.Threading.Tasks;
using WebSocketManager;
using WebSocketManager.Common;
using Microsoft.EntityFrameworkCore;
using FinalProject.Models;
using FinalProject.Controllers;
using System.Collections.Generic;

namespace FinalProject
{
    public class InfoHandler : WebSocketHandler
    {
        public InfoHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

                private readonly FinalProjectContext _context;


        //When new user connects a new socketID is created 
        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);

            //this will be used to identify the user and their color
            var socketID = WebSocketConnectionManager.GetId(socket);

            var message = new Message
            {
                MessageType = MessageType.Text,
                Data = $"User: {socketID} is Connected"

            };


            await SendMessageToAllAsync(message);
            Console.WriteLine(message.Data);
        }

        //Disconnects the user with the socketID passed in
        public override async Task OnDisconnected(WebSocket socket)
        {
            await base.OnConnected(socket);

            var socketID = WebSocketConnectionManager.GetId(socket);

            var message = new Message
            {
                MessageType = MessageType.Text,
                Data = $"User: {socketID} is now disconnected"
            };

            await SendMessageToAllAsync(message);
            Console.WriteLine(message.Data);
        }


        public async Task getCoinList(string socketId)
        {

            //List < new { Amount_Paid = "", Company_Name = "", Created_At = "", Id = "", Purchased_Amount = "", Users } > list = new List<StockPurchaseEntry>();
            List<StockPurchaseEntry> list = new List<StockPurchaseEntry>();
            foreach (StockPurchaseEntry entry in ApiDataCalls.itemsToPass) {
                entry.Users = null;

                list.Add(entry);
            }

            var rawData = JsonConvert.SerializeObject(list);

            var uri = "https://min-api.cryptocompare.com/data/all/coinlist";
            await getData(socketId, uri, "ReceiveCoinListJson");
        }


        //Create String array of User coins to pass into GetPrices
        public async Task getPrices(string socketId, string[] coins)
        {
            WebClient client = new WebClient();

            //Creates "BTC,42,BTH"
            var coinString = string.Join(',', coins);

            //Appends Coinstring into uri
            var uri = $"https://min-api.cryptocompare.com/data/pricemulti?fsyms={coinString}&tsyms=USD";

            //Pulls Json and converts to string
            String JSONraw = client.DownloadString(uri);

            //Sends back the JSON string
            //InvokeClientMethodToAllAsync("Method Name", socketId, JSONraw);
            await InvokeClientMethodToAllAsync("ParseValueAndCreateTable", socketId, JSONraw);
        }


        public async void getHistoricalPrices(string socketId, string coin, DateTime dateTime)
        {
            var unixTimestamp = (Int32)(DateTime.UtcNow.Subtract(dateTime)).TotalSeconds;
            var uri = $"https://min-api.cryptocompare.com/data/pricehistorical?fsym={coin}&tsyms=USD&ts={unixTimestamp}";
            await getData(socketId, uri, "ReceiveCoinHistoricalPricesJson");
        }

        // Send request
        public async Task getData(string socketId, string uri, string method)
        {
            object[] data = new object[1];
            data[1] = await HttpHandler.GetData(uri);
            await InvokeClientMethodAsync(socketId, method, data);
        }

        //this function should give what's needed for a chart
        public async Task giveChartData(string socketId){
            //obtain user json data
            // jsonComp1 =
            // jsonComp2 =
            // jsonComp3 =
            //pass that data back to client
            //await InvokeClientMethodToAllAsync("ReceiveJSONChartData", jsonComp1, jsonComp2, jsonComp3);
        }

        public async Task giveJSONData(string socketId){
            //obtain user json data
            // jsonComp1 =
            // jsonComp2 =
            // jsonComp3 =
            //pass that data back to client
            //await InvokeClientMethodToAllAsync("ReceiveUserChoicesJson", jsonComp1, jsonComp2, jsonComp3);
        }

        public async Task parsedDataFromJS(string socketId){ //add additional parameters
          //put received variables wherever you want them
        }

        //called to send data after user has updated the chart
        public async Task updateUserData(string socketId, string newShares1, string newShares2, string newShares3){
          //general idea
          //maybe convert incoming values to ints if needed
          //do the math
          //
        }
    }
}
