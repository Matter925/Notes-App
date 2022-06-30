using Microsoft.EntityFrameworkCore;
using Notes_App.Models.Entities;

namespace Notes_App.Data
{
    public class NotesDbContext:DbContext
    {
        public NotesDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Note> Notes { get; set; }

    }
}
