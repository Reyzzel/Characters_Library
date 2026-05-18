using CharactersLibraryWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CharactersLibraryWebApp.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
        }
        public DbSet<Character> Characters { get; set; } = null!;
        public DbSet<WeaponType> WeaponTypes { get; set; } = null!;
        public DbSet<Element> Elements { get; set; } = null!;
        public DbSet<Talent> Talents { get; set; } = null!;
    }
}
