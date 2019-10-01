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
        IMaxService<BCheck> checkService;

        public BoardController(IService<BBoard> serv, IMaxService<BCheck> serv2)
        {
            boardService = serv;
            checkService = serv2;
        }
        public IEnumerable<MBoard> GetBoards()
        {
            return AutoMapper<IEnumerable<BBoard>, List<MBoard>>.Map(boardService.GetList);
        }

        // GET: api/Board/5
        public MBoard GetBoard(int id=0)
        {
            MBoard board = AutoMapper<BBoard, MBoard>.Map(boardService.Get(id));
            board.Checkers = AutoMapper<IEnumerable<BCheck>, List<MCheck>>.Map(checkService.GetCollectionInParent, board.Id);
            return board;
        }

        // POST: api/Board
        public MBoard PostBoard(MBoard value)
        {
            return AutoMapper<BBoard, MBoard>.Map(boardService.CreateOrUpdate(AutoMapper<MBoard,BBoard>.Map(value)));
        }

        // PUT: api/Board/5
        public MBoard PutBoard(int id, MBoard value)
        {
            return AutoMapper<BBoard, MBoard>.Map(boardService.CreateOrUpdate(AutoMapper<MBoard, BBoard>.Map(value)));
        }

        // DELETE: api/Board/5
        public void DeleteBoard(int id=0)
        {
            boardService.Delete(id);
        }
    }
}
