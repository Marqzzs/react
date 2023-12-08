using apiweb.eventplus.manha.Contexts;
using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;

namespace apiweb.eventplus.manha.Repositories
{
    public class ComentariosEventoRepository : IComentariosEventoRepository
    {
        private readonly EventContext _eventContext;

        public ComentariosEventoRepository()
        {
            _eventContext = new EventContext();
        }

        public ComentariosEvento BuscarPorId(Guid idUsuario, Guid idEvento)
        {
            try
            {
                return _eventContext.ComentariosEvento
                    .Select(c => new ComentariosEvento
                    {
                        Descricao = c.Descricao,
                        Exibe = c.Exibe,

                        Usuario = new Usuario
                        {
                            Nome = c.Usuario!.Nome
                        },

                        Evento = new Evento
                        {
                            NomeEvento = c.Evento!.NomeEvento,
                        }

                    }).FirstOrDefault(c => c.IdUsuario == idUsuario && c.IdEvento == idEvento);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(ComentariosEvento comentarioEvento)
        {
            try
            {
                _eventContext.ComentariosEvento.Add(comentarioEvento);
                _eventContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }


        public void Deletar(Guid id)
        {
            try
            {
                ComentariosEvento comentarioEventoBuscado = _eventContext.ComentariosEvento.Find(id)!;

                if (comentarioEventoBuscado != null)
                {
                    _eventContext.ComentariosEvento.Remove(comentarioEventoBuscado);
                }

                _eventContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ComentariosEvento> Listar()
        {

            try
            {
                return _eventContext.ComentariosEvento.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}