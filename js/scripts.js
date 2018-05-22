(function ($) {

	'use strict';

	var users;
	var $usersElement 	= $('.users');
	var $usersList 		= $usersElement.find('.users__list');
	var $usersDisplay 	= $usersElement.find('.users__display');
	var $closeBtn		= $usersDisplay.find('.users__display-close');
	var $userDisplayImg = $usersDisplay.find('.users__display-img');
	var $userDisplayName = $usersDisplay.find('.users__display-name');
	var $userDisplayInfo = $usersDisplay.find('.users__display-info');
	var allUsers 		= [];


	function newUserListComponent(user, parent) {

		var $li 	= $('<li>').addClass('users__user');
		var $img 	= $('<img>').addClass('users__image').attr('src', user.img);
		var $info 	= $('<div>').addClass('users__info');
		var $name 	= $('<h2>').addClass('users__name').text(user.name);
		var $email 	= $('<p>').addClass('users__email').text(user.email);

		if (user.address) {
			$li.addClass('has-address');
		}

		$name.appendTo($info);
		$email.appendTo($info);

		$img.appendTo($li);
		$info.appendTo($li);

		$li.appendTo(parent);

		var userObject = {
			userData: user,
			userElement: $li
		};

		allUsers.push(userObject);
	}

	// Gets a user element and returns the user's object, null if not found, or false if allUsers array is empty.
	function getUserObject(userElement) {
		if (!allUsers.length) return false;

		for (var i = 0, len = allUsers.length; i < len; i++) {
			if (allUsers[i].userElement.html() === userElement.html()) {
				return allUsers[i];
			}
		}

		return null;
	}

	// Gets a user element and returns the user's data, null if not found, or false if allUsers array is empty.
	function getUserData(userElement) {
		if (!allUsers.length) return false;

		for (var i = 0, len = allUsers.length; i < len; i++) {
			if (allUsers[i].userElement.html() === userElement.html()) {
				return allUsers[i].userData;
			}
		}

		return null;
	}

	function selectUser(event) {

		var $eTarget = $(event.currentTarget);

		$(allUsers).each(function(i, elm) {
			$(this.userElement).removeClass('users__user--active');
		});

		$eTarget.addClass('users__user--active');

		var userObject = getUserObject($eTarget);

		$usersDisplay.trigger('user-selected', [userObject]);
	}

	function deselectUser(event) {
		var $selectedUser = $('.users__user--active');
		$usersList.trigger('user-deselected', [$selectedUser]);
	}

	function hideDisplay() {

		$usersList.removeClass('active');
		$usersDisplay.removeClass('visible');
	}

	function showDisplay() {

		$usersList.addClass('active');
		$usersDisplay.addClass('visible');
	}

	function hideUser(event, selectedUser) {

		hideDisplay();
		selectedUser.removeClass('users__user--active');
	}

	function displayUser(event, userObject) {

		var userElement = userObject.userElement;
		var userData 	= userObject.userData;


		$userDisplayImg.attr('src', userData.img);
		$userDisplayName.text(userData.name);
		$userDisplayInfo.html('');

		// Create a users__display-info-pair element for each of the data fields to dislplay,
		// and append it to the info div.
		for (var key in userData) {
			if (key !== 'img' && key !== 'name') {
				var $wrapper = $('<div>').addClass('users__display-info-pair').appendTo($userDisplayInfo);
				var $key = $('<div>').addClass('users__display-info-key').text(key).appendTo($wrapper);
				var $value = $('<div>').addClass('users__display-info-value').text(userData[key]).appendTo($wrapper);
			}
		}

		showDisplay();
	}


	$.getJSON('data/users.json', function(data) {
		users = data.users;

		for (i in users) {		
			newUserListComponent(users[i], $usersList);
		}

		var usersWithAddress = [];
		var usersNotAddress = [];

		for (var i = 0, len = allUsers.length; i < len; i++) {
			var user = allUsers[i];

			if (user.userElement.hasClass('has-address')) {
				usersWithAddress.push(user.userElement);
			}
			else {
				usersNotAddress.push(user.userElement);
			}
		}

		$usersList.html('');

		for (var i = 0, len = usersWithAddress.length; i < len; i++) {
			usersWithAddress[i].appendTo($usersList);
		}

		for (var i = 0, len = usersNotAddress.length; i < len; i++) {
			usersNotAddress[i].appendTo($usersList);
		}
	});


	$usersList.on('click', '.users__user', selectUser);
	$usersDisplay.on('user-selected', displayUser);

	$closeBtn.on('click', deselectUser);
	$usersList.on('user-deselected', hideUser);


})(jQuery);