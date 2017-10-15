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
            //DI container injects the repo for this controller
            Repository = repo;
        }

        protected IRepository<TaskNote> Repository { get; }

        public IActionResult Index()
        {
            return View();
        }

        // ## Send a json array of tasks to the browser for rendering
        [HttpGet("/state")]
        public JsonResult State()
        {
            return new JsonResult(Repository.GetList());
        }

        //## TODO recieve updates here from the Socket handler
        [HttpPut("/state")]
        public ActionResult State(List<TaskNote> tasks) => new NotFoundResult();

        //## TODO recieve new tasks from web app
        [HttpPost("/state")]
        public ActionResult State(TaskNote newtask) => new NotFoundResult();


    }
}
