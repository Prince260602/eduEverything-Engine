import React, { useState, useCallback, useEffect } from "react";
import { Plus, ChevronDown, ChevronRight, Pencil, Trash } from "lucide-react";
import { FaSpinner } from "react-icons/fa";

const API_URL = "https://edueverything-engine.onrender.com/api";

const Domain = () => {
  const [domains, setDomains] = useState([]);
  const [expandedDomains, setExpandedDomains] = useState({});
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [newDomain, setNewDomain] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [editingDomain, setEditingDomain] = useState(null);
  const [newSubdomain, setNewSubdomain] = useState("");
  const [isAddingSubdomain, setIsAddingSubdomain] = useState(null);

  useEffect(() => {
    fetchDomains();
  }, []);

  // added loader here
  const fetchDomains = async () => {
    try {
      const response = await fetch(`${API_URL}/engine`);
      if (!response.ok) throw new Error("Failed to fetch domains");
      const data = await response.json();

      const transformedData = data.map((engine) => ({
        title: engine.domain,
        image: engine.imageURL,
        description: engine.description,
        subdomains: engine.subdomain.map((sub) => ({ title: sub })),
        id: engine._id,
      }));

      setDomains(transformedData);
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  };

  const handleInputChange = useCallback((key, value) => {
    setNewDomain((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAddDomain = useCallback(async () => {
    try {
      const domainData = {
        domain: newDomain.title,
        subdomain:
          editingDomain !== null
            ? domains[editingDomain].subdomains.map((sub) => sub.title)
            : [],
        imageURL: newDomain.image,
        description: newDomain.description,
      };

      if (editingDomain !== null) {
        const domainId = domains[editingDomain].id;

        const updateResponse = await fetch(`${API_URL}/engine/${domainId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(domainData),
        });

        if (!updateResponse.ok) throw new Error("Failed to update domain");
      } else {
        const response = await fetch(`${API_URL}/engine`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(domainData),
        });
        if (!response.ok) throw new Error("Failed to create domain");
      }

      await fetchDomains();
      setNewDomain({ title: "", image: "", description: "" });
      setShowDomainModal(false);
      setEditingDomain(null);
    } catch (error) {
      console.error("Error adding/updating domain:", error);
    }
  }, [newDomain, editingDomain, domains]);

  const handleAddSubdomain = useCallback(
    async (domainIndex) => {
      if (newSubdomain.trim()) {
        try {
          const domain = domains[domainIndex];
          const updatedSubdomains = [
            ...domain.subdomains.map((s) => s.title),
            newSubdomain,
          ];

          const updateResponse = await fetch(`${API_URL}/engine/${domain.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              domain: domain.title,
              subdomain: updatedSubdomains,
              imageURL: domain.image,
              description: domain.description,
            }),
          });

          if (!updateResponse.ok) throw new Error("Failed to update domain");
          await fetchDomains();
          setNewSubdomain("");
          setIsAddingSubdomain(null);
        } catch (error) {
          console.error("Error updating domain:", error);
          alert("Failed to add subdomain. Please try again.");
        }
      }
    },
    [newSubdomain, domains, fetchDomains]
  );

  const toggleDomain = useCallback((domainIndex) => {
    setExpandedDomains((prev) => ({
      ...prev,
      [domainIndex]: !prev[domainIndex],
    }));
  }, []);

  const handleDeleteDomain = useCallback(
    async (index) => {
      try {
        const domain = domains[index];
        const deleteResponse = await fetch(`${API_URL}/engine/${domain.id}`, {
          method: "DELETE",
        });

        if (!deleteResponse.ok) throw new Error("Failed to delete domain");
        await fetchDomains();
      } catch (error) {
        console.error("Error deleting domain:", error);
        alert("Failed to delete domain. Please try again.");
      }
    },
    [domains, fetchDomains]
  );

  const handleDeleteSubdomain = useCallback(
    async (domainIndex, subdomainIndex) => {
      try {
        const domain = domains[domainIndex];
        const domainId = domain.id;

        const updatedSubdomains = domain.subdomains
          .filter((_, index) => index !== subdomainIndex)
          .map((sub) => sub.title);

        const updateResponse = await fetch(`${API_URL}/engine/${domainId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            domain: domain.title,
            subdomain: updatedSubdomains,
            imageURL: domain.image,
            description: domain.description,
          }),
        });

        if (!updateResponse.ok) throw new Error("Failed to update domain");
        await fetchDomains();
      } catch (error) {
        console.error("Error deleting subdomain:", error);
        alert("Failed to delete subdomain. Please try again.");
      }
    },
    [domains, fetchDomains]
  );

  const handleEditDomain = useCallback((domain, index) => {
    setNewDomain({
      title: domain.title,
      image: domain.image,
      description: domain.description,
      originalTitle: domain.title,
    });
    setEditingDomain(index);
    setShowDomainModal(true);
  }, []);

  return (
    <div className="h-full p-4 md:p-6">
      {domains.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="animate-spin text-4xl" />
        </div>
      )}

      <div className="md:flex md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Create Domain</h1>
        <button
          onClick={() => setShowDomainModal(true)}
          className="w-40 bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-600"
        >
          <Plus size={16} /> Add Domain
        </button>
      </div>

      {showDomainModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingDomain !== null ? "Edit Domain" : "Add New Domain"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newDomain.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full p-2 border rounded-lg"
                maxLength={100}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newDomain.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={newDomain.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full p-2 border rounded-lg h-32 resize-none"
                maxLength={500}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddDomain}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 flex-1"
                >
                  {editingDomain !== null ? "Update Domain" : "Add Domain"}
                </button>
                <button
                  onClick={() => {
                    setShowDomainModal(false);
                    setEditingDomain(null);
                    setNewDomain({ title: "", image: "", description: "" });
                  }}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {domains.map((domain, domainIndex) => (
          <div
            key={domainIndex}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <button
                  onClick={() => toggleDomain(domainIndex)}
                  className="mt-1 flex-shrink-0"
                >
                  {expandedDomains[domainIndex] ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4">
                    {domain.image && (
                      <img
                        src={domain.image}
                        alt={domain.title}
                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold truncate">
                        {domain.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 break-words">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0 ml-4">
                <button
                  onClick={() => handleEditDomain(domain, domainIndex)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDeleteDomain(domainIndex)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>

            {expandedDomains[domainIndex] && (
              <div className="mt-4 ml-8">
                <div className="space-y-2">
                  {domain.subdomains.map((subdomain, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="truncate">{subdomain.title}</span>
                      <button
                        onClick={() =>
                          handleDeleteSubdomain(domainIndex, subIndex)
                        }
                        className="p-1 hover:bg-gray-200 rounded-lg text-red-600"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {isAddingSubdomain === domainIndex ? (
                  <div className="mt-2 flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Subdomain title"
                      value={newSubdomain}
                      onChange={(e) => setNewSubdomain(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      maxLength={100}
                    />
                    <div className="flex gap-2 sm:flex-row">
                      <button
                        onClick={() => handleAddSubdomain(domainIndex)}
                        className="flex-1 sm:flex-initial bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 whitespace-nowrap"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setIsAddingSubdomain(null)}
                        className="flex-1 sm:flex-initial bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingSubdomain(domainIndex)}
                    className="mt-2 text-indigo-500 flex items-center gap-2 hover:text-indigo-600"
                  >
                    <Plus size={16} /> Add Subdomain
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Domain;
