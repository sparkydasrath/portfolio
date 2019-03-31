using NUnit.Framework;

namespace BasicBlockchain.Tests
{
    [TestFixture]
    public class BlockTests
    {
        [Test]
        public void ShouldHaveDifferentHashesForTwoDifferentBlocks()
        {
            Block b1 = new Block("123456", "block1");
            Block b2 = new Block("654321", "block2");
            Assert.That(b1.Hash, Is.Not.EqualTo(b2.Hash));
        }
    }
}