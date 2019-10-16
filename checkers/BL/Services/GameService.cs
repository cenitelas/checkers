﻿using BL.Interfaces;
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
                    int type = 1;
                    for(int i = 0; i < 8; i++)
                    {
                        type = (type == 1) ? 2 : 1;
                        for (int j = 0; j < 8; j++)
                        {
                            type = (type == 1) ? 2 : 1;
                            Database.Field.Create(new Field() { BoardId = board.Id, FieldTypeId = type, PozX = j, PozY = i });
                        }
                    }
                    Database.Save();
                    List<Field> fields = Database.Field.Find(i => i.BoardId == board.Id).ToList();
                    for (int i = 0; i < 24; i++)
                    {
                        if (fields[i].FieldTypeId == 2)
                        {
                            Check check = new Check() { CheckTypeId = 1 };
                            Database.Check.Create(check);
                            Database.Save();
                            fields[i].CheckId = check.Id;
                            Database.Field.Update(fields[i]);
                        }
                    }
                    for (int i = 40; i < 64; i++)
                    {
                        if (fields[i].FieldTypeId == 2)
                        {
                            Check check = new Check() { CheckTypeId = 2 };
                            Database.Check.Create(check);
                            Database.Save();
                            fields[i].CheckId = check.Id;
                            Database.Field.Update(fields[i]);
                        }
                    }
                }
                else
                {

                }
          
                Game game = new Game() { BoardId = board.Id, CountPlayers = 1, GameTypeId = obj.GameTypeId, HostId = obj.HostId, isFinish = false };
                Database.Game.Create(game);
                Database.Save();
                Database.Player.Create(new Player() { CheckTypeId=1, GameId=game.Id, UserId = game.HostId});
                Database.Save();
                BGame bGame = AutoMapper<Game, BGame>.Map(game);
                bGame.Board = AutoMapper<Board, BBoard>.Map(board);
                return bGame;
            }
            else
            {
                Game game = AutoMapper<BGame, Game>.Map(obj);
                Database.Game.Update(game);
                Database.Save();
                return obj;
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
            BGame game = AutoMapper<Game, BGame>.Map(Database.Game.Get, id);
            if(game.BoardId!=null)
            game.Board = AutoMapper<Board, BBoard>.Map(Database.Board.Get((int)game.BoardId));
            game.Board.Fields = AutoMapper<IEnumerable<Field>, List<BField>>.Map(Database.Field.Find(i => i.BoardId == game.Board.Id));
            game.Board.Fields.Where(z => z.CheckId != null).ToList().ForEach(i => i.Check = AutoMapper<Check, BCheck>.Map(Database.Check.Get((int)i.CheckId)));
            return game;
        }

        public IEnumerable<BGame> GetList()
        {
            return AutoMapper<IEnumerable<Game>,List<BGame>>.Map(Database.Game.GetAll());
        }
    }
}
