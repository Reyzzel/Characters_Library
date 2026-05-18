namespace CharactersLibraryWebApp.Models
{
    public class Element
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Color { get; set; }

        public ICollection<Character> Characters { get; set; } = new List<Character>();
    }
}
