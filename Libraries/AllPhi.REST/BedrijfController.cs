using AllPhi.Domain.Interfaces.Repositories;
using AllPhi.Domain.Models;
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
    public class BedrijfController : ControllerBase
    {
        private readonly IBedrijfRepository _bedrijfRepo;
        private readonly IMapper _mapper;


        public BedrijfController(IBedrijfRepository bedrijfRepository, IMapper mapper)
        {
            _mapper = mapper;
            _bedrijfRepo = bedrijfRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<DTO.BedrijfDTO>>> GetBedrijven()
        {
            return Ok(await _bedrijfRepo.Get());
        }

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public List<BedrijfUI> GetActieveBedrijven()
        {
            List<BedrijfUI> bedrijven = new List<BedrijfUI>();
            var alleBedrijven = _bedrijfRepo.Get().Result;

            if (alleBedrijven != null)
            {
                foreach (var bedrijf in alleBedrijven)
                {
                    if (bedrijf.Status == 1)
                    {
                        bedrijven.Add(new BedrijfUI (bedrijf.Id, bedrijf.Naam, bedrijf.BtwNummer, bedrijf.Adres, bedrijf.TelefoonNr, bedrijf.Email  ));
                    }
                }
            }

            return bedrijven;
        }

        [HttpGet("{BedrijfId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DTO.BedrijfDTO>> GetBedrijven(int BedrijfId)
        {
            return Ok(await _bedrijfRepo.Get(BedrijfId));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<DTO.BedrijfDTO>> PostBedrijven([FromBody] DTO.BedrijfDTO bedrijf)
        {
            var newbedrijf = await _bedrijfRepo.Create(_mapper.Map<Domain.Models.Bedrijf>(bedrijf));
            return CreatedAtAction(nameof(GetBedrijven), new { newbedrijf.Id }, newbedrijf);
        }

        [HttpPut("{BedrijfId}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> PutBezoekers(int BedrijfId, [FromBody] DTO.BedrijfDTO bedrijf)
        {
            // Check if the given id is present database or not; if not then we will return bad request
            if (BedrijfId != bedrijf.Id)
            {
                return BadRequest();
            }

            var existingBedrijf = _bedrijfRepo.Get(bedrijf.Id);
            if (existingBedrijf == null)
            {
                return BadRequest();
            }

            await _bedrijfRepo.Update(_mapper.Map<Bedrijf>(bedrijf));
            return NoContent();
        }

        [HttpDelete("{BedrijfId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteBezoeker(int BedrijfId)
        {
            var bezoekerToDelete = await _bedrijfRepo.Get(BedrijfId);
            // We will check if the given id is present in database or not
            if (bezoekerToDelete == null)
                return NotFound();
            await _bedrijfRepo.Delete(bezoekerToDelete.Id);
            return NoContent();
        }

        public class BedrijfUI
        {
            public BedrijfUI(int id, string naam, string btwNummer, string adres, string telefoonNr, string email)
            {
                Id = id;
                Naam = naam;
                this.btwNummer = btwNummer;
                Adres = adres;
                TelefoonNr = telefoonNr;
                Email = email;
            }

            public int Id { get; set; }
            public string Naam { get; set; }
            public string btwNummer { get; set; }
            public string Adres { get; set; }
            public string TelefoonNr { get; set; }
            public string Email { get; set; }
        }
    }
}
