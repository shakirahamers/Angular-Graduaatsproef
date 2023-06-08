using AllPhi.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Domain.Interfaces.Repositories
{
    public interface IBezoekRepository
    {

        Task<IEnumerable<Bezoek>> Get();
        Task<Bezoek> Get(int BezoekId);
        Task<Bezoek> Create(Bezoek Bezoek);
        Task Update(Bezoek Bezoek);
        Task<Bezoek> Delete(int BezoekerId);
    }
}

