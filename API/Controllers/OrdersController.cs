using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        public OrdersController(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }




        [HttpPost("addorder")]
        public async Task<ActionResult<OrderDto>> AddOrder(OrderDto orderDto)
        {   
            
            var order = new Order
            {
                CustomerId = orderDto.CustomerId,
                ProductName = orderDto.ProductName,
                ProductPrice = orderDto.ProductPrice,
                PictureUrl = orderDto.PictureUrl
            };


            _orderRepository.AddOrder(order);
          

            if (await _orderRepository.SaveAllAsync()) return Ok(_mapper.Map<OrderDto>(order));

            return BadRequest("Failed to add product");
        }
        
        [HttpGet("getorders")]
        public async Task<ActionResult<OrderDto>> GetOrders()
        {            
            return Ok(await _orderRepository.GetOrdersAsync());
        }

        [HttpGet("getorders/{id}")]
        public async Task<ActionResult<OrderDto>> GetOrders(int id)
        {            
            return Ok(await _orderRepository.GetOrderByIdAsync(id));
        }
    }
}