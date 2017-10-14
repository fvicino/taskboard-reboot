using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebSocketManager;

namespace reboot_server.WebSocket
{

    public class SocketConnection : WebSocketConnection
    {
        public SocketConnection(WebSocketHandler handler) : base(handler)
        {
        }

        public string NickName { get; set; }

        public override async Task ReceiveAsync(string message)
        {
            
            // ## TODO Exclude the sender from the recipients

            foreach ( var conn in Handler.Connections.Where(m => ((SocketConnection)m).NickName != NickName) ){
               await conn.SendMessageAsync(message);
            }
        }


    }
}

