using API.Entity;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class SeedData
{
    public  static async void Initialize(IApplicationBuilder applicationBuilder)
    {
        var userManager = applicationBuilder.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        var roleManager = applicationBuilder.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

        //Yukarda role ve kullanıcıar için gerekli olan scrope işlemlerini yaptık 

        if(!roleManager.Roles.Any())
        {
            var customer = new AppRole
            {
                Name = "Customer"
            };
            var admin = new AppRole
            {
                Name = "Admin"
            };
            var manager = new AppRole
            {
                Name = "Manager"
            };

            await roleManager.CreateAsync(customer);
            await roleManager.CreateAsync(admin);
            await roleManager.CreateAsync(manager);
        }

        if(!userManager.Users.Any())
        {
            var customer = new AppUser
            {
                Name ="Berkan Kara",
                UserName = "berkankara",
                Email = "berkantest@gmail.com"
            };
            var admin = new AppUser
            {
                Name ="Onurhan Kara",
                UserName = "onurkara",
                Email = "onurtest@gmail.com"
            };
            var manager = new AppUser
            {
                Name ="Efe Kara",
                UserName = "efekara",
                Email = "efetest@gmail.com"
            };

            await userManager.CreateAsync(customer, "Berkan.1234**");
            await userManager.AddToRoleAsync(customer,"Customer");

            await userManager.CreateAsync(admin, "Onurhan.1234**");
            await userManager.AddToRoleAsync(admin,"Admin");

            await userManager.CreateAsync(manager, "Efe.1234**");
            await userManager.AddToRoleAsync(manager,"Manager");
        }



    }
}