import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader, MessageCircle } from "lucide-react";
import { format } from "date-fns";

const API_URL = "http://localhost:3000/api";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const queriesPerPage = 10;

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts`);
      if (!response.ok) throw new Error("Failed to fetch queries");
      const data = await response.json();
      setQueries(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching queries:", error);
      setLoading(false);
    }
  };

  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);
  const totalPages = Math.ceil(queries.length / queriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <div className="h-full p-2 sm:p-4 md:p-6 flex items-center justify-center">
        <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-gray-600" />
        <span className="ml-2 text-base sm:text-lg text-gray-600">
          Loading queries...
        </span>
      </div>
    );
  }

  return (
    <div className="h-full p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Contact Queries</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="block md:hidden">
          <div className="grid grid-cols-1 divide-y">
            {currentQueries.map((query) => (
              <div key={query._id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{query.name}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(query.date), "MMM d, yyyy")}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 break-all">
                    {query.email}
                  </div>
                  <div className="text-sm mt-2 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                    {query.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-12 border-b bg-gray-50 p-4">
            <div className="col-span-2 font-semibold">Name</div>
            <div className="col-span-3 font-semibold">Email</div>
            <div className="col-span-5 font-semibold">Message</div>
            <div className="col-span-2 font-semibold text-right">Date</div>
          </div>

          {currentQueries.map((query) => (
            <div
              key={query._id}
              className="grid grid-cols-12 p-4 border-b hover:bg-gray-50 gap-4"
            >
              <div className="col-span-2 font-medium truncate">
                {query.name}
              </div>
              <div className="col-span-3 truncate">{query.email}</div>
              <div className="col-span-5 relative">
                <div className="flex items-center">
                  <div className="truncate">{query.message}</div>
                  <button
                    onClick={() =>
                      setSelectedMessage(
                        selectedMessage === query ? null : query
                      )
                    }
                    className="ml-2 text-blue-500 hover:text-blue-600 flex-shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
                {selectedMessage === query && (
                  <div className="absolute z-10 mt-2 p-4 bg-white border rounded-lg shadow-lg max-w-lg whitespace-pre-wrap">
                    {query.message}
                  </div>
                )}
              </div>
              <div className="col-span-2 text-right text-sm text-gray-500">
                {format(new Date(query.date), "MMM d, yyyy")}
              </div>
            </div>
          ))}

          {currentQueries.length === 0 && (
            <div className="text-center py-8">No queries found</div>
          )}
        </div>

        {queries.length > queriesPerPage && (
          <div className="py-3 sm:py-4 flex justify-center items-center gap-1 sm:gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 sm:p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex gap-1 sm:gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 sm:p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Queries;