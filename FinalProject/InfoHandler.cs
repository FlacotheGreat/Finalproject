using System;
using System.Net;
using System.Threading.Tasks;
using WebSocketManager;

namespace FinalProject
{
    public class InfoHandler : WebSocketHandler
    {
        public InfoHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

        // Coin API: https://min-api.cryptocompare.com/
        // Get list of currencies
        //{
        //    "Response": "Success",
        //    "Message": "Coin list succesfully returned!",
        //    "Data": {
        //        "42": {
        //            "Id": "4321",
        //            "Url": "/coins/42/overview",
        //            "ImageUrl": "/media/12318415/42.png",
        //            "Name": "42",
        //            "Symbol": "42",
        //            "CoinName": "42 Coin",
        //            "FullName": "42 Coin (42)",
        //            "Algorithm": "Scrypt",
        //            "ProofType": "PoW/PoS",
        //            "FullyPremined": "0",
        //            "TotalCoinSupply": "42",
        //            "BuiltOn": "N/A",
        //            "SmartContractAddress": "N/A",
        //            "PreMinedValue": "N/A",
        //            "TotalCoinsFreeFloat": "N/A",
        //            "SortOrder": "34",
        //            "Sponsored": false,
        //            "IsTrading": true
        //        }
        //    }
        //}
        public async Task getCoinList(string socketId)
        {
            var uri = "https://min-api.cryptocompare.com/data/all/coinlist";
            await getData(socketId, uri, "ReceiveCoinListJson");
        }

        // Price of specific currencies
        // https://min-api.cryptocompare.com/data/pricemulti?fsyms=42&tsyms=USD
        // {
        //    "42": {
        //        "USD": 17414.93
        //    }
        //}

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
            await InvokeClientMethodToAllAsync("Method Name", socketId, JSONraw);
        }

        // Historical price for a coin
        // https://min-api.cryptocompare.com/data/pricehistorical?fsym=42&tsyms=USD&ts=1533619818
        // {
        //    "42": {
        //        "USD": 17531.56
        //    }
        //}
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
    }
}
