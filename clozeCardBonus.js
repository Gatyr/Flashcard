var ClozeCard = require("./lib/clozeCard");
var cardData = require("./cloze.json");
var inquire = require("inquirer");

initGame();

function initGame() {
	
	var currentCard; 
	var cardArray = [];
	var score = 0;
	var index = 0;


	for (var i = 0; i < cardData.length; i++) {
		currentCard = new ClozeCard(cardData[i].complete, cardData[i].partial);
		cardArray.push(currentCard);
	}


	playRound(score, cardArray, index);
}


//handles ending the game
function endGame(score) {
	//alert user of their final score
	console.log("Game over");
	console.log("Your score is: " + score);

	inquire.prompt([{
		type: "input", 
		name: "text", 
		message: "Play again?"
	}]).then(function(answer) {
		if (answer.text.charAt(0).toLowerCase() === "y") {
			initGame();
		}
		else {
			console.log("Thanks for playing");
		}
	})
}

function playRound(score, cardArray, currentIndex) {

	if (currentIndex < cardArray.length) {
		promptUser(cardArray, currentIndex, score);
	}
	else {
		endGame(score);
	}

}

function promptUser(cardArray, currentIndex, score) {

	card = cardArray[currentIndex];

	inquire.prompt([{
		type: "input",
		name: "text", 
		message: card.complete + "\nAnswer: "
	}]).then(function(answer) {
		if (answer.text.trim().toLowerCase() === card.partial.trim().toLowerCase()) {
			score++;
			console.log("\nYou are correct");
		}

		else {
			console.log("\nIncorrect");
		}
		console.log(card.displayCard());

		currentIndex++;

		console.log("------------------");

		playRound(score, cardArray, currentIndex);
	})
}