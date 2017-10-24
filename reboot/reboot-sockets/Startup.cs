using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using reboot_sockets.WebSocket;
using WebSocketManager;

namespace reboot_sockets
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            // ## add websocket manager so it can load the SocketHandler into 
            //    the DI container as a singleton, that how it will manage the persistent connections
            services.AddWebSocketManager();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // ## enable support for websockets
            app.UseWebSockets();

            // ## point requests on the path "/ws" to the SocketHandler instance 
            //   that was added to the container in the ConfigureServices method above
            app.MapWebSocketManager("/ws", serviceProvider.GetService<SocketHandler>());
        }
    }
}
