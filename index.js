const readline = require("node:readline");
const { stdin: input, stdout: output } = require("process");
const r1 = readline.createInterface({ input, output });

const welcomeMessage = () => {
  console.log(
    `Welcome to the Number Guessing Game! \nI'm thinking of a number between 1 and 100. \n`,
  );
  console.log(
    `Please select the difficulty level: \n 1. Easy (10 chances) \n 2. Medium (5 chances) \n 3. Hard (3 chances)`,
  );
};

const inp = (query) => {
  return new Promise((resolve) => {
    r1.question(query, resolve);
  });
};

const guessNumber = async (answer, attempts) => {
  console.log("start");
  let len = attempts;
  while (len > 0) {
    let guess = await inp('Enter your guess: ');
    guess = Number(guess);  // Convert the input to a number
    if (guess === answer) {
      console.log(`Hurray.... You won in ${attempts - len + 1} attempts`);
      r1.close();
      return;
    } else {
      if (guess > answer) {
        console.log(`Oops.. your guess is incorrect, the answer is less than ${guess}. Attempts left: ${len - 1}`);
      } else {
        console.log(`Oops.. your guess is incorrect, the answer is greater than ${guess}. Attempts left: ${len - 1}`);
      }
      len--;  // Decrement attempts after a wrong guess
    }
  }
  console.log("Sorry, you've run out of attempts. The Answer was: ", answer);
  r1.close();
};

const game = async () => { 
  welcomeMessage();
  let difficultyChoice = await inp('Enter your Choice: ');
  let attempts;
  switch (difficultyChoice){
    case '1':
      attempts = 10;
      console.log(`Great! you have selected the Easy difficulty level. You have 10 choices to guess the correct number.`);
      break;
    case '2':
      attempts = 5;
      console.log(`Great! you have selected the Medium difficulty level. You have 5 choices to guess the correct number.`);
      break;
    case '3':
      attempts = 3;
      console.log(`Great! you have selected the Hard difficulty level. You have 3 choices to guess the correct number.`);
      break;
    default:
      console.log(`Invalid choice. Please select a valid difficulty level.`);
      r1.close();
      return;
  }
  console.log("Lets Start the game!");
  const answer = Math.ceil(Math.random() * 100);
  guessNumber(answer, attempts);
  return;
};

game();
