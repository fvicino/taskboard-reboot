using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using reboot_server.Data;
using reboot_server.Data.Abstraction;
using reboot_server.Models;

namespace reboot_server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //init the data in the context and add it to the container so it gets used by all dependants
            //I used a singleton lifecycle so the populate instance persits - only useful for tests!!
            services.AddSingleton(initTestDataContext());

            //## add our repositories here - there is only one right now!
            services.AddScoped(typeof(IRepository<TaskNote>), typeof(TaskRepository));

            //services.AddMvc().AddControllersAsServices(); // ## interesting but not too useful withou interception
            services.AddMvc();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // ## Add the IServiceProvider interface to the constructor so we can 
        //    fish around in the DI container
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // ## Use the dev exception in all configs for now    
            app.UseDeveloperExceptionPage();

            //## standard web stuff
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

        }


        private TaskContext initTestDataContext()
        {
            var options = new DbContextOptionsBuilder<TaskContext>()
                  .UseInMemoryDatabase("data")
                  .Options;
            var cnt = new TaskContext(options);
            cnt.Tasks.Add(new TaskNote { ID = 1,  Title = "Work on the eventbroker", AssignedToDisplay = "Frank", OriginalEstimate = "8", RemainingTime = "4", RemainingHoursHistory="", Project="Taskboard-Reboot", State="Active" });
            cnt.Tasks.Add(new TaskNote { ID = 2, Title = "Finish the render model", AssignedToDisplay = "Frank",  OriginalEstimate = "10", RemainingTime = "6", RemainingHoursHistory = "", Project = "Taskboard-Reboot", State = "Active" });
            cnt.Tasks.Add(new TaskNote { ID = 3,  Title = "Dragable Element", AssignedToDisplay = "Frank",  OriginalEstimate = "6", RemainingTime = "0", RemainingHoursHistory = "", Project = "Taskboard-Reboot", State = "Complete" });
            cnt.Tasks.Add(new TaskNote { ID = 4,  Title = "Add unique ids for the socket session", AssignedToDisplay = "",  OriginalEstimate = "2",RemainingTime = "", RemainingHoursHistory = "", Project = "Taskboard-Reboot", State = "Active" });
            cnt.Tasks.Add(new TaskNote { ID = 5,  Title = "Get some rest", AssignedToDisplay = "Frank",  OriginalEstimate = "24", RemainingTime = "", RemainingHoursHistory = "", Project = "Life", State = "Active" });
            cnt.SaveChanges();

            return cnt;

        }

    }
}
