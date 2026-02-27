using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrimeiraAPI.Data;
using PrimeiraAPI.Models;

namespace PrimeiraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiciplinasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DiciplinasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Diciplinas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diciplina>>> GetDiciplina()
        {
            return await _context.Diciplina.ToListAsync();
        }

        // GET: api/Diciplinas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Diciplina>> GetDiciplina(Guid id)
        {
            var diciplina = await _context.Diciplina.FindAsync(id);

            if (diciplina == null)
            {
                return NotFound();
            }

            return diciplina;
        }

        // PUT: api/Diciplinas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiciplina(Guid id, Diciplina diciplina)
        {
            if (id != diciplina.DiciplinaId)
            {
                return BadRequest();
            }

            _context.Entry(diciplina).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiciplinaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Diciplinas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Diciplina>> PostDiciplina(Diciplina diciplina)
        {
            _context.Diciplina.Add(diciplina);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiciplina", new { id = diciplina.DiciplinaId }, diciplina);
        }

        // DELETE: api/Diciplinas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiciplina(Guid id)
        {
            var diciplina = await _context.Diciplina.FindAsync(id);
            if (diciplina == null)
            {
                return NotFound();
            }

            _context.Diciplina.Remove(diciplina);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiciplinaExists(Guid id)
        {
            return _context.Diciplina.Any(e => e.DiciplinaId == id);
        }
    }
}
