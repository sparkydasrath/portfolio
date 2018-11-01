using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoCompare.Services;

namespace CryptoCompare.ViewModels
{
    public class MainVm : BaseViewModel
    {
        private readonly DataFetcher dataFetcher;
        private readonly ResponseConverter responseConverter;
        private List<Dictionary<string, Dictionary<string, Currency>>> convertedResponse;
        private string jsonResponse;

        public MainVm()
        {
            dataFetcher = new DataFetcher();
            responseConverter = new ResponseConverter();
        }

        public async void Initialize()
        {
            jsonResponse = await dataFetcher.GetThings();
            convertedResponse = await Task.Run(() => responseConverter.Convert(jsonResponse)).ConfigureAwait(false);
        }

        public async void Update() => convertedResponse = await Task.Run(() => responseConverter.Convert(jsonResponse)).ConfigureAwait(false);
    }
}