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
    }
}
