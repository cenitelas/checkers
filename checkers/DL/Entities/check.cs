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
        public int CheckTypeId { get; set; }
        public CheckType CheckType { get; set; }
    }
}
