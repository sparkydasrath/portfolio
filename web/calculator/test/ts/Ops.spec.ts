import { assert } from "chai";
import Ops from "../../src/ts/Ops";

describe("Ops Tests\t", () => {
    it("Add should return the correct value", () => {
        let addResult = new Ops().add(1, 2);
        assert.equal(addResult, 3);
    });

    // it("Add should return the correct value when using decimals", () => {
    //     let addResult = new Ops().add(1.1, 2.2);
    //     assert.equal(addResult, 3.3);
    // });

    it("Add return type must be a number", () => {
        let addResult = new Ops().add(1, 1);
        assert.typeOf(addResult, "number");
    });

    it("Subtract should return the correct value", () => {
        let subtractResult = new Ops().subtract(2, 1);
        assert.equal(subtractResult, 1);
    });

    it("Subtract should return negative if x < y", () => {
        let subtractResult = new Ops().subtract(1, 2);
        assert.isBelow(subtractResult, 0);
    });

    it("Subtract return type must be a number", () => {
        let subtractResult = new Ops().subtract(1, 1);
        assert.typeOf(subtractResult, "number");
    });

    it("Multiply should return the correct value", () => {
        let multiplyResult = new Ops().multiply(2, 2);
        assert.equal(multiplyResult, 4);
    });

    it("Multiply return type must be a number", () => {
        let multiplyResult = new Ops().multiply(1, 1);
        assert.typeOf(multiplyResult, "number");
    });

    it("Divide should return the correct value", () => {
        let divideResult = new Ops().divide(4, 2);
        assert.equal(divideResult, 2);
    });

    it("Divide should return 0 if second parameter is 0", () => {
        let divideResult = new Ops().divide(4, 0);
        assert.equal(divideResult, 0);
    });

    it("Divide return type must be a number", () => {
        let divideResult = new Ops().divide(4, 2);
        assert.typeOf(divideResult, "number");
    });

    it("Negate should return negative of parameter passed in", () => {
        let negateResult = new Ops().plusMinus(1);
        assert.equal(negateResult, -1);
    });

});