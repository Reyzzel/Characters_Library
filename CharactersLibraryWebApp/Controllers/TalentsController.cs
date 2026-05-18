using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CharactersLibraryWebApp.Data;
using CharactersLibraryWebApp.Models;

namespace CharactersLibraryWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TalentsController : ControllerBase
    {
        private readonly LibraryContext _context;

        public TalentsController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Talents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Talent>>> GetTalents()
        {
            return await _context.Talents.ToListAsync();
        }

        // GET: api/Talents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Talent>> GetTalent(int id)
        {
            var talent = await _context.Talents.FindAsync(id);

            if (talent == null)
            {
                return NotFound();
            }

            return talent;
        }

        // PUT: api/Talents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTalent(int id, Talent talent)
        {
            if (id != talent.Id)
            {
                return BadRequest();
            }

            _context.Entry(talent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TalentExists(id))
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

        // POST: api/Talents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Talent>> PostTalent(Talent talent)
        {
            _context.Talents.Add(talent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTalent", new { id = talent.Id }, talent);
        }

        // DELETE: api/Talents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTalent(int id)
        {
            var talent = await _context.Talents.FindAsync(id);
            if (talent == null)
            {
                return NotFound();
            }

            _context.Talents.Remove(talent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TalentExists(int id)
        {
            return _context.Talents.Any(e => e.Id == id);
        }
    }
}
