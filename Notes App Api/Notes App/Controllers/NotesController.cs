using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_App.Data;
using Notes_App.Models.Entities;

namespace Notes_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NotesDbContext db;

        public NotesController(NotesDbContext notesDbContext)
        {
            this.db = notesDbContext;
        }
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAllNotes()
        {
            return Ok(await db.Notes.ToListAsync());
        }

        [HttpGet]
        [Route("{id}:Guid")]
        [ActionName("GetNoteById")]
        public async Task<IActionResult> GetNoteById([FromRoute]Guid id)
        {
            var note = await db.Notes.FindAsync(id);
            if(note== null)
            {
                return NotFound();
            }
            return Ok(note);
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> AddNote(Note note)
        {
            note.Id = Guid.NewGuid();
            await db.AddAsync(note);
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNoteById), new { id = note.Id }, note);
            
        }

        [HttpPut]
        [Route("{id}:Guid")]
        public async Task<IActionResult> UpdateNote([FromRoute] Guid id,[FromBody] Note updateNote)
        {

            var existingNote = await db.Notes.FindAsync(id);
            if (existingNote == null)
            {
                return NotFound();
            }
            existingNote.Title = updateNote.Title;
            existingNote.Description = updateNote.Description;
            existingNote.IsVisible = updateNote.IsVisible;
            await db.SaveChangesAsync();
            return Ok(existingNote);

            
        }

        [HttpDelete]
        [Route("{id}:Guid")]
        public async Task<IActionResult> DeletNote([FromRoute] Guid id)
        {

            var existingNote = await db.Notes.FindAsync(id);
            if (existingNote == null)
            {
                return NotFound();
            }
            db.Notes.Remove(existingNote);
            await db.SaveChangesAsync();
            return Ok();


        }
    }
}
