using apiweb.eventplus.manha.Domains;

namespace apiweb.eventplus.manha.Interfaces
{
    public interface IComentariosEventoRepository
    {
        void Cadastrar(ComentariosEvento comentarioEvento);
        void Deletar(Guid id);
        List<ComentariosEvento> Listar();
        ComentariosEvento BuscarPorId(Guid idUsuario, Guid IdEvento);
    }
}