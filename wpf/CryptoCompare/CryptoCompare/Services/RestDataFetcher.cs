using System;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;

namespace CryptoCompare.Services
{
    public class RestDataFetcher
    {
        private readonly string url;

        public RestDataFetcher()
        {
            string baseUrl = ConfigurationManager.AppSettings["url"];
            string coins = ConfigurationManager.AppSettings["coins"];
            string currencies = ConfigurationManager.AppSettings["currs"];
            url = baseUrl + coins + currencies;
        }

        public async Task<string> GetThings()
        {
            HttpClient client = new HttpClient();
            string response = await client.GetStringAsync(new Uri(url));

            return response;
        }
    }
}