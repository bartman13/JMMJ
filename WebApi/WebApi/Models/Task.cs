using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi.Models
{
    public partial class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? EstimEndDate { get; set; }
        public bool IsFinished { get; set; }
        public int Priority { get; set; }
    }
}
