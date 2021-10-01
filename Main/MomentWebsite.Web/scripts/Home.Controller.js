////////////////////////////////Global Declaration Starts///////////////////
var redirectUrl = $("#jsTransferer").data('redirecturl');
redirectUrl = "http://" + redirectUrl;
////////////////////////////////Global Declaration Ends/////////////////////

////////////////////////////////function Section Starts/////////////////////
//closing all neighbors if there is open in a background menu

////////////////////////////////function Section Ends//////////////////////

////////////////////////////////Ready Starts///////////////////////////////

///////////////////////////////KENDO///////////
$(document).ready(function () {
    $("#multiselect").kendoMultiSelect({
        placeholder: "Søg jobtype eller område...",
        dataTextField: "Name",
        dataValueField: "RowID",
        height: 400,
        dataSource: {
            type: "json",
            transport: {
                read: "http://poc.mods.moment.dk/api/job/getjobserachbasedata"
            },
            group: { field: "Type" }
        }
    });
    $("#grid").kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            pageSize: 20
        },
        height: 440,
        groupable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [{
            template: "<div class='customer-photo'" +
                            "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></div>" +
                        "<div class='customer-name'>#: ContactName #</div>",
            field: "ContactName",
            title: "Contact Name",
            width: 240
        }, {
            field: "CompanyName",
            title: "Company Name"
        }, {
            field: "Country",
            width: 150
        }]
    });
});
////////////////////////////////Ready Ends////////////////////////

////////////////////////////////Event Section Starts//////////////
$("#findJob").
click(function () {
    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get data items for the selected options.
    var dataItem = multiselect.dataItems();
    var geograghy = "";
    var jobType = "";
    var jobCategory = "";
    for (var d = 0; d < dataItem.length; d++) {
        if (dataItem[d].Type.trim() === "Jobkategori") {
            jobCategory += dataItem[d].Name.trim() + "^";
        }
        else if (dataItem[d].Type.trim() === "Jobtype") {
            jobType += dataItem[d].Name.trim() + "^";
        }
        else if (dataItem[d].Type.trim() === "Landsdel") {
            geograghy += dataItem[d].Name.trim() + "^";
        }
    }//.substring(0,dataItem[0].Type.length - 1)
    var postJobReq = redirectUrl + "/find-job?sg=" + geograghy.substring(0, geograghy.length - 1) + "&st=" + jobType.substring(0, jobType.length - 1) + "&sc=" + jobCategory.substring(0, jobCategory.length - 1);
    window.location.href = postJobReq;
});
////////////////////////////////Event Section Ends////////////////