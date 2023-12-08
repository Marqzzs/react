using apiweb.eventplus.manha.Contexts;
using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;

namespace apiweb.eventplus.manha.Repositories
{
    public class TipoEventoRepository : ITipoEventoRepository
    {
        private readonly EventContext _eventContext;
        public TipoEventoRepository()
        {
            _eventContext= new EventContext();
        }
        public void Atualizar(Guid id, TipoEvento tipoEvento)
        {
            TipoEvento tipoAntigo = _eventContext.TipoEvento.FirstOrDefault(z => z.IdTipoEvento == id)!;

            if (tipoAntigo != null)
            {
                tipoAntigo.Titulo = tipoEvento.Titulo;

                _eventContext.TipoEvento.Update(tipoAntigo);
                _eventContext.SaveChanges();
            }
        }

        public TipoEvento BuscarPorId(Guid id)
        {
            TipoEvento tipoBuscado = _eventContext.TipoEvento.FirstOrDefault(z => z.IdTipoEvento== id)!;

            if (tipoBuscado != null)
            {
                return tipoBuscado;
            }
            return null!;
        }

        public void Cadastrar(TipoEvento tipoEvento)
        {
            if (tipoEvento != null)
            {
                _eventContext.TipoEvento.Add(tipoEvento);
                _eventContext.SaveChanges();
            }
        }

        public void Delete(Guid id)
        {
            TipoEvento tipoDeletado = _eventContext.TipoEvento.FirstOrDefault(z => z.IdTipoEvento == id)!;

            _eventContext.TipoEvento.Remove(tipoDeletado);

            _eventContext.SaveChanges();

        }

        public List<TipoEvento> Listar()
        {
            return _eventContext.TipoEvento.ToList();
        }
    }
}
