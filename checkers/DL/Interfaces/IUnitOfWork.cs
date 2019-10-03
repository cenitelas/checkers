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
        IRepository<Game> Game { get; }
        IRepository<GameType> GameType { get; }
        IRepository<Board> Board { get; }
        IRepository<BoardType> BoardType { get; }
        IRepository<Check> Check { get; }
        IRepository<CheckType> CheckType { get; }
        IRepository<Player> Player { get; }
        IRepository<Moves> Moves { get; }
        IRepository<Field> Field { get; }
        IRepository<FieldType> FieldType { get; }
        void Save();
    }
}
