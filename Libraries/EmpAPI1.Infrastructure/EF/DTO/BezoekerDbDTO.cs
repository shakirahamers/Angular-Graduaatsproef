using System.ComponentModel.DataAnnotations;

namespace AllPhi.Infrastructure.EF.DTO
{
    // Specifieke EF attributen zijn nodig: DTO mapping is ook hier aan de orde tov het domein!
    public class BezoekerDbDTO
    {
        [Key]
        public int Id { get; set; }
        public string Voornaam { get; set; }
        public string Achternaam { get; set; }
        public string Email { get; set; }
        
    }
}