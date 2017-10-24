using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reboot_sockets.WebSocket;
using WebSocketManager;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reboot_server.Controllers
{
    public class SocketMonitorController : Controller
    {
        public SocketMonitorController(SocketHandler handler)
        {
            //## TODO get the container to inject the WebSocketHandler
            // and use that to get to the websocket connection list. 
            // We can provide an api to monitor, intercept and interact.
        }

        // GET: /<controller>/
        public JsonResult Index()
        {
            return Json("");
        }
    }
}
