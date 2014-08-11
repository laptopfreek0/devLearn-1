var Collection = require('utils/Collection');
var Log = require('utils/Log');
var UserAttempt = require('objects/UserAttempt');
var UserQuiz = require('objects/UserQuiz');
var UserTest = require('objects/UserTest');

var parent;
var quiz;
var attempt;
var type;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	attempt = args.attempt;
	type = args.type;
	
	Log.info("Quiz controller: " + JSON.stringify(quiz));
	
	if(quiz.type == "multiple_choice") {
		display_multiple_choice();
	} else if (quiz.type == "code") {
		display_code();
	}
}

function display_multiple_choice() {
	var view = Alloy.createController('lessons/questions/multiple_choice', {parent: $, quiz: quiz, grandparent: parent});
	
	$.contentView.removeAllChildren();
	$.contentView.add(view.getView());
}

function display_code() {
	var view = Alloy.createController('lessons/questions/code', {parent: $, quiz: quiz, grandparent: parent});
	
	$.contentView.removeAllChildren();
	$.contentView.add(view.getView());
}

exports.logAnswer = function(is_correct, answer) {
	if (type == "quiz") {
		UserQuiz.log(quiz.id, attempt.id, is_correct, answer);
	} else {
		UserTest.log(quiz.id, attempt.id, is_correct, answer);	
	}
};

exports.removeLife = function() {
	attempt.lives -= 1;
	UserAttempt.save(attempt);
	parent.stats();
};

exports.addPoints = function() {
	attempt.points += quiz.points;
	UserAttempt.save(attempt);
	parent.stats();
};
init(arguments[0] || {});