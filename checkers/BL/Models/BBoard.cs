using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BBoard
    {
        public int Id { get; set; }
        public int BoardTypeId { get; set; }
        public List<BField> Fields { get; set; }
    }
}
