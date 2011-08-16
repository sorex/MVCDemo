using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCDemo.Controllers
{
    public class BasicControlController : Controller
    {
        //
        // GET: /BasicControl/

        public ActionResult Index()
        {
            return View();
        }


		public PartialViewResult Button()
		{
			return PartialView();
		}

		public PartialViewResult Menu()
		{
			return PartialView();
		}
	}
}
