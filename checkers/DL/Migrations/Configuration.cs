namespace DL.Migrations
{
    using DL.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Model1>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Model1 context)
        {
            Roles role = new Roles() { Name = "Admin" };
            context.Roles.Add(role);
            context.SaveChanges();
            Users user = new Users() { Name = "admin", Password = "admin", RoleId = role.Id, Email = "test@test" };
            context.Users.Add(user);
            context.SaveChanges();
        }
    }
}
