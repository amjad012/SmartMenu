using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Tables.Any()) return;
            
            var tables = new List<Table>

            {
                new Table
                {
                    Number = 1,
                    Date = DateTime.Now.AddMonths(-2),               
                },
                new Table
                {
                    Number = 2,
                    Date = DateTime.Now.AddMonths(-2),
                },
                new Table
                {
                    Number = 3,
                    Date = DateTime.Now.AddMonths(-2),
                },
                new Table
                {
                    Number = 4,
                    Date = DateTime.Now.AddMonths(-2),
                },
                new Table
                {
                    Number = 5,
                    Date = DateTime.Now.AddMonths(-2),
                },
                new Table
                {
                    Number = 6,
                    Date = DateTime.Now.AddMonths(-2),
                },
                new Table
                {
                    Number = 7,
                    Date = DateTime.Now.AddMonths(-2),
                },
                new Table
                {
                    Number = 8,
                    Date = DateTime.Now.AddMonths(-2),
                },
                new Table
                {
                    Number = 9,
                    Date = DateTime.Now.AddMonths(-2),
                },
                new Table
                {
                    Number = 10,
                    Date = DateTime.Now.AddMonths(-2),
                }
            };
            //  if (context.Menus.Any()) return;
            // var Menus = new List<Menu>
            // {
            //     new Menu
            //     {
            //         Name = "breakfast plate",
            //         Category="Breakfast",
            //         Kcal=400,
            //         Price=30,
            //         Description="Very Good"

            //     },
            //     new Menu
            //     {
            //         Name = "Tuna Sandwich",
            //         Category="Sandwich",
            //         Kcal=240,
            //         Price=20,
            //         Description="Good food for gym"

            //     }
            // };
            await context.Tables.AddRangeAsync(tables);//save to the memory
            // await context.Menus.AddRangeAsync(Menus);
            await context.SaveChangesAsync();//save to the database
        }
    }
}