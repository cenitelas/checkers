namespace DL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addqueincheck : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Checks", "IsQuein", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Checks", "IsQuein");
        }
    }
}
