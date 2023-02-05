using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class List
    {
        public class Qeury : IRequest<List<Product>> {}

        public class Handler : IRequestHandler<Qeury, List<Product>>
        {
        private readonly DataContext _context;
    
           public Handler(DataContext context)
           {        
            _context = context;
           }
            public async Task<List<Product>> Handle(Qeury request,CancellationToken token)
            {
                
                return await _context.Products.ToListAsync();
            }
        }
    }
}