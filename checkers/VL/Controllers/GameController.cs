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

        public IEnumerable<MGame> GetGames()
        {
            return AutoMapper<IEnumerable<BGame>, List<MGame>>.Map(gameService.GetList);
        }

        // GET: api/Game/5
        public MGame GetGame(int id=0)
        {
            return AutoMapper<BGame, MGame>.Map(gameService.Get, id);
        }

        public MGame PostGame(MGame value)
        {
            return AutoMapper<BGame, MGame>.Map(gameService.CreateOrUpdate(AutoMapper<MGame,BGame>.Map(value)));
        }

        // PUT: api/Game/5
        public MGame PutGame(int id, MGame value)
        {
            return AutoMapper<BGame, MGame>.Map(gameService.CreateOrUpdate(AutoMapper<MGame, BGame>.Map(value)));
        }

        public void DeleteGame(int id=0)
        {
            gameService.Delete(id);
        }
    }
}
