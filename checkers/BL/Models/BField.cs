using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BField
    {
        public int Id { get; set; }
        public int FieldTypeId { get; set; }
        public int BoardId { get; set; }
        public int PozX { get; set; }
        public int PozY { get; set; }
        public int? CheckId { get; set; }
        public BCheck Check { get; set; }
    }
}
