using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

[assembly: OwinStartup(typeof(MomentWebsite.Web.Startup))]

namespace MomentWebsite.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //JwtSecurityTokenHandler.InboundClaimTypeMap = new Dictionary<string, string>();

            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    AuthenticationType = "Cookies"
            //});

            //app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
            //{
            //    ClientId = "moment_web",
            //  //  Authority = Constants.BaseAddress, to be set
            //    RedirectUri = "https://localhost:44301/",
            //    ResponseType = "id_token",
            //    Scope = "openid email",
            //    UseTokenLifetime = false,
            //    SignInAsAuthenticationType = "Cookies",
            //});
        }
    }
}
