using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Check
    {
        public int Id { get; set; }
        public int PozX { get; set; }
        public int PozY { get; set; }
        public int BoardId { get; set; }
        public Board Board { get; set; }
        public int CheckTypeId { get; set; }
        public CheckType CheckType { get; set; }
        public bool isDeath { get; set; }
    }
}
