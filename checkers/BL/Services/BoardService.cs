using BL.Interfaces;
using BL.Models;
using DL.Entities;
using DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Utils;

namespace BL.Services
{
    public class BoardService : IService<BBoard>
    {
        IUnitOfWork Database { get; set; }

        public BoardService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public BBoard CreateOrUpdate(BBoard obj)
        {
            Board board = AutoMapper<BBoard, Board>.Map(obj);
            if (obj.Id == 0)
            {
                Database.Board.Create(board);
            }
            else
            { 
                Database.Board.Update(board);               
            }
            Database.Save();
            return AutoMapper<Board, BBoard>.Map(board);
        }

        public void Delete(int id)
        {
            if(id>0)
            Database.Board.Delete(id);
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        public BBoard Get(int id)
        {
            if (id > 0)
                return AutoMapper<Board, BBoard>.Map(Database.Board.Get(id));
            else
                return new BBoard();
        }

        public IEnumerable<BCheck> GetChildCollection(int id)
        {
            return AutoMapper<IEnumerable<Check>, List<BCheck>>.Map(Database.Check.Find(i => i.BoardId == id));
        }

        public IEnumerable<BBoard> GetList()
        {
            return AutoMapper<IEnumerable<Board>, List<BBoard>>.Map(Database.Board.GetAll);
        }
    }
}
