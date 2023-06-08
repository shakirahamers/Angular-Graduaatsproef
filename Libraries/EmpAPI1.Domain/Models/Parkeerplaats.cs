using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Domain.Models
{
    public class Parkeerplaats
    {
        public int Id { get; set; }
        public int ParkingContractId { get; set; }
        public string Nummerplaat { get; set; }
    }
}
