using AutoMapper;
using AllPhi.Domain.Interfaces.Repositories;
using AllPhi.Domain.Models;
using AllPhi.REST.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using AllPhi.Infrastructure.EF;
using AllPhi.Infrastructure.EF.DTO;
using System.Reflection.Metadata.Ecma335;

#if ProducesConsumes
using System.Net.Mime;
#endif

namespace AllPhi.REST
{
    [Route("api/[controller]")]
    [ApiController]
#if ProducesConsumes
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
#endif
    public class ParkingContractController : ControllerBase
    {
        private readonly IParkingContractRepository _parkingContractRepo;
        private readonly IMapper _mapper;
        private readonly IBedrijfRepository _bedrijfRepository;

        public ParkingContractController(IParkingContractRepository parkingContractRepository, IMapper mapper, IBedrijfRepository bedrijfRepository)
        {
            _mapper = mapper;
            _parkingContractRepo = parkingContractRepository;
            _bedrijfRepository = bedrijfRepository;

        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<DTO.ParkingContractDTO>>> GetParkingContracten()
        {
            return Ok(await _parkingContractRepo.GetParkingContract());
        }

        [HttpGet("{BedrijfsId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DTO.ParkingContractDTO>> GetParkingContractBedrijf(int BedrijfsId)
        {
            return Ok(await _parkingContractRepo.GetParkingContractBedrijf(BedrijfsId));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<DTO.ParkingContractDTO>> PostParkingContract([FromBody] DTO.ParkingContractDTO parkingContract)
        {
            var newParkingContract = await _parkingContractRepo.CreateParkingContract(_mapper.Map<Domain.Models.ParkingContract>(parkingContract));
            return CreatedAtAction(nameof(GetParkingContracten), new { newParkingContract.Id }, newParkingContract);
        }

        [HttpPut("{ParkingContractId}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> PutParkingContract(int ParkingContractId, [FromBody] DTO.ParkingContractDTO parkingContract)
        {
            if (ParkingContractId != parkingContract.Id)
            {
                return BadRequest();
            }

            var existingParkingContract = await _parkingContractRepo.GetParkingContract(ParkingContractId);
            if (existingParkingContract == null)
            {
                return BadRequest();
            }

            //existingParkingContract.Nummerplaten ??= new List<string>();
            //existingParkingContract.Nummerplaten.AddRange(parkingContract.Nummerplaten);
            //existingParkingContract.AantalBezettePlaatsen += 1;
            ParkingContract contractVoorinDB = _mapper.Map<Domain.Models.ParkingContract>(parkingContract);

            await _parkingContractRepo.UpdateParkingContract(contractVoorinDB);

            //await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{ParkingContractId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteParkingContract(int ParkingContractId)
        {
            var parkingContractToDelete = await _parkingContractRepo.GetParkingContract(ParkingContractId);
            // We will check if the given id is present in database or not
            if (parkingContractToDelete == null)
                return NotFound();
            await _parkingContractRepo.DeleteParkingContract(parkingContractToDelete.Id);
            return NoContent();
        }

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public List<contractUI> getActieveParkingContracten()
        {
            List<contractUI> contracts = new List<contractUI>();

            var parkingContracten = _parkingContractRepo.GetParkingContract().Result;

            if (parkingContracten != null)
            {
                foreach (var contract in parkingContracten)
                {
                    var bedrijf = _bedrijfRepository.Get(contract.BedrijfId).Result;
                    if (bedrijf != null && contract.Status != 0)
                    {
                        contracts.Add(new contractUI(contract.Id, bedrijf.Naam, contract.Locatie, contract.AantalPlaatsen));
                    }
                }
            }

            return contracts;
        }

    }

    public class contractUI
    {
        public contractUI(int ParkingContractId, string Bedrijfnaam, string Locatie, int AantalPlaatsen)
        {
            parkingContractId = ParkingContractId;
            bedrijfNaam = Bedrijfnaam;
            locatie = Locatie;
            aantalPlaatsen = AantalPlaatsen;
        }

        public int parkingContractId { get; set; }
        public string bedrijfNaam { get; set; }
        public string locatie { get; set; }
        public int aantalPlaatsen { get; set; }
    }
}
