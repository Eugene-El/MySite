
var errorMessages = [
	"Ooops!",
	"Don't panic!",
	"Miss me?",
	"Are you sure?"
];

exports.getRandomError = function(){
	return errorMessages[Math.floor(Math.random() * errorMessages.length)];
};