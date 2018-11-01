using System.Collections.Generic;
using CryptoCompare.ViewModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CryptoCompare.Services
{
    public class ResponseConverter
    {
        private readonly List<Dictionary<string, Dictionary<string, Currency>>> coins;

        public ResponseConverter() => coins = new List<Dictionary<string, Dictionary<string, Currency>>>();

        public List<Dictionary<string, Dictionary<string, Currency>>> Convert(string json)
        {
            JObject top = JObject.Parse(json);

            IDictionary<string, JToken> coinLevel = (JObject)top["DISPLAY"];

            foreach (string coinKey in coinLevel.Keys)
            {
                IDictionary<string, JToken> currencyLevel = (JObject)coinLevel[coinKey];

                foreach (string currencyLevelKey in currencyLevel.Keys)
                {
                    Dictionary<string, Dictionary<string, Currency>> converted = new Dictionary<string, Dictionary<string, Currency>>();

                    Currency curObj = JsonConvert.DeserializeObject<Currency>(currencyLevel[currencyLevelKey].ToString());
                    Dictionary<string, Currency> currency = new Dictionary<string, Currency>
                    {
                        [currencyLevelKey] = curObj
                    };

                    converted.Add(coinKey, currency);
                    coins.Add(converted);
                }
            }

            return coins;
        }
    }
}