using DL.Entities;
using DL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Interfaces
{
    public interface IUnitOfWork : IDisposable 
    {
        IRepository<Users> Users { get; }
        IRepository<Roles> Roles { get; }
        void Save();
    }
}
