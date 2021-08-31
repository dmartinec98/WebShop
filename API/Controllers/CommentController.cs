using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
        }




        [HttpPost("addcomment")]
        public async Task<ActionResult<CommentDto>> AddComment(CommentDto commentDto)
        {

            var comment = new Comment
            {
                komentar = commentDto.Komentar,
                username = commentDto.Username,
                ProductId = commentDto.ProductId
            };

            _commentRepository.AddComment(comment);


            if (await _commentRepository.SaveAllAsync()) return Ok(_mapper.Map<CommentDto>(comment));

            return BadRequest("Failed to add comment");
        }

        [HttpGet("getcomments/{id}")]
        public async Task<ActionResult<CommentDto>> GetComments(int id)
        {
            return Ok(await _commentRepository.GetCommentById(id));
        }
    }
}