import * as React from "react";
import "./App.css";
import "./CoinCurrencyCard"
import CoinCurrencyCard from "./CoinCurrencyCard";
import { ICoinCurrencyDisplay } from "./ICoinCurrencyDisplay";
import { Direction } from "./Direction";

interface IAppState {
    coinCurrs: ICoinCurrencyDisplay[];
}

export default class App extends React.Component<{}, IAppState> {

    constructor(props) {
        super(props);
        this.state = { coinCurrs: [] }
    }

    getBtc = () => {
        fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,EOS,BCH,LTC&tsyms=USD,EUR,GBP,JPY")
            .then(res => {
                let resJson = res.json();
                return resJson;
            })
            .then(data => {
                let flattened = this.flattenReturnedData(data.DISPLAY, data.RAW);
                this.updateState(flattened);
            })
    }

    updateState(data: ICoinCurrencyDisplay[]): void {
        // console.log("Price before set state = ", data[0].Fields!.PRICE);
        this.setState({ coinCurrs: data });
        // console.log("Price after set state = ", this.state.coinCurrs[0].Fields!.PRICE);
    }

    flattenReturnedData(displayData: object, rawData: object): ICoinCurrencyDisplay[] {
        let coinKeys = Object.keys(displayData); // will return BTC, ETH
        if (coinKeys.length === 0) return [];

        let flattenedObjects: ICoinCurrencyDisplay[] = [];

        for (let i = 0; i < coinKeys.length; i++) {
            const coin = coinKeys[i];

            let currencyKeys = Object.keys(displayData[coin.toString()]); // will return USD, JPY

            for (let j = 0; j < currencyKeys.length; j++) {
                const currency = currencyKeys[j];
                let key = coin.toString() + currency.toString();
                let rawPrice = ((rawData[coin.toString()])[currency])["PRICE"];
                let flattenedObj = {
                    Key: key,
                    Coin: coin.toString(),
                    Currency: currency.toString(),
                    RawPrice: rawPrice,
                    PriceDirection: this.getPriceDirection(rawPrice, key),
                    Fields: (displayData[coin.toString()])[currency]
                };
                //console.log(`Key = ${key}  direction=${flattenedObj["PriceDirection"]}`);
                flattenedObjects.push(flattenedObj as ICoinCurrencyDisplay);
            }
        }

        return flattenedObjects;
    }

    getPriceDirection(rawPrice: number, key: string): Direction {
        // need to revisit how this component's state is stored - needs to be associateive array
        // as I keep iterating this array to find the one i need to compare with

        let itemToCompareTo: ICoinCurrencyDisplay = {
            Key: "",
            Coin: "",
            Currency: "",
            RawPrice: 0,
            PriceDirection: Direction.None
        };
        let pxDir: Direction = Direction.None;

        for (let i = 0; i < this.state.coinCurrs.length; i++) {
            const element = this.state.coinCurrs[i];
            if (element.Key !== key) continue;
            itemToCompareTo = element;
        }

        if (itemToCompareTo === undefined) return Direction.None;

        if (rawPrice > itemToCompareTo.RawPrice) pxDir = Direction.Up;
        else if (rawPrice < itemToCompareTo.RawPrice) pxDir = Direction.Down;
        else pxDir = Direction.None;
        return pxDir;
    }

    componentDidMount() {
        this.getBtc();
        setInterval(this.getBtc, 1000);
    }

    public render() {
        return (
            <div className="appRoot">
                {this.state.coinCurrs.map(s => {
                    return (<CoinCurrencyCard key={s.Key} {...s} />);
                }
                )}
            </div>
        );
    }
}

