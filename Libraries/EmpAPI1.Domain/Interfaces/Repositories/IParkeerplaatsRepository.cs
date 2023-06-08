using AllPhi.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Domain.Interfaces.Repositories
{
    public interface IParkeerplaatsRepository
    {
        Task<IEnumerable<Parkeerplaats>> GetParkeerplaats();
        Task<Parkeerplaats> GetParkeerplaats(string nummerplaat);
        Task<Parkeerplaats> CreateParkeerplaats(Parkeerplaats parkeerplaats);
        Task UpdateParkeerplaats(Parkeerplaats parkeerplaats);
        Task DeleteParkeerplaats(int parkeerplaatsId);
        Task<Parkeerplaats> GetParkeerplaatsById(int parkeerplaatsId);
    }
}
