namespace AllPhi.Domain.Models
{
    // Geen EF code: nergens bijvoorbeeld [Key]!
    public class Bezoeker
    {
        public int Id { get; set; }
        public string Voornaam { get; set; }
        public string Achternaam { get; set;}
        public string Email { get; set; }
        
    }
}