using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    public partial class StockPurchaseEntry
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UsersId { get; set; }
        public string Company_Name { get; set; }
        public decimal Purchased_Amount { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
       private DateTime _returnDate = DateTime.MinValue;


        public DateTime Created_At { get; set; }

        public Users Users { get; set; }
    }
}
