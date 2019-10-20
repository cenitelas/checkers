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
            Moves moves = AutoMapper<BMoves, Moves>.Map(obj);
            if (obj.Id == 0)
            {
                Database.Moves.Create(moves);
            }
            else
            {
                Database.Moves.Update(moves);
            }
            Database.Save();
            return AutoMapper<Moves, BMoves>.Map(moves);
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
