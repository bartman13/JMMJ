using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.TransferObjects
{
    
    public class FilterTaskParameters : QueryStringParameters
    {
        public bool? IsFinished { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

    }
}
