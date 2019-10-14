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
        public IEnumerable<BUsers> UsersGet()
        {
            return userService.GetList();
        }

        [HttpGet]
        public BUsers UserGet(int id)
        {
            return userService.Get(id);
        }

        // POST api/<controller>
        public BUsers UserPost(BUsers value)
        {
            return userService.CreateOrUpdate(value);
        }

        // PUT api/<controller>/5
        public void UserPut(int id, BUsers value)
        {
            userService.CreateOrUpdate(value);
        }

        // DELETE api/<controller>/5
        public void UserDelete(int id)
        {
            userService.Delete(id);
        }
    }
}