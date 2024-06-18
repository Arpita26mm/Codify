const Problem = require("../models/Problem-model");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { exec } = require("child_process");

const AllProblemsHomePage = async (req, res) => {
  try {
    const problems = await Problem.find();
    console.log("pppppppp", problems);
    if (!problems || problems.length === 0) {
      return res.status(404).json({ message: "No problems found" });
    }
    return res.status(200).json(problems);
  } catch (error) {
    //next(error);
    res.status(500).json({ error: error.message });
  }
};

//getproblemsbyid
const getProblemById1 = async (req, res) => {
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

//----------------------------------RUN CODE-------------------------------------------------------------------------------//
const generateFile = (language, code, dirCodes) => {
  const jobId = uuid(); // jobId= bb4b95ff-aca0-46c5-b4e8-d35510481908
  const filename = `${jobId}.${language}`; //filename= bb4b95ff-aca0-46c5-b4e8-d35510481908.py
  const filepath = path.join(dirCodes, filename); // filepath= D:\OC\backend\codes\bb4b95ff-aca0-46c5-b4e8-d35510481908.py
  fs.writeFileSync(filepath, code);
  return filepath; //jobId;
};

const generateInputFile = async (input, dirInputs) => {
  const jobId = uuid(); // jobId= bb4b95ff-aca0-46c5-b4e8-d35510481908
  const input_filename = `${jobId}.txt`; //filename= bb4b95ff-aca0-46c5-b4e8-d35510481908.txt
  const input_filepath = path.join(dirInputs, input_filename); // filepath= D:\OC\backend\Inputs\bb4b95ff-aca0-46c5-b4e8-d35510481908.txt
  fs.writeFileSync(input_filepath, input); //either write await or writeFileSync->both do same work
  return input_filepath;
};

const execute = (filepath, inputPath, outputPath, language) => {
  const jobId = path.basename(filepath).split(".")[0];
  let command = ``;
  switch (language) {
    case "cpp":
      const outputFilename = `${jobId}.exe`; //d56ce808-6b1b-4345-913e-57645cef69b5.exe
      const outPath = path.join(outputPath, outputFilename);
      command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .\\${outputFilename} < "${inputPath}"`;
      break;
    case "py":
      command = `python "${filepath}" < "${inputPath}"`;
      break;
    default:
      callback("Unsupported language", null);
      return;
  }

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return resolve({ error: error.message });
      }
      if (stderr) {
        return resolve({ error: stderr });
      }
      console.log(stdout);
      resolve({ output: stdout });
    });
  });
};

const executePy = async (filePath, input) => {
  //return promise based on the output
  return new Promise((resolve, reject) => {
    const formattedInput = input.split(" ").join("\n");
    const command = `echo "${formattedInput}" | python ${filePath}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
      console.log("ssssssssssss", stdout, "sssssssssssssssssssssssssss");
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Error deleting file: ${filePath}`, err);
      });
    });
  });
};

//   //return outPath; //path produced but file not bcoz it's empty....(.exe file will be created when we compile our code)

//------------------------
//------------------------
const RunCode = async (req, res) => {
  const { language = "cpp", code, input } = req.body;
  if (code === undefined) {
    return res.status(500).json({ success: false, error: "Empty code body!" });
  }
  //-----------------------
  const dirCodes = path.join(__dirname, "codes");

  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  //------------------------
  const dirInputs = path.join(__dirname, "inputs");

  if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
  }
  //------------------------
  const outputPath = path.join(__dirname, "outputs"); //D:\OC\backend\output

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  //-------------------------
  //Now that we have code and language from the user
  try {
    const filePath = generateFile(language, code, dirCodes);
    const inputPath = await generateInputFile(input, dirInputs);
    let output1;
    const output = await execute(filePath, inputPath, outputPath, language)
      .then((result) => {
        //let output;
        if (result.error) {
          output1 = `Error: ${result.error}`;
        } else {
          output1 = result.output;
        }
        console.log(output1);
      })
      .catch((err) => {
        console.log(`Unexpected error: ${err.message}`);
      });

    res.json({ filePath, inputPath, output1 });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//-----------------------------------Submit Code-----------------------------------------------------------------------------
const SubmitCode = async (req, res) => {
  const { language = "cpp", code } = req.body;
  const id = req.params.id;
  const problemData = await Problem.findOne({ _id: id });
  console.log(problemData);

  //---------------
  const dirCodes = path.join(__dirname, "codes");

  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  //------------------------
  const dirInputs = path.join(__dirname, "inputs");

  if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
  }
  //------------------------
  const outputPath = path.join(__dirname, "outputs"); //D:\OC\backend\output

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const filePath = generateFile(language, code, dirCodes);

  let verdict = "Accepted";
  for (let i = 0; i < problemData.testCases.length; i++) {
    const testCase = problemData.testCases[i];
    let input = testCase.input;
    if (language == "py") {
      input = input.split(" ").join("\n");
    }
    try {
      let output1; //mannualy creating new property

      const inputPath = await generateInputFile(input, dirInputs);
      const output_User = await execute(
        filePath,
        inputPath,
        outputPath,
        language
      )
        .then((result) => {
          //let output;
          console.log(result);
          if (result.error) {
            output1 = `Error: ${result.error}`;
          } else {
            output1 = result.output;
          }
          console.log(output1);
        })
        .catch((err) => {
          console.log(`Unexpected error: ${err.message}`);
        });
      console.log(output1, "hhjggjgjjg");

      if (output1.trim() !== testCase.output.trim()) {
        verdict = `Wrong answer on test case ${i + 1}`;
        break;
      }
    } catch (error) {
      verdict = `Error on testcase ${i + 1}`;
      break;
    }
  }

  // fs.unlinkSync(filePath);
  res.json({ verdict });
};

module.exports = { AllProblemsHomePage, RunCode, SubmitCode, getProblemById1 };
