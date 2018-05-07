(function ($) {

	var users;
	var $usersElement 	= $('.users');
	var $usersList 		= $usersElement.find('.users__list');
	var $usersDisplay 	= $usersElement.find('.users__display');
	var allUsers 		= [];

	//$usersList.css('top', (($(window).height() / 2) - ($(this).height() / 2)) + 'px');

	function newUserListComponent(user, parent) {

		var $li 	= $('<li>').addClass('users__user');
		var $img 	= $('<img>').addClass('users__image').attr('src', user.img);
		var $info 	= $('<div>').addClass('users__info');
		var $name 	= $('<h2>').addClass('users__name').text(user.name);
		var $email 	= $('<p>').addClass('users__email').text(user.email);

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
		console.log('inside getUserData()');
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

		$eTarget.toggleClass('users__user--active');

		var userObject = getUserObject($eTarget);

		$usersDisplay.trigger('user-selected', [userObject]);
	}


	function deselectUsers() {
		$(allUsers).each(function(i, elm) {
			$(this.userElement).removeClass('users__user--active');
		});
	}
	

	function hideDisplay() {

		// IF screen size is <= 600px hide userDisplay and slide and stretch usersList to
		// fill screen, else show it to the right of usersList and slide usersList to the left.
		if ($(window).width() <= 600) {
			$usersList.animate({
				height: ($(this).height() - 30) + 'px'
			}, 500);

			$usersDisplay.animate({
				top: '100%',
				height: '0px'
			}, 500);
			
		}
		else {
			console.log('hiding');
			$usersList.animate({
				left: ($(window).width() / 2) - ($(this).width() / 2)
			});
		}
	}

	function showDisplay() {
		

		

		// IF screen size is <= 600px show userDisplay fullscreen and slide and shrink usersList to
		// the top, else show it to the right of usersList and slide usersList to the left.
		if ($(window).width() <= 600) {
			$usersList.animate({

				height: '120px'
			}, 500);

			$usersDisplay.animate({
				top: '135px',
				height: ($(this).height() - 180) + 'px'
			}, 500);
			
		}
		else {
			console.log('showing');
			$usersList.animate({
				left: '0px'
			}, 500);
		}
	}

	function displayUser(event, userObject) {

		var $closeBtn = $('.users__display-close');

	/*	if ($closeBtn.length > 0) {
			$closeBtn.off();
			console.log('click event deleted');
		}*/

		$usersDisplay.html('');


		$closeBtn = $('<div>').addClass('users__display-close').html('&times;').appendTo($usersDisplay);

		var userElement = userObject.userElement;
		var userData 	= userObject.userData;


		var $img 	= $('<img>').addClass('users__display-img').attr('src', userData.img).appendTo($usersDisplay);
		var $name 	= $('<h2>').addClass('users__display-name').text(userData.name).appendTo($usersDisplay);
		var $info 	= $('<div>').addClass('users__display-info').appendTo($usersDisplay);
		

		// Create a users__display-info-pair element for each of the data fields to dislplay,
		// and append it to the info div.
		for (var key in userData) {
			console.log(key);
			if (key !== 'img' && key !== 'name') {
				var $wrapper = $('<div>').addClass('users__display-info-pair').appendTo($info);
				var $key = $('<div>').addClass('users__display-info-key').text(key).appendTo($wrapper);
				var $value = $('<div>').addClass('users__display-info-value').text(userData[key]).appendTo($wrapper);
			}
		}


		$closeBtn.on('click', function(event) {

			hideDisplay();
			deselectUsers();
			$(this).off();  // Removes event listeners.

		});

		showDisplay();


		console.log(userData);


	}



	$.getJSON('data/users.json', function(data) {
		users = data.users;

		for (i in users) {		
			newUserListComponent(users[i], $usersList);
		}

		console.log('allUsers: ');
		console.log(allUsers);
	});

	$usersList.on('click', '.users__user', selectUser);
	$usersDisplay.on('user-selected', displayUser);


})(jQuery);