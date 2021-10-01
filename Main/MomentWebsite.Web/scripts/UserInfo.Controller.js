////////////////////////////////Global Declaration Starts///////////////////
/// <reference path="OAUTH/oidc-token-manager.js" />
var modsBaseAddress = $("#jsTransferer").data('servicebase');
var cookieToken = $("#jsTransferer").data('tokencookie');
var authority = $("#jsTransferer").data('authority');
var clientId = $("#jsTransferer").data('clientid');
////////////////////////////////Global Declaration Ends/////////////////////

////////////////////////////////function Section Starts/////////////////////
function initializePage(data) {
    $('#fname').val(data.Name);
    $('#lname').val(data.LastName);
    $('#email').val(data.Email);
}
//function getCookie(name) {
//    debugger;
//    var value = "; " + document.cookie;
//    var parts = value.split("; " + name + "=");
//    if (parts.length == 2) return parts.pop().split(";").shift();
//}
////////////////////////////////function Section Ends//////////////////////

////////////////////////////////Ready Starts///////////////////////////////
$(function () {
    

    var config = {
        client_id: clientId,
        authority: authority,
    };
    debugger;
    var mgr = new OidcTokenManager(config);
    mgr.loadToken();
    mgr.processTokenCallbackAsync().then(function () {
        console.log("Successfully Obtained Token", mgr.access_token);
        if (!mgr.expired && mgr.access_token) {
            debugger;
            $.ajax({
                url: modsBaseAddress + "/api/profile/GetStudentBaseData",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + mgr.access_token);
                },
                cache: false,
                type: 'GET',
                contentType: 'application/json',
                success: function (data) {
                    debugger;
                    initializePage(data);
                },
                error: function (error) {
                    debugger;
                    alert("Error occured while loading the data" +  error.error);
                    //window.location.replace("/");
                }
            });

        }
    }, function (error) {
        console.error("Problem Getting Token : " + (error.message || error));
        debugger;
        window.location.href = "/";
    });
});
////////////////////////////////Ready Ends////////////////////////

////////////////////////////////Event Section Starts//////////////

////////////////////////////////Event Section Ends////////////////


