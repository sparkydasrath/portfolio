using System;
using System.Collections.Generic;

namespace BasicBlockchain
{
    public class BasicChain
    {
        public BasicChain()
        {
            Blockchain = new List<Block>();
            AddGenesisBlock();
        }

        public List<Block> Blockchain { get; }

        public void AddSampleBlocks()
        {
            Blockchain.Add(new Block(Blockchain[Blockchain.Count - 1].Hash, "Sample Block 1"));
            Blockchain.Add(new Block(Blockchain[Blockchain.Count - 1].Hash, "Sample Block 2"));
            Blockchain.Add(new Block(Blockchain[Blockchain.Count - 1].Hash, "Sample Block 3"));
        }

        public bool IsBlockchainValid()
        {
            Block currBlock;
            Block prevBlock;

            for (int block = 1; block < Blockchain.Count; block++)
            {
                currBlock = Blockchain[block];
                prevBlock = Blockchain[block - 1];

                // check that the hash of the previous block is the same as the hash stored in the
                // PreviousHash property of the current block
                if (currBlock.PreviousHash != prevBlock.Hash)
                {
                    Console.WriteLine("Current block's PreviousHash property is not equal to the previous block's actual Hash property.\nThe chain is invalid");
                    return false;
                }

                // check the value recorded in the current block's hash is the same as the computed
                // hash for the current block
                if (currBlock.Hash != currBlock.ComputeHash())
                {
                    Console.WriteLine("The current block's hash is not equal to it's actual computed hash.\nThe chain is invalid");
                    return false;
                }
            }

            return true;
        }

        private void AddGenesisBlock()
        {
            Blockchain.Add(new Block("0", "Genesis Block"));
        }
    }
}