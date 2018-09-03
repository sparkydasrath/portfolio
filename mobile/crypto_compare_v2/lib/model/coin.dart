import 'package:crypto_compare_v2/model/currency.dart';

class Coin {
  final String coin;
  final List<Currency> currencies;
  Coin(this.coin, this.currencies);

  void printCoin() {
    this.currencies.forEach((c) {
      print(coin + '\n' + c.toString());
    });
  }
}
