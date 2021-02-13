using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}