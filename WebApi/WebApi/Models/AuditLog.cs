namespace WebApi.Models
{
    public class AuditLog
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Action { get; set; }
        public string Controller { get; set; }
        public string Method { get; set; }
        public string RequestData { get; set; }
        public DateTime Timestamp { get; set; }
    }
}