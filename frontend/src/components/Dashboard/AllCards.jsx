import axios from "axios";
import { useEffect } from "react";

// const businessSectors = [
//   // Primary Sector
//   {
//     title: "Health Engine",
//     description:
//       "AI-driven tool offering personalized health insights, predictive analysis, and proactive care solutions to empower individuals and professionals for smarter, healthier decisions.",
//     img: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
//     link: "",
//   },
//   {
//     title: "Idea Engine",
//     description:
//       "Innovative platform to brainstorm, refine, and evaluate ideas with market analysis, trend insights, and actionable planning for creativity and strategic succ",
//     img: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     link: "",
//   },
//   {
//     title: "Book Engine",
//     description:
//       "Smart solution for readers, writers, and publishers, offering tailored book recommendations, AI-powered writing tools, and market insights to inspire and streamline creativity.",
//     img: "https://images.pexels.com/photos/3723163/pexels-photo-3723163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     link: "",
//   },
// ];

export default function AllCards() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://edueverything-engine.onrender.com/api/engine/')
        console.log(response.data)
      } catch (error) {
        console.error(error)
        throw error;
      }
    }
  
    fetchData();
    
  },[])

  return (
    <>
      <div>
        <h1 className="text-center font-semibold text-xl py-8">
          Select your Business Sector
        </h1>
        <div className="flex justify-center items-center gap-4">
          {businessSectors.map((sector, index) => (
            <div
              key={index}
              className="max-w-xs bg-white border border-gray-200 rounded-lg shadow"
            >
              <img className="rounded-t-lg" src={sector.img} alt="" style={{height: "15rem"}} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {sector.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                  {sector.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
