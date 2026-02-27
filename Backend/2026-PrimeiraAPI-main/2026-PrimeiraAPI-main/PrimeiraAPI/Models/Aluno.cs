using System.ComponentModel.DataAnnotations;

namespace PrimeiraAPI.Models
{
    public class Aluno
    {
        public Guid AlunoId { get; set; }
        [Required]
        public string? Nome { get; set; }
        public DateOnly DataNascimento { get; set; }
        public int RM { get; set; }
        public bool? CadastroAtivo { get; set; }
        public decimal Mensalidade { get; set; }
        public DateTime? DataCadastro { get; set; }

        // Propriedade de navegação para a relação N:M com Curso
        public ICollection<Curso>? Cursos { get; set; } = new List<Curso>();
    }
}
