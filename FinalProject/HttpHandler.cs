using System;
using System.Net.Http;

namespace FinalProject
{
    public class HttpHandler
    {
        static async void GetData(string uri)
        {
            // From this vid https://www.youtube.com/watch?v=XAHF8TzFmJI
            using (HttpClient client = new HttpClient())
            using (HttpResponseMessage response = await client.GetAsync(uri))
            using (HttpContent content = response.Content)
            {
                string data = await content.ReadAsStringAsync();

                if (data != null)
                {
                    Console.WriteLine(data);
                }
            }
        }
    }
}
