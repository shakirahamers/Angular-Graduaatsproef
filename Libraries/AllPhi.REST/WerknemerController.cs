using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using AllPhi.Domain.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AllPhi.REST
{
    [Route("api/[controller]")]
    [ApiController]
#if ProducesConsumes
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
#endif
    public class WerknemerController : ControllerBase
    {
        private readonly IWerknemerRepository _werknemerRepo;
        private readonly IMapper _mapper;

        public WerknemerController(IWerknemerRepository werknemerRepository, IMapper mapper)
        {
            _mapper = mapper;
            _werknemerRepo = werknemerRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<DTO.WerknemerDTO>>> GetWerknemers()
        {
            return Ok(await _werknemerRepo.GetWerknemer());
        }

        [HttpGet("{WerknemerId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DTO.WerknemerDTO>> GetWerkenemer(int WerknemerId)
        {
            return Ok(await _werknemerRepo.GetWerknemer(WerknemerId));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<DTO.WerknemerDTO>> PostWerknemer([FromBody] DTO.WerknemerDTO werknemer)
        {
            var newWerknemer = await _werknemerRepo.CreateWerknemer(_mapper.Map<Domain.Models.Werknemer>(werknemer));
            return CreatedAtAction(nameof(GetWerknemers), new { newWerknemer.Id }, newWerknemer);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> PutWerknemer(int werknemerId, [FromBody] DTO.WerknemerDTO werknemer)
        {
            // Check if the given id is present database or not; if not then we will return bad request
            if (werknemerId != werknemer.Id)
            {
                return BadRequest();
            }
            await _werknemerRepo.UpdateWerknemer(_mapper.Map<Domain.Models.Werknemer>(werknemer));
            return NoContent();
        }

        [HttpDelete("{WerknemerId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteWerknemer(int WerknemerId)
        {
            var werknemerToDelete = await _werknemerRepo.GetWerknemer(WerknemerId);
            // We will check if the given id is present in database or not
            if (werknemerToDelete == null)
                return NotFound();
            await _werknemerRepo.DeleteWerknemer(werknemerToDelete.Id);
            return NoContent();
        }
    }
}
