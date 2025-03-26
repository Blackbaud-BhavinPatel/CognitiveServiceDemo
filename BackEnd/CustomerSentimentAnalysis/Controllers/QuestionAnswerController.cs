using Azure;
using Azure.AI.Language.QuestionAnswering;
using Microsoft.AspNetCore.Mvc;
using static NuGet.Packaging.PackagingConstants;

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
        public async Task<IActionResult> GetAnswer([FromBody] QuestionAnswerRequest request)
        {
            var client = new QuestionAnsweringClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
            var project = new QuestionAnsweringProject(projectName, deploymentName);
            var answer = await client.GetAnswersAsync(request.Question, project);
            if (answer.Value.Answers[0].Confidence < 0.4) return NotFound();
            return Ok(new { answer });
        }

        public class QuestionAnswerRequest
        {
            public string Question { get; set; }
            public string ToJson()
            {
                return Newtonsoft.Json.JsonConvert.SerializeObject(this);
            }
        }
    }
}
