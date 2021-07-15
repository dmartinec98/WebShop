using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        public void AddProduct(Product product)
        {
            _context.Products.Add(product);
        }

        public int GetLastProduct()
        {
            var item = _context.Products.OrderBy(id => id.Id).LastOrDefault();
            return item.Id;
        }

        public async Task<ProductDto> GetProductAsync(int id)
        {
            return await _context.Products
                .Where(x => x.Id == id)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Product> GetProductByNameAsync(string name)
        {
            return await _context.Products
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x=>x.Name == name);

        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<PagedList<ProductDto>> GetProductsDtoAsync(ProductParams productParams)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(productParams.Search))
            {
                query = query.Where(s => s.Name.ToLower().Contains(productParams.Search));
            }

            query = productParams.Sort switch
            {
                "priceAsc" => query.OrderBy(p => ((double)p.Price)),
                "priceDesc" => query.OrderByDescending(p => ((double)p.Price)),
                "nameAsc" => query.OrderBy( p => p.Name.ToLower()),
                "nameDesc" => query.OrderByDescending( p => p.Name.ToLower()),
                _ => query.OrderBy(p => p.Id)
            };


            
            return await PagedList<ProductDto>.CreateAsync(query.ProjectTo<ProductDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    productParams.PageNumber, productParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }


        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
    }
}