using BL.Interfaces;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL.Utils;
using VL.Models;

namespace VL.Controllers
{
    public class BoardController : ApiController
    {
        IService<BBoard> boardService;

        public BoardController(IService<BBoard> serv)
        {
            boardService = serv;
        }
        public IEnumerable<BBoard> GetBoards()
        {
            return boardService.GetList();
        }

        // GET: api/Board/5
        public BBoard GetBoard(int id=0)
        {
            return boardService.Get(id);
        }

        // POST: api/Board
        public BBoard PostBoard(BBoard value)
        {
            return boardService.CreateOrUpdate(value);
        }

        // PUT: api/Board/5
        public BBoard PutBoard(int id, BBoard value)
        {
            return boardService.CreateOrUpdate(value);
        }

        // DELETE: api/Board/5
        public void DeleteBoard(int id=0)
        {
            boardService.Delete(id);
        }
    }
}
