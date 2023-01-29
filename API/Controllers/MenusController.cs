using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class MenusController : BaseApiController
    {
        private readonly DataContext _context;
        public MenusController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Menu>>>GetMenus()
        {
            return await _context.Menus.ToListAsync();
        }

    }
}