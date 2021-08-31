namespace API.Entities
{
    public class Comment
    {
        public int id { get; set; }
        public string komentar { get; set; }
        public string username { get; set; }        
        public int ProductId { get; set; }
    }
}