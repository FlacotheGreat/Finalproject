using System;
using System.Collections.Generic;

namespace FinalProject.Models
{
    public partial class StockPurchaseEntry
    {
        public int Id { get; set; }
        public int UsersId { get; set; }
        public string Company_Name { get; set; }
        public decimal Purchased_Amount { get; set; }
        public DateTime Created_At { get; set; }

        public Users Users { get; set; }
    }
}
