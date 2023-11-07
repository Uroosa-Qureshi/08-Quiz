import inquirer from "inquirer";
// import fetch from "node-fetch"; // Import 'node-fetch' for making HTTP requests
import chalk from "chalk";

const apiLink = "https://opentdb.com/api.php?amount=6&category=9&type=multiple";

let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data); // Use 'await' to get the response
  let res = await fetchQuiz.json();
  return res.results;
};

let startQuiz = async () => {
  let score: number = 0;

  // Get the data from the API
  const data = await fetchData(apiLink);

  // For user's name
  let name = await inquirer.prompt({
    type: "input",
    name: "fname",
    message: "What is your name",
  });

  for (let i = 0; i < 5; i++) { // Change the loop index to start from 0
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];

    let ans = await inquirer.prompt({
      type: "list",
      name: "quiz",
      message: data[i].question,
      choices: answers.map((val: any) => val),
    });

    if (ans.quiz === data[i].correct_answer) {
      ++score;
    }
  }
  console.log(`Dear ${chalk.bold.yellow(name.fname)}, your score is ${chalk.red.bold(score)} out of ${chalk.bold.red('5')}}`);
};

startQuiz(); // Call the startQuiz function
