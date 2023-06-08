using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.REST.DTO
{
    public class BezoekDTO
    {
        public int Id { get; set; }
        public int BedrijfId { get; set; }
        public int BezoekerId { get; set; }
        public string BezochtteWerknemer { get; set; }
        public DateTime StartTijd { get; set; }
        public DateTime? EindTijd { get; set; }
        public int Status { get; set; }
    }
}
