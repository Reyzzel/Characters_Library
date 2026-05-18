using CharactersLibraryWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CharactersLibraryWebApp.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
        }
        public DbSet<Character> Characters { get; set; }
        public DbSet<WeaponType> WeaponTypes { get; set; }
        public DbSet<Element> Elements { get; set; }
        public DbSet<Talent> Talents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed WeaponTypes
            modelBuilder.Entity<WeaponType>().HasData(
                new WeaponType { Id = 1, Name = "Sword" },
                new WeaponType { Id = 2, Name = "Bow" },
                new WeaponType { Id = 3, Name = "Catalyst" },
                new WeaponType { Id = 4, Name = "Claymore" },
                new WeaponType { Id = 5, Name = "Polearm" }
            );

            // Seed Elements
            modelBuilder.Entity<Element>().HasData(
                new Element { Id = 1, Name = "Pyro", Color = "#FF4500" },
                new Element { Id = 2, Name = "Hydro", Color = "#1E90FF" },
                new Element { Id = 3, Name = "Anemo", Color = "#00CED1" },
                new Element { Id = 4, Name = "Electro", Color = "#9400D3" },
                new Element { Id = 5, Name = "Dendro", Color = "#228B22" },
                new Element { Id = 6, Name = "Cryo", Color = "#ADD8E6" },
                new Element { Id = 7, Name = "Geo", Color = "#FFD700" }
            );

            // Seed Characters
            modelBuilder.Entity<Character>().HasData(
                new Character
                {
                    Id = 1,
                    Name = "Hu Tao",
                    Title = "Director of the Wangsheng Funeral Parlor",
                    Description = "The 77th Director of the Wangsheng Funeral Parlor.",
                    Rarity = 5,
                    WeaponTypeId = 5,
                    ElementId = 1,
                    ReleaseDate = new DateTime(2021, 3, 2, 0, 0, 0, DateTimeKind.Utc)
                },
                new Character
                {
                    Id = 2,
                    Name = "Raiden Shogun",
                    Title = "Plane of Euthymia",
                    Description = "Her Excellency, the Almighty Narukami Ogosho.",
                    Rarity = 5,
                    WeaponTypeId = 5,
                    ElementId = 4,
                    ReleaseDate = new DateTime(2021, 9, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // for delete talents when character is deleted
            modelBuilder.Entity<Talent>()
                .HasOne(t => t.Character)
                .WithMany(c => c.Talents)
                .HasForeignKey(t => t.CharacterId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
