using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using WebSocketManager;

namespace reboot_sockets.WebSocket
{
    public class SocketHandler : WebSocketHandler
    {
        protected override int BufferSize { get => 1024 * 4; }

        public override async Task<WebSocketConnection> OnConnected(HttpContext context)
        {
            
            //TODO get the the name from the clainm on the token - not the request string

            var name = context.Request.Query["Name"];
            if (!string.IsNullOrEmpty(name))
            {
                var connection = Connections.FirstOrDefault(m => ((SocketConnection)m).NickName == name);

                if (connection == null)
                {
                    // ## the http request gets upgraded to websocket
                    var webSocket = await context.WebSockets.AcceptWebSocketAsync();

                    connection = new SocketConnection(this)
                    {
                        NickName = name,
                        WebSocket = webSocket
                    };

                    Connections.Add(connection);
                }

                return connection;
            }

            return null;
        }
    }
}
