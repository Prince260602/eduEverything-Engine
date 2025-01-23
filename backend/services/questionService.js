import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function fetchResponseFromPrompt(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const res = result.response;
    let jsonString = res.candidates[0].content.parts[0].text;

    // Remove the code block markers and any extra whitespace or newlines
    jsonString = jsonString.replace(/```json\n|\n```/g, "").trim();

    // Parse the cleaned JSON string into a JavaScript object
    const questions = JSON.parse(jsonString);

    // Now you can use the parsed questions as an object
    console.log(questions); // To inspect the questions object

    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    throw new Error("Failed to fetch questions from Gemini API");
  }
}

// mcq questions will depend upon general questions.
// make the prompt more descriptive and more dependent on the description.
async function fetchMcqQuestions(
  domain,
  subdomain,
  description,
  generalQuestions
) {
  // Construct the input prompt based on domain and subdomains
  const tPrompt = `
      You are tasked with creating a detailed set of multiple-choice questions (MCQs) designed to help users set and plan their goals.

      Domain: '${domain}'
      Subdomain: '${subdomain}'
      Description: '${description}'

      The provided description is the primary source of context for generating these questions. Each question must directly reflect and align with the description to ensure that it is relevant and practical for the user's planning needs. The description should act as the foundation for crafting questions that are specific, actionable, and insightful.

      Additionally, consider the following general questions for inspiration or alignment:
      ${
        generalQuestions?.length
          ? generalQuestions.map((q) => `- ${q}`).join("\n")
          : "No additional general questions provided."
      }

      Instructions:
      1. Generate a total of at least 30 MCQs.
      2. Each question should include 4–6 multiple-choice options that are directly tied to the provided description and domain.
      3. Ensure the questions are specific and address key aspects of the description, such as objectives, challenges, resources, or planning strategies.

      Question Format:
      {
        "question": "Write a question that clearly reflects the domain, subdomain, and description.",
        "choices": ["Option 1", "Option 2", "Option 3", "Option 4"]
      }

      Example:
      If the description is: "Helping users set clear financial savings goals over the next year."
      - Question: "What is your primary financial goal for the next year?"
        - Choices: ["Save for a vacation", "Build an emergency fund", "Pay off debt", "Increase investments"]

      Key Points to Emphasize:
      - Every question must be heavily influenced by the description to ensure relevance.
      - Avoid generic or open-ended questions.
      - Focus on actionable, goal-oriented planning.

      The final output must be in JSON format, structured as shown above, and ready for integration into the user's planning experience.
      `;

  return fetchResponseFromPrompt(tPrompt);
}

async function fetchGeneralQuestions(domain, subdomain, description) {
  // Construct the input prompt based on domain and subdomain
  const tPrompt = `
    Generate a list of questions to ask the user in order to create a tailored plan for the domain '${domain}' and subdomain '${subdomain}'. 
    Include the following description: '${description}'

    The questions should be designed to gather information about the user's goals, preferences, current knowledge, resources, and any challenges they might face in this domain and subdomain. 
    Ensure the questions are open-ended, relevant, and actionable to help build a comprehensive and personalized plan for the user.

    Each question should follow this format:
    {
      "question": "Question text here"
    }

    Make sure the questions cover various aspects such as:
    1. The user's primary goals and aspirations in this domain and subdomain.
    2. The user's current knowledge or experience in this area.
    3. Any resources or tools the user already has access to.
    4. Challenges or obstacles the user might be facing.
    5. The user's preferred style or pace for achieving their goals.

    Generate 5 questions, ensuring they are clear, engaging, and user-focused.
    `;

  return fetchResponseFromPrompt(tPrompt);
}

async function generatePlan(
  domain,
  subDomain,
  mcqAnswers,
  qnaAnswers,
  description
) {
  const tPrompt = `
    Based on the following inputs:
    - Domain: ${domain}
    - Subdomain: ${subDomain}
    - Domain Descrption (purpose included): ${description}
    - Multiple-choice answers: ${JSON.stringify(mcqAnswers)}
    - General answers: ${JSON.stringify(qnaAnswers)}

    Create a practical and actionable plan for the user to achieve their goals within this domain. The plan should be detailed, user-focused, and structured with the following components:  
    1. Overview: A concise summary of the domain and its purpose.
    2. Key Objectives: Clearly defined goals that align with the domain's purpose and the user's aspirations.   
    3. Steps or Milestones: A step-by-step guide, including specific milestones, to achieve the objectives.
    4. Tips & Tricks: Practical advice, innovative strategies, or shortcuts that can help optimize efforts and achieve goals efficiently. 
      * Include a questionnaire with relevant questions about the domain, and provide insightful answers to each question. add more than 20 questions.
    5. Recommended Resources: Suggested tools, references, or materials to assist in achieving the goals.
    6. Timeline or Checkpoints: A realistic timeline, with checkpoints to measure progress.

    Return the plan in this format:
    {
      "overview": "Brief summary of the domain and purpose",
      "objectives": ["Objective 1", "Objective 2", ...],
      "steps": ["Step 1", "Step 2", ...],
      "tactics": {
        "tips": ["tips & tricks 1", "tips & tricks 2", ...],
        "questionnaire": [
            {
              "question": "Question 1?",
              "answer": "Answer to Question 1"
            },
            {
              "question": "Question 2?",
              "answer": "Answer to Question 2"
            }
          ] 
      },
      "resources": ["Resource 1", "Resource 2", ...],
      "timeline": ["Checkpoint 1", "Checkpoint 2", ...]
    }

    Ensure that each section is practical, actionable, and aligned with the user's goals. Provide relevant tips and tricks that are easy to implement and maximize efficiency in achieving the objectives.
    
    Do not bold any text. 
  `;

  // getting answer from prompt
  return fetchResponseFromPrompt(tPrompt);
}

export { fetchMcqQuestions, fetchGeneralQuestions, generatePlan };
