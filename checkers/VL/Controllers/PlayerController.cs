using BL.Interfaces;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace VL.Controllers
{
    public class PlayerController : ApiController
    {
        IService<BPlayer> playerService;

        public PlayerController(IService<BPlayer> serv)
        {
            playerService = serv;
        }

        public IEnumerable<BPlayer> GetPlayers()
        {
            return playerService.GetList();
        }

        // GET api/<controller>/5
        public BPlayer GetPlayer(int id)
        {
            return playerService.Get(id);
        }

        public BPlayer GetPlayerUser(int id)
        {
            return playerService.GetList().Where(i=>i.UserId==id).FirstOrDefault();
        }

        public IEnumerable<BPlayer> GetPlayersGame(int id)
        {
            return playerService.GetList().Where(i => i.GameId == id);
        }
        // POST api/<controller>
        public BPlayer PostPlayer(BPlayer value)
        {
            return playerService.CreateOrUpdate(value);
        }

        // PUT api/<controller>/5
        public BPlayer PutPlayer(int id, BPlayer value)
        {
            return playerService.CreateOrUpdate(value);
        }

        // DELETE api/<controller>/5
        public void DeletePlayer(int id)
        {
            playerService.Delete(id);
        }
    }
}