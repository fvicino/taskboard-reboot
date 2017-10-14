using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using reboot.Models;

//[{"ID":1,"AssignedToDisplay":"","RemainingTime":"","Project":"projectX","X":"5px","Y":"90px","Transform":"transformed-right","EditURL":"http://bing.com","State":"Active","RemainingHoursHistory":[],"OriginalEstimate":"","Title":"Build Taskboard ","AssignedTo":"Franco"},{"ID":2,"AssignedToDisplay":"","RemainingTime":"","Project":"projectX","X":"5px","Y":"90px","Transform":"transformed-right","EditURL":"http://bing.com","State":"Active","RemainingHoursHistory":[],"OriginalEstimate":"","Title":"Take a break","AssignedTo":"Franco"}]

namespace reboot_server.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("/state")]
        public JsonResult State()
        {

            //use the test resource string for now
            string jsnStringData = "[{\"ID\":1,\"AssignedToDisplay\":\"\",\"RemainingTime\":\"\",\"Project\":\"projectX\",\"X\":\"5px\",\"Y\":\"90px\",\"Transform\":\"transformed-right\",\"EditURL\":\"http://bing.com\",\"State\":\"Active\",\"RemainingHoursHistory\":[],\"OriginalEstimate\":\"\",\"Title\":\"Build Taskboard \",\"AssignedTo\":\"Franco\"},{\"ID\":2,\"AssignedToDisplay\":\"\",\"RemainingTime\":\"\",\"Project\":\"projectX\",\"X\":\"5px\",\"Y\":\"90px\",\"Transform\":\"transformed-right\",\"EditURL\":\"http://bing.com\",\"State\":\"Active\",\"RemainingHoursHistory\":[],\"OriginalEstimate\":\"\",\"Title\":\"Take a break\",\"AssignedTo\":\"Franco\"}]";

            var jsonObject = JsonConvert.DeserializeObject(jsnStringData);

            return new JsonResult(jsonObject);
        }

    }
}
