import 'package:crypto_compare_v2/blocs/crypto_bloc.dart';
import 'package:crypto_compare_v2/model/coin.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  test("Hitting the CryptoCompare api should return data", () async {
    var url =
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD,EUR";
    http.Response response = await http.get(url);
    var conv1 = json.decode(response.body);
    Map<String, Object> conv2 = json.decode(response.body);
    Map<String, Map<String, Object>> c3 = Map.from(conv1);
    Map<String, Object> c4 = c3["DISPLAY"];
    expect(response.body, isNotEmpty);
  }, skip: true);

  test("Extract data from API into object", () async {
    String url =
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";

    String filePath = './test/full_coin.json';

    CryptoBloc bloc = CryptoBloc();

    Map<String, Object> displayPart = bloc.getFullDislaySymbolsLocal(filePath);
    List<Coin> coins = bloc.getCoinsFromDisplaySymbols(displayPart);

    expect(coins, isNotEmpty);
  });
}
