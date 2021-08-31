using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<CommentDto>> GetCommentById(int id);
    }
}