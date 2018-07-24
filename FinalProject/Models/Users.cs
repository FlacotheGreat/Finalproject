using System;
using System.Collections.Generic;

namespace FinalProject.Models
{
    public partial class Users
    {
        public Users()
        {
            StockPurchaseEntry = new HashSet<StockPurchaseEntry>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Pword { get; set; }
        public decimal Amount { get; set; }
        public DateTime Created_At { get; set; }

        public ICollection<StockPurchaseEntry> StockPurchaseEntry { get; set; }
    }
}
