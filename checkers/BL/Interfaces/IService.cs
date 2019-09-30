using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IService<T> where T :class
    {
        T CreateOrUpdate(T obj);
        T Get(int id);
        IEnumerable<T> GetList();
        void Delete(int id);
        void Dispose();
    }
}
