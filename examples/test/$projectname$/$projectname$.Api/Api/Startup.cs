using Endobit.Framework;
using Endobit.Framework.Logging;
using Endobit.Framework.Web;
using Microsoft.Practices.Unity;
using Owin;
using System.Configuration;
using System.Data.Entity;
using System.Security.Principal;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace $projectname$.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var appConfig = ConfigurationManager.AppSettings;


            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
            $$? it.settings.swagger$$SwaggerConfig.Register(config);$$?$$
            
            UnityContainer container = new UnityContainer();
            UnityConfig.Register(container);
            config.DependencyResolver = new UnityResolver(container);

            // Uncomment to enable result wrapping
            //app.UseApiWrapping<ApiResponse>(config);

            if (bool.Parse(appConfig["LoggingEnabled"]))
            {
                var logger = new Logger(appConfig["InstanceName"], true);
                logger.AddTarget(new FileLoggingTarget(HostingEnvironment.MapPath(appConfig["FileLoggingPath"])));
                app.UseExceptionLogging(config, logger);
            }

            app.UseWebApi(config);
        }
    }
}