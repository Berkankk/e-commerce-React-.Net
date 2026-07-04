using System.ComponentModel.DataAnnotations;

namespace API.Entity;


public class Product
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? ProductName { get; set; }
    public decimal ProductPrice { get; set; }
    public string? ProductDescription { get; set; }
    public bool IsActive { get; set; }
    public string? ProductImageUrl { get; set; }
     public int? Stock { get; set; }
     
     
}
