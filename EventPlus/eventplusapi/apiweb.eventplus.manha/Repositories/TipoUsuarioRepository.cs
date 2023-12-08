using apiweb.eventplus.manha.Contexts;
using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;

namespace apiweb.eventplus.manha.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        private readonly EventContext _eventContext;

        public TipoUsuarioRepository()
        {
            _eventContext= new EventContext();
        }

        public void Atualizar(Guid id, TipoUsuario tipoUsuario)
        {
            TipoUsuario usuarioAntigo = _eventContext.TipoUsuario.FirstOrDefault(z => z.IdTipoUsuario == id)!;

            usuarioAntigo.Titulo = tipoUsuario.Titulo;

            _eventContext.TipoUsuario.Update(usuarioAntigo);

            _eventContext.SaveChanges();


        }

        public TipoUsuario BuscarPorId(Guid id)
        {
            try
            {
                TipoUsuario usuarioBuscado = _eventContext.TipoUsuario.FirstOrDefault(z => z.IdTipoUsuario == id)!;
                return usuarioBuscado;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Cadastrar(TipoUsuario tipoUsuario)
        {
            _eventContext.TipoUsuario.Add(tipoUsuario);

            _eventContext.SaveChanges();
        }

        public void Delete(Guid id)
        {
            TipoUsuario tipoUsuario = _eventContext.TipoUsuario.FirstOrDefault(z => z.IdTipoUsuario == id)!;
            _eventContext.TipoUsuario.Remove(tipoUsuario);
            _eventContext.SaveChanges();
        }

        public List<TipoUsuario> Listar()
        {

            return _eventContext.TipoUsuario.ToList();

        }
    }
}
