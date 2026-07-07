namespace API.Dtos;

public class Cartdto()
{
    public int CartId { get; set; }
    public string? CustomerId { get; set; } = null!;
    public List<CartItemDto> GetCartItemDto { get; set; } = new();
}

public class CartItemDto()
{
    public int ProductId { get; set; }

    public string? Name { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int Quantity { get; set; }
}