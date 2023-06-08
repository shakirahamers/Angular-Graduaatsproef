using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.REST.DTO
{
    public class WerknemerDTO
    {
        [Required]
        public int Id { get; set; }
        public string Voornaam { get; set; }
        public string Naam { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Functie { get; set; }
        public int Status { get; set; }

    }
}
