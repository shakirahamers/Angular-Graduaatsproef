using System.ComponentModel.DataAnnotations;

#if ProducesConsumes
#endif

namespace AllPhi.REST.DTO
{
    public class BezoekerDTO
    {
        [Required]
        public int Id { get; set; }
        [MaxLength(100)]
        public string Voornaam { get; set; }
        [MaxLength(100)]
        public string Achternaam { get; set; }
        [MaxLength(100)]
        public string Email { get; set; }
        //[Required]
        //public int Bedrijf { get; set; } 
    }
}