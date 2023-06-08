using AllPhi.Domain.Models;
using AllPhi.REST.DTO;

#if ProducesConsumes
#endif

namespace AllPhi.REST.Mapping
{
    public class MappingConfig : Infrastructure.Mapping.MappingConfig
    {
        public MappingConfig() : base()
        {
            //Hier goed opletten als je met f2 rename doet dat hij hier niets aanpast
            //(zelfde met mapping in de infrastructure
            CreateMap<BezoekerDTO, Bezoeker>().ReverseMap();
            CreateMap<BedrijfDTO, Bedrijf>().ReverseMap();
            CreateMap<ParkingContractDTO, ParkingContract>().ReverseMap();
            CreateMap<WerknemerDTO, Werknemer>().ReverseMap();
            CreateMap<BezoekDTO, Bezoek>().ReverseMap();
            CreateMap<ParkeerplaatsDTO, Parkeerplaats>().ReverseMap();
        }
    }
}