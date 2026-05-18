namespace CharactersLibraryWebApp.Models
{
    public class WeaponType
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<Character> Characters { get; set; } = new List<Character>();
    }
}
