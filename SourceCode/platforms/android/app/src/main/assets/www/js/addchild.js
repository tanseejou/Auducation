// JavaScript source code
var app = {	

  initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	  
  },

  onDeviceReady: function() {
    console.log("hello");


    $("#addchild-button").click(function(){
      
      var childNameF = $("#childNameF").val();
	  var childNameL = $("#childNameL").val();
      var childAge= $("#childAge").val();
      var childGender = $("#childGender").val();


	  var avatar;

	  if(childGender == "Male"){
	  	  avatar = "Danny.png";
	  }
	  else{
	  	  avatar = "Amy.png"
	  }

	  var user = firebase.auth().currentUser;
	  if(user != null){
	  	  var email = user.email;
	  }

	  if(childNameF == "" || childNameL == "" || childAge == "" || childGender == ""){
	  	  alert("Please fill up the form.");
	  }
	  else{
			 db.collection("child").add({
	  			  FirstN: childNameF,
				  LastN: childNameL,
				  Age: childAge,
				  Gender: childGender,
				  Parent: email,
				  Point: 0,
				  TotalM: 0,
				  Avatar: avatar,
				  Sticker: "sticker_1.png"
			  })
			  .then(function(docRef) {
					alert("Child Added Succesfully!");
					console.log("Document written with ID: ", docRef.id);
					var docRefid = docRef.id;

					document.cookie = "childdocid=" + docRefid ;
					document.cookie = "childname=" + childNameF; 
					document.cookie = "childnameL=" + childNameL;
					document.cookie = "childage=" + childAge ;

					window.location.href="mainpage.html";
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
	  }

	 

    });

	$("#signout-btn").click(function(){
		if(firebase.auth().currentUser){
			firebase.auth().signOut();
		}
	});

  }
}

app.initialize();
