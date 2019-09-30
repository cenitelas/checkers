using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BGame
    {
        public int Id { get; set; }
        public int CountPlayers { get; set; }
        public int BoardId { get; set; }
        public int HostId { get; set; }
        public int GameTypeId { get; set; }
        public bool isFinish { get; set; }
    }
}
