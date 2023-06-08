using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AllPhi.Domain.Interfaces.Repositories;
using AllPhi.Domain.Models;
using AllPhi.Infrastructure.EF.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AllPhi.Infrastructure.EF
{
    public class EFWerknemerRepository : IWerknemerRepository
    {
        private readonly WerknemerDbContext _context;
        private readonly IMapper _mapper;

        public EFWerknemerRepository(WerknemerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Werknemer> CreateWerknemer(Werknemer werknemer)
        {
            WerknemerDbDTO werknemerDbDTO = _mapper.Map<WerknemerDbDTO>(werknemer);
            _context.werknemers.Add(werknemerDbDTO);
            await _context.SaveChangesAsync();
            return werknemer;
        }

        public async Task DeleteWerknemer(int werknemerId)
        {
            // we are using findasync of dbset to find entries
            var werknemerToDelete = await _context.werknemers.FindAsync(werknemerId);
            // we are using Remove method of dbset to delete entry
            if (werknemerToDelete != null)
                _context.werknemers.Remove(werknemerToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Werknemer>> GetWerknemer()
        {
            // we are using ToListAsync of dbset to show all entries
            var werknemer = await _context.werknemers.ToListAsync();
            return _mapper.Map<List<Werknemer>>(werknemer);
        }

        public async Task<Werknemer> GetWerknemer(int werknemerId)
        {
            // we are using findasync of dbset to find a specific entry
            var werknemer = await _context.werknemers.FindAsync(werknemerId);
            return _mapper.Map<Werknemer>(werknemer);
        }

        public async Task UpdateWerknemer(Werknemer werknemer)
        {
            _context.Entry(werknemer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }
}
