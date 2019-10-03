namespace DL.Entities
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model1 : DbContext
    {
        public Model1()
            : base("checkers")
        {
        }

        public Model1(string connection)
            : base(connection)
        {
        }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Board> Board { get; set; }
        public virtual DbSet<Check> Check { get; set; }
        public virtual DbSet<CheckType> CheckType { get; set; }
        public virtual DbSet<GameType> GameType { get; set; }
        public virtual DbSet<BoardType> BoardType { get; set; }
        public virtual DbSet<Moves> Moves { get; set; }
        public virtual DbSet<Player> Player { get; set; }
        public virtual DbSet<Game> Game { get; set; }
        public virtual DbSet<Field> Field { get; set; }
        public virtual DbSet<FieldType> FieldType { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
