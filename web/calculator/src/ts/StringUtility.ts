export class StringUtility {
    public static replaceAt(oringalString: string, replacementString: string, position: number): string {
        let origAsArray = oringalString.split("");
        origAsArray[position] = replacementString;
        let finalString = origAsArray.join("");
        return finalString;
    }
}
