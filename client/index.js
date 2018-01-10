
$(function () {
    let socket = io.connect();
    let messageForm = $('#message-form'),
	    message = $('#message'),
	    output = $('#output'),
	    userForm = $('#user-form'),
	    userError= $('#user-error'),
	    userName = $('#UserName'),
	    chatBox = $('#chat-box'),
	    user = $('#user'),
	    users = $('#online-users'),
	    feedback = $('#feedback');

	let validate = function(){	
		let pattern = /[^a-z|^A-Z|^\s]/;
		if(userName.val().match(pattern)){
		   userError.empty();
		   userError.html(`<p class="error">Please enter alphabets and space only!</p>`);
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
	                    users.show();
	               	 }else{
	               	 	userError.empty();
	               	 	userError.html('<p class="error">This user name is already taken! Try again</p>');
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

   let displayMessage = (data) => {
		console.log(data.msg);
		console.log(data.userName);
        return output.append('<p class="user-message"><span>' + data.userName + ': </span>' + data.msg + '</p>');
	}
    
	//Listen for events
	socket.on('new chat', (data) => {
		console.log(data);
		feedback.empty();
	    displayMessage(data);
	});
   
    //list of online users
	socket.on('online users', (usersOnline) => {
		      user.empty();
		      for(let i=0; i<usersOnline.length; i++) {
		      	if(usersOnline[i] === userName.val()){
		      		user.append(`<li style="color:orange">${usersOnline[i]}</li>`);
		      	} else{
		      		user.append(`<li style="color:#0066cc">${usersOnline[i]}</li>`);
		      	}  
		      }
	});

	//message typing
	message.on('keypress', () => {
	  socket.emit('typing', userName.val());
	});

	socket.on('typing', (user) => {
		  feedback.html('<p><em>' + user + ' is typing a message...</em></p>');        
	});

	socket.on('load old msgs', (docs)=>{
		for(let i= docs.length-1; i >= 0; i-- ){
          displayMessage(docs[i]);
		}
	});


});