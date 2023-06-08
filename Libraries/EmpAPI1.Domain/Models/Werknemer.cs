using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Domain.Models
{
    public class Werknemer
    {
        public int Id { get; set; }
        public string Voornaam { get; set; }
        public string Naam { get; set; }
        public string Email { get; set; }
        public string Functie { get; set; }
        public int Status { get; set; }

        public Werknemer(string voornaam, string naam, string email, string functie)
        {
            Voornaam = voornaam;
            Naam = naam;
            Email = email;
            Functie = functie;
            Status = 1;
        }
    }
}
