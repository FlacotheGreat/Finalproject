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
        [Column(TypeName = "money")]
        public decimal Amount_Paid { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Created_At { get; set; }

        public Users Users { get; set; }
    }
}
