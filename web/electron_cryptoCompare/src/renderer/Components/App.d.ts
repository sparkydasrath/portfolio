import * as React from "react";
import "./App.css";
import "./CoinCurrencyCard";
import { ICoinCurrencyDisplay } from "./ICoinCurrencyDisplay";
import { Direction } from "./Direction";
interface IAppState {
    coinCurrs: ICoinCurrencyDisplay[];
}
export default class App extends React.Component<{}, IAppState> {
    constructor(props: any);
    getBtc: () => void;
    updateState(data: ICoinCurrencyDisplay[]): void;
    flattenReturnedData(displayData: object, rawData: object): ICoinCurrencyDisplay[];
    getPriceDirection(rawPrice: number, key: string): Direction;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=App.d.ts.map