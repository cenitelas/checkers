using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BMoves
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public DateTime MoveTime { get; set; }
        public int GameId { get; set; }
    }
}
