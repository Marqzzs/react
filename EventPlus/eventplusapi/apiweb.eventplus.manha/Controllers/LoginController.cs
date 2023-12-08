using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;
using apiweb.eventplus.manha.Repositories;
using apiweb.eventplus.manha.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace apiweb.eventplus.manha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        IUsuarioRepository _usuarioRepository;

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Get(LoginViewModel usuario)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.BuscarPorEmailSenha(usuario.Email, usuario.Senha);
                if (usuarioBuscado != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Jti,usuarioBuscado.IdUsuario.ToString()),
                        new Claim("IdTipoUsuario",usuarioBuscado.IdTipoUsuario.ToString()),
                        new Claim(JwtRegisteredClaimNames.Name,usuarioBuscado.Nome),
                        new Claim(JwtRegisteredClaimNames.Email,usuarioBuscado.Email),
                        new Claim("role", usuarioBuscado.TipoUsuario.Titulo!)
                    };

                    //2º - Defiir a chave de acesso ao token
                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("projetoevent-chave-autenticacao-webapi-dev"));

                    //3º - Definir as credenciais do token (HEADER)
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    //4º - Gerar token
                    var token = new JwtSecurityToken
                    (
                        //emissor do token (O NOME DO projeto)
                        issuer: "apiweb.eventplus.manha",

                        //Destinatário do token (TAMBÉM O NOME DO PROJETO)
                        audience: "apiweb.eventplus.manha",

                        //dados definidos nas claims(informalções)
                        claims: claims,

                        //tempo de expiração do token
                        expires: DateTime.Now.AddMinutes(50),

                        //credenciais do token
                        signingCredentials: creds
                    );

                    //5º - retornar o token criado
                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token)
                    });
                }
                return Ok(null);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
                throw;
            }

        }
    }
}
