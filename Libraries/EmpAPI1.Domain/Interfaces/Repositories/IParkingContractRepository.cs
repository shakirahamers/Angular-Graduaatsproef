using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AllPhi.Domain.Models;

namespace AllPhi.Domain.Interfaces.Repositories
{
    // Contract
    public interface IParkingContractRepository
    {
        Task<IEnumerable<ParkingContract>> GetParkingContract();
        Task<ParkingContract> GetParkingContract(int parkingContractId);
        Task<ParkingContract> CreateParkingContract(ParkingContract parkingContract);
        Task UpdateParkingContract(ParkingContract parkingContract);
        Task DeleteParkingContract(int parkingContractId);
        Task<ParkingContract> GetParkingContractBedrijf(int bedrijfId);
    }
}
