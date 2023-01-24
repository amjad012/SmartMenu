
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TablesController : BaseApiController
    {
        private readonly DataContext _context;

        public TablesController(DataContext context)
        {
            _context = context;

        }
    [HttpGet]//api/table someone reach this endpoints 
    public async Task<ActionResult<List<Table>>>GetTables()
    {
        return await _context.Tables.ToListAsync();
    }
    [HttpGet("{id}")] //api/tables/id=adao23oisnd
    public async Task<ActionResult<Table>>GetTable(Guid id)
    {
        return await _context.Tables.FindAsync(id);
    }
    }
}