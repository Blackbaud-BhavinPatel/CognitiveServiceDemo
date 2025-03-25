using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerSentimentAnalysis.EntityModels;
using CustomerSentimentAnalysis.DataLayer;
using CustomerSentimentAnalysis.Models;

namespace CustomerSentimentAnalysis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentsController : ControllerBase
    {
        private readonly IAnalyticOperations _analyticOperations;

        public AgentsController(IAnalyticOperations analyticOperations)
        {
            _analyticOperations = analyticOperations;
        }

        // GET: api/Agents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgentSentimentScore>>> GetAgentScore()
        {
            return await _analyticOperations.GetConversations();
        }

       
    }
}
