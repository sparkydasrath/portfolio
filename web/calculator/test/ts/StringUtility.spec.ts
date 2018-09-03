import { assert } from "chai";
import { StringUtility } from "../../src/ts/StringUtility"

describe("StringUtility Tests\t", () => {
    it("Should replace + in the string with -", () => {
        let baseString = "1 + ";
        let replacement = "-";
        let result = StringUtility.replaceAt(baseString, replacement, baseString.length - 2);
        assert.equal(result, "1 - ")
    });
});