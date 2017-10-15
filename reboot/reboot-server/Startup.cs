using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using reboot.Models;
using reboot_server.WebSocket;
using WebSocketManager;

namespace reboot
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
            services.AddMvc();

            // ## add websocket manager so it can load the SocketHandler into 
            //    the DI container as a singleton, that how it will manage the persistent connections
            services.AddWebSocketManager();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // ## Add the IServiceProvider interface to the constructor so we can 
        //    fish around in the DI container
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            // ## Use the dev exception for now    
            app.UseDeveloperExceptionPage();


            //## standard web stuff
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            // ## enable support for websockets
            app.UseWebSockets();

            // ## point requests on the path "/ws" to the SocketHandler instance 
            //   that was added to the container in the ConfigureServices method above
            app.MapWebSocketManager("/ws", serviceProvider.GetService<SocketHandler>());

        }
    }
}
