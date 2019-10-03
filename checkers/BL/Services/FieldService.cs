using BL.Interfaces;
using BL.Models;
using BL.Utils;
using DL.Entities;
using DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class FieldService : IService<BField>
    {
        IUnitOfWork Database { get; set; }

        public FieldService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public BField CreateOrUpdate(BField obj)
        {
            Field field = AutoMapper<BField, Field>.Map(obj);
            if (obj.Id == 0)
            {
                Database.Field.Create(field);
            }
            else
            {
                Database.Field.Update(field);
            }
            Database.Save();
            return AutoMapper<Field, BField>.Map(field);
        }

        public void Delete(int id)
        {
            if (id > 0)
            {
                Database.Field.Delete(id);
            }
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        public BField Get(int id)
        {
            return AutoMapper<Field, BField>.Map(Database.Field.Get(id));
        }

        public IEnumerable<BField> GetList()
        {
            return AutoMapper<IEnumerable<Field>, List<BField>>.Map(Database.Field.GetAll);
        }
    }
}
