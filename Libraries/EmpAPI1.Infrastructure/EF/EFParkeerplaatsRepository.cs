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
    public class EFParkeerplaatsRepository : IParkeerplaatsRepository

    {
        private readonly ParkeerplaatsDbContext _context;
        private readonly IMapper _mapper;

        public EFParkeerplaatsRepository(ParkeerplaatsDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Parkeerplaats> CreateParkeerplaats(Parkeerplaats parkeerplaats)
        {
            ParkeerplaatsDbDTO ParkeerplaatsDTO = _mapper.Map<ParkeerplaatsDbDTO>(parkeerplaats);
            // we are using Add of dbset to insert an entry
            _context.Parkeerplaats.Add(ParkeerplaatsDTO);
            await _context.SaveChangesAsync();
            return parkeerplaats;
        }

        public async Task DeleteParkeerplaats(int parkeerplaatsId)
        {
            // we are using findasync of dbset to find entries
            var parkeerplaatsToDelete = await _context.Parkeerplaats.FirstOrDefaultAsync(x => x.Id == parkeerplaatsId);
            // we are using Remove method of dbset to delete entry
            // Anders kun je je twee keer uitschrijven.
            if (parkeerplaatsToDelete != null)
            {
                _context.Parkeerplaats.Remove(parkeerplaatsToDelete);
                await _context.SaveChangesAsync();
            }
            //return parkeerplaatsToDelete;
        }


        public async Task<IEnumerable<Parkeerplaats>> GetParkeerplaats()
        {
            // we are using ToListAsync of dbset to show all entries
            var parkeerplaats = await _context.Parkeerplaats.ToListAsync();
            return _mapper.Map<List<Parkeerplaats>>(parkeerplaats);
        }

        public async Task<Parkeerplaats> GetParkeerplaats(string nummerplaat)
        {
            var parkeerplaats = await _context.Parkeerplaats.FirstOrDefaultAsync(p => p.Nummerplaat == nummerplaat);
            return _mapper.Map<Parkeerplaats>(parkeerplaats);
        }
        public async Task<Parkeerplaats> GetParkeerplaatsById(int parkeerplaatsId)
        {
            var parkeerplaats = await _context.Parkeerplaats.FindAsync(parkeerplaatsId);
            return _mapper.Map<Parkeerplaats>(parkeerplaats);
        }

        public async Task UpdateParkeerplaats(Parkeerplaats parkeerplaats)
        {
            //var Parkeerplaatsuitcontext = await _context.Parkeerplaats.FindAsync(parkeerplaats.Id);
            //if (Parkeerplaatsuitcontext != null)
            //{
            //    Parkeerplaatsuitcontext.EindTijd = Parkeerplaats.EindTijd;
            //    Parkeerplaatsuitcontext.Status = 0;
            //}

            //
            //await _context.SaveChangesAsync();
        }


    }
}
