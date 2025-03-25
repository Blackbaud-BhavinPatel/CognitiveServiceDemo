using Azure;
using Azure.AI.Language.QuestionAnswering;
using Microsoft.AspNetCore.Mvc;

namespace CustomerSentimentAnalysis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionAnswerController : ControllerBase
    {
        private readonly string endpoint = "https://otg-lang.cognitiveservices.azure.com/";
        private readonly string apiKey = "9C6EUFScvrHWOJfBuyMbZs3hmky2usIMOZvyJIBDA2oLAdtknz4CJQQJ99BCACYeBjFXJ3w3AAAaACOGAoPT";
        private readonly string projectName = "OTG-Question-Answering"; 
        private readonly string deploymentName = "production"; 

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> GetAnswer([FromBody] string question)
        {
            var client = new QuestionAnsweringClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
            var project = new QuestionAnsweringProject(projectName, deploymentName);
            var answer = await client.GetAnswersAsync(question, project);
            return Ok(new { answer });
        }
    }
}
