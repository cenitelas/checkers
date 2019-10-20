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
    public class MoveController : ApiController
    {
        IService<BMoves> moveService;

        public MoveController(IService<BMoves> serv)
        {
            moveService = serv;
        }

        public IEnumerable<BMoves> GetMoves()
        {
            return moveService.GetList();
        }

        // GET api/<controller>/5
        public BMoves GetMove(int id)
        {
            return moveService.Get(id);
        }

        // POST api/<controller>
        public BMoves Post(BMoves value)
        {
            return moveService.CreateOrUpdate(value);
        }

        // PUT api/<controller>/5
        public void Put(int id, BMoves value)
        {
            moveService.CreateOrUpdate(value);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            moveService.Delete(id);
        }
    }
}