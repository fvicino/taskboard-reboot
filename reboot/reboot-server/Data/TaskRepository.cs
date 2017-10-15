using System;
using System.Collections.Generic;
using System.Linq;
using reboot_server.Data.Abstraction;
using reboot_server.Models;

namespace reboot_server.Data
{
    // ## this class handles the data storage implementtion but the 
    //    controller/handle will depend on the interface so it can be replaced later on
    public class TaskRepository : IRepository<TaskNote>
    {
        // ## context should be injected by the DI container
        public TaskRepository(TaskContext context) => Context = context;

        TaskContext Context { get; }

        public TaskNote Get(int id) => Context.Tasks.FirstOrDefault((x) => x.ID == id );

        public List<TaskNote> GetList()
        {
            return Context.Tasks.AsEnumerable<TaskNote>().ToList();
        }

        public int Set(TaskNote obj)
        {
            // ## TODO need a incrementing number system since we are using InMemory context at the moment

            Context.Tasks.Add(obj);
            Context.SaveChanges();

            return -1;
        }
    }
}
