(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dom {
}
exports.default = Dom;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Effect {
    static reveal(element, gradientBackground) {
        element.style.backgroundImage = gradientBackground;
    }
    static updateGradient(leftPositionX, topPositionY) {
        // let gradient = `radial-gradient(circle 50px at ${leftPositionX}px ${topPositionY}px, rgba(255,255,255,0.3), rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${leftPositionX}px ${topPositionY}px, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0), rgba(255,255,255,0))`;
        let gradient = `radial-gradient(circle 50px at ${leftPositionX}px ${topPositionY}px, rgba(255,255,255,0.3), rgba(255,255,255,0))`;
        return gradient;
    }
}
exports.default = Effect;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OperatorType;
(function (OperatorType) {
    OperatorType["None"] = "";
    OperatorType["Add"] = "Add";
    OperatorType["Subtract"] = "Subtract";
    OperatorType["Multiply"] = "Multiply";
    OperatorType["Divide"] = "Divide";
    OperatorType["PlusMinus"] = "PlusMinus";
    OperatorType["Equal"] = "Equal";
    OperatorType["ClearEntry"] = "ClearEntry";
    OperatorType["ClearAll"] = "ClearAll";
    OperatorType["Backspace"] = "Backspace";
})(OperatorType = exports.OperatorType || (exports.OperatorType = {}));
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ops {
    add(x, y) {
        return x + y;
    }
    subtract(x, y) {
        return x - y;
    }
    multiply(x, y) {
        return x * y;
    }
    divide(x, y) {
        if (y === 0)
            return 0;
        return x / y;
    }
    plusMinus(x) {
        return (-1) * x;
    }
}
exports.default = Ops;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtility {
    static replaceAt(oringalString, replacementString, position) {
        let origAsArray = oringalString.split("");
        origAsArray[position] = replacementString;
        let finalString = origAsArray.join("");
        return finalString;
    }
}
exports.StringUtility = StringUtility;
},{}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ops_1 = __importDefault(require("./Ops"));
const Dom_1 = __importDefault(require("./Dom"));
const StringUtility_1 = require("./StringUtility");
const OperatorType_1 = require("./OperatorType");
const Effects_1 = __importDefault(require("./Effects"));
const MaxDisplayLength = 13;
class MainView {
    constructor() {
        this.clickEvent = "click";
        this.mouseMoveEvent = "mousemove";
        this.revealEffectContainerClassName = ".outer-wrapper";
        this.buttonContainerClassName = ".btn-container";
        this.resultDisplayClassName = ".result-display";
        this.summaryDisplayClassName = ".summary-display";
        this.leftAsString = "";
        this.left = 0;
        this.right = 0;
        this.rightAsString = "";
        this.total = 0;
        this.opType = OperatorType_1.OperatorType.None;
        this.opTypeHtml = "";
        this.useLeftForSummary = true;
        this.opPressedCount = 0;
        this.dom = new Dom_1.default();
        this.ops = new Ops_1.default();
        this.handleRevalContainerMouseMove = (event) => {
            if (this.dom.buttonContainer === null ||
                this.dom.buttonContainer === undefined) {
                return;
            }
            let bcr = this.dom.buttonContainer.getBoundingClientRect();
            Effects_1.default.reveal(this.dom.buttonContainer, Effects_1.default.updateGradient(event.clientX - bcr.left, event.clientY - bcr.top));
        };
        this.handleBtnContainerClick = (event) => {
            // had to do the event handler this way in order to pass along the correct 'this'
            //  context to it
            // see: https://stackoverflow.com/questions/18423410/typescript-retain-scope-in-event-listener
            let srcButton = event.srcElement;
            if (srcButton === null || srcButton === undefined) {
                console.error("Can't find the button that was clicked");
                return;
            }
            let srcButtonValue = srcButton.innerHTML;
            let clearData = srcButton.getAttribute("data-opClear");
            if ((srcButtonValue >= "0" && srcButtonValue <= "9") || srcButtonValue === ".")
                this.handleNumberButtonPressed(srcButtonValue);
            else if (clearData !== null) {
                this.handleClear(clearData);
            }
            else {
                // get the data that knows what operator button was pressed 
                this.opTypeHtml = srcButtonValue;
                this.handleOperatorButtonPressed(srcButton.getAttribute("data-opType"), srcButtonValue);
            }
            ;
        };
    }
    cacheDom() {
        this.dom.revealEffectContainer = document.querySelector(this.revealEffectContainerClassName);
        this.dom.buttonContainer = document.querySelector(this.buttonContainerClassName);
        this.dom.buttonContainers = document.querySelectorAll(this.buttonContainerClassName);
        this.dom.summaryDisplay = document.querySelector(this.summaryDisplayClassName);
        this.dom.resultDisplay = document.querySelector(this.resultDisplayClassName);
    }
    bindEvents() {
        if (this.dom.revealEffectContainer !== null && this.dom.revealEffectContainer !== undefined) {
            this.dom.revealEffectContainer.addEventListener(this.mouseMoveEvent, this.handleRevalContainerMouseMove);
        }
        if (this.dom.buttonContainer !== null && this.dom.buttonContainer !== undefined) {
            this.dom.buttonContainer.addEventListener(this.clickEvent, this.handleBtnContainerClick);
        }
    }
    handleOperatorButtonPressed(opPressed, htmlContentOfOp) {
        this.opPressedCount++;
        if (opPressed === null) {
            console.error("Operation selected is null");
            return;
        }
        else if (opPressed === OperatorType_1.OperatorType.Equal) {
            this.computeTotal();
            this.useLeftForSummary = true;
            this.updateViewPipeline(true, htmlContentOfOp);
            return;
        }
        else if (opPressed == OperatorType_1.OperatorType.PlusMinus) {
            this.opPressedCount--;
            this.handlePlusMinusCase();
            return;
        }
        else if (this.opType === OperatorType_1.OperatorType.None) {
            this.opType = opPressed;
            this.updateSummaryDisplay(htmlContentOfOp);
            return;
        }
        else {
            this.computeTotal();
            this.opType = opPressed;
            this.updateViewPipeline(false, htmlContentOfOp);
            return;
        }
    }
    updateViewPipeline(canClearSummaryDisplay, htmlContentOfOp) {
        if (canClearSummaryDisplay) {
            this.clearSummaryDisplay();
        }
        else {
            this.updateSummaryDisplay(htmlContentOfOp);
        }
        this.updateLeftAndRightValues();
        this.displayResult();
    }
    handlePlusMinusCase() {
        if (this.dom.resultDisplay === null || this.dom.resultDisplay === undefined) {
            console.error("handlePlusMinusCase(): Unable to find results display");
            return;
        }
        let currentDisplay = this.dom.resultDisplay.innerHTML;
        let convertedToNumber = Number(currentDisplay);
        let pmResult = this.ops.plusMinus(convertedToNumber);
        if (this.useLeftForSummary) {
            this.leftAsString = pmResult.toString();
        }
        else {
            this.rightAsString = pmResult.toString();
        }
        this.dom.resultDisplay.innerHTML = pmResult.toString();
    }
    computeTotal() {
        this.left = Number(this.leftAsString);
        this.right = Number(this.rightAsString);
        if (this.left === 0 && this.right === 0)
            return;
        switch (this.opType) {
            case (OperatorType_1.OperatorType.None): {
                break;
            }
            case (OperatorType_1.OperatorType.Add): {
                this.total = this.ops.add(this.left, this.right);
                break;
            }
            case (OperatorType_1.OperatorType.Subtract): {
                this.total = this.ops.subtract(this.left, this.right);
                break;
            }
            case (OperatorType_1.OperatorType.Multiply): {
                this.total = this.ops.multiply(this.left, this.right);
                break;
            }
            case (OperatorType_1.OperatorType.Divide): {
                this.total = this.ops.divide(this.left, this.right);
                break;
            }
            default: {
                console.log(`Operator ${this.opType} is not defined`);
                break;
            }
        }
    }
    trimmedDisplay(stringToTrim, noOfPlacesToKeep) {
        return stringToTrim.substr(0, noOfPlacesToKeep);
    }
    displayResult() {
        if (this.dom.resultDisplay !== null && this.dom.resultDisplay !== undefined) {
            this.dom.resultDisplay.textContent = this.trimmedDisplay(`${this.total}`, MaxDisplayLength);
        }
    }
    displayLeft() {
        if (this.dom.resultDisplay !== null && this.dom.resultDisplay !== undefined) {
            this.dom.resultDisplay.textContent = this.trimmedDisplay(this.leftAsString, MaxDisplayLength);
        }
    }
    displayRight() {
        if (this.dom.resultDisplay !== null && this.dom.resultDisplay !== undefined) {
            this.dom.resultDisplay.textContent = this.trimmedDisplay(this.rightAsString, MaxDisplayLength);
        }
    }
    clearSummaryDisplay() {
        if (this.dom.summaryDisplay === null || this.dom.summaryDisplay === undefined) {
            console.log("checkSummaryDisplayForNullOrUndefined(): Summary display is null or undefined");
            return;
        }
        else {
            this.dom.summaryDisplay.innerHTML = "";
            this.useLeftForSummary = true;
            this.opPressedCount = 0;
        }
    }
    updateSummaryDisplay(opPressedHtml) {
        if (this.dom.summaryDisplay === null || this.dom.summaryDisplay === undefined) {
            console.error("Unable to populate summary value");
            return;
        }
        if (this.opPressedCount > 1) {
            this.partialSummaryDisplayUpdate(opPressedHtml);
            return;
        }
        if (this.useLeftForSummary) {
            this.fullLeftSummaryDisplayUpdate();
            this.useLeftForSummary = false;
        }
        else {
            this.fullRightSummaryDisplayUpdate();
        }
    }
    fullLeftSummaryDisplayUpdate() {
        if (this.dom.summaryDisplay === null || this.dom.summaryDisplay === undefined) {
            console.error("fullSummaryDisplayUpdate(): Unable to do a full summary display update");
            return;
        }
        this.dom.summaryDisplay.innerHTML += this.leftAsString + " " + this.opTypeHtml + " ";
    }
    fullRightSummaryDisplayUpdate() {
        if (this.dom.summaryDisplay === null || this.dom.summaryDisplay === undefined) {
            console.error("fullSummaryDisplayUpdate(): Unable to do a full summary display update");
            return;
        }
        this.dom.summaryDisplay.innerHTML += this.rightAsString + " " + this.opTypeHtml + " ";
    }
    partialSummaryDisplayUpdate(opPressedHtml) {
        if (this.dom.summaryDisplay === null || this.dom.summaryDisplay === undefined) {
            console.error("partialSummaryDisplayUpdate(): Unable to do a partial summary display update");
            return;
        }
        let replaced = this.replaceLastDisplayedOperatorWithCurrentOne(this.dom.summaryDisplay.innerHTML, opPressedHtml);
        this.dom.summaryDisplay.innerHTML = replaced;
    }
    replaceLastDisplayedOperatorWithCurrentOne(valueToModify, replacementValue) {
        let currentDisplay = StringUtility_1.StringUtility.replaceAt(valueToModify, replacementValue, valueToModify.length - 2);
        return currentDisplay;
    }
    updateLeftAndRightValues() {
        this.leftAsString = this.total.toString();
        this.left = this.total;
        this.rightAsString = "";
        this.right = 0;
        this.opPressedCount = 0;
    }
    handleNumberButtonPressed(pressedNumber) {
        this.opPressedCount = 0;
        if (this.leftAsString === "" || this.opType === OperatorType_1.OperatorType.None) {
            this.leftAsString += pressedNumber;
            this.displayLeft();
        }
        else {
            this.rightAsString += pressedNumber;
            this.displayRight();
        }
    }
    handleClear(clearData) {
        if (clearData === OperatorType_1.OperatorType.ClearAll) {
            this.clearSummaryAndResultDisplay();
            return;
        }
        if (clearData === OperatorType_1.OperatorType.ClearEntry) {
            this.clearResultDisplay();
            return;
        }
        if (clearData === OperatorType_1.OperatorType.Backspace) {
            this.performBackspaceOnCurrentEntry();
            return;
        }
    }
    clearSummaryAndResultDisplay() {
        if (this.dom.summaryDisplay === null ||
            this.dom.summaryDisplay === undefined ||
            this.dom.resultDisplay === null ||
            this.dom.resultDisplay === undefined) {
            console.error("clearSummaryAndResultDisplay(): summaryDisplay or resultDisplay is null or undefined (bleh)");
            return;
        }
        this.dom.summaryDisplay.innerHTML = "";
        this.dom.resultDisplay.innerHTML = "0";
        this.leftAsString = "";
        this.left = 0;
        this.rightAsString = "";
        this.right = 0;
        this.useLeftForSummary = true;
        this.opPressedCount = 0;
    }
    clearResultDisplay() {
        if (this.dom.resultDisplay === null ||
            this.dom.resultDisplay === undefined) {
            console.error("clearResultDisplay(): resultDisplay is null or undefined (bleh)");
            return;
        }
        this.dom.resultDisplay.innerHTML = "0";
        this.rightAsString = "";
        this.right = 0;
    }
    performBackspaceOnCurrentEntry() {
        if (this.dom.resultDisplay === null ||
            this.dom.resultDisplay === undefined) {
            console.error("performBackspaceOnCurrentEntry(): resultDisplay is null or undefined (bleh)");
            return;
        }
        if (this.dom.resultDisplay.innerHTML.length === 1) {
            this.dom.resultDisplay.innerHTML = "0";
            if (this.useLeftForSummary) {
                this.leftAsString = "0";
            }
            else {
                this.rightAsString = "0";
            }
            return;
        }
        let currentResult = this.dom.resultDisplay.innerHTML;
        let backspacedResult = StringUtility_1.StringUtility.replaceAt(currentResult, "", currentResult.length - 1).trim();
        if (this.useLeftForSummary) {
            this.leftAsString = backspacedResult;
        }
        else {
            this.rightAsString = backspacedResult;
        }
        this.dom.resultDisplay.innerHTML = backspacedResult;
    }
    initResultToZero() {
        if (this.dom.resultDisplay === null ||
            this.dom.resultDisplay === undefined) {
            console.error("initResultToZero(): resultDisplay is null or undefined (bleh)");
            return;
        }
        this.dom.resultDisplay.innerHTML = "0";
    }
    init() {
        this.cacheDom();
        this.bindEvents();
        this.initResultToZero();
    }
}
(function () {
    let main = new MainView();
    main.init();
}());
},{"./Dom":1,"./Effects":2,"./OperatorType":3,"./Ops":4,"./StringUtility":5}]},{},[6])

//# sourceMappingURL=app.js.map
