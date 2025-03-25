namespace CustomerSentimentAnalysis.Models
{
    public class AgentCustomerCommunication
    {
        public int AgentId { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerName { get; set; }
        public int ChannelId { get; set; }
        public string CommunicationText { get; set; }
    }
}
