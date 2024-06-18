const { Schema, model } = require("mongoose");

const ProblemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  testCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
});

const Problem = new model("Problem", ProblemSchema);
module.exports = Problem;
