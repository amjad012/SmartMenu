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
        public class Qeury : IRequest<Table>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Qeury, Table>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Table> Handle(Qeury request, CancellationToken cancellationToken)
            {
               return await _context.Tables.FindAsync(request.Id);
            } 
        }
    }
}