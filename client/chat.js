
$(function () {
    let socket = io.connect();
    let messageForm = $('#message-form'),
	      message = $('#message'),
	      output = $('#output'),
	      userForm = $('#user-form'),
	     userError= $('#user-error'),
	      userName = $('#UserName');

	//Emit events
	userForm.on("submit", (e) => {
		   e.preventDefault();
			console.log(userName.val());
	    	socket.emit('new user', userName.val());
	    
	});      

    messageForm.on('submit', (e) => {
		    e.preventDefault();
	    	socket.emit('send chat', message.val());
			output.append('<p id="my-message"><strong>' + userName.val() + ': </strong>' + message.val()+ '</p>');
			message.val('');
	});

	//Listen for events
	socket.on('new chat', (data) => {
		console.log(data);
	    output.append('<p class="user-message"><span>' + data.userName + ': </span>' + data.msg + '</p>');
	});
});