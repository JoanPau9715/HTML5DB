using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Mvc;

namespace App1
{
    public partial class application : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static JsonResult getData()
        {
            List<JsonResult> recordSet = new List<JsonResult>();

            for (int i = 0; i < 10; ++i)
            {
                Record rec = new Record();
                rec.value = "record " + i.ToString();
                recordSet.Add(new JsonResult() { Data = rec });
            }

            JsonResult result = new JsonResult();
            result.Data = new Result() { records = recordSet };
            return result;
        }

        private class Result
        {
            public List<JsonResult> records;
        }

        private class Record
        {
            public string value;
        }
    }
}