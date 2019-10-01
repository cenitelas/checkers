using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VL.Models
{
    public class MBoard
    {
        public int Id { get; set; }
        public int BoardTypeId { get; set; }
        public List<MCheck> Checkers { get; set; }
    }
}