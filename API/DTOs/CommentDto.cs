namespace API.DTOs
{
    public class CommentDto
    {
        public int id { get; set; }
        public string Komentar { get; set; }
        public string Username { get; set; }        
        public int ProductId { get; set; }
    }
}