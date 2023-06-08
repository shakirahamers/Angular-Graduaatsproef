using AllPhi.Infrastructure.EF.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Infrastructure.EF
{
    public class ParkeerplaatsDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public ParkeerplaatsDbContext(DbContextOptions<ParkeerplaatsDbContext> options, IConfiguration configuration)
           : base(options)
        {
            _configuration = configuration;
            // To ensure that database is created through dbcontext
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(_configuration.GetConnectionString("WebApiDatabase"));
        }
        public DbSet<ParkeerplaatsDbDTO> Parkeerplaats { get; set; }
    }
    
}
