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
                context.SaveChanges();


            Users user = new Users() { Name = "admin", Password = "admin", RoleId = role.Id, Email = "test@test" };
            context.Users.Add(user);

            GameType gameType = new GameType() { Name = "Русские шашки" };
            context.GameType.Add(gameType);

            BoardType boardType = new BoardType() { Name = "8x8" };
            context.BoardType.Add(boardType);

            BoardType boardType2 = new BoardType() { Name = "100x100" };
            context.BoardType.Add(boardType2);

            CheckType black = new CheckType() { Name = "Черные" };
            context.CheckType.Add(black);

            CheckType white = new CheckType() { Name = "Белые" };
            context.CheckType.Add(white);
            }

            context.SaveChanges();
        }
    }
}
