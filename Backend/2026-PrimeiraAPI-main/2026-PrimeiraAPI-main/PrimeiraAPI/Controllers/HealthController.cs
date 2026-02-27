using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PrimeiraAPI.Controllers
{
    [Route("api/statusAPI")] // Rota base: /api/health
    [ApiController] // Ativa validação automática e outras funcionalidades de API

    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                status = "UP",
                service = "Primeira API",
                date = DateTime.Now
            });
        }
    }
}
