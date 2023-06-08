using AutoMapper;
using AllPhi.Domain.Interfaces.Repositories;
using AllPhi.Domain.Models;
using AllPhi.Infrastructure.EF.DTO;
using Microsoft.EntityFrameworkCore;

namespace AllPhi.Infrastructure.EF
{
    public class EFBezoekerRepository : IBezoekerRepository
    {
        private readonly BezoekerDbContext _context;
        private readonly IMapper _mapper;

        public EFBezoekerRepository(BezoekerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Bezoeker> Create(Bezoeker bezoeker)
        {
            //if (_context.Bezoekers.Any(x => x.Email == bezoeker.Email))
            //{
            //    var DeInDBgevondenBezoeker = _context.Bezoekers.Any(x => x.Email == bezoeker.Email);

            //    Bezoeker bezoekerInDB = _mapper.Map<Bezoeker>(DeInDBgevondenBezoeker);

            //    return bezoekerInDB;
            //}
            BezoekerDbDTO bezoekerDTO = _mapper.Map<BezoekerDbDTO>(bezoeker);
            // we are using Add of dbset to insert an entry
            _context.Bezoekers.Add(bezoekerDTO);
            await _context.SaveChangesAsync();
            bezoeker.Id = bezoekerDTO.Id;
            return bezoeker;
        }

        public async Task Delete(int EmpId)
        {
            // we are using findasync of dbset to find entries
            var bezoekerToDelete = await _context.Bezoekers.FindAsync(EmpId);
            // we are using Remove method of dbset to delete entry
            if (bezoekerToDelete != null)
                _context.Bezoekers.Remove(bezoekerToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Bezoeker>> Get()
        {
            // we are using ToListAsync of dbset to show all entries
            var bezoekers = await _context.Bezoekers.ToListAsync();
            return _mapper.Map<List<Bezoeker>>(bezoekers);
        }

        public async Task<Bezoeker> Get(int EmpId)
        {
            // we are using findasync of dbset to find a specific entry
            var emp = await _context.Bezoekers.FindAsync(EmpId);
            return _mapper.Map<Bezoeker>(emp);
        }
        public async Task<Bezoeker> GetEmail(string Email)
        {
            // we are using findasync of dbset to find a specific entry
            var BezoekerUitDB = await _context.Bezoekers.FirstOrDefaultAsync(x => x.Email == Email);
            return _mapper.Map<Bezoeker>(BezoekerUitDB);
        }

        public async Task Update(Bezoeker bezoeker)
        {
            _context.Entry(bezoeker).State = EntityState.Modified;
            //var bezoekerDTO = _mapper.Map<BezoekerDbDTO>(bezoeker);
            //bezoeker.
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Bezoeker>> GetBezoekersInBedrijf(int bedrijfId)
        {
            var bezoekers = await _context.Bezoekers.Where(b => b.Id == bedrijfId).ToListAsync();
            return _mapper.Map<List<Bezoeker>>(bezoekers);
        }
    }
}
