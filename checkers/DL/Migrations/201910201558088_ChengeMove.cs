namespace DL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChengeMove : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Moves", "EnemyCheckId", "dbo.Checks");
            DropForeignKey("dbo.Moves", "MoveCheckId", "dbo.Checks");
            DropIndex("dbo.Moves", new[] { "MoveCheckId" });
            DropIndex("dbo.Moves", new[] { "EnemyCheckId" });
            AddColumn("dbo.Moves", "MoveTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.Moves", "GameId", c => c.Int(nullable: false));
            CreateIndex("dbo.Moves", "GameId");
            AddForeignKey("dbo.Moves", "GameId", "dbo.Games", "Id", cascadeDelete: true);
            DropColumn("dbo.Moves", "MoveCheckId");
            DropColumn("dbo.Moves", "EnemyCheckId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Moves", "EnemyCheckId", c => c.Int());
            AddColumn("dbo.Moves", "MoveCheckId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Moves", "GameId", "dbo.Games");
            DropIndex("dbo.Moves", new[] { "GameId" });
            DropColumn("dbo.Moves", "GameId");
            DropColumn("dbo.Moves", "MoveTime");
            CreateIndex("dbo.Moves", "EnemyCheckId");
            CreateIndex("dbo.Moves", "MoveCheckId");
            AddForeignKey("dbo.Moves", "MoveCheckId", "dbo.Checks", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Moves", "EnemyCheckId", "dbo.Checks", "Id");
        }
    }
}
