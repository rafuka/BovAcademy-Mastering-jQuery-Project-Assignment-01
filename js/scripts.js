(function ($) {

	var users;
	var $usersElement = $('.users');
	var $usersList = $usersElement.find('.users__list');
	console.log($usersElement);
	console.log($usersList);

	function newUserListComponent(user) {
		console.log(user.name);
		var $li = $('<li>').addClass('users__user');
		var $img = $('<img>').addClass('users__image').attr('src', user.img);
		var $info = $('<div>').addClass('users__info');
		var $name = $('<h2>').addClass('users__name').text(user.name);
		var $email = $('<p>').addClass('users__email').text(user.email);

		$name.appendTo($info);
		$email.appendTo($info);

		$img.appendTo($li);
		$info.appendTo($li);

		$li.appendTo($usersList);
	}

	$.getJSON('data/users.json', function(data) {
		users = data.users;
		console.log(users);

		for (i in users) {
			
			newUserListComponent(users[i]);
		}
	});







})(jQuery);