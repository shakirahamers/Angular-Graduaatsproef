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
    public class EFParkingContractRepository : IParkingContractRepository
    {
        private readonly ParkingContractDbContext _context;
        private readonly IMapper _mapper;

        public EFParkingContractRepository(ParkingContractDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ParkingContract> CreateParkingContract(ParkingContract parkingContract)
        {
            ParkingContractDbDTO parkingContractDbDTO = _mapper.Map<ParkingContractDbDTO>(parkingContract);
            _context.parkingContracten.Add(parkingContractDbDTO);
            await _context.SaveChangesAsync();
            return parkingContract;
        }

        public async Task DeleteParkingContract(int parkingContractId)
        {
            // we are using findasync of dbset to find entries
            var parkingContractToDelete = await _context.parkingContracten.FindAsync(parkingContractId);
            // we are using Remove method of dbset to delete entry
            if (parkingContractToDelete != null)
                _context.parkingContracten.Remove(parkingContractToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ParkingContract>> GetParkingContract()
        {
            var parkingContract = await _context.parkingContracten.ToListAsync();
            var mappedContracts = _mapper.Map<List<ParkingContract>>(parkingContract);

            //foreach (var contract in mappedContracts)
            //{
            //    // Handle NULL values in the mapped properties
            //    if (contract.AantalBezettePlaatsen == null)
            //    {
            //        contract.AantalBezettePlaatsen = 0;
            //    }

            //}

            return mappedContracts;
        }


        public async Task<ParkingContract> GetParkingContract(int parkingContractId)
        {
            // we are using findasync of dbset to find a specific entry
            var parkingContract = await _context.parkingContracten.FindAsync(parkingContractId);
            return _mapper.Map<ParkingContract>(parkingContract);
        }


        public async Task UpdateParkingContract(ParkingContract parkingContract)
        {
            //_context.Entry(parkingContract).State = EntityState.Modified;
            //ParkingContractDbDTO parkingContractDbDTO = _mapper.Map<ParkingContractDbDTO>(parkingContract);
            //_context.Entry(parkingContractDbDTO).State = EntityState.Modified;
            var PK = _context.parkingContracten.FirstOrDefaultAsync(x => x.Id == parkingContract.Id).Result;
            PK.AantalBezettePlaatsen = parkingContract.AantalBezettePlaatsen;
            await _context.SaveChangesAsync();
        }

        public async Task<ParkingContract> GetParkingContractBedrijf(int bedrijfId)
        {
            var parkingContractBedrijf = await _context.parkingContracten.FirstOrDefaultAsync(p => p.BedrijfId == bedrijfId && p.Status == 1);
            return _mapper.Map<ParkingContract>(parkingContractBedrijf);
        }

    }
}
