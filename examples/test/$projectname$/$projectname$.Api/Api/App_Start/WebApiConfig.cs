using System.Web.Http;

namespace $projectname$.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Disable xml formating - this will make our lives easier.
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}