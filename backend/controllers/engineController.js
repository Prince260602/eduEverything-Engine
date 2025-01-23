import Engine from "../models/engineModel.js";

const createEngine = async (req, res) => {
  try {
    const { domain, subdomain, imageURL, description } = req.body;

    if (!domain || !subdomain || !imageURL || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newEngine = new Engine({ domain, subdomain, imageURL, description });
    await newEngine.save();

    res.status(201).json(newEngine);
  } catch (error) {
    res.status(500).json({ message: "Error creating engine", error });
  }
};

const getAllEngines = async (req, res) => {
  try {
    const { domain } = req.query;
    let engines;

    if (domain) {
      engines = await Engine.find({ domain: domain });
    } else {
      engines = await Engine.find();
    }

    res.status(200).json(engines);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving engines", error });
  }
};

const updateEngine = async (req, res) => {
  try {
    const { id } = req.params;
    const { domain, subdomain, imageURL, description } = req.body;

    const updatedEngine = await Engine.findByIdAndUpdate(
      id,
      { domain, subdomain, imageURL, description },
      { new: true, runValidators: true }
    );

    if (!updatedEngine) {
      return res.status(404).json({ message: "Engine not found." });
    }

    res.status(200).json(updatedEngine);
  } catch (error) {
    res.status(500).json({ message: "Error updating engine", error });
  }
};

const deleteEngine = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEngine = await Engine.findByIdAndDelete(id);

    if (!deletedEngine) {
      return res.status(404).json({ message: "Engine not found." });
    }

    res.status(200).json({ message: "Engine deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting engine", error });
  }
};

export { createEngine, getAllEngines, updateEngine, deleteEngine };
