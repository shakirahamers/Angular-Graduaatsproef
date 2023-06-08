﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Infrastructure.EF.DTO
{
    public class ParkingContractDbDTO
    {
        [Key]
        public int Id { get; set; }
        public int BedrijfId { get; set; }
        public DateOnly StartDatum { get; set; }
        public DateOnly EindDatum { get; set; }
        public int AantalPlaatsen { get; set; }
        public int AantalBezettePlaatsen { get; set; }
        public int Status { get; set; }
        public string Locatie { get; set; }
    }
}
