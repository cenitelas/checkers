using DL.Entities;
using DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private Model1 db;
        private IRepository<Users> userRepository;
        private IRepository<Roles> roleRepository;

        public UnitOfWork(string connection)
        {
            db = new Model1(connection);
        }

        public IRepository<Users> Users
        {
            get
            {
                if (userRepository == null)
                    userRepository = new Repository<Users>(db);
                return userRepository;
            }
        }

        public IRepository<Roles> Roles
        {
            get
            {
                if (roleRepository == null)
                    roleRepository = new Repository<Roles>(db);
                return roleRepository;
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
