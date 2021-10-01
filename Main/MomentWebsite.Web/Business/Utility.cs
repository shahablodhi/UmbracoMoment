using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MomentWebsite.Web.Models;

namespace MomentWebsite.Web.Business
{
    
    public class Utility
    {
        public List<string> ThemeColorsList { get; set; }

        public static int GetThemeColorMap(string themeName)
        {
            if (themeName.Equals("Light orange"))
            {
                return 1;
            }
            else if (themeName.Equals("Dark orange"))
            {
                return 2;
            }
            else if (themeName.Equals("Light grey"))
            {
                return 3;
            }
            else if (themeName.Equals("Dark grey"))
            {
                return 4;
            }
            else if (themeName.Equals("White"))
            {
                return 5;
            }
            else
            {
                return 0;
            }
        }

        public static IEnumerable<GroupByAccordionResultModel> GetGroupedListForAccordian(dynamic list)
        {
            var listCon = Enumerable.ToList(list);

            var concreteList = new List<AccordionModel>();
            foreach (var item in listCon)
            {
                concreteList.Add(new AccordionModel
                {
                    HeadingType = item.headingType,
                    Question = item.question,
                    Answer = item.answer
                });
            }
            var results = from p in concreteList
                          group p by p.HeadingType into g
                          select new GroupByAccordionResultModel { Key = g.Key, ResultList = g.ToList() };
            return results.ToList();
        }
    }
}