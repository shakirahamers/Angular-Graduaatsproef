using AutoMapper;
using AllPhi.Domain.Interfaces.Repositories;
using AllPhi.Domain.Models;
using AllPhi.Infrastructure.EF.DTO;
using Microsoft.EntityFrameworkCore;

namespace AllPhi.Infrastructure.EF
{
    public class EFBezoekRepository : IBezoekRepository
    {
        private readonly BezoekDbContext _context;
        private readonly IMapper _mapper;

        public EFBezoekRepository(BezoekDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Bezoek> Create(Bezoek Bezoek)
        {
            BezoekDbDTO BezoekDTO = _mapper.Map<BezoekDbDTO>(Bezoek);
            // we are using Add of dbset to insert an entry
            _context.Bezoek.Add(BezoekDTO);
            await _context.SaveChangesAsync();
            return Bezoek;
        }

        public async Task<Bezoek> Delete(int BezoekerId)
        {
            // we are using findasync of dbset to find entries
            var BezoekToDelete = await _context.Bezoek.FirstOrDefaultAsync(x => x.BezoekerId == BezoekerId && x.Status == 1);
            // we are using Remove method of dbset to delete entry
            // Anders kun je je twee keer uitschrijven.
            if (BezoekToDelete != null && BezoekToDelete.Status != 0)
            {
                //Hier zetten we het bezoek op inactief en de Eindtijd op nu.
                BezoekToDelete.EindTijd = DateTime.Now;
                BezoekToDelete.Status = 0;
            }
            await _context.SaveChangesAsync();
            return _mapper.Map<Bezoek>(BezoekToDelete);
        }

        public async Task<IEnumerable<Bezoek>> Get()
        {
            // we are using ToListAsync of dbset to show all entries
            var emps = await _context.Bezoek.ToListAsync();
            return _mapper.Map<List<Bezoek>>(emps);
        }

        public async Task<Bezoek> Get(int BezoekId)
        {
            // we are using findasync of dbset to find a specific entry
            var emp = await _context.Bezoek.FindAsync(BezoekId);
            return _mapper.Map<Bezoek>(emp);
        }

        public async Task Update(Bezoek Bezoek)
        {
            //_context.Entry(Bezoek).State = EntityState.Modified;
            //BezoekerDbDTO bezoektoupdate = _mapper.Map<BezoekerDbDTO>(Bezoek);
            var bezoekuitcontext = await _context.Bezoek.FindAsync(Bezoek.Id);
            if (bezoekuitcontext != null)
            {
                bezoekuitcontext.EindTijd = Bezoek.EindTijd;
                bezoekuitcontext.Status = 0;
            }


            await _context.SaveChangesAsync();
        }

        //public async Task<IEnumerable<Bezoek>> GetBezoekInBedrijf(string bedrijf)
        //{
        //    var Bezoek = await _context.Bezoek.Where(b => b.Bedrijf.ToLower() == bedrijf.ToLower()).ToListAsync();
        //    return _mapper.Map<List<Bezoek>>(Bezoek);
        //}
    }
}
