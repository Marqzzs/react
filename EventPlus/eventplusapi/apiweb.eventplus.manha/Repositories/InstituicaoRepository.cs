using apiweb.eventplus.manha.Contexts;
using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;

namespace apiweb.eventplus.manha.Repositories
{
    public class InstituicaoRepository : IInstituicaoRepository
    {
        private readonly EventContext _eventContext;

        public InstituicaoRepository()
        {
            _eventContext= new EventContext();
        }

        public Instituicao BuscarPorId(Guid id)
        {
            Instituicao instituicaoBuscada = _eventContext.Instituicao.FirstOrDefault(z => z.IdInstituicao == id)!;

            return instituicaoBuscada;
        }

        public void Cadastrar(Instituicao instituicao)
        {
            _eventContext.Instituicao.Add(instituicao);
            _eventContext.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            Instituicao instituicaoDeletada = _eventContext.Instituicao.FirstOrDefault(z => z.IdInstituicao == id)!;

            _eventContext.Instituicao.Remove(instituicaoDeletada);

            _eventContext.SaveChanges();
        }

        public List<Instituicao> Listar()
        {
            return _eventContext.Instituicao.ToList();
        }
    }
}
