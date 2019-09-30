using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VL.Models
{
    public class MGame
    {
        public int Id { get; set; }
        public int CountPlayers { get; set; }
        public int BoardId { get; set; }
        public int HostId { get; set; }
        public int GameTypeId { get; set; }
        public bool isFinish { get; set; }
    }
}