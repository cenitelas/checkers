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
        public IEnumerable<MGame> Get()
        {
            
            gameService.CreateOrUpdate(new BGame() { HostId = 2, GameTypeId=1 });
            return AutoMapper<IEnumerable<BGame>, List<MGame>>.Map(gameService.GetList);
        }

        // GET: api/Game/5
        public MGame Get(int id)
        {
            return AutoMapper<BGame, MGame>.Map(gameService.Get, id);
        }

        public MGame Post(MGame value)
        {
            return AutoMapper<BGame, MGame>.Map(gameService.CreateOrUpdate(AutoMapper<MGame,BGame>.Map(value)));
        }

        // PUT: api/Game/5
        public MGame Put(int id, MGame value)
        {
            return AutoMapper<BGame, MGame>.Map(gameService.CreateOrUpdate(AutoMapper<MGame, BGame>.Map(value)));
        }

        public void Delete(int id)
        {
            gameService.Delete(id);
        }
    }
}
