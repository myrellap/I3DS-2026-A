using System.ComponentModel.DataAnnotations;

namespace PrimeiraAPI.Models
{
    public class Curso
    {
        public Guid CursoId { get; set; }
        [Required]
        public string? Nome { get; set; } 
        public int? Semestres { get; set; }  
        public bool? Ativo { get; set; }
        [DataType(DataType.Currency)]
        public decimal? Mensalidade { get; set; }
       
        // Propriedade de navegação para a relação N:M com Curso
        public ICollection<Aluno>? Alunos { get; set; } = new List<Aluno>();

        public ICollection<Diciplina>? Diciplinas { get; set; } = new List<Diciplina>();

    }
}
