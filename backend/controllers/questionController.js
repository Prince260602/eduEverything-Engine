import {
  fetchGeneralQuestions,
  fetchMcqQuestions,
  generatePlan,
} from "../services/questionService.js";

async function generateQuestions(req, res) {
  const { domain, subdomain, description, generalQuestions } = req.body;

  if (!domain || !subdomain || !description) {
    return res.status(400).json({
      error: "Invalid input: domain, subdomains and description are required.",
    });
  }

  try {
    const questions = await fetchMcqQuestions(
      domain,
      subdomain,
      description,
      generalQuestions
    );
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function generateGeneralQuestions(req, res) {
  const { domain, subdomain, description } = req.body;

  console.log(description);
  if (!domain || !subdomain || !description) {
    return res.status(400).json({
      error: "Invalid input: domain, subdomains and description are required.",
    });
  }

  try {
    const questions = await fetchGeneralQuestions(
      domain,
      subdomain,
      description
    );
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function generatePlanController(req, res) {
  const { domain, subDomain, mcqAnswers, qnaAnswers } = req.body;

  try {
    const plan = await generatePlan(domain, subDomain, mcqAnswers, qnaAnswers);
    res.json(plan);
  } catch (error) {
    console.error("Error in generatePlanController:", error.message);
    res.status(500).json({ error: "Failed to generate plan" });
  }
}

export { generateQuestions, generateGeneralQuestions, generatePlanController };
