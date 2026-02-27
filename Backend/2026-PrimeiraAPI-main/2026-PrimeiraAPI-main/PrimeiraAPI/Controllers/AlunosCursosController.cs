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
    public class AlunosCursosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AlunosCursosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AlunoCursos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlunoCurso>>> GetAlunoCursos()
        {
            return await _context.AlunoCursos.ToListAsync();
        }

        // GET: api/AlunoCursos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlunoCurso>> GetAlunoCurso(Guid id)
        {
            var alunoCurso = await _context.AlunoCursos.FindAsync(id);

            if (alunoCurso == null)
            {
                return NotFound();
            }

            return alunoCurso;
        }

        // PUT: api/AlunoCursos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlunoCurso(Guid id, AlunoCurso alunoCurso)
        {
            if (id != alunoCurso.AlunoCursoId)
            {
                return BadRequest();
            }

            _context.Entry(alunoCurso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlunoCursoExists(id))
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

        // POST: api/AlunoCursos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AlunoCurso>> PostAlunoCurso(AlunoCurso alunoCurso)
        {
            _context.AlunoCursos.Add(alunoCurso);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlunoCurso", new { id = alunoCurso.AlunoCursoId }, alunoCurso);
        }

        // DELETE: api/AlunoCursos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlunoCurso(Guid id)
        {
            var alunoCurso = await _context.AlunoCursos.FindAsync(id);
            if (alunoCurso == null)
            {
                return NotFound();
            }

            _context.AlunoCursos.Remove(alunoCurso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlunoCursoExists(Guid id)
        {
            return _context.AlunoCursos.Any(e => e.AlunoCursoId == id);
        }
    }
}
