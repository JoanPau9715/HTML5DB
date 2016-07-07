<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="application.aspx.cs" Inherits="App1.application"
    Title="Indexed Database" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Indexed Database</title>
    <style type="text/css">
        body
        {
            font-family: Consolas;
            font-size: larger;
        }
    </style>

    <script src="jQuery2.js" type="text/javascript"></script>
    <script src="HTML5DB.js"></script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
        <span id="lblMessages">API Indexed Database</span>
        <input type="button" value="Create / Open HTML5 DB" onclick="openDB()" />
        <input type="button" value="get Data from the server" onclick="getData()" style="margin-left:10px" />
        <br />
        <br />
        <span>New record:</span>
        <input id="txtRecordValue" type="text" placeholder="value" />
        <input id="btnAddRecord" type="button" value="Add record" onclick="addRecord()" />
    </div><br />
    <div>
        <table id="dbRecords" style="border:1px solid #000;border-collapse:collapse;">
            <tbody>
            </tbody>
        </table>
    </div>
    </form>
</body>
</html>
