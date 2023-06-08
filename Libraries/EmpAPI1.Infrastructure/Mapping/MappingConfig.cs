using AutoMapper;
using AllPhi.Domain.Models;
using AllPhi.Infrastructure.EF.DTO;

namespace AllPhi.Infrastructure.Mapping
{
    public class MappingConfig: Profile
    {
        public MappingConfig()
        {
            //Hier goed opletten als je met f2 rename doet dat hij hier niets aanpast
            //(zelfde met mapping in de .REST
            CreateMap<BezoekerDbDTO, Bezoeker>().ReverseMap();
            CreateMap<BedrijfDbDTO, Bedrijf>().ReverseMap();
            CreateMap<ParkingContractDbDTO, ParkingContract>().ReverseMap();
            CreateMap<WerknemerDbDTO, Werknemer>().ReverseMap();
            CreateMap<BezoekDbDTO, Bezoek>().ReverseMap();
            CreateMap<ParkeerplaatsDbDTO, Parkeerplaats>().ReverseMap();
            // CreateMap<EmployeeDTO, Employee>().ReverseMap();
            // Automatische mapping op basis van property names; kan specifiek opgegeven worden ook
        }
    }
}
