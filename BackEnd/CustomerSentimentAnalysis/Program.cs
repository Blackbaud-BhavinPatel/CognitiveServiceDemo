using CustomerSentimentAnalysis.DataLayer;
using CustomerSentimentAnalysis.EntityModels;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("*")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddDbContext<MyDbContext>(options =>
        options.UseSqlServer("Server=localhost;Database=CustomerSupportDB;Trusted_Connection=True;TrustServerCertificate=True;"));
builder.Services.AddTransient<IAnalyticOperations, AnalyticOperations>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowLocalhost");
app.UseAuthorization();

app.MapControllers();

app.Run();
