using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedProducts(DataContext context)
        {
            if(await context.Products.AnyAsync()) return;

            var productData = await System.IO.File.ReadAllTextAsync("Data/ProductSeedData.json");
            var products = JsonSerializer.Deserialize<List<Product>>(productData);

            foreach (var product in products)
            {
                product.Name = product.Name;
                product.Description = product.Description;
                product.Price = product.Price;

                context.Products.Add(product);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedUsers(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if(users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"}
            };

            foreach (var role in roles)
            {
               await roleManager.CreateAsync(role); 
            }
            
            foreach(var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user,"Member");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
        }

        internal static Task SeedUsers(object userManager, object roleManager)
        {
            throw new System.NotImplementedException();
        }
    }
}