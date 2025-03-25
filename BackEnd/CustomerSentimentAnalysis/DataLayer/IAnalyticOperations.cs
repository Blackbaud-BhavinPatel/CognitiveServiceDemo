using Azure.AI.TextAnalytics;
using Azure;
using CustomerSentimentAnalysis.EntityModels;
using CustomerSentimentAnalysis.Models;

namespace CustomerSentimentAnalysis.DataLayer
{
    public interface IAnalyticOperations
    {
       Task<List<AgentSentimentScore>> GetConversations();
       Task<string> GetConversation(int conversationId);
       Task SaveConversation(AgentCustomerCommunication agentCustomerCommunication, Response<DocumentSentiment> textAnalysis);
       Task SaveConversation(int conversationId, Response<DocumentSentiment> textAnalysis);
    }
}
