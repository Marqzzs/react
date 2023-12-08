using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;
using apiweb.eventplus.manha.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace apiweb.eventplus.manha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentariosEventoController : ControllerBase
    {

        IComentariosEventoRepository _comentarioRepository;

        public ComentariosEventoController()
        {
            _comentarioRepository = new ComentariosEventoRepository();
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_comentarioRepository.Listar());
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetByUserId(Guid idUsuario, Guid IdEvento)
        {
            try
            {
                return Ok(_comentarioRepository.BuscarPorId(idUsuario, IdEvento));
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(ComentariosEvento comentariosEvento)
        {
            try
            {
                _comentarioRepository.Cadastrar(comentariosEvento);
                return StatusCode(202, "comentario criado");
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }

        [HttpDelete]
        public IActionResult Deletar(Guid IdComentario)
        {
            try
            {
                _comentarioRepository.Deletar(IdComentario);
                return StatusCode(202, "comentario criado");
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }


    }
}
