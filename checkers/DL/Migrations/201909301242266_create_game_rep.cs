namespace DL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class create_game_rep : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Boards",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BoardTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BoardTypes", t => t.BoardTypeId, cascadeDelete: true)
                .Index(t => t.BoardTypeId);
            
            CreateTable(
                "dbo.BoardTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Checks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PozX = c.Int(nullable: false),
                        PozY = c.Int(nullable: false),
                        BoardId = c.Int(nullable: false),
                        CheckTypeId = c.Int(nullable: false),
                        isDeath = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Boards", t => t.BoardId, cascadeDelete: true)
                .ForeignKey("dbo.CheckTypes", t => t.CheckTypeId, cascadeDelete: true)
                .Index(t => t.BoardId)
                .Index(t => t.CheckTypeId);
            
            CreateTable(
                "dbo.CheckTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Games",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CountPlayers = c.Int(nullable: false),
                        BoardId = c.Int(nullable: false),
                        HostId = c.Int(nullable: false),
                        GameTypeId = c.Int(nullable: false),
                        isFinish = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Boards", t => t.BoardId, cascadeDelete: true)
                .ForeignKey("dbo.GameTypes", t => t.GameTypeId, cascadeDelete: true)
                .Index(t => t.BoardId)
                .Index(t => t.GameTypeId);
            
            CreateTable(
                "dbo.GameTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Players",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        CheckTypeId = c.Int(nullable: false),
                        GameId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CheckTypes", t => t.CheckTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Games", t => t.GameId)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.CheckTypeId)
                .Index(t => t.GameId);
            
            CreateTable(
                "dbo.Moves",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PlayerId = c.Int(nullable: false),
                        MoveCheckId = c.Int(nullable: false),
                        EnemyCheckId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Checks", t => t.EnemyCheckId)
                .ForeignKey("dbo.Checks", t => t.MoveCheckId, cascadeDelete: true)
                .ForeignKey("dbo.Players", t => t.PlayerId, cascadeDelete: false)
                .Index(t => t.PlayerId)
                .Index(t => t.MoveCheckId)
                .Index(t => t.EnemyCheckId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Players", "UserId", "dbo.Users");
            DropForeignKey("dbo.Moves", "PlayerId", "dbo.Players");
            DropForeignKey("dbo.Moves", "MoveCheckId", "dbo.Checks");
            DropForeignKey("dbo.Moves", "EnemyCheckId", "dbo.Checks");
            DropForeignKey("dbo.Players", "GameId", "dbo.Games");
            DropForeignKey("dbo.Players", "CheckTypeId", "dbo.CheckTypes");
            DropForeignKey("dbo.Games", "GameTypeId", "dbo.GameTypes");
            DropForeignKey("dbo.Games", "BoardId", "dbo.Boards");
            DropForeignKey("dbo.Checks", "CheckTypeId", "dbo.CheckTypes");
            DropForeignKey("dbo.Checks", "BoardId", "dbo.Boards");
            DropForeignKey("dbo.Boards", "BoardTypeId", "dbo.BoardTypes");
            DropIndex("dbo.Moves", new[] { "EnemyCheckId" });
            DropIndex("dbo.Moves", new[] { "MoveCheckId" });
            DropIndex("dbo.Moves", new[] { "PlayerId" });
            DropIndex("dbo.Players", new[] { "GameId" });
            DropIndex("dbo.Players", new[] { "CheckTypeId" });
            DropIndex("dbo.Players", new[] { "UserId" });
            DropIndex("dbo.Games", new[] { "GameTypeId" });
            DropIndex("dbo.Games", new[] { "BoardId" });
            DropIndex("dbo.Checks", new[] { "CheckTypeId" });
            DropIndex("dbo.Checks", new[] { "BoardId" });
            DropIndex("dbo.Boards", new[] { "BoardTypeId" });
            DropTable("dbo.Moves");
            DropTable("dbo.Players");
            DropTable("dbo.GameTypes");
            DropTable("dbo.Games");
            DropTable("dbo.CheckTypes");
            DropTable("dbo.Checks");
            DropTable("dbo.BoardTypes");
            DropTable("dbo.Boards");
        }
    }
}
