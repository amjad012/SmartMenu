using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tables
{
    public class List
    {
        public class Query : IRequest<List<Table>> { }

        public class Handler : IRequestHandler<Query, List<Table>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Table>> Handle(Query request, CancellationToken token)
            {
                return await _context.Tables.ToListAsync();
            }
        }
    }
}