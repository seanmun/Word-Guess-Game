var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./Word");
var words =  [
  "Karl Malone",
"Kobe Bryant",
"LeBRON JAMES",
"Michael Jordan",
"Dirk Nowitzki",
"Wilt Chamberlain",
"Shaquille O'Neal",
"Moses Malone",
"Elvin Hayes",
"Hakeem Olajuwon",
"Oscar Robertson",
"Dominique Wilkins",
"Tim Duncan",
"Paul Pierce",
"John Havlicek",
"Kevin Garnett",
"Alex English",
"CARMELO ANTHONY",
"VINCE CARTER",
"Reggie Miller",
"Jerry West",
"Patrick Ewing",
"Ray Allen",
"Allen Iverson"
 
];
// Guess NBA Hall of famers

function Game() {
  // Save a reference for `this` in `self` as `this` will change inside of inquirer
  var self = this;

  // 10 guesses
  this.play = function() {
    this.guessesLeft = 10;
    this.nextWord();
  };

  // Randomize word
  this.nextWord = function() {
    var randWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randWord);
    console.log("\n" + this.currentWord + "\n");
    this.makeGuess();
  };

  // Uses inquirer to prompt the user for their guess
  this.makeGuess = function() {
    this.askForLetter().then(function() {
      // Game over
      if (self.guessesLeft < 1) {
        console.log(
          "No guesses left! Word was: \"" + self.currentWord.getSolution() + "\"\n"
        );
        self.askToPlayAgain();

        // Reset guess count
      }
      else if (self.currentWord.guessedCorrectly()) {
        console.log("You got it right! Next word!");
        self.guessesLeft = 10;
        self.nextWord();

        // Guess again
      }
      else {
        self.makeGuess();
      }
    });
  };

  // Next round or quit?
  this.askToPlayAgain = function() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Play Again?"
        }
      ])
      .then(function(val) {
        
        if (val.choice) {
          self.play();
        }
        else {
          self.quit();
        }
      });
  };

  // Prompts the user for a letter
  this.askForLetter = function() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          validate: function(val) {
            // No characters
            return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(function(val) {
        // WINNER!
        var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
        if (didGuessCorrectly) {
          console.log(chalk.green("\nCORRECT!!!\n"));

          // Else keep guessing
        }
        else {
          self.guessesLeft--;
          console.log(chalk.red("\nINCORRECT!!!\n"));
          console.log(self.guessesLeft + " guesses remaining!!!\n");
        }
      });
  };

  // Quit
  this.quit = function() {
    console.log("\nGoodbye!");
    process.exit(0);
  };
}

module.exports = Game;
