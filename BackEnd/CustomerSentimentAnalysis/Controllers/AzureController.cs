using Azure;
using Azure.AI.TextAnalytics;
using CustomerSentimentAnalysis.EntityModels;
using CustomerSentimentAnalysis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;
using CustomerSentimentAnalysis.DataLayer;
using System.Threading.Tasks;
namespace CustomerSentimentAnalysis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AzureController : ControllerBase
    {
        private readonly IAnalyticOperations _analyticOperations;
        private readonly string endpoint = "https://otg-lang.cognitiveservices.azure.com/";
        private readonly string apiKey = "9C6EUFScvrHWOJfBuyMbZs3hmky2usIMOZvyJIBDA2oLAdtknz4CJQQJ99BCACYeBjFXJ3w3AAAaACOGAoPT";
        private readonly string speechKey = "<Your Speech Service Key>";
        private readonly string speechRegion = "<Your Region>";
        public AzureController(IAnalyticOperations analyticOperations)
        {
            _analyticOperations = analyticOperations;
        }

        [HttpGet("analyze")]
        public async Task<ActionResult> AnalyzeSentiment(int conversationId)
        {
            string text = await _analyticOperations.GetConversation(conversationId);
            var client = new TextAnalyticsClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
            var sentimentResult = client.AnalyzeSentiment(text);
            await _analyticOperations.SaveConversation(conversationId, sentimentResult);


            return Ok(new
            {
                Sentiment = sentimentResult.Value.Sentiment.ToString(),
                PositiveScore = sentimentResult.Value.ConfidenceScores.Positive,
                NeutralScore = sentimentResult.Value.ConfidenceScores.Neutral,
                NegativeScore = sentimentResult.Value.ConfidenceScores.Negative
            });
        }

        [HttpPost("recognize")]
        public async Task<ActionResult> RecognizeSpeech([FromBody] string audioUrl)
        {
            var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);
            using var audioConfig = AudioConfig.FromWavFileInput(audioUrl);
            using var recognizer = new SpeechRecognizer(speechConfig, audioConfig);

            var speechRecognitionResult = await recognizer.RecognizeOnceAsync();

            if (speechRecognitionResult.Reason == ResultReason.RecognizedSpeech)
            {
                return Ok(new { Text = speechRecognitionResult.Text });
            }
            else if (speechRecognitionResult.Reason == ResultReason.NoMatch)
            {
                return BadRequest("No speech could be recognized.");
            }
            
            return StatusCode(500, "Unknown error occurred.");
        }

        [HttpPost("save")]
        public async Task<ActionResult> Save([FromBody] AgentCustomerCommunication agentCommunication)
        {
            var client = new TextAnalyticsClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
            var sentimentResult = client.AnalyzeSentiment(agentCommunication.CommunicationText);

            await _analyticOperations.SaveConversation(agentCommunication, sentimentResult);

            return Ok(new
            {
                Sentiment = sentimentResult.Value.Sentiment.ToString(),
                PositiveScore = sentimentResult.Value.ConfidenceScores.Positive,
                NeutralScore = sentimentResult.Value.ConfidenceScores.Neutral,
                NegativeScore = sentimentResult.Value.ConfidenceScores.Negative
            });
        }
    }

   
}
