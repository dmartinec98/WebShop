using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Product product);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<IEnumerable<ProductDto>> GetProductsDtoAsync();
        Task<ProductDto> GetProductAsync(int id);

    }
}