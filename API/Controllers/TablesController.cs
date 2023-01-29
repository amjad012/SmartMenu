
using Application.Tables;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TablesController : BaseApiController
    {
       
     
    [HttpGet]//api/table someone reach this endpoints 
    public async Task<ActionResult<List<Table>>>GetTables()
    {
        return await Mediator.Send(new List.Qeury()); //Mediator from BaseApiController class
    }
    [HttpGet("{id}")] //api/tables/id=adao23oisnd
    public async Task<ActionResult<Table>>GetTable(Guid id)
    {
        return await Mediator.Send(new Details.Qeury{Id = id});
    }
    }
}