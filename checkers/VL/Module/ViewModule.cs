using BL;
using BL.BModel;
using BL.Interfaces;
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
          
            Bind<DefaultFilterProviders>().ToSelf().WithConstructorArgument(GlobalConfiguration.Configuration.Services.GetFilterProviders());
            Bind<DefaultModelValidatorProviders>().ToSelf().WithConstructorArgument(GlobalConfiguration.Configuration.Services.GetModelValidatorProviders());
        }
    }
}