using apiweb.eventplus.manha.Domains;
using Microsoft.EntityFrameworkCore;

namespace apiweb.eventplus.manha.Contexts
{
    public class EventContext : DbContext
    {
        public DbSet<TipoUsuario> TipoUsuario { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<TipoEvento> TipoEvento { get; set; }
        public DbSet<Evento> Evento { get; set; }
        public DbSet<ComentariosEvento> ComentariosEvento { get; set; }
        public DbSet<Instituicao> Instituicao { get; set; }
        public DbSet<PresencaEvento> PresencaEvento { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=NOTE09-S14; Database=event_manha; User=sa;Pwd=Senai@134;; TrustServerCertificate=true;");
            base.OnConfiguring(optionsBuilder);
        }

    }
}
