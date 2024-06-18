const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Problem = require("../models/Problem-model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); //shows all the users data stored in mondodb
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id; //id that we got from url...
    const data = await User.findOne({ _id: id }, { password: 0 }); // _id =from db , id=from url ->if any matches
    console.log(data.email);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//user update logic after being edited

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

//user delete logic

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id; //id that we got from url
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//get all contacts logic

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: " No Contacts found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const createProblem = async (req, res) => {
  try {
    const { title, description, testCases } = req.body;

    const problemCreated = await Problem.create({
      title,
      description,
      testCases,
    });
    res.status(201).json({
      message: "Problem created successfully",
      problem: problemCreated,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();

    if (!problems || problems.length === 0) {
      return res.status(404).json({ message: "No problems found" });
    }
    return res.status(200).json(problems);
  } catch (error) {
    //next(error);
    res.status(500).json({ error: error.message });
  }
};

const getProblemById = async (req, res) => {
  const id = req.params.id;
  try {
    const problem = await Problem.findOne({ _id: id });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    return res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProblemById = async (req, res) => {
  const id = req.params.id;
  const { title, description, testCases } = req.body;
  try {
    const updatedproblem = await Problem.findByIdAndUpdate(
      id,
      { title, description, testCases },
      { new: true }
    );
    if (!updatedproblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json({ message: "Problem updated successfully", updatedproblem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findByIdAndDelete(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblemById,
  deleteProblemById,
};
