using IdentityModel.Client;
using log4net;
using MomentWebsite.Web.Models;
using MomentWebsite.Web.Resources;
using System;
using System.Collections.Generic;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Umbraco.Web.Mvc;

namespace MomentWebsite.Web.Controllers
{
    public class CustomLoginController : SurfaceController //UmbracoApiController
    {
        private static readonly ILog Log =
          LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// Customs the login submit.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Authentication Cookie</returns>
        [HttpPost]
        // [MultipleSubmit(Name = "action", Argument = "Login")]
        public ActionResult CustomLoginSubmit(CustomLoginModel model)
        {
            Log.Info("CustomLoginController enter CustomLoginSubmit with user: " + model.UserName);
            try
            {
                string userId;
                if ((!string.IsNullOrEmpty(model.UserName)))
                {
                    userId = model.UserName;
                }
                else
                {
                    Log.Error("model.UserName : NULL OR EMPTY");
                    //return "model.UserName : NULL OR EMPTY";
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }

                string password;
                if ((!string.IsNullOrEmpty(model.Password)))
                {
                    //password = EncryptionFactory.GetMd5Hash(model.Password);
                    password = model.Password;

                }
                else
                {
                    Log.Error("model.Password : NULL OR EMPTY");
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }


                //var tokenClient = new TokenClient(
                //Constants.TokenEndpoint,
                //"MomentWebSite",
                // "secret",
                // AuthenticationStyle.PostValues
                //);

                var tokenClient = new TokenClient(
                Constants.TokenEndpoint,
                "momentwebclient",
                "secret");


                var scopes = "read write openid MomentWebApi offline_access";
                // idsrv supports additional non-standard parameters 
                // that get passed through to the user service
                //var optional = new
                //{
                //    acr_values = "tenant:momentwebsite_account"
                //};

                //var token = tokenClient.RequestResourceOwnerPasswordAsync(model.UserName, model.Password, scopes, optional).Result;
                Log.Info("trying to connect to identity server at" + Constants.TokenEndpoint);
                var token = tokenClient.RequestResourceOwnerPasswordAsync(model.UserName, model.Password, scopes).Result;
                

                if (token != null && !String.IsNullOrWhiteSpace(token.AccessToken))
                {
                    Log.Info("Connected identity server at" + Constants.TokenEndpoint);

                    var claims = new List<Claim>();
                    var claimsClient = new UserInfoClient(Constants.UserInfoEndpoint);
                    var userInfo = claimsClient.GetAsync(token.AccessToken).Result;
                    var claimsIterator = userInfo.Claims.GetEnumerator();

                    while (claimsIterator.MoveNext())
                    {
                        var currentCliam = claimsIterator.Current;
                        claims.Add(new Claim(currentCliam.Type, currentCliam.Value));
                        Session[currentCliam.Type] = currentCliam.Value.ToString();
                    }
                    claims.Add(new Claim("token", token.AccessToken));
                    var claimsId = new ClaimsIdentity(claims, "Cookies");
                    var Tokencookie = new HttpCookie(AppInternalStrings.TokenCookie,token.AccessToken.ToString());
                    //Tokencookie.HttpOnly = true;
                    System.Web.HttpContext.Current.Response.Cookies.Add(Tokencookie);
                    Request.GetOwinContext().Authentication.SignIn(claimsId);

                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                }
                else
                {
                    Log.Info("Could not connect to identity server ");
                    Log.Info("token.Error " + token.Error);
                    Log.Info("token.ErrorDescription " + token.ErrorDescription);
                    Log.Info("token.ErrorType " + token.ErrorType);
                    Log.Info("token.HttpStatusCode " + token.HttpStatusCode);
                    Log.Info("token.HttpErrorReason " + token.HttpErrorReason);
                    return new HttpStatusCodeResult(HttpStatusCode.Unauthorized);
                }
            }
            catch (SystemException e)
            {
                Log.Error(" CustomLoginController CustomLoginSubmitsetting LOGIN ERROR system exception for user: " + model.UserName + " trace: " + e.StackTrace);
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
        }


        public ActionResult RenewToken()
        {

            var tokenClient = new TokenClient(
                Constants.TokenEndpoint,
                "momentwebclient",
                "secret");

            //tokenClient.RequestRefreshTokenAsync()


            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        public ActionResult Logout()
        {
            Request.GetOwinContext().Authentication.SignOut();
            System.Web.HttpContext.Current.Response.Cookies.Add(new HttpCookie(AppInternalStrings.TokenCookie,""));
            return Redirect("/");
        }
    }
}