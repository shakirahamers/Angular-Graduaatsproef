using AllPhi.Domain.Interfaces.Repositories;
using AllPhi.Infrastructure.EF;
using AllPhi.REST.Mapping;

#if ApiConventions
using Microsoft.AspNetCore.Mvc;
[assembly: ApiConventionType(typeof(DefaultApiConventions))]
#endif

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,  //Moet het veiliger, dan kun je hier hosts specificeren
                      policy =>
                      {
                          policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                      });
});

builder.Services.AddAutoMapper(typeof(MappingConfig));
builder.Services.AddScoped<IBezoekerRepository, EFBezoekerRepository>();
builder.Services.AddScoped<IBedrijfRepository, EFBedrijfRepository>();
builder.Services.AddScoped<IParkingContractRepository, EFParkingContractRepository>();
builder.Services.AddScoped<IWerknemerRepository, EFWerknemerRepository>();
builder.Services.AddScoped<IBezoekRepository, EFBezoekRepository>();
builder.Services.AddScoped<IParkeerplaatsRepository, EFParkeerplaatsRepository>();

// Add services to the container.
builder.Services.AddDbContext<BezoekerDbContext>();
builder.Services.AddDbContext<BedrijfDbContext>();
builder.Services.AddDbContext<ParkingContractDbContext>();
builder.Services.AddDbContext<WerknemerDbContext>();
builder.Services.AddDbContext<BezoekDbContext>();
builder.Services.AddDbContext<ParkeerplaatsDbContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(MyAllowSpecificOrigins);

app.Run();
