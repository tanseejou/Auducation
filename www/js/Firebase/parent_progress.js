	var d = new Date();
    var todayd = Date.parse(d);
    var today = (d.getMonth()+1) + "/" + d.getDate() +"/" + d.getFullYear();  
    var max=99999999999999;
	var done=0;

	var docid = getCookie("childdocid");   
	
	var dM1 = db.collection("child").doc(docid).collection("Play").where("Categories","==","Numbers").where("Lesson","==","Counting");
    var dM2 = db.collection("child").doc(docid).collection("Play").where("Categories","==","Numbers").where("Lesson","==","Advance");
	var dP1 = db.collection("child").doc(docid).collection("Play").where("Categories","==","Puzzle").where("Lesson","==","Patches");
	var dP2 = db.collection("child").doc(docid).collection("Play").where("Categories","==","Puzzle").where("Lesson","==","Outline");
	var dP3 = db.collection("child").doc(docid).collection("Play").where("Categories","==","Puzzle").where("Lesson","==","Odd One Out");
    var dE = db.collection("child").doc(docid).collection("Play").where("Categories","==","Emotion");
   
    function setTable(dRef,popid,doneid){
		var htmlline = "";
		

		var tRef = 0;
		var statusRef = "Not Done";
		var lRef = max;
		var dateRef = "";
		var lesRef = "";
			
		dRef.get().then(function(querySnapshot){
			var count = 0;
			querySnapshot.forEach(function(doc){
				if(lRef >= todayd - Date.parse(doc.data().Date)){	
					lRef = Date.parse(doc.data().Date);
					dateRef = doc.data().Date;
				} 
				if(doc.data().Status == "Not Done" ){
					statusRef = doc.data().Status;
				}
				console.log(count);
				tRef += doc.data().Duration;
				statusRef = doc.data().Status;
				lesRef = doc.data().Lesson;
				
				count++;
			})

			if(count!=0 && statusRef == "Done"){
				done++;
				document.getElementById(doneid).innerHTML = done;
			}

			if(count==0){
				htmlline += "<tr><th scope='col'>" + lesRef + " </th>" + "<td> No Attempt Yet</td></tr>";
				document.getElementById(popid).innerHTML += htmlline;		
			}
			else{	
				htmlline  += "<tr><th scope='col'>" + lesRef + " </th>" + "<td>" + dateRef + "</td>" + "<td>" + tRef + "</td>" + "<td>" + statusRef + "</td></tr>" ;
				document.getElementById(popid).innerHTML += htmlline;	
			}
		})
    }

	

	function setMath(){
		var popid = "pop-math";
		done = 0;
		document.getElementById(popid).innerHTML = "";	
		setTable(dM1,popid,"prog-m");
		setTable(dM2,popid,"prog-m");
		
	}

	function setPuzzle(){
		var popid = "pop-puzzle";
		done = 0;
		document.getElementById(popid).innerHTML = "";	
		setTable(dP1,popid,"prog-p");
		setTable(dP2,popid,"prog-p");
		setTable(dP3,popid,"prog-p");
	}

	function setEmotion(){
		done = 0;
		var popid = "pop-emotion";
		document.getElementById(popid).innerHTML = "";	
		setTable(dE,popid,"prog-e");
		

	}
    
    function init(){
         
		
        document.getElementById("detail_2").addEventListener('click',setMath);
		document.getElementById("detail_3").addEventListener('click',setPuzzle);
		
		document.getElementById("detail_5").addEventListener('click',setEmotion);
    }

    window.onload = function(){
        init();
    }