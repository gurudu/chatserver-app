
$(function () {
    let socket = io.connect();
    let messageForm = $('#message-form'),
	      message = $('#message'),
	      output = $('#output');

    messageForm.on('submit', (e) => {
		    e.preventDefault();
	    	socket.emit('send chat', message.val());
			output.append(`<p id="my-message"> ${message.val()} </p>`);
			message.val('');
	});

	//Listen for events
	socket.on('new chat', (data) => {
		console.log(data);
	    output.append(`<p id="my-message"> ${data.msg} </p>`);
	});
});