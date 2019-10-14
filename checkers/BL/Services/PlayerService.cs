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
    public class PlayerService : IService<BPlayer>
    {
        IUnitOfWork Database { get; set; }

        public PlayerService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public BPlayer CreateOrUpdate(BPlayer obj)
        {
            Player player = AutoMapper<BPlayer, Player>.Map(obj);
            if (obj.Id == 0)
            {
                Database.Player.Create(player);
            }
            else
            {
                Database.Player.Update(player);
            }
            Database.Save();
            return AutoMapper<Player, BPlayer>.Map(player);
        }

        public void Delete(int id)
        {
            if (id != 0)
            {
                Database.Player.Delete(id);
            }
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        public BPlayer Get(int id)
        {
            if (id != 0)
            {
                return AutoMapper<Player, BPlayer>.Map(Database.Player.Get, id);
            }
            return new BPlayer();
        }

        public IEnumerable<BPlayer> GetList()
        {
            return AutoMapper<IEnumerable<Player>, List<BPlayer>>.Map(Database.Player.GetAll);
        }
    }
}
