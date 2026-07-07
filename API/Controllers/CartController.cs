using API.Data;
using API.Dtos;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;

    public CartController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<Cartdto>> GetCart()
    {
        var customerId = Request.Cookies["customerId"];

        if (string.IsNullOrEmpty(customerId))
            return NotFound("Customer cookie bulunamadı.");

        var cart = await GetCartByCustomerId(customerId);

        if (cart == null)
            return NotFound("Sepet bulunamadı.");

        return CartToDto(cart);
    }

    [HttpPost]
    public async Task<ActionResult<Cartdto>> AddItemToCart(int productId, int quantity)
    {
        var customerId = GetCustomerId();

        var product = await _context.Products.FindAsync(productId);

        if (product == null)
            return NotFound("Ürün bulunamadı.");

        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .FirstOrDefaultAsync(c => c.CustomerId == customerId);

        if (cart == null)
        {
            cart = new Cart
            {
                CustomerId = customerId
            };

            _context.Carts.Add(cart);
        }

        cart.AddItem(product, quantity);

        await _context.SaveChangesAsync();

        var updatedCart = await GetCartByCustomerId(customerId);

        if (updatedCart == null)
            return NotFound("Sepet bulunamadı.");

        return CartToDto(updatedCart);
    }

    [HttpDelete]
    public async Task<ActionResult<Cartdto>> DeleteItemFromCart(int productId, int quantity)
    {
        var customerId = Request.Cookies["customerId"];

        if (string.IsNullOrEmpty(customerId))
            return BadRequest("Customer cookie bulunamadı.");

        var cart = await GetCartByCustomerId(customerId);

        if (cart == null)
            return NotFound("Sepet bulunamadı.");

        cart.DeleteItem(productId, quantity);

        await _context.SaveChangesAsync();

        var updatedCart = await GetCartByCustomerId(customerId);

        if (updatedCart == null)
            return NotFound("Sepet bulunamadı.");

        return CartToDto(updatedCart);
    }

    private async Task<Cart?> GetCartByCustomerId(string customerId)
    {
        return await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == customerId);
    }

    private string GetCustomerId()
    {
        var customerId = Request.Cookies["customerId"];

        if (string.IsNullOrEmpty(customerId))
        {
            customerId = Guid.NewGuid().ToString();

            Response.Cookies.Append("customerId", customerId, new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            });
        }

        return customerId;
    }

    private Cartdto CartToDto(Cart cart)
    {
        return new Cartdto
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            GetCartItemDto = cart.CartItems.Select(item => new CartItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.ProductName,
                Price = item.Product.ProductPrice,
                Quantity = item.Quantity,
                ImageUrl = item.Product.ProductImageUrl
            }).ToList()
        };
    }
}