using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AllPhi.Domain.Models;

namespace AllPhi.Domain.Interfaces.Repositories
{
    public interface IWerknemerRepository
    {
        Task<IEnumerable<Werknemer>> GetWerknemer();
        Task<Werknemer> GetWerknemer(int werknemerId);
        Task<Werknemer> CreateWerknemer(Werknemer werknemer);
        Task UpdateWerknemer(Werknemer werknemer);
        Task DeleteWerknemer(int werknemerId);
    }
}
