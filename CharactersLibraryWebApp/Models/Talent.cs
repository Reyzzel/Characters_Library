namespace CharactersLibraryWebApp.Models
{
    public class Talent
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? TalentType { get; set; }

        public int CharacterId { get; set; }
        public Character? Character { get; set; }
    }
}
