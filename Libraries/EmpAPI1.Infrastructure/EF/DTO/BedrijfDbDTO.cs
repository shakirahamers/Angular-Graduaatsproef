using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Infrastructure.EF.DTO
{
    public class BedrijfDbDTO
    {
        [Key]
        public int Id { get; set; }
        public string Naam { get; set; }
        public string btwNummer { get; set; }
        public string Adres { get; set; }
        public string TelefoonNr { get; set; }
        public string Email { get; set; }
        public int Status { get; set; }

    }
}
