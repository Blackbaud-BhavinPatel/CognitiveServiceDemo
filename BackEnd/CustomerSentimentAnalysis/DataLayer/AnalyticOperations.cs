using Azure.AI.TextAnalytics;
using Azure;
using CustomerSentimentAnalysis.EntityModels;
using CustomerSentimentAnalysis.Models;
using Microsoft.EntityFrameworkCore;


namespace CustomerSentimentAnalysis.DataLayer
{
    public class AnalyticOperations(MyDbContext context) : IAnalyticOperations
    {
        public async Task<List<AgentSentimentScore>> GetConversations()
        {
            return await context.Conversations
                .Include(x => x.Agent)
                .Include(x => x.Customer)
                .Include(x => x.Channel)
                .Include(x=>x.SentimentResults)
                .Select(x => new AgentSentimentScore()
                {
                    ConversationId=x.ConversationId,
                    ConversationText=x.ConversationText,
                    AgentName = x.Agent.Name,
                    ClientName = x.Customer.Name,
                    Channel = x.Channel.Name,
                    Sentiment = x.SentimentResults.Any()?x.SentimentResults.First().SentimentScore:string.Empty,
                    Neutral = x.SentimentResults.Any() ? x.SentimentResults.First(). Neutral:null,
                    Negative = x.SentimentResults.Any() ? x.SentimentResults.First().Negative:null,
                    Positive = x.SentimentResults.Any() ? x.SentimentResults.First().Positive:null,
                }).ToListAsync();

        }

        public async Task<string> GetConversation(int conversationId)
        {
            return await context.Conversations
                .Where(x => x.ConversationId == conversationId)
                .Select(x => x.ConversationText)
                .FirstAsync();
        }

        public async Task SaveConversation(AgentCustomerCommunication agentCustomerCommunication, Response<DocumentSentiment> textAnalysis)
        {
            var customer = await context.Customers
                .FirstOrDefaultAsync(x => x.Email.ToUpper() == agentCustomerCommunication.CustomerEmail.ToUpper());

            if (customer == null)
            {
                customer = new Customer
                {
                    Email = agentCustomerCommunication.CustomerEmail,
                    Name = agentCustomerCommunication.CustomerName
                };
                await context.AddAsync(customer);
                await context.SaveChangesAsync();
            }

            var conversation = new Conversation
            {
                AgentId = agentCustomerCommunication.AgentId,
                CustomerId = customer.CustomerId,
                ChannelId = agentCustomerCommunication.ChannelId,
                ConversationText = agentCustomerCommunication.CommunicationText,
                Timestamp = DateTime.Now
            };
            await context.AddAsync(conversation);
            await context.SaveChangesAsync();

            var sentimentResult = new SentimentResult
            {
                ConversationId = conversation.ConversationId,
                SentimentScore = textAnalysis.Value.Sentiment.ToString(),
                Positive = Convert.ToDecimal(textAnalysis.Value.ConfidenceScores.Positive),
                Neutral = Convert.ToDecimal(textAnalysis.Value.ConfidenceScores.Neutral),
                Negative = Convert.ToDecimal(textAnalysis.Value.ConfidenceScores.Negative),
                Timestamp = DateTime.Now

            };
            await context.AddAsync(sentimentResult);
            await context.SaveChangesAsync();
        }

        public async Task SaveConversation(int conversationId, Response<DocumentSentiment> textAnalysis)
        {
            var sentimentResult = new SentimentResult
            {
                ConversationId = conversationId,
                SentimentScore = textAnalysis.Value.Sentiment.ToString(),
                Positive = Convert.ToDecimal(textAnalysis.Value.ConfidenceScores.Positive),
                Neutral = Convert.ToDecimal(textAnalysis.Value.ConfidenceScores.Neutral),
                Negative = Convert.ToDecimal(textAnalysis.Value.ConfidenceScores.Negative),
                Timestamp = DateTime.Now

            };
            await context.AddAsync(sentimentResult);
            await context.SaveChangesAsync();
        }
    }
}
