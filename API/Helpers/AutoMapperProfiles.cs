using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser> ();
            CreateMap<Product, ProductDto> ()
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo, PhotoDto> ();
            CreateMap<Comment, CommentDto> ();
            CreateMap<Order, OrderDto> ();
            CreateMap<Rating, RatingDto> ();
        }
    }
}