using apiweb.eventplus.manha.Domains;

namespace apiweb.eventplus.manha.Interfaces
{
    public interface ITipoEventoRepository
    {
        void Cadastrar(TipoEvento tipoEvento);
        void Delete(Guid id);
        List<TipoEvento> Listar();
        TipoEvento BuscarPorId(Guid id);
        void Atualizar(Guid id, TipoEvento tipoEvento);
    }
}
