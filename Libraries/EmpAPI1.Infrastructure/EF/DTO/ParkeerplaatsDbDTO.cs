using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Infrastructure.EF.DTO
{
    public class ParkeerplaatsDbDTO
    {
        [Key]
        public int Id { get; set; }
        public int ParkingContractId { get; set; }
        public string Nummerplaat { get; set; }
    }
}
