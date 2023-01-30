using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tables
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Table Table { get; set; }
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
                var table = await _context.Tables.FindAsync(request.Table.Id);
                _mapper.Map(request.Table, table);//auto mapper is going to take all of the properties that it has inside request table
                // and update the properties inside the updated table

                await _context.SaveChangesAsync(); // Save changes to the database
                return Unit.Value;// return a notification to API that work has completed
            }
        }
    }
}