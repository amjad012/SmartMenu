using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Products;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet]//api/product someone reach this endpoints 
        public async Task<ActionResult<List<Product>>>GetProducts()
        {
           return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/products/id=adao23oisnd
        public async Task<ActionResult<Product>>GetProduct(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult>CreateProduct(Product product)
        {
            return Ok(await Mediator.Send(new Create.Command {Product = product}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>EditProduct(Guid id, Product product)
        {
            product.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Product = product}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}