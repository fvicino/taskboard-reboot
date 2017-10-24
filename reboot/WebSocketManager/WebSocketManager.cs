using Microsoft.AspNetCore.Http; 
using System; 
using System.Collections.Generic; 
using System.Linq; 
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace WebSocketManager
{

    /// <summary> 
    /// This should the last middleware in the pipeline when use websocket 
    /// </summary> 
    public class WebSocketMiddleware 
    { 
        private readonly RequestDelegate _next; 
        private WebSocketHandler _webSocketHandler { get; set; } 
 
        public WebSocketMiddleware(RequestDelegate next, WebSocketHandler webSocketHandler) 
        { 
            _next = next; 
            _webSocketHandler = webSocketHandler; 
        } 
 
        public async Task Invoke(HttpContext context) 
        { 
            if (context.WebSockets.IsWebSocketRequest) 
            { 


                var connection = await _webSocketHandler.OnConnected(context); 
                if (connection != null) 
                { 
                    await _webSocketHandler.ListenConnection(connection); 
                } 
                else 
                { 
                    context.Response.StatusCode = 404; 
                } 
            } 
        } 
    } 

    public static class Extensions 
    { 
        public static IApplicationBuilder MapWebSocketManager(this IApplicationBuilder app, PathString path, WebSocketHandler handler) 
        { 
            // ## map url path to the handle for websockets
            return app.Map(path, (_app) => _app.UseMiddleware<WebSocketMiddleware>(handler)); 
        } 
 
        public static IServiceCollection AddWebSocketManager(this IServiceCollection services) 
        { 
            var handlerBaseType = typeof(WebSocketHandler); 
 
            //##  this code is looking in the assemby that was first executed for a class 
            //    that inherits from the abstract WebSocketHandler class and then adds it 
            //    to the DI container as a singleton

            foreach (var type in Assembly.GetEntryAssembly().ExportedTypes) 
            { 
                if (type.GetTypeInfo().BaseType == handlerBaseType) 
                { 
                    services.AddSingleton(type); 
                } 
            } 
             
            return services; 
        } 
    } 

} 


