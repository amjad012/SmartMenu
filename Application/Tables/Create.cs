using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tables
{
    public class Create
    {
        public class Command : IRequest//difference between a command and the queries return data commands do not
        {
            public Table Table { get; set; }//this is what we're going to receive as a parameter from our API.
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
                await _context.Tables.AddAsync(request.Table);//we're not accessing the database at this point of our code
                //we only add table in memory
                await _context.SaveChangesAsync();

                return Unit.Value;//letting our API controller know that we finished whatever's going on inside
            }
        }
    }
}