using API.Dtos;
using API.DTOs;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;

    public AccountController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    // LOGIN
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.UserName);

        if (user == null)
            return Unauthorized("Kullanıcı bulunamadı.");

        var result = await _signInManager.CheckPasswordSignInAsync(
            user,
            loginDto.Password,
            false);

        if (!result.Succeeded)
            return Unauthorized("Kullanıcı adı veya şifre hatalı.");

            return Ok(new{token ="token"});

    }

    // REGISTER
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await _userManager.FindByNameAsync(registerDto.UserName) != null)
            return BadRequest("Bu kullanıcı adı kullanılmaktadır.");

        var user = new AppUser
        {
            Name = registerDto.Name,
            UserName = registerDto.UserName,
            Email = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        await _userManager.AddToRoleAsync(user, "Customer");

        return new UserDto
        {
            UserName = user.UserName!,
            Email = user.Email!,
        };
    }
}