using DL.Entities;
using DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {

        private Model1 db;

        public Repository(Model1 context)
        {
            this.db = context;
        }

        public void Create(T item)
        {
            db.Set<T>().Add(item);
        }

        public void Delete(int id)
        {
            T obj = db.Set<T>().Find(id);
            if (obj != null)
                db.Set<T>().Remove(obj);
        }

        public T Get(int id)
        {
            return db.Set<T>().Find(id);
        }

        public IEnumerable<T> GetAll()
        {
            return db.Set<T>();
        }

        public IEnumerable<T> Find(Func<T, Boolean> predicate)
        {
            return db.Set<T>().Where(predicate).ToList();
        }

        public void Update(T item)
        {
            db.Entry(item).State = EntityState.Modified;
        }
    }
}
