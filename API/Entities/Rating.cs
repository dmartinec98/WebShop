namespace API.Entities
{
    public class Rating
    {
        public int id { get; set; }
        public int rating { get; set; }
        public int UserId { get; set; }        
        public int ProductId { get; set; }
    }
}