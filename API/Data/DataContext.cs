namespace API.Data;

using API.Entity;
using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                ProductName = "iPhone 16 Pro",
                ProductPrice = 89999,
                ProductDescription = "Apple iPhone 16 Pro 256 GB",
                IsActive = true,
                ProductImageUrl = "https://picsum.photos/id/101/500/500",
                Stock = 15
            },
            new Product
            {
                Id = 2,
                ProductName = "Samsung Galaxy S25",
                ProductPrice = 74999,
                ProductDescription = "Samsung Galaxy S25 256 GB",
                IsActive = true,
                ProductImageUrl = "https://picsum.photos/id/102/500/500",
                Stock = 20
            },
            new Product
            {
                Id = 3,
                ProductName = "MacBook Air M4",
                ProductPrice = 62999,
                ProductDescription = "Apple MacBook Air M4 13 inç",
                IsActive = true,
                ProductImageUrl = "https://picsum.photos/id/103/500/500",
                Stock = 8
            },
            new Product
            {
                Id = 4,
                ProductName = "Logitech MX Master 3S",
                ProductPrice = 4499,
                ProductDescription = "Kablosuz Profesyonel Mouse",
                IsActive = true,
                ProductImageUrl = "https://picsum.photos/id/104/500/500",
                Stock = 35
            },
            new Product
            {
                Id = 5,
                ProductName = "Dell UltraSharp 27",
                ProductPrice = 14999,
                ProductDescription = "27 İnç 2K IPS Monitör",
                IsActive = true,
                ProductImageUrl = "https://picsum.photos/id/105/500/500",
                Stock = 10
            },
            new Product
            {
                Id = 6,
                ProductName = "Sony WH-1000XM5",
                ProductPrice = 12999,
                ProductDescription = "Kablosuz Gürültü Engelleyici Kulaklık",
                IsActive = true,
                ProductImageUrl = "https://picsum.photos/id/106/500/500",
                Stock = 18
            }
        );
    }
}