using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Product Product { get; set; }
        }
        public class Handler : IRequest<Command>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            async Task<Unit>Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Tables.FindAsync(request.Product.Id);
                _mapper.Map(request.Product, product);//auto mapper is going to take all of the properties that it has inside request table
                // and update the properties inside the updated table

                await _context.SaveChangesAsync(); // Save changes to the database
                return Unit.Value;// return a notification to API that work has completed
            }
        }
    }
}