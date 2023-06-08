using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.REST.DTO
{
    public class ParkeerplaatsDTO
    {
        public int Id { get; set; }
        public int ParkingContractId { get; set; }
        public string Nummerplaat { get; set; }
    }
}
