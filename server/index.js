import cors from 'cors';
import bodyParser from 'body-parser';
// import fs from 'fs/promises';
// import fs from 'fs';
import fs from 'fs/promises';
import { exec } from 'child_process';
import path from 'path';

import dotenv from 'dotenv';

dotenv.config();

import util from 'util';
import YAML from 'yaml';
const execPromise = util.promisify(exec);

import express from 'express';
const app = express();

// allow all origins in cors
app.use(cors());
app.use(bodyParser.json());

// write a function that takes parameters, the code to be written, and the file name. It will create a file named File name.sol inside the contracts folder inside the smartcontract_compile folder and write the code inside it.
async function writeCodeToFile(code, fileName) {
  const dir = path.join(process.cwd(), 'smartcontract_compile', 'contracts');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${fileName}.sol`), code);
}

// write a function that takes parses the takes an input code and places the code inside smartcontract_compile/scripts/deploy.js file
// async function writeDeployScript(code) {
//   const dir = path.join(process.cwd(), 'smartcontract_compile', 'scripts');
//   await fs.mkdir(dir, { recursive: true });
//   await fs.writeFile(path.join(dir, `deploy.js`), code);
// }

// write a function that runs this command line code in the cli npx hardhat compile and returns the output 
async function compileSmartContract() {
  try {
    const { stdout, stderr } = await execPromise('npx hardhat compile', { cwd: path.join(process.cwd(), 'smartcontract_compile') });
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return { success: false, error: stderr };
    }
    return { success: true, output: stdout };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

//wrote a endpoint compilesmartcontract that takes a post request with the code and file name as parameters and calls the writeCodeToFile function and then calls the compileSmartContract function and  and returns the output
app.post('/compilesmartcontract', async (req, res) => {
  const { code, fileName } = req.body;
  try {
    await writeCodeToFile(code, fileName);
    const compileResult = await compileSmartContract();
    res.json(compileResult);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, error: error.message || "Unknown error" });
  }
});

// add the start script 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});