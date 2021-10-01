////////////////////////////////Global Declaration Starts///////////////////
var stamdataUrl = $("#jsTransferer").data('stamdata');
var cookieToken = $("#jsTransferer").data('tokencookie');
var authority = $("#jsTransferer").data('authority');
var clientId = $("#jsTransferer").data('clientid');
////////////////////////////////Global Declaration Ends/////////////////////

////////////////////////////////function Section Starts/////////////////////
function showLoggedInView() {
    $("#logInListItem").hide();
    $("#registerListItem").hide();
    $("#profileListItem").show();
    $("#menu-logo a").prop("href", "/?lg=1");
}
function showLoggedOffView() {
    $("#logInListItem").show();
    $("#registerListItem").show();
    $("#profileListItem").hide();
    $(".menu-logo a").prop("href", "/?lg=0");
}
function getUrlParameter(sParam) {
    /// <summary>
    /// Gets the URL parameter.
    /// </summary>
    /// <param name="sParam">The s parameter.</param>
    /// <returns></returns>
    var sPageUrl = window.location.search.substring(1);
    var sUrlVariables = sPageUrl.split("&");
    for (var i = 0; i < sUrlVariables.length; i++) {
        var sParameterName = sUrlVariables[i].split("=");
        if (sParameterName[0] === sParam)
            return sParameterName[1];
    }
    return null;
}
//function logOff() {
//    debugger;
//    $.ajax({
//        url: "/umbraco/surface/CustomLogin/Logout",
//        cache: false,
//        type: 'GET',
//        contentType: 'application/json',
//        success: function (data) {
//            deleteCookie(cookieToken);
//            showLogOffView();
//            window.location.replace("/");
//        },
//        error: function (error) {
//            alert(error);
//            window.location.replace("/");
//        }
//    });
//    return false;
//}


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
////////////////////////////////function Section Ends//////////////////////

////////////////////////////////Ready Starts///////////////////////////////
//$(function () {
//    debugger;

//    var config = {
//                client_id: clientId,
//                redirect_uri: window.location.protocol + "//" + window.location.host+ "/profil/stamdata/kontakt-information",
//                post_logout_redirect_uri: window.location.protocol + "//" + window.location.host,
//                response_type: "id_token token",
//                scope: "openid email MomentWebSite MomentWebApi",
//                authority: authority,
//                silent_redirect_uri: window.location.protocol + "//" + window.location.host + "?slientredirecturi=true",
//                silent_renew: true,
//                persist: true
//            };

//            var mgr = new OidcTokenManager(config);

//            mgr.addOnTokenObtained(function () {
//                    console.log("token obtained, scopes: " + mgr.scopes);
//                });
//            mgr.addOnTokenRemoved(function () {
//                    console.log("token removed");
//                });
//            mgr.addOnTokenExpired(function () {
//                    debugger;
//                    console.log("your session is expired");
//                });

//            mgr.addOnTokenExpiring(function () {
//                    debugger;
//                    mgr.renewTokenSilent();
//            });

//            $("#MainLoginID").click(function () {
//                    mgr.redirectForToken();
//            });

//            $("#logOffListItem").click(function () {
//                mgr.redirectForLogout();
//            });

//            debugger;
//            var silentRedirect = window.location.href.indexOf('slientredirecturi=true');

//            if (silentRedirect > 0) {
//                mgr.processTokenCallbackSilent();
//            }
//            else {

//                mgr.loadToken();
//               //var idtoken = window.location.href.indexOf('#id_token');
//               // var IsProfil = window.location.href.indexOf('/profil/');
//                if (!mgr.expired) {
//                    showLogOffView();
//                }
//                else {
//                    showLoginView();
//                }
//            }
    
//});
$(function () {
    debugger;
    var loginStatus = getUrlParameter("lg");
    if (loginStatus === "0") {
        sessionStorage.setItem('loginStatus', "0");
        showLoggedOffView();
    }
    else if (loginStatus === "1" || sessionStorage.getItem("loginStatus") === "1") {
        sessionStorage.setItem('loginStatus', "1");
        showLoggedInView();
    } else {
        sessionStorage.setItem('loginStatus', loginStatus);
        showLoggedOffView();
    }
});
////////////////////////////////Ready Ends////////////////////////

////////////////////////////////Event Section Starts//////////////
$("#submitLogin").click(function () {
   var dto =
   {
                UserName: $("#name").val(),
                Password: $("#pass").val()
   };
   $.ajax({
        url: "/umbraco/surface/CustomLogin/CustomLoginSubmit",
        cache: false,
        type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dto),
            success: function (data) {
            window.location.href = stamdataUrl;
    },
            error: function (error) {
            alert("error while logging in");
            window.location.href = "/";
    }
});
});
    ////////////////////////////////Event Section Ends////////////////

    ////////////////////////////////Event Section Starts//////////////

    ////////////////////////////////Event Section Ends////////////////


