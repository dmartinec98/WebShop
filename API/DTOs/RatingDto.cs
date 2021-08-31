namespace API.DTOs
{
    public class RatingDto
    {
        public int id { get; set; }
        public int rating { get; set; }
        public int UserId { get; set; }        
        public int ProductId { get; set; }
    }
}