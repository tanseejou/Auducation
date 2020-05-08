// JavaScript source code


var theDate;
var date1;
var startTime;
var date2;
var endTime;

function initialize(){
	
	startTime = getCookie("startTime");
	endTime = getCookie("endTime");
	var ddconv = Date(startTime);
	var dd = new Date(ddconv);
	console.log(dd);
	console.log(dd.getMonth());
	theDate = (dd.getMonth()+1) +"/"+dd.getDate()+"/"+dd.getFullYear();
}

function setStart(){
	date1 = new Date();
	startTime = Date.parse(date1);
	document.cookie = "startTime=" + startTime;
}

function setEnd(){
	
	date2 = new Date();
	endTime = Date.parse(date2);
	document.cookie = "endTime=" + endTime;
}

function calculateTime(){
	
	var diff = endTime - startTime;
	diff = diff/1000/60;
	if(diff<=1){
		diff=1;
	}
	return Math.round(diff);
}



function record(win,pageLink){
	
	var user = firebase.auth().currentUser;
	
	var docid = getCookie("childdocid");
	var dref = db.collection("child").doc(docid);

	var duration = calculateTime();

	var status;
	var point;

	if(win){
		status = "Done";
		point = 10;
	}
	else{
		status = "Not Done";
		point = 1;
	}
	dref.update({
		Point: firebase.firestore.FieldValue.increment(point),
		TotalM: firebase.firestore.FieldValue.increment(duration)
	});
	dref.collection("Play").add({
		  Categories: getCookie("Categories"),
	  	  Lesson: getCookie("Lesson"),
		  Date: theDate,
		  Duration: duration,
		  Status: status
	 })
	 .then(function(docRef) {	
		console.log("Document written with ID: ", docRef.id);
		if(win){
			window.location.href = pageLink;
		}
		else if(!win){
			window.location.href = pageLink;
		}
	})
	.catch(function(error) {
		alert("Error adding document: ", error);
	});
	
}

function resetCookie(){
	deleteCookie("Categories");
    deleteCookie("Lesson");
    deleteCookie("startTime");
    deleteCookie("endTime");
}


