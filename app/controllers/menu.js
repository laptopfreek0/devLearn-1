var User = require('objects/User');
var Window = require('utils/Window');

function logout(e) {
	User.logout();
	Alloy.createController('tutorial').getView().open();
	Window.closeAll();
}