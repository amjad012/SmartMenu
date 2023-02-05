using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using static Application.Products.Create;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest
        {
            public Product Product { get; set; }
        }
    }
    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;

        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
           await _context.Products.AddAsync(request.Product);

           await _context.SaveChangesAsync();
           return Unit.Value;
        }
    }
}