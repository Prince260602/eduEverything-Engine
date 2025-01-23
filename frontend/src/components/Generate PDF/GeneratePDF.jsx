import { useState, useEffect, useContext, useRef } from "react";
import jsPDF from "jspdf";
import { DataContext } from "../../Context/context";

const GeneratePDF = () => {
  const { domain, subDomain, mcqAnswer, qnaAnswer, description } =
    useContext(DataContext);
  console.log(mcqAnswer);
  const [plan, setPlan] = useState(null);
  console.log(plan);
  const isGenerated = useRef(false);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(
          "https://edueverything-engine.onrender.com/api/questions/generate-plan",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              domain,
              subDomain,
              mcqAnswers: mcqAnswer,
              qnaAnswers: qnaAnswer,
              description,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        setPlan(data);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    if (!isGenerated.current) {
      fetchPlan();
      isGenerated.current = true;
    }
  }, [domain, subDomain, mcqAnswer, qnaAnswer]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10; // Left margin
    const lineHeight = 10;
    const questionAnswerLineHeight = 3; // Reduced line height for tighter spacing between questions and answers
    let y = 20; // Starting y-position for content

    const addContentWithPagination = (content) => {
      const lines = doc.splitTextToSize(content, pageWidth - margin * 2);
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
    };

    doc.setFontSize(16);
    doc.text("Personalized Plan", margin, y);
    y += 10;

    doc.setFontSize(12);

    if (plan) {
      // Add Overview
      doc.text("Overview:", margin, y);
      y += lineHeight;
      addContentWithPagination(plan.overview);
      y += lineHeight;

      // Add Objectives
      doc.text("Objectives:", margin, y);
      y += lineHeight;
      plan.objectives.forEach((obj) => {
        addContentWithPagination(`- ${obj}`);
      });
      y += lineHeight;

      // Add Steps
      doc.text("Steps:", margin, y);
      y += lineHeight;
      plan.steps.forEach((step) => {
        addContentWithPagination(`- ${step}`);
      });
      y += lineHeight;
      // Add Tips & Tricks
      doc.text("Tips & Tricks:", margin, y);
      y += lineHeight;
      if (Array.isArray(plan.tactics.tips)) {
        plan.tactics.tips.forEach((tip) => {
          addContentWithPagination(`- ${tip}`);
        });
        y += lineHeight;
      }

      // Add Questionnaire (if required)
      if (Array.isArray(plan.tactics.questionnaire)) {
        doc.addPage();
        y = margin;
        doc.text("Questionnaire:", margin, y);
        y += lineHeight;
        plan.tactics.questionnaire.forEach((item) => {
          addContentWithPagination(`Q: ${item.question}`);
          y += questionAnswerLineHeight;
          addContentWithPagination(`A: ${item.answer}`);
          y += questionAnswerLineHeight;
        });
      }

      // Add Resources
      doc.text("Resources:", margin, y);
      y += lineHeight;
      plan.resources.forEach((res) => {
        addContentWithPagination(`- ${res}`);
      });
      y += lineHeight;

      // Add Timeline
      doc.text("Timeline:", margin, y);
      y += lineHeight;
      plan.timeline.forEach((time) => {
        addContentWithPagination(`- ${time}`);
      });

      // Move to a new page for Questions and Answers
      doc.addPage();
      y = margin;

      // Add MCQ Questions and Answers
      // doc.text("MCQ Answers:", margin, y);
      // y += lineHeight;
      // const mcqArray = Array.isArray(mcqAnswer)
      //   ? mcqAnswer
      //   : Object.values(mcqAnswer);
      // mcqArray.forEach((mcq, index) => {
      //   addContentWithPagination(`${index + 1}. ${mcq.question}`);
      //   y += questionAnswerLineHeight;
      //   addContentWithPagination(`Answer: ${mcq.answer}`);
      //   y += questionAnswerLineHeight;
      // });

      // // Move to a new page for QnA if needed
      // if (y + questionAnswerLineHeight > pageHeight - margin) {
      //   doc.addPage();
      //   y = margin;
      // }

      // // Add QnA Questions and Answers
      // doc.text("QnA Answers:", margin, y);
      // y += questionAnswerLineHeight;
      // const qnaArray = Array.isArray(qnaAnswer)
      //   ? qnaAnswer
      //   : Object.values(qnaAnswer);
      // qnaArray.forEach((qna, index) => {
      //   addContentWithPagination(`${index + 1}. ${qna.question}`);
      //   y += questionAnswerLineHeight;
      //   addContentWithPagination(`Answer: ${qna.answer}`);
      //   y += questionAnswerLineHeight;
      // });
    }

    doc.save("personalized-plan.pdf");
  };

  if (!plan)
    return (
      <div className="flex items-center justify-center fixed inset-0 bg-white">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#007BFF] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div
      className="mx-0 "
      style={{ padding: "20px", fontFamily: "Times New Roman, sans-serif" }}
    >
      <h1 className="text-[2.2rem] font-medium text-center my-2">
        Generated Plan
      </h1>
      <hr className="h-0.5 bg-black" />
      <div style={{ marginBottom: "20px" }}>
        <h2 className="text-[1.7rem] font-medium my-1">Overview</h2>
        <p className="text-lg">{plan.overview}</p>

        <h2 className="text-[1.7rem] font-medium my-1">Objectives</h2>
        <ul>
          {plan.objectives.map((obj, index) => (
            <li className="text-lg" key={index}>
              {obj}
            </li>
          ))}
        </ul>

        <h2 className="text-[1.7rem] font-medium my-1">Steps</h2>
        <ul>
          {plan?.steps.map((step, index) => (
            <li className="text-lg" key={index}>
              {step}
            </li>
          ))}
        </ul>

        <h2 className="text-[1.7rem] font-medium my-1">Tips & Tricks</h2>
        <ul>
          {plan.tactics.tips.map((res, index) => (
            <li className="text-lg" key={index}>
              {res}
            </li>
          ))}
        </ul>

        <h2 className="text-[1.7rem] font-medium my-1">Resources</h2>
        <ul>
          {plan.resources.map((res, index) => (
            <li className="text-lg" key={index}>
              {res}
            </li>
          ))}
        </ul>

        <h2 className="text-[1.7rem] font-medium my-1">Timeline</h2>
        <ul>
          {plan.timeline.map((time, index) => (
            <li className="text-lg" key={index}>
              {time}
            </li>
          ))}
        </ul>

        <h2 className="text-[1.7rem] font-medium my-1">
          Question and their tips & tricks
        </h2>
        <ul>
          {plan.tactics.questionnaire.map((res, index) => (
            <li className="text-lg" key={index}>
              <strong>Question{index + 1}: </strong> {res.question}
              <br />
              <strong>Answer: </strong> {res.answer}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="flex mx-auto font-semibold bg-[#007BFF] hover:bg-[#007baa]"
        onClick={generatePDF}
        style={{
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default GeneratePDF;
