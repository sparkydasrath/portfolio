import 'dart:async';
import 'package:crypto_compare_v2/model/coin.dart';
import 'package:crypto_compare_v2/model/common_display_fields.dart';
import 'package:crypto_compare_v2/model/currency.dart';
import 'package:rxdart/rxdart.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';
import 'dart:collection';

class CryptoBloc {
  String url =
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,EOS,BCH,XRP,LTC,ETC&tsyms=USD,EUR,GBP,JPY";
  Stream<List<Coin>> get coins => _coinSubject.stream;
  final _coinSubject = BehaviorSubject<UnmodifiableListView<Coin>>();
  var _coinsToShow = <Coin>[];
  var completer;
  CryptoBloc() {
    refresh();
  }

  Future<Null> refresh() async {
    this._updateCoins().then((_) {
      _coinSubject.add(UnmodifiableListView(_coinsToShow));
    });
  }

  Future<Map<String, Object>> getFullDislaySymbols(String url) async {
    http.Response response = await http.get(url);

    Map<String, Object> displayPart;
    if (response.statusCode == 200) {
      Map<String, Object> decoded = json.decode(response.body);
      displayPart = decoded["DISPLAY"];
    }
    return displayPart;
  }

  Map<String, Object> getFullDislaySymbolsLocal(String url) {
    File file = File('./test/full_coin.json');
    Map<String, Object> result =
        json.decode(file.readAsStringSync())["DISPLAY"];
    return result;
  }

  List<Coin> getCoinsFromDisplaySymbols(Map<String, Object> displayObject) {
    List<Coin> _coins = <Coin>[];
    List<Currency> _currencies = <Currency>[];
    Iterable<String> coinKeys = displayObject.keys;

    coinKeys.forEach((c) {
      _currencies = _extractCurrencies(c, displayObject[c]);
      Coin coin = Coin(c, _currencies);
      _coins.add(coin);
    });
    return _coins;
  }

  Future<Null> _updateCoins() async {
    Map<String, Object> displaySymbols = await getFullDislaySymbols(this.url);
    _coinsToShow = getCoinsFromDisplaySymbols(displaySymbols);
  }

  List<Currency> _extractCurrencies(
      String coin, Map<String, Object> currencyObject) {
    List<Currency> currencies = <Currency>[];
    Iterable<String> currencyKeys = currencyObject.keys;

    currencyKeys.forEach((c) {
      CommonDisplayFields cf = CommonDisplayFields(currencyObject[c]);
      Currency curr = Currency(coin, c, cf);
      currencies.add(curr);
    });

    return currencies;
  }
}
