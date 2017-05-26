using System.Web.Http;
using Swashbuckle.Application;
using System.Linq;
using System.Web.Hosting;
using System.IO;
using System.Xml.XPath;

namespace $projectname$.Api
{
    public class SwaggerConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config 
                .EnableSwagger(c =>
                    {
                        c.SingleApiVersion("v1", "$projectname$");
                        c.IncludeXmlComments(() => GetXmlDoc());
                        c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                    })
                .EnableSwaggerUi();
        }

        private static XPathDocument GetXmlDoc() => new XPathDocument(
            new FileStream(
                new DirectoryInfo(
                    HostingEnvironment.MapPath("~/App_Data/Doc"))
                .EnumerateFiles()
                .Where(x => x.Extension.ToLower() == ".xml")
                .First()
                .FullName, FileMode.Open));
    }
}
