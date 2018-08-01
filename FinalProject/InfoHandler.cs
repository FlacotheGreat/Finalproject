using System.Threading.Tasks;
using WebSocketManager;

namespace FinalProject
{
    public class InfoHandler : WebSocketHandler
    {
        public InfoHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

        //basically this one should give what's needed for the table
        public async Task giveJSONData(string socketId){
            //obtain user json data
            // jsonComp1 =
            // jsonComp2 =
            // jsonComp3 =
            //pass that data back to client
            //await InvokeClientMethodToAllAsync("ReceiveUserChoicesJson", jsonComp1, jsonComp2, jsonComp3);
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
    }
}
