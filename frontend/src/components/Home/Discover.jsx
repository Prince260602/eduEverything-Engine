import { LuNotepadText } from "react-icons/lu";
import { IoPeople } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import { BiLike } from "react-icons/bi";
import { IoBulbOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";



export default function Discover() {
  return (
    <>
      <div className="" style={{background: "#fafafa"}}>
        <div className="max-w-screen-xl text-center mx-auto">
            <div className="px-4" style={{paddingTop: "4rem", paddingBottom: "2rem"}}>
            <h2 className="pb-4 font-bold px-4 text-center text-black text-base heading">

            Uncover the possibilities of your innovative idea
          </h2>
          <p className="mb-4 px-4 paragraph max-w-4xl mx-auto text-gray-700">
            
Our tool offers comprehensive analysis tailored to your needs, including SWOT, PESTEL, and Porter's Five Forces assessments, covering domains like business, healthcare, and beyond.
          </p>
          </div>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 py-8 px-6 text-center sm:gap-4 md:gap-8">
            <div>
            <div className="flex p-4 items-center justify-center">
            <LuNotepadText size={40} color="green"  />
            </div>
              <h2 className="mb-4 text-lg font-bold text-black">Comprehensive Analysis for Your Venture</h2>
              <p className="mb-4 text-sm text-gray-700">
              Gain valuable insights into the feasibility and potential challenges of your idea. Our tool provides detailed analysis tailored to your goals, including SWOT, PESTEL, and Porter's Five Forces evaluations.
              </p>
            </div>
            <div>
            <div className="flex p-4 items-center justify-center">
            <IoPeople size={40} color="green"/>
            </div>
              <h2 className="mb-4 text-lg font-bold text-black">Target Audience Identification</h2>
              <p className="mb-4 text-sm text-gray-700">
              We provide valuable insights into your target audience, complete with user stories and demographic data, ensuring you create a product or service that resonates with your desired customer base.
              </p>
            </div>
            <div>
            <div className="flex p-4 items-center justify-center">
            <TfiStatsUp size={40} color="green"/>
            </div>
              <h2 className="mb-4 text-lg font-bold text-black">Customized Business Strategies</h2>
              <p className="mb-4 text-sm text-gray-700">
              Our tool offers business strategy recommendations, framework suggestions, and requirements analysis, equipping you with the tools and insights needed to bring your vision to life.
              </p>
            </div>
            <div>
            <div className="flex p-4 items-center justify-center">
            <BiLike size={40} color="green"/>
            </div>

              <h2 className="mb-4 text-lg font-bold text-black">Marketing & Branding Guidance</h2>
              <p className="mb-4 text-sm text-gray-700">
              Explore marketing strategy and branding advice, including slogan ideas and social media post examples, to support with boosting your brand awareness and effectively reaching your target audience.
              </p>
            </div>
            <div>
            <div className="flex p-4 items-center justify-center">
            <IoBulbOutline size={40} color="green"/>
            </div>

              <h2 className="mb-4 text-lg font-bold text-black">Innovative Ideas & Opportunities</h2>
              <p className="mb-4 text-sm text-gray-700">
              Our app generates game-changing ideas and identifies additional revenue streams, helping you differentiate your business and capitalize on untapped opportunities within your industry.
              </p>
            </div>
            <div>
            <div className="flex p-4 items-center justify-center">
            <MdHome size={40} color="green"/>
            </div>
              <h2 className="mb-4 text-lg font-bold text-black">User-Friendly Interface</h2>
              <p className="mb-4 text-sm text-gray-700">
              Enjoy a seamless user experience with our easy-to-navigate interface, equipping you with the knowledge and inspiration to transform your business idea into a viable and successful venture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
