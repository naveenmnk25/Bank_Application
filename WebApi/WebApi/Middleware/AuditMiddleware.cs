using WebApi.Models;
using WebApi.Services.AuditService;

namespace WebApi.Middleware
{
    public class AuditMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task Invoke(HttpContext context, IAuditService auditService)
        {
            var request = context.Request;
            var controller = request.RouteValues["controller"]?.ToString();
            var action = request.RouteValues["action"]?.ToString();

            var auditLog = new AuditLog
            {
                UserId = context.User.Identity?.Name!,
                Action = $"{controller}/{action}",
                Controller = controller!,
                Method = request.Method,
                RequestData = await ReadRequestBodyAsync(request),
                Timestamp = DateTime.UtcNow
            };

            await auditService.LogAsync(auditLog);

            await _next(context);
        }

        private async Task<string> ReadRequestBodyAsync(HttpRequest request)
        {
            request.EnableBuffering();
            var buffer = new byte[Convert.ToInt32(request.ContentLength)];
            await request.Body.ReadAsync(buffer, 0, buffer.Length);
            request.Body.Seek(0, SeekOrigin.Begin);
            return System.Text.Encoding.UTF8.GetString(buffer);
        }
    }
}