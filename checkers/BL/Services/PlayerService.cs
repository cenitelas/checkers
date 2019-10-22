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
            Player player = new Player();
            if (obj.Id == 0)
            {
                Player enemy = Database.Player.Find(i => i.GameId == obj.GameId).FirstOrDefault();
                player = new Player() { CheckTypeId = (enemy.CheckTypeId==1)?2:1, GameId = obj.GameId, UserId = obj.UserId };
                Database.Player.Create(player);
                Database.Save();
                Database.Moves.Create(new Moves() { GameId = (int)obj.GameId, MoveTime = DateTime.Now.AddMinutes(1), PlayerId = (player.CheckTypeId == 1) ? player.Id : enemy.Id });
            }
            else
            {
                player = Database.Player.Get(obj.Id);
                Database.Player.Update(player);
            }
            Database.Game.Get((int)obj.GameId).CountPlayers = 2;
            Database.Save();
            BPlayer bplayer = new BPlayer() { CheckTypeId = player.CheckTypeId, GameId = player.GameId, UserId = player.UserId, Id = player.Id };
            return bplayer;
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
                if(!player.Game.isFinish)
                return player;
            }
            return null;
        }

        public IEnumerable<BPlayer> GetList()
        {
            IEnumerable<Player> players = Database.Player.GetAll();
            List<BPlayer> bPlayers = new List<BPlayer>();
            foreach(var item in players)
            {
                if (Database.Game.Get((int)item.GameId).isFinish == false)
                {
                    bPlayers.Add(new BPlayer() { CheckTypeId=item.CheckTypeId, GameId=item.GameId, Id=item.Id, UserId=item.UserId});
                }
            }
            return bPlayers;
        }
    }
}
