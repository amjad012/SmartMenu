
using System.Diagnostics;
using Application.Tables;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

//Our request has contacted our API controller via the HTTP request and then our API controller was passed
//off this request for the tables via mediator to our handler
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

    [HttpPost]
    public async Task<IActionResult>CreateTable(Table table)
    {
        return Ok(await Mediator.Send(new Create.Command {Table = table}));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult>EditTable(Guid id, Table table)
    {
        table.Id = id;
        return Ok(await Mediator.Send(new Edit.Command{Table = table}));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        return Ok(await Mediator.Send(new Delete.Command{Id = id}));
    }


    }
}