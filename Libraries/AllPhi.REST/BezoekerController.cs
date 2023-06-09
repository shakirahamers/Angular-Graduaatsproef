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
    public class BezoekerController : ControllerBase
    {
        private readonly IBezoekerRepository _bezoekerRepo;
        private readonly IMapper _mapper;
        private readonly IBezoekRepository _bezoekRepo;

        public BezoekerController(IBezoekerRepository BezoekerRepository, IMapper mapper, IBezoekRepository bezoekRepo)
        {
            _mapper = mapper;
            _bezoekerRepo = BezoekerRepository;
            _bezoekRepo = bezoekRepo;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<DTO.BezoekerDTO>>> GetBezoekers()
        {
            return Ok(await _bezoekerRepo.Get());
        }

        [HttpGet("{BezoekerId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DTO.BezoekerDTO>> GetBezoekers(int BezoekerId)
        {
            return Ok(await _bezoekerRepo.Get(BezoekerId));
        }


        [HttpGet("[action]/{Email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DTO.BezoekDTO>> GetBezoek(string Email)
        {
            return Ok(await _bezoekerRepo.GetEmail(Email));
        }

        [HttpGet("[action]/{BedrijfId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<DTO.BezoekerDTO>>> GetBezoekersInBedrijf(int BedrijfId)
        {
            return Ok(await _bezoekerRepo.GetBezoekersInBedrijf(BedrijfId));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<DTO.BezoekerDTO>> PostBezoekers([FromBody] DTO.BezoekerDTO bezoeker)
        {
            var newbezoeker = await _bezoekerRepo.Create(_mapper.Map<Domain.Models.Bezoeker>(bezoeker));
            return CreatedAtAction(nameof(GetBezoekers), new { newbezoeker.Id }, newbezoeker);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> PutBezoekers(int BezoekerId, [FromBody] DTO.BezoekerDTO bezoeker)
        {
            // Check if the given id is present database or not; if not then we will return bad request
            if (BezoekerId != bezoeker.Id)
            {
                return BadRequest();
            }
            await _bezoekerRepo.Update(_mapper.Map<Domain.Models.Bezoeker>(bezoeker));
            return NoContent();
        }

        [HttpDelete("{BezoekerId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteBezoeker(int BezoekerId)
        {
            var bezoekerToDelete = await _bezoekerRepo.Get(BezoekerId);
            // We will check if the given id is present in database or not
            if (bezoekerToDelete == null)
                return NotFound();
            await _bezoekerRepo.Delete(bezoekerToDelete.Id);
            return NoContent();
        }

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public List<Bezoeker> AlleBezoekersAanwezig()
        {
            var bezoeken = _bezoekRepo.Get();
            List<Bezoeker> list = new List<Bezoeker>();

            if (bezoeken.Result != null)
            {
                foreach (var bezoek in bezoeken.Result)
                {
                    int bezoekerId = bezoek.BezoekerId;

                    var bezoeker = _bezoekerRepo.Get(bezoekerId).Result;
                    list.Add(bezoeker);
                }
            }

            return list;
        }
    }
}