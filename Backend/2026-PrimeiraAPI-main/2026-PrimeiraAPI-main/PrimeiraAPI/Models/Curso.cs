using System.ComponentModel.DataAnnotations;

namespace PrimeiraAPI.Models
{
    public class Curso
    {
        public Guid Id { get; set; }
        [Required]
        public string? Nome { get; set; }
        public int? Semestres { get; set; }  
        public bool? Ativo { get; set; }


    }
}
