using apiweb.eventplus.manha.Contexts;
using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace apiweb.eventplus.manha.Repositories
{
    public class PresencaEventoRepository : IPresencaEventoRepository
    {
        private readonly EventContext _eventContext;

        public PresencaEventoRepository()
        {
            _eventContext= new EventContext();
        }

        public void Atualizar(Guid id, PresencaEvento presencaEvento)
        {
            try
            {
                PresencaEvento presencaAntiga = _eventContext.PresencaEvento.FirstOrDefault(z => z.IdPresencaEvento == id)!;

                if (presencaAntiga != null)
                {
                    presencaAntiga.Situacao = presencaEvento.Situacao;
                    presencaAntiga.IdEvento = presencaEvento.IdEvento;
                    presencaAntiga.IdUsuario = presencaEvento.IdUsuario;

                    _eventContext.PresencaEvento.Update(presencaAntiga);
                    _eventContext.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Cadastrar(PresencaEvento presencaEvento)
        {
            try
            {
                _eventContext.PresencaEvento.Add(presencaEvento);
                _eventContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Delete(Guid id)
        {
            try
            {
                PresencaEvento eventoDeletado = _eventContext.PresencaEvento.FirstOrDefault(z => z.IdPresencaEvento == id)!;
                _eventContext.PresencaEvento.Remove(eventoDeletado);
                _eventContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<PresencaEvento> Listar()
        {
            try
            {
                return _eventContext.PresencaEvento.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<PresencaEvento> ListarMinhaPresenca(Guid id)
        {
            try
            {

                return _eventContext.PresencaEvento.Select(p => new PresencaEvento
                {
                    IdPresencaEvento = p.IdPresencaEvento,
                    Situacao = p.Situacao,
                    IdUsuario = p.IdUsuario,

                    Evento = new Evento
                    {
                        IdEvento = p.IdEvento,
                        DataEvento = p.Evento!.DataEvento,
                        NomeEvento = p.Evento.NomeEvento,
                        Descricao = p.Evento.Descricao,

                        Instituicao = new Instituicao
                        {
                            IdInstituicao = p.Evento.IdInstituicao,
                            NomeFantasia = p.Evento.Instituicao!.NomeFantasia
                        }
                    }

                }).Where(z => z.IdUsuario == id).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
