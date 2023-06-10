using AllPhi.Domain.Interfaces.Repositories;
using AllPhi.Domain.Models;
using AllPhi.Infrastructure.EF.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Infrastructure.EF
{
    public class EFBedrijfRepository : IBedrijfRepository
    {
        private readonly BedrijfDbContext _context;
        private readonly IMapper _mapper;

        public EFBedrijfRepository(BedrijfDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Bedrijf> Create(Bedrijf bedrijf)
        {
            BedrijfDbDTO bedrijfDbDTO = _mapper.Map<BedrijfDbDTO>(bedrijf);
            _context.bedrijven.Add(bedrijfDbDTO);
            await _context.SaveChangesAsync();
            return bedrijf;
        }

        public async Task Delete(int bedrijfId)
        {
            // we are using findasync of dbset to find entries
            var bedrijfToDelete = await _context.bedrijven.FindAsync(bedrijfId);
            // we are using Remove method of dbset to delete entry
            if (bedrijfToDelete != null)
                bedrijfToDelete.Status = 0;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Bedrijf>> Get()
        {
            // we are using ToListAsync of dbset to show all entries
            var bedrijf = await _context.bedrijven.ToListAsync();
            return _mapper.Map<List<Bedrijf>>(bedrijf);
        }

        public async Task<Bedrijf> Get(int bedrijfId)
        {
            // we are using findasync of dbset to find a specific entry
            var bedrijf = await _context.bedrijven.FindAsync(bedrijfId);
            return _mapper.Map<Bedrijf>(bedrijf);
        }

        public async Task Update(Bedrijf bedrijf)
        {
            var bedrijfToUpdate = await _context.bedrijven.FirstOrDefaultAsync(b => b.Id == bedrijf.Id && b.Status == 1);
            if (bedrijfToUpdate != null)
            {
                bedrijfToUpdate.Naam = bedrijf.Naam;
                bedrijfToUpdate.btwNummer = bedrijf.BtwNummer;
                bedrijfToUpdate.Adres = bedrijf.Adres;
                bedrijfToUpdate.Email = bedrijf.Email;
                bedrijfToUpdate.TelefoonNr = bedrijf.TelefoonNr;
                await _context.SaveChangesAsync();
            }



        }
    }
}
