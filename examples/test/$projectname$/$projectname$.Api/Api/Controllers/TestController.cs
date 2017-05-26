using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace $projectname$.Api.Controllers
{
    public class TestController : ApiController
    {
        /// <summary>
        /// Tests the API
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string Get()
        {
            return "Everything works just fine!";
        }

    }
}