using BL.Interfaces;
using BL.Models;
using BL.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VL.Models;

namespace VL.Controllers
{
    public class GameController : ApiController
    {
        IService<BGame> gameService;

        public GameController(IService<BGame> serv)
        {
            gameService = serv;
        }

        public IEnumerable<BGame> GetGames()
        {
            return gameService.GetList();
        }

        // GET: api/Game/5
        public BGame GetGame(int id=0)
        {
            return gameService.Get(id);
        }

        public BGame PostGame(BGame value)
        {
            return gameService.CreateOrUpdate(value);
        }

        // PUT: api/Game/5
        public BGame PutGame(int id, BGame value)
        {
            return gameService.CreateOrUpdate(value);
        }

        public void DeleteGame(int id=0)
        {
            gameService.Delete(id);
        }
    }
}
