using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "IsActive", "ProductDescription", "ProductImageUrl", "ProductName", "ProductPrice", "Stock" },
                values: new object[,]
                {
                    { 1, true, "Apple iPhone 16 Pro 256 GB", "https://picsum.photos/id/101/500/500", "iPhone 16 Pro", 89999m, 15 },
                    { 2, true, "Samsung Galaxy S25 256 GB", "https://picsum.photos/id/102/500/500", "Samsung Galaxy S25", 74999m, 20 },
                    { 3, true, "Apple MacBook Air M4 13 inç", "https://picsum.photos/id/103/500/500", "MacBook Air M4", 62999m, 8 },
                    { 4, true, "Kablosuz Profesyonel Mouse", "https://picsum.photos/id/104/500/500", "Logitech MX Master 3S", 4499m, 35 },
                    { 5, true, "27 İnç 2K IPS Monitör", "https://picsum.photos/id/105/500/500", "Dell UltraSharp 27", 14999m, 10 },
                    { 6, true, "Kablosuz Gürültü Engelleyici Kulaklık", "https://picsum.photos/id/106/500/500", "Sony WH-1000XM5", 12999m, 18 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
