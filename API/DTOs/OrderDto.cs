namespace API.DTOs
{
    public class OrderDto
    {
        public int id { get; set; }
        public int CustomerId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
    }
}