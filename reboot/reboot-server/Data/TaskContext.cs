using System;
using Microsoft.EntityFrameworkCore;
using reboot_server.Models;

namespace reboot_server.Data
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options)
            : base(options)
        {
        }

        public DbSet<TaskNote> Tasks { get; set; }

    }
}
