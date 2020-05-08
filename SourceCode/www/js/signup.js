var app = {
	onAuthChange: function(){
		firebase.auth().onAuthStateChanged(function(user) {
			// [END_EXCLUDE]
			if (user) {
			  // User is signed in.
			  var displayName = user.displayName;
			  var email = user.email;
			  var photoURL = user.photoURL;
			  var isAnonymous = user.isAnonymous;
			  var uid = user.uid;
			  var providerData = user.providerData;
			  // [START_EXCLUDE]

			  document.cookie = "email=" + email;
			  document.cookie = "uid=" + uid;

			alert("Sign Up Success");
			console.log(user.displayName);
			console.log(user.email);
			window.location.href="signUpChild.html";
			  
			  // [END_EXCLUDE]
			}
			else{
				
			}
		});
	},


  initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	  
  },

  onDeviceReady: function() {
    console.log("hello");
	this.onAuthChange();

    $("#sign-up-button").click(function(){
      // Select both email and password input field and assign their values into variable
      var email = $("#email").val();
      var name = $("#name").val();
      var password = $("#password").val();
      var confirmPassword = $("#confirmPassword").val();
      console.log("Hello");
	  if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
	  if(password != confirmPassword){
	  	alert('The password does not match.');
		return;
	  }

	  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
		var user = firebase.auth().currentUser;
		if(user != null){
			user.updateProfile({
				displayName : name
			});
		}
	  })
	  .catch(function(error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        
      });
     
    });

  }


}

app.initialize();
