using Application.Tables;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>( opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//policy for allow all of the https requests (put, get, post, delete)
builder.Services.AddCors( opt => {
    opt.AddPolicy("CorsPolicy", policy =>{
        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
    });
});
builder.Services.AddMediatR(typeof(List.Handler));
var app = builder.Build();

// Configure the HTTP request pipeline.
//Here must be ordering 
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();// it means that this scope is going to be destroyed as soon as we've 
//executed the following code
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync(); // this will create database if not exists
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}
app.Run();
