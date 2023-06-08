using AllPhi.Domain.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.REST
{
    [Route("api/[controller]")]
    [ApiController]
#if ProducesConsumes
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
#endif
    public class ParkeerplaatsController : ControllerBase
    {
        private readonly IParkeerplaatsRepository _ParkeerplaatsRepo;
        private readonly IMapper _mapper;

        public ParkeerplaatsController(IParkeerplaatsRepository ParkeerplaatsRepository, IMapper mapper)
        {
            _mapper = mapper;
            _ParkeerplaatsRepo = ParkeerplaatsRepository;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<DTO.ParkeerplaatsDTO>>> GetParkeerplaatsen()
        {
            return Ok(await _ParkeerplaatsRepo.GetParkeerplaats());
        }

        [HttpGet("{Nummerplaat}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DTO.ParkeerplaatsDTO>> GetParkeerplaatsen(string Nummerplaat)
        {
            return Ok(await _ParkeerplaatsRepo.GetParkeerplaats(Nummerplaat));
        }


        //[HttpGet("[action]/{BedrijfNaam}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<ActionResult<IEnumerable<DTO.ParkeerplaatsDTO>>> GetParkeerplaatssInBedrijf(string BedrijfNaam)
        //{
        //    return Ok(await _ParkeerplaatsRepo.(BedrijfNaam));
        //}

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<DTO.ParkeerplaatsDTO>> PostParkeerplaatsen([FromBody] DTO.ParkeerplaatsDTO Parkeerplaats)
        {
            var newParkeerplaats = await _ParkeerplaatsRepo.CreateParkeerplaats(_mapper.Map<Domain.Models.Parkeerplaats>(Parkeerplaats));
            return CreatedAtAction(nameof(GetParkeerplaatsen), new { newParkeerplaats.Id }, newParkeerplaats);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> PutParkeerplaatsen(int ParkeerplaatsId, [FromBody] DTO.ParkeerplaatsDTO Parkeerplaats)
        {
            // Check if the given id is present database or not; if not then we will return bad request
            if (ParkeerplaatsId != Parkeerplaats.Id)
            {
                return BadRequest();
            }
            await _ParkeerplaatsRepo.UpdateParkeerplaats(_mapper.Map<Domain.Models.Parkeerplaats>(Parkeerplaats));
            return NoContent();
        }

        [HttpDelete("{ParkeerplaatsID}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteParkeerplaats(int ParkeerplaatsID)
        {
            var parkeerplaatsToDelete = await _ParkeerplaatsRepo.GetParkeerplaatsById(ParkeerplaatsID);

            if (parkeerplaatsToDelete == null)
                return NotFound();

            await _ParkeerplaatsRepo.DeleteParkeerplaats(ParkeerplaatsID);

            return NoContent(); //keep it real
        }

    }
}
