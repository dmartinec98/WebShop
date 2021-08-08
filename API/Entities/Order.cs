namespace API.Entities
{
    public class Order
    {
        public int id { get; set; }
        public int CustomerId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string PictureUrl { get; set; }

    }
}