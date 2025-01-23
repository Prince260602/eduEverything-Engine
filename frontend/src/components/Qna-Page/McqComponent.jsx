import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/context";
import { FaSpinner } from "react-icons/fa";

const McqComponent = () => {
  // const [mcqAnswer, setMcqAnswer] = useState({})
  const [currentPage, setCurrentPage] = useState(0);
  const inputRef = useRef(null);
  const [mcqData, setMcqData] = useState([]);
  const isFetched = useRef(false);

  const navigate = useNavigate();

  // const location = useLocation();
  // const { domain, subdomain } = location.state || {};

  const { qnaAnswer, mcqAnswer, saveAnswer, domain, subDomain, description } =
    useContext(DataContext);

  console.log(qnaAnswer);
  console.log(mcqAnswer);
  console.log(subDomain);
  console.log(description);

  useEffect(() => {
    const generateMCQs = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/questions/generate-mcq-questions",
          {
            domain,
            subdomain: subDomain,
            description,
            generalQuestions: qnaAnswer,
          }
        );
        console.log(response.data);
        setMcqData(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    if (!isFetched.current) {
      generateMCQs();
      isFetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // const handleMcqAnswerChange = (e, questionIndex, questionText) => {
  //     setMcqAnswer({
  //         ...mcqAnswer,
  //         [questionIndex] : { question: questionText, answer: e.target.value}
  //     })
  // }

  const questionPerPage = 10;

  const startindex = currentPage * questionPerPage;
  const endindex = startindex + questionPerPage;

  const handleNext = () => {
    const currentQuestions = mcqData.slice(startindex, endindex);
    const allAnswered = currentQuestions.every(
      (_, index) => mcqAnswer[startindex + index] !== undefined
    );
    if (allAnswered) {
      setCurrentPage((prev) => prev + 1);
    } else {
      alert("Please Answer all the questions first");
    }
  };

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const isLastPage = endindex >= mcqData.length;

  const GeneratePDF = () => {
    navigate("/generate-pdf");
  };

  return (
    <>
      <div
        ref={inputRef}
        className="flex flex-col pt-2 pb-5 lg:mt-5 md:mt-4 mt-2 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700 lg:mx-[9rem] md:mx-[5.5rem] mx-auto"
      >
        <div className="lg:text-3xl md:text-2xl text-xl flex justify-center pt-2 pb-5 my-2">
          MCQ Section
        </div>
        {mcqData.length > 0 ? (
          mcqData.slice(startindex, endindex).map((data, index) => {
            const questionIndex = startindex + index;
            return (
              <div key={index}>
                <div className="flex lg:mx-14 md:mx-12 mx-2 mb-2 mt-2 gap-2">
                  <div className="lg:text-xl md:text-xl text-lg whitespace-nowrap font-medium">
                    Question {questionIndex + 1}.
                  </div>
                  <div className="lg:text-xl md:text-xl text-lg">
                    {data.question}
                  </div>
                </div>
                {data.choices.map((option, i) => (
                  <div
                    className="flex items-center mb-2 lg:mx-40 md:mx-36 mx-24"
                    key={i}
                  >
                    <input
                      type="radio"
                      value={option}
                      name={questionIndex}
                      checked={mcqAnswer[questionIndex]?.answer === option}
                      onChange={(e) =>
                        saveAnswer(e, questionIndex, data.question)
                      }
                      className="cursor-pointer w-4 h-4 text-blue-600 bg-white border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                    />
                    <label
                      htmlFor={questionIndex}
                      className="ms-2 text-lg text-gray-900 dark:text-gray-300"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <FaSpinner className="animate-spin text-4xl" />
        )}
      </div>
      <div className="flex gap-2 mt-5 justify-center">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="bg-gray-200 w-auto text-gray-600 font-medium py-2 px-4 text-lg rounded-xl border border-gray-300 hover:bg-gray-600 hover:text-gray-200"
        >
          Prev
        </button>
        {isLastPage ? (
          <button
            type="button"
            onClick={() => GeneratePDF()}
            className="bg-gray-200 w-auto text-gray-600 font-medium py-2 px-4 text-lg rounded-xl border border-gray-300 hover:bg-gray-600 hover:text-gray-200"
          >
            Generate PDF
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={endindex >= mcqData.length}
            className="bg-gray-200 w-auto text-gray-600 font-medium py-2 px-4 text-lg rounded-xl border border-gray-300 hover:bg-gray-600 hover:text-gray-200"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default McqComponent;
