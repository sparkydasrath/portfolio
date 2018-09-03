import * as React from "react";
import "./CoinCurrencyCard.css";
import { ICommonProperties, ICoinCurrencyDisplay } from "./ICoinCurrencyDisplay";
import { Direction } from "./Direction";

interface IPriceCoinCurrencyComponent {
    price: string,
    coinCurrency: string,
    direction: Direction,
}

class PriceCoinCurrencyComponent extends React.Component<IPriceCoinCurrencyComponent, {}> {
    constructor(props: IPriceCoinCurrencyComponent) {
        super(props);
    }

    render() {

        let classByDirection: string = "priceUnchanged";
        if (this.props.direction === Direction.Up) {
            classByDirection = "price priceUp";
        }
        else if (this.props.direction === Direction.Down) {
            classByDirection = "price priceDown";

        }
        else {
            classByDirection = "price priceUnchanged";
        }

        return (
            <div className="priceCoinCurrencyContainer">
                <div className="coinCurrencyWrapper">
                    <div className="coinCurrency" >{this.props.coinCurrency}</div>
                </div>
                <div className={classByDirection}>{this.props.price}</div>
            </div>
        );
    }
}


class VolumesComponent extends React.Component<ICommonProperties, {}>{
    constructor(props: ICommonProperties) {
        super(props);
    }
    render() {
        return (
            <div className="volumesContainer ">
                <div>
                    <div className="volContainerHeaderText">Direct Vol. 24H</div>
                    <div className="volContainerValueText" >{this.props.VOLUME24HOUR}</div>
                </div>
                <div>
                    <div className="volContainerHeaderText">Total Vol. 24H</div>
                    <div className="volContainerValueText" >{this.props.TOTALVOLUME24H}</div>
                </div>
                <div>
                    <div className="volContainerHeaderText">Market Cap</div>
                    <div className="volContainerValueText" >{this.props.MKTCAP}</div>
                </div>
            </div>
        );
    }
}

export default class CoinCurrencyCard extends React.Component<ICoinCurrencyDisplay, {}> {

    public coinCurency: string = "";

    constructor(props: ICoinCurrencyDisplay) {
        super(props);
        this.coinCurency = props.Coin + " - " + props.Currency
    }

    public render() {
        return (
            <div className="currencyCardRoot">
                <PriceCoinCurrencyComponent price={this.props.Fields!.PRICE} coinCurrency={this.coinCurency} direction={this.props.PriceDirection} />
                <VolumesComponent {...this.props.Fields!} />
            </div>

        );
    };
}