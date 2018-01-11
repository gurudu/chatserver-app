
$(function () {
	//to connect socket to local host on port 3000
    let socket = io.connect();

    //to grab required elements from the DOM
    let messageForm = $('#message-form'),
	    message = $('#message'),
	    output = $('#output'),
	    userForm = $('#user-form'),
	    userError= $('#user-error'),
	    userName = $('#UserName'),
	    chatBox = $('.box'),
	    user = $('#user'),
	    users = $('#online-users'),
	    feedback = $('#feedback'),
	    clearBtn = $('#clear');

    // userform validation to check for only alphabets and spaces.
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
	//Emit user name on user form submission
	userForm.on("submit", (e) => {
		e.preventDefault();
		if(validate()){
			console.log(userName.val());
	    	socket.emit('new user', userName.val(), function(data){
	    		    //if callback argument "data" from server.js is true then the user name valid (unique user name)
	               	 if(data){
	               	 	$('#userLogin').hide();
	                    chatBox.show();
	                    users.show();
	               	 }else{
	               	 	// error message is shown if data is false
	               	 	userError.empty();
	               	 	userError.html('<p class="error">This user name is already taken! Try again</p>');
	               	 }
		    });
	    }
	});      

    //Emit message on message form submission
    messageForm.on('submit', (e) => {
		    e.preventDefault();
	    	socket.emit('send chat', message.val());
			output.append('<p id="my-message"><strong>' + userName.val() + ': </strong>' + message.val()+ '</p>');
			message.val('');
	});

   let displayMessage = (data) => output.append('<p class="user-message"><span>' + data.userName + ': </span>' + data.msg + '</p>');

	//Listen for new message from sever
	socket.on('new chat', (data) => {
		feedback.empty();
	    displayMessage(data);
	});
   
    //shows list of online users
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

	//event for who is typing a message
	message.on('keypress', () => {
	  socket.emit('typing', userName.val());
	});
    
    //listens for who is typing message and displays a feedback message
	socket.on('typing', (user) => {
		  feedback.html('<p><em>' + user + ' is typing a message...</em></p>');        
	});
    
    //to get recent(latest) 5 chats from db
	socket.on('load old msgs', (docs)=>{
		for(let i= docs.length-1; i >= 0; i-- ){
          displayMessage(docs[i]);
		}
	});
	
	//event to clear all chats in db and on UI
    clearBtn.on("click", () => {
		socket.emit('clear');
	});
    //to listen on which socket to clear all old chats 
	socket.on('cleared', () => {
		output.empty();
	});
});