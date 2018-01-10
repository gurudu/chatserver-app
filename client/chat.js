
$(function () {
    let socket = io.connect();
    let messageForm = $('#message-form'),
	      message = $('#message'),
	      output = $('#output'),
	      userForm = $('#user-form'),
	     userError= $('#user-error'),
	      userName = $('#UserName'),
	      chatBox = $('#chat-box');

	let validate = function(){	
		let pattern = /[^a-z|^A-Z|^\s]/;
		if(userName.val().match(pattern)){
		   userError.empty();
		   userError.html(`<p style="color:red">Please enter alphabets and space only!</p>`);
		   userName.focus();
		  return false;
		}	
	  return true;
	}
	//Emit events
	userForm.on("submit", (e) => {
		e.preventDefault();
		if(validate()){
			console.log(userName.val());
	    	socket.emit('new user', userName.val(), function(data){
	               	 if(data){
	               	 	$('#userLogin').hide();
	                    chatBox.show();
	                    
	               	 }else{
	               	 	userError.empty();
	               	 	userError.html('<p style="color:red">This user name is already taken! Try again</p>');
	               	 }
		    });
	    }
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