using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace MomentWebsite.Web.Models
{
    public class Constants
    {
        //public static string IDServerBaseAddress { get { }; set { } };
        public static string IDServerBaseAddress
        {
            get
            {
                return ConfigurationManager.AppSettings["IdentityServerBaseAddress"];
            }
        } 
        public static string AuthorizeEndpoint
        {
            get
            {
               return IDServerBaseAddress + "/connect/authorize";
            }
        }
        public static string LogoutEndpoint
        {
            get
            {
                return IDServerBaseAddress + "/connect/endsession";
            }
        }
        public static string TokenEndpoint
        {
            get
            {
                return IDServerBaseAddress + "/connect/token";
            }
        }
        public static string UserInfoEndpoint
        {
            get
            {
                return IDServerBaseAddress + "/connect/userinfo";
            }
        }

        public static string IdentityTokenValidationEndpoint
        {
            get
            {
                return IDServerBaseAddress + "/connect/identitytokenvalidation";
            }
        }
        public static string TokenRevocationEndpoint
        {
            get
            {
                return IDServerBaseAddress + "/connect/revocation";
            }
        }
        //public const string AspNetWebApiSampleApi = "http://localhost:2727/";
        //public const string AspNetWebApiSampleApiUsingPoP = "http://localhost:46613/";
    }
}