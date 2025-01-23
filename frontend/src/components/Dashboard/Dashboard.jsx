// const businessSectors = [
//   // Primary Sector
//   {
//     title: "Health Engine",
//     description:
//       "AI-driven tool offering personalized health insights, predictive analysis, and proactive care solutions to empower individuals and professionals for smarter, healthier decisions.",
//     img: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
//     link: "/",
//   },
//   {
//     title: "Idea Engine",
//     description:
//       "Innovative platform to brainstorm, refine, and evaluate ideas with market analysis, trend insights, and actionable planning for creativity and strategic success",
//     img: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     link: "/",
//   },
//   {
//     title: "Book Engine",
//     description:
//       "Smart solution for readers, writers, and publishers, offering tailored book recommendations, AI-powered writing tools, and market insights to inspire and streamline creativity.",
//     img: "https://images.pexels.com/photos/3723163/pexels-photo-3723163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     link: "/",
//   },
// ];

import { useEffect, useState } from "react";
// import AllCards from "./AllCards";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [reqData, setReqData] = useState([]);
  const [error, setError] = useState(null);
  const isLoading = reqData === null && error === null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://edueverything-engine.onrender.com/api/engine");
        setReqData(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        throw error;
      }
    };

    fetchData();
  }, []);

  const handleChange = (domain, subdomain, description) => {
    navigate("/qna-page", { state: { domain, subdomain, description } });
  };

  console.log(reqData);

  // added loader here
  return (
    <>
      <section className="bg-white ">
        <div className="py-6 px-4 mx-auto max-w-screen-xl text-center lg:py-6 z-10 relative">
          <h1
            className="mb-4 text-5xl font-bold tracking-tight leading-none md:text-6xl lg:text-6xl"
            style={{ color: "#16a34a" }}
          >
            Transform Your Approach to Success
          </h1>
          <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
            At TEN, we prioritize opportunities where technology, innovation,
            and strategic investments create lasting value and foster
            sustainable growth.
          </p>
        </div>
        <div className="flex justify-center flex-wrap items-center py-8 gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center text-green-600">
              <FaSpinner className="animate-spin text-4xl" />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : reqData.length === 0 ? (
            <p className="text-gray-500">
              {" "}
              {reqData.length === 0 && (
                <div className="flex justify-center items-center h-screen">
                  <FaSpinner className="animate-spin text-4xl" />
                </div>
              )}
            </p>
          ) : (
            reqData.map((sector) => (
              <div
                onClick={() =>
                  handleChange(
                    sector.domain,
                    sector.subdomain,
                    sector.description
                  )
                }
                key={sector._id}
                className="bg-white border mb-4 border-gray-200 rounded-lg shadow cursor-pointer max-w-sm"
              >
                <img
                  className="rounded-t-lg"
                  src={sector.imageURL}
                  alt={sector.domain}
                  style={{ height: "15rem", width: "100%", objectFit: "cover" }}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {sector.domain}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    {sector.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        {/* <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div> */}
      </section>
      {/* <AllCards /> */}
    </>
  );
}
