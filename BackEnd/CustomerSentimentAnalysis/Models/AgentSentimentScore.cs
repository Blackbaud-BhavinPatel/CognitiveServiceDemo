namespace CustomerSentimentAnalysis.Models
{
    public class AgentSentimentScore
    {
        public int ConversationId { get; set; }
        public string ConversationText { get; set; }
        public string AgentName { get; set; }
        public string ClientName { get; set; }
        public string Sentiment { get; set; }
        public string Channel { get; set; }
        public decimal? Neutral { get;set; }
        public decimal? Negative { get; set; }
        public decimal? Positive { get; set; }
    }
}
