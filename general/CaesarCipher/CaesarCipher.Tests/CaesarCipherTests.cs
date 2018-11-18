using NUnit.Framework;

namespace CaesarCipher.Tests
{
    [TestFixture]
    public class CipherTests
    {
        private const int Shift = 3;
        private readonly Cipher cipher;

        public CipherTests() => cipher = new Cipher();

        [Test]
        public void ShouldIgnoreEmptyStrings() => Test(string.Empty, string.Empty);

        [Test]
        public void ShouldIgnoreNullStrings()
        {
            cipher.SetShift(1);
            Test(null, null);
        }

        [Test]
        public void ShouldIgnoreSymbols()
        {
            cipher.SetShift(1);
            Test("&", "&");
        }

        [Test]
        public void ShouldIgnoreWhitespace()
        {
            cipher.SetShift(1);
            Test(" ", " ");
        }

        [Test]
        public void ShouldPreserveCase()
        {
            cipher.SetShift(1);
            Test("aAa", "bBb");
        }

        [Test]
        public void ShouldShiftSingleCharacter()
        {
            cipher.SetShift(1);
            Test("a", "b");
            Test("a", "b");
        }

        [Test]
        public void ShouldShiftSingleNumber()
        {
            cipher.SetShift(1);
            Test("1", "2");
        }

        [Test]
        public void ShouldWrapOnLowerCaseLastLetter()
        {
            cipher.SetShift(1);
            Test("z", "a");
        }

        [Test]
        public void ShouldWrapOnNumbers()
        {
            cipher.SetShift(1);
            Test("9", "0");
        }

        [Test]
        public void ShouldWrapOnUpperCaseLastLetter()
        {
            cipher.SetShift(1);
            Test("Z", "A");
        }

        private void Test(string given, string expected)
        {
            Assert.AreEqual(cipher.Encrypt(given), expected);
            Assert.AreEqual(cipher.Decrypt(expected), given);
        }
    }
}