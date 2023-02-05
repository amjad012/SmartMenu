using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Details
    {
        public class Qeury : IRequest<Product>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Qeury, Product>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Product> Handle(Qeury request, CancellationToken cancellationToken)
            {
               return await _context.Products.FindAsync(request.Id);
            } 
        }
    }
}