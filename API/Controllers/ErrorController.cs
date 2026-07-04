

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult ErrorNotFound()
    {
        return NotFound(); //404 Not Found hataı verelim
    }

    [HttpGet("bad-request")]
    public IActionResult ErrorBadRequest()
    {
        return BadRequest(); //400 Bad Request hataı verelim
    }

    [HttpGet("unauthorized")]
    public IActionResult ErrorUnauthorized()
    {
        return Unauthorized(); //401 Unauthorized hataı verelim
    }

    [HttpGet("validation-error")]
    public IActionResult ErrorValidationError()
    {
        ModelState.AddModelError("validation error", "validation error details");
        ModelState.AddModelError("validation error2", "validation error details2");
        return ValidationProblem(); //400 Bad Request hataı verelim ve validation hatalarını dönelim
    }

    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        throw new Exception("This is a server error"); //500 Internal Server Error hataı verelim
    }
}