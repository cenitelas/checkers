using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Moves
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public Player Player { get; set; }
        public int MoveCheckId { get; set; }
        public Check MoveCheck { get; set; }
        public int? EnemyCheckId { get; set; }
        public Check EnemyCheck { get; set; }
        
    }
}
