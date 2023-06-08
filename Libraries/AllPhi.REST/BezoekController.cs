using AutoMapper;
using AllPhi.Domain.Interfaces.Repositories;
using AllPhi.Domain.Models;
using AllPhi.REST.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

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
    public class BezoekController : ControllerBase
    {
        private readonly IBezoekRepository _BezoekRepo;
        private readonly IMapper _mapper;

        public BezoekController(IBezoekRepository BezoekRepository, IMapper mapper)
        {
            _mapper = mapper;
            _BezoekRepo = BezoekRepository;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<DTO.BezoekDTO>>> GetBezoeken()
        {
            return Ok(await _BezoekRepo.Get());
        }

        [HttpGet("{BezoekId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DTO.BezoekDTO>> GetBezoeken(int BezoekId)
        {
            return Ok(await _BezoekRepo.Get(BezoekId));
        }


        //[HttpGet("[action]/{BedrijfNaam}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<ActionResult<IEnumerable<DTO.BezoekDTO>>> GetBezoeksInBedrijf(string BedrijfNaam)
        //{
        //    return Ok(await _BezoekRepo.(BedrijfNaam));
        //}

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<DTO.BezoekDTO>> PostBezoeken([FromBody] DTO.BezoekDTO Bezoek)
        {
            var newBezoek = await _BezoekRepo.Create(_mapper.Map<Domain.Models.Bezoek>(Bezoek));
            return CreatedAtAction(nameof(GetBezoeken), new { newBezoek.Id }, newBezoek);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> PutBezoeken(int BezoekId, [FromBody] DTO.BezoekDTO Bezoek)
        {
            // Check if the given id is present database or not; if not then we will return bad request
            if (BezoekId != Bezoek.Id)
            {
                return BadRequest();
            }
            await _BezoekRepo.Update(_mapper.Map<Domain.Models.Bezoek>(Bezoek));
            return NoContent();
        }

        [HttpDelete("{BezoekerID}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteBezoek(int BezoekerID)
        {
            return Ok( await _BezoekRepo.Delete(BezoekerID));
            // We will check if the given id is present in database or not
            //if (BezoekToDelete == null)
            //    return NotFound();
            //await _BezoekRepo.Delete(BezoekToDelete.BezoekerId); //TODO: moet nog aangepast worden
            return NoContent();
        }
    }
}