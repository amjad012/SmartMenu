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

            await context.Tables.AddRangeAsync(tables);//save to the memory
            await context.SaveChangesAsync();//save to the database
        }
    }
}