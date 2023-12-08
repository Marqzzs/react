using apiweb.eventplus.manha.Domains;

namespace apiweb.eventplus.manha.Interfaces
{
    public interface IInstituicaoRepository
    {
        void Cadastrar(Instituicao instituicao);

        void Deletar(Guid id);

        Instituicao BuscarPorId(Guid id);


        List<Instituicao> Listar();
    }
}
