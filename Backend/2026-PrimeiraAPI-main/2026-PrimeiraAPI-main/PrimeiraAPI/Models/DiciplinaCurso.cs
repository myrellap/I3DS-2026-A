using Microsoft.Build.Framework;

namespace PrimeiraAPI.Models
{
    public class DiciplinaCurso
    {
        public Guid DiciplinaCursoId { get; set; }
        [Required]
        public Guid? DiciplinaId { get; set; }
        public string?
        public Guid CursoId { get; set; }
        public string? Curso { get; set; }

        public ICollection <Diciplina>? Diciplinas { get; set; } = new List<Diciplina>();
        public ICollection <Curso>? Cursos { get; set; } = new List<Curso>();

    }
}
