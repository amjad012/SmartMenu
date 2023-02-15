using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tables
{
    public class Details
    {
        public class Query : IRequest<Table>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Table>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Table> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Tables.FindAsync(request.Id);
            } 
        }
    }
}