using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Menu
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int Kcal { get; set; }
        // public  Photo { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
    }
}