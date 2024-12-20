using WebApi.Models;

namespace WebApi.Services.AuditService
{
    public interface IAuditService
    {
        Task LogAsync(AuditLog auditLog);
    }
}