using NUnit.Framework;

namespace BasicBlockchain.Tests
{
    [TestFixture]
    public class BasicChainTests
    {
        [Test]
        public void ShouldHaveGenesisBlockOnCreation()
        {
            BasicChain bc = new BasicChain();
            Assert.That(bc.Blockchain.Count, Is.Not.Zero);

            Block b = bc.Blockchain[0];
            Assert.That(b.Data, Is.EqualTo("Genesis Block"));
        }

        [Test]
        public void ShouldHaveSampleBlocksAdded()
        {
            BasicChain bc = new BasicChain();
            Assert.That(bc.Blockchain.Count, Is.Not.Zero);

            bc.AddSampleBlocks();
            Assert.That(bc.Blockchain.Count, Is.EqualTo(4));
        }

        [Test]
        public void ShouldReturnFalseIfChainIsInvalid()
        {
            BasicChain bc = new BasicChain();
            Assert.That(bc.Blockchain.Count, Is.Not.Zero);

            bc.AddSampleBlocks();
            bc.Blockchain.Add(new Block("blah blah", "Setting up to fail"));
            bool isChainValid = bc.IsBlockchainValid();
            Assert.IsFalse(isChainValid);
        }

        [Test]
        public void ShouldReturnTrueIfChainIsValid()
        {
            BasicChain bc = new BasicChain();
            Assert.That(bc.Blockchain.Count, Is.Not.Zero);

            bc.AddSampleBlocks();
            bool isChainValid = bc.IsBlockchainValid();
            Assert.IsTrue(isChainValid);
        }
    }
}