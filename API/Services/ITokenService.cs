using API.Entity;

namespace API.Services;

public interface ITokenService
{
        Task<string> CreateToken(AppUser user);
}