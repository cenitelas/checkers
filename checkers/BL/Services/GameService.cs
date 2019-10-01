using BL.Interfaces;
using BL.Models;
using BL.Utils;
using DL.Entities;
using DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class GameService : IService<BGame>
    {
        IUnitOfWork Database { get; set; }

        public GameService(IUnitOfWork uow)
        {
            Database = uow;
        }
        public BGame CreateOrUpdate(BGame obj)
        {
            if (obj.Id == 0)
            {
                Board board = new Board();
                if (obj.GameTypeId == 1 || obj.GameTypeId==2)
                {
                    board.BoardTypeId = 1;
                    Database.Board.Create(board);
                    Database.Save();
                    for(int i = 0; i < 8; i++)
                    {
                        for (int j = 0; j < 8; j+=2)
                        {
                            if (i < 3) {
                                if (i != 1)
                                {
                                    Check check = new Check() { BoardId = board.Id, isDeath = false, CheckTypeId = 1, PozX = j, PozY = i};
                                    Database.Check.Create(check);
                                }
                                else
                                {
                                    Check check = new Check() { BoardId = board.Id, isDeath = false, CheckTypeId = 1, PozX = j+1, PozY = i };
                                    Database.Check.Create(check);
                                }
                            }
                            if (i > 4)
                            {
                                if (i != 6)
                                {
                                    Check check = new Check() { BoardId = board.Id, isDeath = false, CheckTypeId = 2, PozX = j, PozY = i };
                                    Database.Check.Create(check);
                                }
                                else
                                {
                                    Check check = new Check() { BoardId = board.Id, isDeath = false, CheckTypeId = 2, PozX = j + 1, PozY = i };
                                    Database.Check.Create(check);
                                }
                            }
                        }
                    }
                }
                else
                {

                }
          
                Game game = new Game() { BoardId = board.Id, CountPlayers = 1, GameTypeId = obj.GameTypeId, HostId = obj.HostId, isFinish = false };
                Database.Game.Create(game);
                Database.Save();
                Player player = Database.Player.Find(i => i.GameId == null && i.UserId == game.HostId).FirstOrDefault();
                player.GameId = game.Id;
                Database.Player.Update(player);
                Database.Save();
                return AutoMapper<Game, BGame>.Map(game);
            }else
            {
                Game game = AutoMapper<BGame, Game>.Map(obj);
                Database.Game.Update(game);
                Database.Save();
                return AutoMapper<Game, BGame>.Map(game);
            }
        }

        public void Delete(int id)
        {
            Database.Game.Delete(id);
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        public BGame Get(int id)
        {
            return AutoMapper<Game, BGame>.Map(Database.Game.Get, id);
        }

        public IEnumerable<BGame> GetList()
        {
            return AutoMapper<IEnumerable<Game>, List<BGame>>.Map(Database.Game.GetAll);
        }
    }
}
