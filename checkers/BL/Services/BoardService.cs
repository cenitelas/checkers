using BL.Interfaces;
using BL.Models;
using DL.Entities;
using DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Utils;

namespace BL.Services
{
    public class BoardService : IService<BBoard>
    {
        IUnitOfWork Database { get; set; }

        public BoardService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public BBoard CreateOrUpdate(BBoard obj)
        {
            Board board = new Board();
            if (obj.Id == 0)
            {
                board = new Board() { BoardTypeId = obj.BoardTypeId };
                Database.Board.Create(board);
            }
            else
            {
                board = Database.Board.Get(obj.Id);
                for(int i=0;i<obj.Fields.Count;i++)
                {
                    Field f = Database.Field.Get(obj.Fields[i].Id);
                    f.CheckId = obj.Fields[i].CheckId;
                    if (obj.Fields[i].Check == null)
                    {
                        f.CheckId = null;
                    }
                    Database.Field.Update(f);
                }
                if (obj.Fields.Where(i => i.Check!=null && i.Check.CheckTypeId == 1).ToList().Count==0)
                {
                    Game game = Database.Game.Find(i => i.BoardId == obj.Id).FirstOrDefault();
                    game.isFinish = true;
                    Users user = Database.Users.Get(Database.Player.Find(i => i.GameId == game.Id && i.CheckTypeId == 2).FirstOrDefault().UserId);
                    user.Victory += 1;
                    Database.Game.Update(game);
                    Database.Users.Update(user);
                }
                if (obj.Fields.Where(i => i.Check != null && i.Check.CheckTypeId == 2).ToList().Count == 0)
                {
                    Game game = Database.Game.Find(i => i.BoardId == obj.Id).FirstOrDefault();
                    game.isFinish = true;
                    Users user = Database.Users.Get(Database.Player.Find(i => i.GameId == game.Id && i.CheckTypeId == 1).FirstOrDefault().UserId);
                    user.Victory += 1;
                    Database.Game.Update(game);
                    Database.Users.Update(user);
                }
                Database.Board.Update(board);               
            }
            Database.Save();
            obj = new BBoard() { Id = board.Id, BoardTypeId = board.BoardTypeId };
            obj.Fields = AutoMapper<IEnumerable<Field>, List<BField>>.Map(Database.Field.Find(i => i.BoardId == board.Id));
            obj.Fields.Where(z => z.CheckId != null).ToList().ForEach(i => i.Check = AutoMapper<Check, BCheck>.Map(Database.Check.Get((int)i.CheckId)));
            return obj;
        }

        public void Delete(int id)
        {
            if(id>0)
            Database.Board.Delete(id);
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        public BBoard Get(int id)
        {
            if (id > 0)
            {
                BBoard board = AutoMapper<Board, BBoard>.Map(Database.Board.Get(id));
                board.Fields = AutoMapper<IEnumerable<Field>, List<BField>>.Map(Database.Field.Find(i => i.BoardId == id));
                board.Fields.Where(z=>z.CheckId!=null).ToList().ForEach(i => i.Check=AutoMapper<Check,BCheck>.Map(Database.Check.Get((int)i.CheckId)));
                return board;
            }
            else
                return new BBoard();
        }

        public IEnumerable<BBoard> GetList()
        {
            return AutoMapper<IEnumerable<Board>, List<BBoard>>.Map(Database.Board.GetAll);
        }
    }
}
