using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
         public static string GetProductName(this ClaimsPrincipal product)
        {
            return product.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}