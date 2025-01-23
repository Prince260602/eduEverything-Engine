import { useContext, useEffect, useRef, useState } from "react";
import { Icon } from "../MyIcon/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/context";
import axios from "axios";

//todo: send the general questions to the backend to get the mcq questions

const QnaPage = () => {
  // const questions = [
  //     "first question",
  //     "second question",
  //     "third question",
  //     "fourth question",
  //     "fifth question",
  // ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  // const [answer, setAnswer] = useState({});
  const [displayMcq, setDisplayMcq] = useState(false);

  // const [domain, setDomain] = useState('health Engine')
  // const [selectedsubdomain, setSelectedSubDomain] = useState('')
  // const [subdomain1, setSubDomain1] = useState('exercise')
  // const [subdomain2, setSubDomain2] = useState('fitness')
  // const [subdomain3, setSubDomain3] = useState('Advisory')
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { qnaAnswer, saveQnaAnswer, setDomain, setSubDomain, setDescription } =
    useContext(DataContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { domain, subdomain, description } = location.state || {};

  const inputRef = useRef(null);
  const isFetched = useRef(false);

  console.log(qnaAnswer);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // useEffect(() => {
  const generateQuestions = async (domain, subdomain, description) => {
    try {
      const response = await axios.post(
        "https://edueverything-engine.onrender.com/api/questions/generate-general-questions",
        { domain, subdomain, description }
      );
      setQuestions(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // },[])

  console.log(questions);

  const handleCardClick = async (subdomain) => {
    if (currentQuestionIndex === -1) {
      setCurrentQuestionIndex(0);
    } else {
      qnaAnswer({});
      setCurrentQuestionIndex(0);
    }

    if (!isFetched.current) {
      setLoading(true);
      try {
        await generateQuestions(domain, subdomain, description);
        isFetched.current = true;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    setDomain(domain);
    setSubDomain(subdomain);
    setDescription(description);
  };

  // const handleAnswerChange = (e, currentQuestionIndex, questionText) => {
  //     setAnswer({...answer, [currentQuestionIndex]: {question: questionText, answer: e.target.value }});
  // };

  const handlekeyDown = (e) => {
    if (e.key === "Enter" && qnaAnswer[currentQuestionIndex]?.answer?.trim()) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setDisplayMcq(true);
      }
    } else if (e.key === "Enter") {
      alert("Please Provide an answer before proceeding...");
    }
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (displayMcq) {
      navigate("/qna-page/objectives");
    }
  }, [displayMcq, navigate]);

  return (
    <div className="flex flex-col">
      <div className="mt-2 lg:mx-3 md:mx-3 mx-1.5 flex-1">
        <div className="lg:text-3xl md:text-2xl text-xl flex justify-center pt-2 pb-5">
          {domain}
        </div>
        {/* main question */}
        <div className="flex items-center lg:gap-3 md:gap-2.5 gap-1.5 lg:my-[1rem] md:my-[.8rem] my-[.4rem] lg:mx-[8rem] md:mx-[5rem] mx-[1rem]">
          <Icon />
          <div className="flex flex-col lg:max-w-[60%] w-full leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p className="lg:text-lg md:text-lg text-md font-medium py-2.5 ml-2 text-gray-900 dark:text-white">
              What is your Sub Domain ?
            </p>
          </div>
        </div>
        {/* Sub-domain Card */}
        <div className="flex lg:flex-row md:flex-row items-center lg:gap-12 md:gap-9 gap-1.5 my-[1.5rem] lg:mx-[9rem] md:mx-[5.5rem] mx-auto">
          <div
            onClick={() => handleCardClick(subdomain[0])}
            className="cursor-pointer lg:w-64 lg:h-32 md:w-60 md:h-24 h-24 w-40 lg:py-0 md:py-9 py-8 lg:px-0 md:px-4 px-1.5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex justify-center items-center"
          >
            {/* <h5 className="mb-2 lg:text-2xl md:text-xl text-lg font-bold tracking-tight text-gray-900 dark:text-white">Sub Domain Icon 1</h5> */}
            <p className="font-normal lg:text-2xl md:text-2xl text-xl text-gray-700 text-center dark:text-gray-400">
              {subdomain[0]}
            </p>
          </div>
          <div
            onClick={() => handleCardClick(subdomain[1])}
            className="cursor-pointer lg:w-64 lg:h-32 md:w-60 md:h-24 h-24 w-40 lg:py-0 md:py-9 py-8 lg:px-0 md:px-4 px-1.5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex justify-center items-center"
          >
            {/* <h5 className="mb-2 lg:text-2xl md:text-xl text-lg font-bold tracking-tight text-gray-900 dark:text-white">Sub Domain Icon 2</h5> */}
            <p className="font-normal lg:text-2xl md:text-2xl text-xl text-gray-700 text-center dark:text-gray-400">
              {subdomain[1]}
            </p>
          </div>
          <div
            onClick={() => handleCardClick(subdomain[2])}
            className="cursor-pointer lg:w-64 lg:h-32 md:w-60 md:h-24 h-24 w-40 lg:py-0 md:py-9 py-8 lg:px-0 md:px-4 px-1.5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex justify-center items-center"
          >
            {/* <h5 className="mb-2 lg:text-2xl md:text-xl text-lg font-bold tracking-tight text-gray-900 dark:text-white">Sub Domain Icon 3</h5> */}
            <p className="font-normal lg:text-2xl md:text-2xl text-xl text-gray-700 text-center dark:text-gray-400">
              {subdomain[2]}
            </p>
          </div>
        </div>
        {/* Show Responses */}
        {Object.keys(qnaAnswer).map(
          (key) =>
            parseInt(key) < currentQuestionIndex && (
              <div
                key={key}
                className="flex flex-col gap-6 lg:my-[1rem] md:my-[.8rem] my-[.4rem] lg:mx-[8rem] md:mx-[5rem] mx-[1rem]"
              >
                <div className="flex items-center lg:gap-3 md:gap-2.5 gap-1.5">
                  <Icon />
                  <div className="flex flex-col lg:max-w-[60%] w-full leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-lg font-medium py-2.5 ml-2 text-gray-900 dark:text-white">
                      {questions[key]?.question}
                    </p>
                  </div>
                </div>
                <div className="mb-3 ml-3">
                  <p className="text-md">
                    <strong>Response:</strong> {qnaAnswer[key]?.answer}
                  </p>
                </div>
              </div>
            )
        )}
        {!loading ? (
          <>
            {/* Next Question */}
            {currentQuestionIndex >= 0 && (
              <div className="flex flex-col gap-3 lg:my-[1rem] md:my-[.8rem] my-[.4rem] lg:mx-[8rem] md:mx-[5rem] mx-[1rem]">
                <div className="flex items-center lg:gap-3 md:gap-2.5 gap-1.5">
                  <Icon />
                  <div className="flex flex-col lg:max-w-[60%] w-full leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-lg font-medium py-2.5 ml-2 text-gray-900 dark:text-white">
                      {questions[currentQuestionIndex]?.question}
                    </p>
                  </div>
                </div>
                <div ref={inputRef} />
                <div className="mb-3 ml-3">
                  <input
                    type="text"
                    id="default-input"
                    value={qnaAnswer[currentQuestionIndex]?.answer || ""}
                    onChange={(e) =>
                      saveQnaAnswer(
                        e,
                        currentQuestionIndex,
                        questions[currentQuestionIndex]?.question
                      )
                    }
                    onKeyDown={handlekeyDown}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-4xl py-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your response here"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="loader mx-[40%]" />
        )}
      </div>
    </div>
  );
};

export default QnaPage;
