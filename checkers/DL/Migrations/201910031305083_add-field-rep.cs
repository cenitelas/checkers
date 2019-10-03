namespace DL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addfieldrep : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Checks", "BoardId", "dbo.Boards");
            DropIndex("dbo.Checks", new[] { "BoardId" });
            CreateTable(
                "dbo.Fields",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FieldTypeId = c.Int(nullable: false),
                        BoardId = c.Int(nullable: false),
                        PozX = c.Int(nullable: false),
                        PozY = c.Int(nullable: false),
                        CheckId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Boards", t => t.BoardId, cascadeDelete: true)
                .ForeignKey("dbo.Checks", t => t.CheckId)
                .ForeignKey("dbo.FieldTypes", t => t.FieldTypeId, cascadeDelete: true)
                .Index(t => t.FieldTypeId)
                .Index(t => t.BoardId)
                .Index(t => t.CheckId);
            
            CreateTable(
                "dbo.FieldTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropColumn("dbo.Checks", "PozX");
            DropColumn("dbo.Checks", "PozY");
            DropColumn("dbo.Checks", "BoardId");
            DropColumn("dbo.Checks", "isDeath");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Checks", "isDeath", c => c.Boolean(nullable: false));
            AddColumn("dbo.Checks", "BoardId", c => c.Int(nullable: false));
            AddColumn("dbo.Checks", "PozY", c => c.Int(nullable: false));
            AddColumn("dbo.Checks", "PozX", c => c.Int(nullable: false));
            DropForeignKey("dbo.Fields", "FieldTypeId", "dbo.FieldTypes");
            DropForeignKey("dbo.Fields", "CheckId", "dbo.Checks");
            DropForeignKey("dbo.Fields", "BoardId", "dbo.Boards");
            DropIndex("dbo.Fields", new[] { "CheckId" });
            DropIndex("dbo.Fields", new[] { "BoardId" });
            DropIndex("dbo.Fields", new[] { "FieldTypeId" });
            DropTable("dbo.FieldTypes");
            DropTable("dbo.Fields");
            CreateIndex("dbo.Checks", "BoardId");
            AddForeignKey("dbo.Checks", "BoardId", "dbo.Boards", "Id", cascadeDelete: true);
        }
    }
}
