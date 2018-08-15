using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using Newtonsoft.Json.Linq;
using FinalProject.Models;

namespace FinalProject
{
    public static class ApiDataCalls
    {

        public static string curUser;
        public static int curId;

        public static ICollection<StockPurchaseEntry> itemsToPass;

    }
            
}
