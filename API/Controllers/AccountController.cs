using API.Dtos;
using API.DTOs;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;

    public AccountController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    // LOGIN
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.UserName);

        if (user == null)
        {
            return Unauthorized("Kullanıcı adı veya şifre hatalı.");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(
            user,
            loginDto.Password,
            lockoutOnFailure: false
        );

        if (!result.Succeeded)
        {
            return Unauthorized("Kullanıcı adı veya şifre hatalı.");
        }

        return Ok(new UserDto
        {
            UserName = user.UserName!,
            Email = user.Email!,
            Token = await _tokenService.CreateToken(user)
        });
    }

    // REGISTER
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var existingUser =
            await _userManager.FindByNameAsync(registerDto.UserName);

        if (existingUser != null)
        {
            return BadRequest("Bu kullanıcı adı kullanılmaktadır.");
        }

        var existingEmail =
            await _userManager.FindByEmailAsync(registerDto.Email);

        if (existingEmail != null)
        {
            return BadRequest("Bu e-posta adresi kullanılmaktadır.");
        }

        var user = new AppUser
        {
            Name = registerDto.Name,
            UserName = registerDto.UserName,
            Email = registerDto.Email
        };

        var result = await _userManager.CreateAsync(
            user,
            registerDto.Password
        );

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        var roleResult =
            await _userManager.AddToRoleAsync(user, "Customer");

        if (!roleResult.Succeeded)
        {
            await _userManager.DeleteAsync(user);

            return BadRequest(roleResult.Errors);
        }

        return Ok(new UserDto
        {
            UserName = user.UserName!,
            Email = user.Email!,
            Token = await _tokenService.CreateToken(user)
        });
    }
}