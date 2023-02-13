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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var table = await _context.Tables.FindAsync(request.Table.Id);

                _mapper.Map(request.Table, table);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}