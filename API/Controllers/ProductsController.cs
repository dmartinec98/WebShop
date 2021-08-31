using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;        
        public ProductsController(IProductRepository productRepository, IMapper mapper, IPhotoService photoService, DataContext context)
        {            
            _photoService = photoService;
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var products = await _productRepository.GetProductsDtoAsync(productParams);

            Response.AddPaginationHeader(products.CurrentPage,products.PageSize,
                products.TotalCount, products.TotalPages);

            return Ok(products);
        }

        [HttpGet("{id}", Name="GetProduct")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            return await _productRepository.GetProductAsync(id);
        }
        
        [HttpPost("addproduct")]
        public async Task<ActionResult<ProductDto>> AddProduct(ProductDto productDto)
        {   
            
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price
            };


            _productRepository.AddProduct(product);
          

            if (await _productRepository.SaveAllAsync()) return Ok(_mapper.Map<ProductDto>(product));

            return BadRequest("Failed to add product");
        }

        
        [HttpPost("{id}/addphoto")]
        public async Task<ActionResult<PhotoDto>> AddPhoto (int id,IFormFile file)
        {
            var product = await _productRepository.GetProductByIdAsync(id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (product.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            product.Photos.Add(photo);

            if (await _productRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetProduct", new { id = product.Id }, _mapper.Map<PhotoDto>(photo));
            }
            return BadRequest("Problem adding photo");
        }

        
        [HttpPut("{productId}/set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int productId,int photoId)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);

            var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);

            if(photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = product.Photos.FirstOrDefault(x => x.IsMain);
            if(currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if(await _productRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        
        [HttpDelete("{productId}/delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int productId,int photoId)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);

            var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);
            
            if(photo == null) return NotFound();

            if(photo.IsMain) return BadRequest("You cannot delete your main photo");

            if(photo.PublicId != null) 
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);
            } 

            product.Photos.Remove(photo);

            if(await _productRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete photo.");

        }
        
    }
}