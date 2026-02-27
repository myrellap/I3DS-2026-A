using Microsoft.EntityFrameworkCore;
using PrimeiraAPI.Data;
using Scalar.AspNetCore;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add os serviços básicos para a aplicação, como controladores e OpenAPI
builder.Services.AddControllers();

// Add OpenAPI (Necessário para gerar a documentação da API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

/*  
 * Add Entity Framework Core e configurar o contexto do banco de dados para usar SQL Server.
 * A string de conexão é obtida do arquivo appsettings.json.
 */
// Entity Framework + LocalDB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// builder.Build() => É onde a aplicação é construída.
var app = builder.Build();

// Pipeline de processamento de requisições HTTP/HTTPS
if (app.Environment.IsDevelopment())
{
    // Endpoint OpenAPI
    app.MapOpenApi();

    // Interface do Scalar para testar a API
    app.MapScalarApiReference(options =>
    {
        options.Title = "Primeira API com Scalar";
        options.Theme = ScalarTheme.Default;
        options.ShowSidebar = true;
    });

    // Redireciona a pagina raiz "/" para "/scalar"
    app.MapGet("/", () => Results.Redirect("/scalar"));

}

// Redireciona todas as requisições HTTP para HTTPS
app.UseHttpsRedirection();

// Middleware de autorização (pode ser configurado  para proteger endpoints específicos)
app.UseAuthorization();

// Mapeia os controladores para os endpoints da API
app.MapControllers();

// Inicia a aplicação e começa a escutar as requisições
app.Run();
