
var provider;


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

			  document.cookie = "email=" + email;
			  document.cookie = "uid=" + uid;
			  // [START_EXCLUDE]
			  
			  //console.log(user.displayName);
			  //console.log(user.email);
			  alert("You are logged in.");
			  var dref = db.collection("child").where("Parent","==",email);
			  dref.get().then(function(querySnapshot){
				 
				 var childnameF;
				 var childnameL;
				 var childage;

				 var count=0;
				 querySnapshot.forEach(function(doc) {
					 count++;
					 docid= doc.id;
					 childnameF = doc.data().FirstN;
					 childnameL = doc.data().LastN;
					 childage = doc.data().Age;					
				 });
				
				if(count>=1){
					
					document.cookie = "childdocid=" + docid ;
					document.cookie = "childname=" + childnameF; 
					document.cookie = "childnameL=" + childnameL,
					document.cookie = "childage=" + childage ;
					
					window.location.href="mainpage.html";
				}
				else{
			  		window.location.href="signUpChild.html";
				}
			  });
			  
          
			  // [END_EXCLUDE]
			} else {
				
			}
		});
	},
	
	// Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		//$.getScript("/cookie/cookie.js",function(){});
		provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		this.onAuthChange();

		$("#login-button").click(function(){

          // Select both email and password input field and assign their values into variable
          var email = $("#email").val();
          var password = $("#password").val();

		  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // [START_EXCLUDE]
			  if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			  } else {
				alert(errorMessage);
			  }
			  console.log(error);
			  
			  // [END_EXCLUDE]
			});
        // [END authwithemail]

		});
		
		$("#login-google").click(function(){
			firebase.auth().signInWithRedirect(provider).then(function() {
			  return firebase.auth().getRedirectResult();
			}).then(function(result) {
			  // This gives you a Google Access Token.
			  // You can use it to access the Google API.
			  if (result.credential) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
			  }
			  // The signed-in user info.
			  var user = result.user;	  
			  // ...
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  
			});
			
		})


		$("#sign-out-btn").click(function(){
			if(firebase.auth().currentUser){
				firebase.auth().signOut();
			}
		});
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },	
}

app.initialize();

