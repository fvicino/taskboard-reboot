using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using reboot_server.Models;
using reboot_server.Data.Abstraction;

namespace reboot_server.Controllers
{
    public class HomeController : Controller
    {
        public HomeController(IRepository<TaskNote> repo)
        {
            //DI should inject the repo for this controller
            Repository = repo;
        }

        protected IRepository<TaskNote> Repository { get; }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("/state")]
        public JsonResult State()
        {
            // ## Send a json list of tasks to be rendered
            //use the test resource string for now
            //string jsnStringData = "[{\"ID\":1,\"AssignedToDisplay\":\"\",\"RemainingTime\":\"\",\"Project\":\"projectX\",\"X\":\"5px\",\"Y\":\"90px\",\"Transform\":\"transformed-right\",\"EditURL\":\"http://bing.com\",\"State\":\"Active\",\"RemainingHoursHistory\":[],\"OriginalEstimate\":\"\",\"Title\":\"Build Taskboard \",\"AssignedTo\":\"Franco\"},{\"ID\":2,\"AssignedToDisplay\":\"\",\"RemainingTime\":\"\",\"Project\":\"projectX\",\"X\":\"5px\",\"Y\":\"90px\",\"Transform\":\"transformed-right\",\"EditURL\":\"http://bing.com\",\"State\":\"Active\",\"RemainingHoursHistory\":[],\"OriginalEstimate\":\"\",\"Title\":\"Take a break\",\"AssignedTo\":\"Franco\"}]";

            //## TODO get this list of data from the inMemort DBContext


            //var jsonObject = JsonConvert.DeserializeObject(jsnStringData);

            return new JsonResult(Repository.GetList());
        }


        //## TODO recieve updates here from the Socket handler
        [HttpPut("/state")]
        public ActionResult State(List<TaskNote> tasks) => new NotFoundResult();

        //## TODO recieve new tasks here from web app
        [HttpPost("/state")]
        public ActionResult State(TaskNote newtask) => new NotFoundResult();


    }
}
