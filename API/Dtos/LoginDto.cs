using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDto
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}