using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCDemo.Controllers
{
    public class DataController : Controller
    {
        //
        // GET: /Data/

		public PartialViewResult Index()
        {
            return PartialView();
        }

		public PartialViewResult DataGrid()
		{
			return PartialView();
		}

		public PartialViewResult Table()
		{
			return PartialView();
		}

		public JsonResult DGetJson()
		{
			return Json(new { Name = "aaa", Time = DateTime.Now }, JsonRequestBehavior.AllowGet);
		}

		//[HttpPost]
		//public JsonResult DGetJson(ttt post)
		//{
		//    //Request.Form["Time"];
		//    return Json(new { Name = "aaa", Time = DateTime.Now }, JsonRequestBehavior.AllowGet);
		//}

		[HttpPost]
		public JsonResult DGetJson(string Name, DateTime Time)
		{
			//Request.RequestContext.HttpContext.User.Identity.
			//Request.Form["Time"];
			return Json(new { Name = "aaa", Time = DateTime.Now }, JsonRequestBehavior.AllowGet);
		}

		public class ttt
		{
			public string Name { get; set; }
			public string Time { get; set; }
		}

		public PartialViewResult Pager()
		{
			return PartialView();
		}
    }
}
