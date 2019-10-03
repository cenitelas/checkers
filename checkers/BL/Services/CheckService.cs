using BL.Interfaces;
using BL.Models;
using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Utils;
using DL.Interfaces;

namespace BL.Services
{
    public class CheckService : IService<BCheck>
    {
        IUnitOfWork Database { get; set; }

        public CheckService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public BCheck CreateOrUpdate(BCheck obj)
        {
            Check check = AutoMapper<BCheck, Check>.Map(obj);
            if (obj.Id == 0)
            {
                Database.Check.Create(check);
            }else
            {
                Database.Check.Update(check);
            }
            Database.Save();
            return AutoMapper<Check, BCheck>.Map(check);
        }

        public void Delete(int id)
        {
            if (id > 0)
            {
                Database.Check.Delete(id);
            }
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        public BCheck Get(int id)
        {
            return AutoMapper<Check, BCheck>.Map(Database.Check.Get(id));
        }

        public IEnumerable<BCheck> GetList()
        {
            return AutoMapper<IEnumerable<Check>, List<BCheck>>.Map(Database.Check.GetAll);
        }
    }
}
