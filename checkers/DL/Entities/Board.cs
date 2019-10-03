using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Board
    {
        public int Id { get; set; }
        public int BoardTypeId { get; set; }
        public BoardType BoardType { get; set; }
        public ICollection<Field> Fields { get; set; }
    }
}
