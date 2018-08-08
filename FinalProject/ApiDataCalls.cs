using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using Newtonsoft.Json.Linq;

namespace FinalProject
{
    public static class ApiDataCalls
    {

        public static WebClient client = new WebClient();

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
        public static object getCoinList()
        {
            //JObject jobject = JObject.parse(
            String coinInfo = client.DownloadString("https://min-api.cryptocompare.com/data/all/coinlist");
            Console.WriteLine(coinInfo);

           return coinInfo; 
        }

        // Price of specific currencies
        // https://min-api.cryptocompare.com/data/pricemulti?fsyms=42&tsyms=USD
        // {
        //    "42": {
        //        "USD": 17414.93
        //    }
        //}
        public static object getPrices(string[] coins)
        {
            var coinString = string.Join(',', coins);
            var uri = $"https://min-api.cryptocompare.com/data/pricemulti?fsyms={coinString}&tsyms=USD";
            return uri;
        }
        // Historical price for a coin
        // https://min-api.cryptocompare.com/data/pricehistorical?fsym=42&tsyms=USD&ts=1533619818
        // {
        //    "42": {
        //        "USD": 17531.56
        //    }
        //}
        public static object getHistoricalPrices(string coin, DateTime dateTime)
        {
            var unixTimestamp = (Int32)(DateTime.UtcNow.Subtract(dateTime)).TotalSeconds;
            var uri = $"https://min-api.cryptocompare.com/data/pricehistorical?fsym={coin}&tsyms=USD&ts={unixTimestamp}";
                return uri;
        }

        // Send request
        public static async Task<object> getDataAsync(string socketId, string uri, string method)
        {
            object[] data = new object[1];
            data[1] = await HttpHandler.GetData(uri);
            return data;
        }

    }
}
