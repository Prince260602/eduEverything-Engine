import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const WorkflowPage = () => {
  const [selectedTab, setSelectedTab] = useState("admin");

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-8">Workflow Process</h1>
      
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setSelectedTab("admin")}
          className={`mr-4 ${
            selectedTab === "admin"
              ? "bg-blue-500 text-white rounded-full py-1 px-3 shadow-lg"
              : "border border-gray-400 rounded-full py-1 px-3 hover:bg-gray-300"
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => setSelectedTab("user")}
          className={`${
            selectedTab === "user"
              ? "bg-green-500 text-white rounded-full py-1 px-3 shadow-lg"
              : "border border-gray-400 rounded-full py-1 px-3 hover:bg-gray-300"
          }`}
        >
          User
        </button>
      </div>

      <div className="mt-8">
        {selectedTab === "admin" ? (
          <>
            <div className="w-full md:w-1/2 m-auto">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-white rounded-2xl shadow-md flex flex-col"
              >
                <h2 className="text-xl font-bold mb-4">Admin Workflow</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <ChevronRight className="w-6 h-6 text-blue-500 mr-3" />
                    <div>
                      <strong>Generate an Engine:</strong> Provide details such as domain, subdomains, and description.
                      <ul className="ml-6 mt-2 list-disc">
                        <li><strong>Domain:</strong> Identify the main category or field of the engine, e.g., "Healthcare."</li>
                        <li><strong>Image URL:</strong> Write the image URL of the engine.</li>
                        <li><strong>Description:</strong> Write a brief summary of the engine's function.</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-6 h-6 text-blue-500 mr-3" />
                    <div>
                      <strong>Subdomains:</strong> Break down the domain into specific areas, e.g., "Patient Management."
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-6 h-6 text-blue-500 mr-3" />
                    <div>
                      <strong>Complete Fields:</strong> Double-check all fields to ensure the setup aligns with your requirements.
                    </div>
                  </li>
                </ul>
                <p className="mt-4 text-gray-700">
                  After adding the engine, you can use the engine from the website as a user.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-8"
            >
              <a
                href="/admin/login"
                className="bg-blue-500 text-white py-2 px-6 rounded-2xl shadow-lg hover:bg-blue-600 transition inline-flex items-center"
              >
                Generate Engine
              </a>
            </motion.div>
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2 m-auto">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-white rounded-2xl shadow-md flex flex-col"
              >
                <h2 className="text-xl font-bold mb-4">User Workflow</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <ChevronRight className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <strong>Access the Engine:</strong> Use the Admin Panel-created engine to explore and understand questions.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <strong>Select Domain:</strong> Choose a domain relevant to your needs.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <strong>Answer Questions:</strong> Provide answers to questions generated based on the selected domain.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <strong>Answer Multiple Choice Questions:</strong> Answer all the multiple-choice questions to ensure detailed and tailored results from the engine.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <strong>Review PDF:</strong> Analyze the insights and recommendations in the generated document.
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-8"
            >
              <a
                href="/dashboard"
                className="bg-green-500 text-white py-2 px-6 rounded-2xl shadow-lg hover:bg-green-600 transition inline-flex items-center"
              >
                Get Started
              </a>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkflowPage;
