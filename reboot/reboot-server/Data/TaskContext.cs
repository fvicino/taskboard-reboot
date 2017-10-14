using System;
using Microsoft.EntityFrameworkCore;

namespace reboot_server.Data
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options)
            : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }

    }
}
