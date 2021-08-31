using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RatingController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IRatingRepository _ratingRepository;
        public RatingController(IRatingRepository ratingRepository, IMapper mapper)
        {
            _ratingRepository = ratingRepository;
            _mapper = mapper;
        }

        [HttpPost("addrating")]
        public async Task<ActionResult<RatingDto>> AddOrder(RatingDto ratingDto)
        {   
            
            var rating = new Rating
            {
                rating = ratingDto.rating,
                UserId = ratingDto.UserId,     
                ProductId = ratingDto.ProductId
            };


            _ratingRepository.AddRating(rating);
          

            if (await _ratingRepository.SaveAllAsync()) return Ok(_mapper.Map<RatingDto>(rating));

            return BadRequest("Failed to add rating");
        }

        [HttpGet("getrating/{id}")]
        public async Task<ActionResult<RatingDto>> GetRating(int id)
        {
            return Ok(await _ratingRepository.GetRatingById(id));
        }

        [HttpGet("getratingforuser/{id}")]
        public async Task<ActionResult<RatingDto>> GetRatingForUser(int id, int ProductId)
        {
            return Ok(await _ratingRepository.GetRaingForUser(ProductId,id));
        }

    }
}