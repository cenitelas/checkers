using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace VL.Controllers
{
    public class ChatController : ApiController
    {
        static List<BChat> chats = new List<BChat>();
        public BChat GetChat(int id)
        {
            return chats.Find(i => i.Id == id);
        }

        public void PostChat(BChat value)
        {
            if (!chats.Any(i => i.Id == value.Id))
            {
                chats.Add(value);
            }
            else
            {
                chats.RemoveAll(i => i.Id == value.Id);
                chats.Add(value);
            }
        }
    }
}