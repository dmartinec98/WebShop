using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class RatingRepository : IRatingRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public RatingRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddRating(Rating rating)
        {
            _context.Ratings.Add(rating);
        }

        public async Task<IEnumerable<RatingDto>> GetRaingForUser(int ProductId, int UserId)
        {
            return await _context.Ratings
                .Where(x => x.ProductId == ProductId)
                .Where(x => x.UserId == UserId)
                .ProjectTo<RatingDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<int> GetRatingById(int id)
        {
            List<RatingDto> parts = new List<RatingDto>();
            parts = await _context.Ratings
                .Where(x => x.ProductId == id)
                .ProjectTo<RatingDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            
            int zbroj = 0;
            for(int i = 0; i< parts.Count; i++) {
                zbroj += parts.ElementAt(i).rating;
            }

            return (zbroj/parts.Count);
            
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        async Task<IEnumerable<RatingDto>> IRatingRepository.GetRatingById(int id)
        {
            return await _context.Ratings
                .Where(x => x.ProductId == id)
                .ProjectTo<RatingDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}