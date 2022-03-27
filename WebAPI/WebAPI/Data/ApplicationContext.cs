using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class ApplicationContext : DbContext
    {
        private IConfiguration _configuration;
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //string ConnectionString = _configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB; Initial catalog = BooksPortal; Integrated Security = true");
        }
    }
}
