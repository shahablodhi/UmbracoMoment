using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MomentWebsite.Web.Models;
using MomentWebsite.Web.Business;

namespace MomentWebsite.Web.Controllers
{
    public class UtilityController : Controller
    {

        public static List<GroupByAccordionResultModel> GetConcreteGroupedList(dynamic list)
        {
            var concreteList = Utility.GetGroupedListForAccordian(list);
            return concreteList;
        }
    }
}