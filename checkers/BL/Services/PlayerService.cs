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
                var player =  AutoMapper<Player, BPlayer>.Map(Database.Player.Get, id);
                if(player.GameId!=null)
                player.Game = AutoMapper<Game, BGame>.Map(Database.Game.Get, (int)player.GameId);
                return player;
            }
            return new BPlayer();
        }

        public IEnumerable<BPlayer> GetList()
        {
            List<BPlayer> players = new List<BPlayer>();

            foreach(var item in AutoMapper<IEnumerable<Player>, List<BPlayer>>.Map(Database.Player.GetAll))
            {
                players.Add(Get(item.Id));
            }
            return players;
        }
    }
}
