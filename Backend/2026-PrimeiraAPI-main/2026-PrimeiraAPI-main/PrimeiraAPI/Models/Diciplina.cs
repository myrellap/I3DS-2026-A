using Microsoft.Build.Framework;

namespace PrimeiraAPI.Models
{
    public class Diciplina
    {
        public Guid DiciplinaId { get; set; }
        [Required]
        public string? Nome { get; set; }
        public int CargaHoraria { get; set; }
        public int semestre { get; set; }
        
        public ICollection<Curso>? Cursos { get; set; } = new List<Curso>();
    }
}
