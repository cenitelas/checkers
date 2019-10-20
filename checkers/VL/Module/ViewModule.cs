using BL;
using BL.Interfaces;
using BL.Models;
using BL.Services;
using Ninject.Modules;
using Ninject.Web.WebApi.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace VL.Modules
{
    public class ViewModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IService<BUsers>>().To<UserService>();
            Bind<IService<BGame>>().To<GameService>();
            Bind<IService<BBoard>>().To<BoardService>();
            Bind<IService<BField>>().To<FieldService>();
            Bind<IService<BPlayer>>().To<PlayerService>();
            Bind<IService<BMoves>>().To<MoveService>();
            Bind<DefaultFilterProviders>().ToSelf().WithConstructorArgument(GlobalConfiguration.Configuration.Services.GetFilterProviders());
            Bind<DefaultModelValidatorProviders>().ToSelf().WithConstructorArgument(GlobalConfiguration.Configuration.Services.GetModelValidatorProviders());
        }
    }
}