using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VL.Models
{
    public class MUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public string Email { get; set; }
    }
}