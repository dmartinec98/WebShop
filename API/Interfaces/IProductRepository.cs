using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Product product);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<PagedList<ProductDto>> GetProductsDtoAsync(ProductParams productParams);
        Task<ProductDto> GetProductAsync(int id);
        void AddProduct(Product product);        
        Task<Product> GetProductByNameAsync(string name);        
        int GetLastProduct();

    }
}