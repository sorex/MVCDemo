using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCDemo.Controllers
{
	public class HomeController : Controller
	{
		public JsonResult DMenus()
		{
			var menus = new[] { new { Text = "Home", Url = "/Home/Index" } }.ToList();
			menus.Add(new { Text = "Test1", Url = "/Home/Left1" });
			menus.Add(new { Text = "Test2", Url = "/Home/Left2" });

			return Json(menus, JsonRequestBehavior.AllowGet);
		}


		//
		// GET: /Home/

		public ActionResult Index()
		{
			ViewBag.MenuIndex = 0;

			if (Request.IsAjaxRequest())
				return PartialView();
			else
				return View();
		}


		//
		// GET: /Left1/

		public ActionResult Left1()
		{
			ViewBag.MenuIndex = 1;

			if (Request.IsAjaxRequest())
				return PartialView();
			else
				return View();
		}

		//
		// GET: /Left2/

		public ActionResult Left2()
		{
			ViewBag.MenuIndex = 2;

			if (Request.IsAjaxRequest())
				return PartialView();
			else
				return View();
		}
	}
}
