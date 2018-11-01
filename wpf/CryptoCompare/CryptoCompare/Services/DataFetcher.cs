using System;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace CryptoCompare.Services
{
    public class DataFetcher
    {
        private readonly string url;

        public DataFetcher()
        {
            string baseUrl = ConfigurationManager.AppSettings["url"];
            string coins = ConfigurationManager.AppSettings["coins"];
            string currencies = ConfigurationManager.AppSettings["currs"];
            url = baseUrl + coins + currencies;
        }

        public async Task<string> GetThings()
        {
            HttpClient client = new HttpClient();
            string response = await client.GetStringAsync(new Uri(url)).ConfigureAwait(false);

            JObject o = JObject.Parse(response);

            return response;
        }
    }
}