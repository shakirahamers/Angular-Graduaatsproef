using AllPhi.Domain.Models;

namespace AllPhi.Domain.Interfaces.Repositories
{
    // Contract
    public interface IBezoekerRepository
    {
        Task<IEnumerable<Bezoeker>> Get();
        Task<Bezoeker> Get(int BezoekerId);

        Task<Bezoeker> GetEmail(string Email);
        Task<IEnumerable<Bezoeker>> GetBezoekersInBedrijf(int bedrijfId);
        Task<Bezoeker> Create(Bezoeker bezoeker);
        Task Update(Bezoeker bezoeker);
        Task Delete(int BezoekerId);
    }
}