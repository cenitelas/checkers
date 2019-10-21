namespace DL.Entities
{
    using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


    public partial class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public Roles Role { get; set; }
        public string Email { get; set; }
        public int Victory { get; set; }
    }
}