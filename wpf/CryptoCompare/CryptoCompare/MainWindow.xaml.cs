using CryptoCompare.Services;
using CryptoCompare.ViewModels;

namespace CryptoCompare
{
    public partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();
            MainVm mv = new MainVm();
            DataContext = mv;
            mv.Initialize();

            // GetCoinsAndCurrencies();
        }

        private async void GetCoinsAndCurrencies()
        {
            DataFetcher rdf = new DataFetcher();
            string result = await rdf.GetThings();
            MyTextBox.AppendText(result);
        }
    }
}