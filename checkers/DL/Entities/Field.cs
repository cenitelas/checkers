using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Field
    {
        public int Id { get; set; }
        public int FieldTypeId { get; set; }
        public FieldType FieldType { get; set; }
        public int BoardId { get; set; }
        public Board Board { get; set; }
        public int PozX { get; set; }
        public int PozY { get; set; }
        public int? CheckId { get; set; }
        public Check Check { get; set; }
    }
}
