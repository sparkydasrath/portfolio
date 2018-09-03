class Logos {
  static Map<String, String> _logos;

  Logos() {
    _logos = {
      "BCH": "assets/bch.png",
      "BTC": "assets/btc.png",
      "DASH": "assets/dash.png",
      "EOS": "assets/eos.png",
      "ETC": "assets/etc.png",
      "ETH": "assets/eth.png",
      "LTC": "assets/ltc.png",
      "NEO": "assets/neo.png",
      "XRP": "assets/xrp.png",
      "ZEC": "assets/zec.png",
    };
  }

  static String getAssetPathFromKey(String key) {
    if (_logos.containsKey(key)) {
      return _logos[key];
    } else
      return null;
  }
}
