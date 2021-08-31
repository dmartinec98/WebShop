using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IRatingRepository
    {
        void AddRating(Rating rating);
        Task<bool> SaveAllAsync();        
        Task<IEnumerable<RatingDto>> GetRatingById(int id);
        Task<IEnumerable<RatingDto>> GetRaingForUser(int ProductId,int UserId);
    }
}