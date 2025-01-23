import React, { useState } from "react";
import { report, plan, analysis } from "../../assets/assets";

export default function Slider() {
  const [activeTab, setActiveTab] = useState(0);

  // Image data corresponding to tabs
  const images = [report, plan, analysis];

  const tabs = ["Reports", "Planning", "Insights"];
  const description = [
    "Generate detailed and professional business reports, including financial summaries, market analysis, and performance metrics with ease.",
    "Create customized personal plans for your goals, such as fitness schedules, daily routines, or learning roadmaps tailored to your needs.",
    "Turn raw data into actionable insights with AI-powered visualizations, trend analysis, and predictive modeling to make informed decisions.",
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="w-100 text-center my-8">
        {/* Tab Navigation */}

        {/* Carousel */}
        <div className="w-full">
          <div className="relative max-w-2xl px-6 mx-auto rounded-lg">
            <img
              src={images[activeTab]}
              alt={`Slide ${activeTab + 1}`}
              className="w-full"
            />
          </div>
        </div>
        <div className="mb-4 w-100 text-center border-gray-200 flex justify-center items-center">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            {tabs.map((tab, index) => (
              <li className="me-2" key={index} role="presentation">
                <button
                  className={`inline-block p-4 text-center border-b-2 rounded-t-lg transition-all duration-300 ${
                    activeTab === index
                      ? "text-blue-600 border-blue-600"
                      : "hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabChange(index)}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Tab Content */}
        <div className="relative p-4 max-w-xl mx-auto rounded-lg mt-4">
          <p className="text-sm text-gray-500">
            <strong className="font-medium text-gray-800">
              {description[activeTab]}
            </strong>
          </p>
        </div>
      </div>
    </>
  );
}
