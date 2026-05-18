namespace CharactersLibraryWebApp.Models
{
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int Rarity { get; set; }
        public DateTime? ReleaseDate { get; set; }

        public int WeaponTypeId { get; set; }
        public WeaponType WeaponType { get; set; } = null!;

        public int ElementId { get; set; }
        public Element Element { get; set; } = null!;

        public ICollection<Talent> Talents { get; set; } = new List<Talent>();
    }
}
