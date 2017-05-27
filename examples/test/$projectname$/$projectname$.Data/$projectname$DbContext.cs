using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace $projectname$.Data
{
    public class $projectname$DbContext : DbContext
    {
        public $projectname$DbContext()
            : base("$$=it.tokens.projectname.toUpperCase()$$_DB")
        {
            
        }
    }
}
