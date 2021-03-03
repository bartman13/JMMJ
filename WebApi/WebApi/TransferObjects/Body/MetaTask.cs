using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.TransferObjects.Body
{
    public class MetaTask
    {
        [Required]
        [StringLength(50)]
        public string Title { get; set; }
        [Required]        
        public string Description { get; set; }
        public DateTime EstimEndDate { get; set; }
        public bool IsFinished { get; set; } = false;
        public int Priority { get; set; } = 10;
    }
}
