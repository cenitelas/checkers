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
    public class MoveService : IService<BMoves>
    {
        IUnitOfWork Database { get; set; }

        public MoveService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public BMoves CreateOrUpdate(BMoves obj)
        {
            Moves move = new Moves();
            if (obj.Id == 0)
            {
                move = new Moves() { GameId=obj.GameId, PlayerId=obj.PlayerId, MoveTime=DateTime.Now.AddMinutes(1)};
                Database.Moves.Create(move);
            }
            else
            {
                Player pl = Database.Player.Find(i => i.GameId == obj.GameId && i.Id != obj.PlayerId).FirstOrDefault();
                move = Database.Moves.Get(obj.Id);
                move.MoveTime = DateTime.Now.AddMinutes(1);
                move.PlayerId = pl.Id;
                Database.Moves.Update(move);
            }
            Database.Save();
            return AutoMapper<Moves, BMoves>.Map(move);
        }

        public void Delete(int id)
        {
            if (id > 0)
            {
                Database.Moves.Delete(id);
            }
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        public BMoves Get(int id)
        {
            Moves move = Database.Moves.Find(i => i.GameId == id).FirstOrDefault();
            if (move.MoveTime <= DateTime.Now)
            {
                Player pl = Database.Player.Find(i => i.GameId == move.GameId && i.Id != move.PlayerId).FirstOrDefault();
                move.MoveTime = DateTime.Now.AddMinutes(1);
                move.PlayerId = pl.Id;
                Database.Save();
            }
            return AutoMapper<Moves, BMoves>.Map(move);
        }

        public IEnumerable<BMoves> GetList()
        {
            return AutoMapper<IEnumerable<Moves>, List<BMoves>>.Map(Database.Moves.GetAll);
        }
    }
}
