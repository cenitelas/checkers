using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VL.Models
{
    public class MCheck
    {
        public int Id { get; set; }
        public int PozX { get; set; }
        public int PozY { get; set; }
        public int BoardId { get; set; }
        public int CheckTypeId { get; set; }
        public bool isDeath { get; set; }
    }
}