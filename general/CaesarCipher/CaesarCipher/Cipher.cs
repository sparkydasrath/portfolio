using System;
using System.Collections.Generic;
using System.Text;

namespace CaesarCipher
{
    /// <summary>
    /// Simple Caesar cipher demo - nothing fancy to see here - move along now....
    /// </summary>
    public class Cipher
    {
        private const int LetterDivider = 26;
        private const int NumberDivider = 10;
        private readonly StringBuilder sb;
        private readonly Dictionary<int, char> shiftedCache;
        private readonly Dictionary<int, char> unshiftedCache;
        private int shift;

        public Cipher()
        {
            sb = new StringBuilder();
            shiftedCache = new Dictionary<int, char>();
            unshiftedCache = new Dictionary<int, char>();
        }

        public string Decrypt(string s)
        {
            sb.Clear();
            if (s == null) return null;
            sb.Capacity = s.Length;

            for (int i = 0; i < s.Length; i++)
            {
                if (IsSymbol(s[i]))
                {
                    sb.Append(s[i]); // ignore symbols
                    continue;
                }

                if (unshiftedCache.ContainsKey(s[i]))
                {
                    sb.Append(unshiftedCache[s[i]]);
                }
                else
                {
                    CharDetails cd = GetCharDetails(s[i]);
                    char shiftedChar = GetUnshiftedCharacter(cd);
                    sb.Append(shiftedChar);
                    unshiftedCache[cd.AsciiCode] = shiftedChar;
                }
            }

            return sb.ToString();
        }

        public string Encrypt(string s)
        {
            sb.Clear();
            if (s == null) return null;
            sb.Capacity = s.Length;

            for (int i = 0; i < s.Length; i++)
            {
                if (IsSymbol(s[i]))
                {
                    sb.Append(s[i]); // ignore symbols
                    continue;
                }

                if (shiftedCache.ContainsKey(s[i]))
                {
                    sb.Append(shiftedCache[s[i]]);
                }
                else
                {
                    CharDetails cd = GetCharDetails(s[i]);
                    char shiftedChar = GetShiftedCharacter(cd);
                    sb.Append(shiftedChar);
                    shiftedCache[cd.AsciiCode] = shiftedChar;
                }
            }

            return sb.ToString();
        }

        public void SetShift(int shiftValue)
        {
            if (shift == shiftValue) return; ;

            // once the shift changes, reset the cache
            shiftedCache.Clear();
            unshiftedCache.Clear();
            shift = shiftValue;
        }

        private CharDetails GetCharDetails(char c)
        {
            int charCode = c;

            if (IsLowerCase(c))
                return new CharDetails { AsciiCode = charCode, CharType = CharType.Lower };

            if (IsUpperCase(c))
                return new CharDetails { AsciiCode = charCode, CharType = CharType.Upper };

            if (IsNumber(c))
                return new CharDetails { AsciiCode = charCode, CharType = CharType.Number };

            return new CharDetails { AsciiCode = c, CharType = CharType.Symbol };
        }

        private int GetOverflowShift(int asciiConstant, int shiftedResult, int modulusOperator) => asciiConstant + ((shiftedResult - asciiConstant) % modulusOperator);

        private char GetShiftedCharacter(CharDetails cd)
        {
            // no need to check for symbols as we filter those out already

            int shiftedResult = cd.AsciiCode + shift;

            if (cd.CharType == CharType.Number && shiftedResult > AsciiConstants.CeilNumber)
            {
                int overflowShift = GetOverflowShift(AsciiConstants.FloorNumber, shiftedResult, NumberDivider);
                shiftedResult = overflowShift;
            }
            else if (cd.CharType == CharType.Lower && shiftedResult > AsciiConstants.CeilLowerCase)
            {
                int overflowShift = GetOverflowShift(AsciiConstants.FloorLowerCase, shiftedResult, LetterDivider);
                shiftedResult = overflowShift;
            }
            else if (cd.CharType == CharType.Upper && shiftedResult > AsciiConstants.CeilUpperCase)
            {
                int overflowShift = GetOverflowShift(AsciiConstants.FloorUpperCase, shiftedResult, LetterDivider);
                shiftedResult = overflowShift;
            }

            return Convert.ToChar(shiftedResult);
        }

        private int GetUnderflowShift(int asciiConstant, int shiftedResult, int modulusOperator) => asciiConstant + (asciiConstant - shiftedResult) % modulusOperator;

        private char GetUnshiftedCharacter(CharDetails cd)
        {
            // no need to check for symbols as we filter those out already
            int shiftedResult = cd.AsciiCode - shift;
            if (cd.CharType == CharType.Number && shiftedResult < AsciiConstants.FloorNumber)
            {
                int underflowShift = GetUnderflowShift(AsciiConstants.CeilNumber, shiftedResult, NumberDivider);
                shiftedResult = underflowShift;
            }
            else if (cd.CharType == CharType.Lower && shiftedResult < AsciiConstants.FloorLowerCase)
            {
                int underflowShift = GetUnderflowShift(AsciiConstants.CeilLowerCase, shiftedResult, LetterDivider);
                shiftedResult = underflowShift;
            }
            else if (cd.CharType == CharType.Upper && shiftedResult < AsciiConstants.FloorUpperCase)
            {
                int underflowShift = GetUnderflowShift(AsciiConstants.CeilUpperCase, shiftedResult, LetterDivider);
                shiftedResult = underflowShift;
            }

            return Convert.ToChar(shiftedResult);
        }

        private bool IsLowerCase(int charCode) => charCode >= AsciiConstants.FloorLowerCase && charCode <= AsciiConstants.CeilLowerCase;

        private bool IsNumber(int charCode) => charCode >= AsciiConstants.FloorNumber && charCode <= AsciiConstants.CeilNumber;

        private bool IsSymbol(int charCode) => !IsLowerCase(charCode) && !IsUpperCase(charCode) && !IsNumber(charCode);

        private bool IsUpperCase(int charCode) => charCode >= AsciiConstants.FloorUpperCase && charCode <= AsciiConstants.CeilUpperCase;
    }
}