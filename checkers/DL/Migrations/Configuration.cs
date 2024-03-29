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
            if (!context.Roles.Any(i => i.Name == "Admin"))
            {
                context.Roles.Add(role);
                context.Roles.Add(new Roles() { Name = "User" });
                context.SaveChanges();


                Users user = new Users() { Name = "admin", Password = "admin", RoleId = role.Id, Email = "test@test" };
                context.Users.Add(user);

                context.GameType.Add(new GameType() { Name = "������� �����" });

                context.BoardType.Add(new BoardType() { Name = "8x8" });

                context.BoardType.Add(new BoardType() { Name = "100x100" });

                context.CheckType.Add(new CheckType() { Name = "�����" });
                context.CheckType.Add(new CheckType() { Name = "������" });

                context.FieldType.Add(new FieldType() { Name = "������" });
                context.FieldType.Add(new FieldType() { Name = "�����" });
            }

            context.SaveChanges();
        }
    }
}
