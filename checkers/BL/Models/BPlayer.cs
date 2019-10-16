using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BPlayer
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CheckTypeId { get; set; }
        public int? GameId { get; set; }
        public BGame Game { get; set; }

    }
}
