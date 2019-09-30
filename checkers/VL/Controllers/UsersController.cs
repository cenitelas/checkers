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
    public class UsersController : ApiController
    {
        IService<BUsers> userService;

        public UsersController(IService<BUsers> serv)
        {
            userService = serv;
        }
        public IEnumerable<BUsers> Get()
        {
            return userService.GetList();
        }

        // GET api/<controller>/5
        public BUsers Get(int id)
        {
            return userService.Get(id);
        }

        // POST api/<controller>
        public void Post(BUsers value)
        {
            userService.CreateOrUpdate(value);
        }

        // PUT api/<controller>/5
        public void Put(int id, BUsers value)
        {
            userService.CreateOrUpdate(value);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            userService.Delete(id);
        }
    }
}