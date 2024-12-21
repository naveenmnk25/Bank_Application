using WebApi.Models;

namespace WebApi.Services.AuditService
{
    public class AuditService : IAuditService
    {
        private readonly BankContext _context;

        public AuditService(BankContext context)
        {
            _context = context;
        }

        public async Task LogAsync(AuditLog auditLog)
        {
            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();
        }
    }
}