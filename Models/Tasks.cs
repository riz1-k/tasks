using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tasker.Models
{
    public class Tasks
    {
        public int TaskId { get; set; }
        public string TaskDesc { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string AssignedUserEmail { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string ResolvedDesc { get; set; }
    }
}