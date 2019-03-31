using System;

namespace BasicBlockchain
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine("Simple driver program to show the chain\n");
            BasicChain bc = new BasicChain();
            bc.AddSampleBlocks();

            foreach (var block in bc.Blockchain)
            {
                Console.ForegroundColor = ConsoleColor.DarkGreen;
                Console.WriteLine($"Hash:{block.Hash}\nPrevious Hash:{block.PreviousHash}\nData:{block.Data}\n");
                Console.ForegroundColor = ConsoleColor.White;
            }
        }
    }
}