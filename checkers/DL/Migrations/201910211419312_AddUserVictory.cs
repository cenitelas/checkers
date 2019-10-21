namespace DL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserVictory : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Victory", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Victory");
        }
    }
}
