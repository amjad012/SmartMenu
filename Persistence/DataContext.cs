using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

//for create new table in databse
// 1: dotnet ef database drop
// 2: delete all migration with DataContextModelSnapshot
// 3: 
namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Table> Tables  { get; set; }// name of table in database
        public DbSet<Product> Products { get; set; }//name of the table in database
        
    }
}