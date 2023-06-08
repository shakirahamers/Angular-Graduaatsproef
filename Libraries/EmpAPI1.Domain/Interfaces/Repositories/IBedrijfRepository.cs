using AllPhi.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllPhi.Domain.Interfaces.Repositories
{
    public interface IBedrijfRepository
    {
        Task<IEnumerable<Bedrijf>> Get();
        Task<Bedrijf> Get(int bedrijfId);
        Task<Bedrijf> Create(Bedrijf bedrijf);
        Task Update(Bedrijf bedrijf);
        Task Delete(int bedrijfId);
    }
}
