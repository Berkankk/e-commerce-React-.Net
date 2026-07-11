namespace API.Entity;

public class Cart()
{
    public int CartId { get; set; }
    public string CustomerId { get; set; } = null!;
    public List<CartItem> CartItems { get; set; } = new();

    public void AddItem(Product product, int quantity)
    {
        var item = CartItems.Where(c => c.ProductId == product.Id).FirstOrDefault();
        if(item == null)
        {
            CartItems.Add(new CartItem 
            {
                Product = product,
                Quantity = quantity
            });
        }
        else
        {
            item.Quantity += quantity;
        }
    }

    // public void DeleteItem(int productId,int quantity)
    // {
    //     var item = CartItems.Where(c => c.ProductId == productId).FirstOrDefault();
    //     if(item == null) return;

    //     item.Quantity -= quantity;
    //     if(item.Quantity == 0)
    //     {
    //         CartItems.Remove(item);
    //     }
    // }
    public void DeleteItem(int productId, int quantity)
{
    var item = CartItems.FirstOrDefault(x => x.ProductId == productId);

    if (item == null)
        return;

    if (item.Quantity > quantity)
    {
        item.Quantity -= quantity;
    }
    else
    {
        CartItems.Remove(item);
    }
}
}

public class CartItem()
{
    public int CartItemId { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public int CartId { get; set; }
    // public Cart Cart { get; set; } = null!;
    public int Quantity { get; set; }
}