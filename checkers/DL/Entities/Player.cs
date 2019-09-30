using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Player
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public Users User { get; set; }
        public int CheckTypeId { get; set; }
        public CheckType CheckType { get; set; }
        public int? GameId { get; set; }
        public Game Game{ get; set; }
        public ICollection<Moves> Moves { get; set; }

    }
}
