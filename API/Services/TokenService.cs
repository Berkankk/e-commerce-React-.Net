
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<AppUser> _userManager;

    public TokenService(
        IConfiguration configuration,
        UserManager<AppUser> userManager)
    {
        _configuration = configuration;
        _userManager = userManager;
    }

    public async Task<string> CreateToken(AppUser user)
    {
        var tokenKey = _configuration["TokenKey"];

        if (string.IsNullOrWhiteSpace(tokenKey))
        {
            throw new InvalidOperationException(
                "TokenKey appsettings.json içerisinde bulunamadı."
            );
        }

        var claims = new List<Claim>
        {
            new(
                JwtRegisteredClaimNames.NameId,
                user.Id
            ),

            new(
                JwtRegisteredClaimNames.UniqueName,
                user.UserName!
            ),

            new(
                JwtRegisteredClaimNames.Email,
                user.Email!
            )
        };

        var roles = await _userManager.GetRolesAsync(user);

        claims.AddRange(
            roles.Select(role => new Claim(ClaimTypes.Role, role))
        );

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(tokenKey)
        );

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha512Signature //Şifrelenme algoritmesı
        );

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),

            Expires = DateTime.UtcNow.AddDays(7), // 7 gün geçerli olsun 

            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler(); //Token oluştur kardeş dedik burada, key değerini git appsettings den oku 

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

}