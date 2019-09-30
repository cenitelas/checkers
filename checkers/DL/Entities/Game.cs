using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Game
    {
        public int Id { get; set; }
        public int CountPlayers { get; set; }
        public int BoardId { get; set; }
        public Board Board { get; set; }
        public int HostId { get; set; }
        public int GameTypeId { get; set; }
        public GameType GameType { get; set; }
        public bool isFinish { get; set; }
        public virtual ICollection<Player> Players { get; set; }
    }
}
