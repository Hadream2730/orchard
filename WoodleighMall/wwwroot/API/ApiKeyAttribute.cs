using Microsoft.AspNetCore.Mvc;

namespace WoodleighMall.wwwroot.API
{
    public class ApiKeyAttribute : ServiceFilterAttribute
    {
        public ApiKeyAttribute()
            : base(typeof(ApiKeyAuthorizationFilter))
        {

        }
    }
}
