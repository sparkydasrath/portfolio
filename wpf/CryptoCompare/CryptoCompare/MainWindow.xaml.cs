using CryptoCompare.Services;

namespace CryptoCompare
{
    public partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();
            GetCoinsAndCurrencies();
        }

        private async void GetCoinsAndCurrencies()
        {
            RestDataFetcher rdf = new RestDataFetcher();
            string result = await rdf.GetThings();
            MyTextBox.AppendText(result);
        }
    }
}