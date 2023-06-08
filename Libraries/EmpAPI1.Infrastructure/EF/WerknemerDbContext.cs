using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AllPhi.Infrastructure.EF.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AllPhi.Infrastructure.EF
{
    public class WerknemerDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public WerknemerDbContext(DbContextOptions<WerknemerDbContext> options, IConfiguration configuration)
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

        public DbSet<WerknemerDbDTO> werknemers { get; set; }
    }
}
