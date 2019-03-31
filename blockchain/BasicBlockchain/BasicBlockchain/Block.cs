using System;
using System.Security.Cryptography;
using System.Text;

namespace BasicBlockchain
{
    /// <summary>
    /// Super simplified base block for the chain
    /// </summary>
    public sealed class Block
    {
        public Block(string previousHash, string data)
        {
            PreviousHash = previousHash;
            Data = data;
            Timestamp = (long)(DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds;
            Hash = GetSha256Hash();
        }

        public string Data { get; }
        public string Hash { get; }
        public string PreviousHash { get; }
        public long Timestamp { get; }

        public string ComputeHash()
        {
            return GetSha256Hash();
        }

        private string GetSha256Hash()
        {
            // Create a SHA256
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // Calculate hash
                string dataToEncode = PreviousHash + Timestamp + Data;
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(dataToEncode));

                // Convert byte array to a string
                StringBuilder sb = new StringBuilder();
                foreach (var t in bytes) sb.Append(t.ToString("X2"));
                return sb.ToString();
            }
        }
    }
}