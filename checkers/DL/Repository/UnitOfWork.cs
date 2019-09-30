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
        private IRepository<Board> boardRepository;
        private IRepository<BoardType> boardTypeRepository;
        private IRepository<Check> checkRepository;
        private IRepository<CheckType> checkTypeRepository;
        private IRepository<Game> gameRepository;
        private IRepository<GameType> gameTypeRepository;
        private IRepository<Moves> movesRepository;
        private IRepository<Player> playerRepository;
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

        public IRepository<Board> Board
        {
            get
            {
                if (boardRepository == null)
                    boardRepository = new Repository<Board>(db);
                return boardRepository;
            }
        }

        public IRepository<BoardType> BoardType
        {
            get
            {
                if (boardTypeRepository == null)
                    boardTypeRepository = new Repository<BoardType>(db);
                return boardTypeRepository;
            }
        }

        public IRepository<Game> Game
        {
            get
            {
                if (gameRepository == null)
                    gameRepository = new Repository<Game>(db);
                return gameRepository;
            }
        }

        public IRepository<GameType> GameType
        {
            get
            {
                if (gameTypeRepository == null)
                    gameTypeRepository = new Repository<GameType>(db);
                return gameTypeRepository;
            }
        }

        public IRepository<Check> Check
        {
            get
            {
                if (checkRepository == null)
                    checkRepository = new Repository<Check>(db);
                return checkRepository;
            }
        }

        public IRepository<CheckType> CheckType
        {
            get
            {
                if (checkTypeRepository == null)
                    checkTypeRepository = new Repository<CheckType>(db);
                return checkTypeRepository;
            }
        }

        public IRepository<Moves> Moves
        {
            get
            {
                if (movesRepository == null)
                    movesRepository = new Repository<Moves>(db);
                return movesRepository;
            }
        }

        public IRepository<Player> Player
        {
            get
            {
                if (playerRepository == null)
                    playerRepository = new Repository<Player>(db);
                return playerRepository;
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
