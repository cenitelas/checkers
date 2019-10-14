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
    public class UserService: IService<BUsers>
    {
        IUnitOfWork Database { get; set; }

        public UserService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public BUsers CreateOrUpdate(BUsers obj)
        {
            Users user = Database.Users.Find(i => i.Name == obj.Name && i.Password == obj.Password).FirstOrDefault();
            if (user == null)
            {

                user = new Users() { Name = obj.Name, Password = obj.Password, Email = "", RoleId=2};
                Database.Users.Create(user);
                Database.Save();
                return AutoMapper<Users, BUsers>.Map(user);
            }
            else
            {
                return AutoMapper<Users, BUsers>.Map(user);
            }

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
