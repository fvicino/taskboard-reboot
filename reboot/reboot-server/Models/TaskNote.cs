using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace reboot_server.Models
{
    public class TaskNote
    {
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public string OriginalEstimate { get; set; }
        public string AssignedToDisplay { get; set; }
        public string RemainingTime { get; set; }
        public string RemainingHoursHistory { get; set; } 
        public string Project { get; set; }
        public string State { get; set; }
    
    }
}