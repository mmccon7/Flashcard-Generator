var BasicCard = require("./basiccard.js");
var ClozeCard = require("./clozecard.js");
var fs = require("fs");
var inquirer = require("inquirer");

inquirer.prompt([{
	name: "command",
	message: "Choose the following options",
	type: "list",
	choices: [{
		name: "create-flashcard" },{
		name: "display-all-cards"
	}]
}])
.then(function(answer){
	if(answer.command === "create-flashcard"){
		addCard();
	}
	else if(answer.command === "display-all-cards"){
		showCards();
	}
});

var addCard = function(){
	inquirer.prompt([{
		name: "typeCard",
		message: "What type of flashcard do you want to make?",
		type: "list",
		choices: [{
			name: "Basic-Flashcard" },{
			name: "Cloze-Flashcard"
		}]
	}])
	.then(function(answer){
		if (answer.typeCard === "Basic-Flashcard"){
			inquirer.prompt([{
				name: "front",
				message: "What is your question?" },{

				name: "back",
				message: "What is the answer?"
			}])
			.then(function(answer){
				var createBasic = new BasicCard(answer.front, answer.back);
				console.log("Your Basic Flashcard has been created!");
				fs.appendFile("log.txt", JSON.stringify(createBasic) + ";", + "\r\n", "utf8");
			});
		}
		else if(answer.typeCard === "Cloze-Flashcard"){
			inquirer.prompt([{
				name: "text",
				message: "What is the full text of your question?" },{

				name: "cloze",
				message: "What is cloze portion, or portion you would like removed from the text?"
			}])
			.then(function(answer){
				var createCloze = new ClozeCard(answer.text, answer.cloze);
				console.log("Your Cloze Flashcard has been created!");
				fs.appendFile("log.txt", JSON.stringify(createCloze) + ";", + "\r\n", "utf8");
			});
		}
	})
};

var showCards = function(){
	inquirer.prompt([{
		name: "allCards",
		message: "Do you want to show all the cards you've created so far?",
		type: "list",
		choices: [{
			name: "Yes" },{
			name: "No"
		}]
	}])
	.then(function(answer){
		if (answer.allCards === "Yes"){
			fs.readFile("./log.txt", "utf8", bar)
			function bar(err,data)
			{
			console.log(JSON.stringify(data),"utf8");
			};
		};
	})
};



