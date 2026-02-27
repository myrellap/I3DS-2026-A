using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using PrimeiraAPI.Models;

namespace PrimeiraAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        // DbSet => Representa uma coleção de entidades do tipo especificado, permitindo realizar operações de consulta e manipulação de dados.

        // Deve ser adicionado uma propriedade  DbSet para cada Model que será uma tabela no banco de dados. Na linha abaixo, estamos mapeando a entidade "Aluno" para uma tabela chamada "Alunos" no banco de dados.
        public DbSet<Models.Aluno> Alunos { get; set; }

    }
}
