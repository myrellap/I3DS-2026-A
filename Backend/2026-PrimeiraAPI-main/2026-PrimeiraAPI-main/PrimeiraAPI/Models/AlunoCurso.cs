namespace PrimeiraAPI.Models
{
    public class AlunoCurso
    {
        // Identificador único do Regidtro da associação entre Aluno e Curso 
        public Guid AlunoCursoId  { get; set; }

        // Chave estrangeira para o Aluno
        public Guid AlunoId { get; set; }
        public Aluno? Aluno { get; set; } // Propriedade de navegação para o Aluno
        // Chave estrangeira para o Curso
        public Guid CursoId { get; set; }

        //Propriedade de navegação para o Curso
        public Curso? Curso { get; set; }

    }
}
