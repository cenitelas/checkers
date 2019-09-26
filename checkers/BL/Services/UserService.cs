using BL.BModel;
using BL.Interfaces;
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
    public class UserService: IService<BUsers>
    {
        IUnitOfWork Database { get; set; }

        public UserService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public void CreateOrUpdate(BUsers obj)
        {
            if (obj.Id == 0)
            {

                Users user = new Users() { Name = obj.Name, Password = obj.Password, Email = obj.Email, RoleId=1};
                Database.Users.Create(user);
            }
            else
            {
                Users user = AutoMapper<BUsers, Users>.Map(obj);
                Database.Users.Update(user);
            }
            Database.Save();
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        public BUsers Get(int id)
        {
            if (id != 0)
            {
                return AutoMapper<Users, BUsers>.Map(Database.Users.Get, id);
            }
            return new BUsers();
        }

        public IEnumerable<BUsers> GetList()
        {
            return AutoMapper<IEnumerable<Users>, List<BUsers>>.Map(Database.Users.GetAll);
        }

        public void Delete(int id)
        {
            Database.Users.Delete(id);
            Database.Save();
        }
    }
}
