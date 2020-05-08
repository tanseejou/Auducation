	var d = new Date();
    var todayd = Date.parse(d);
    var today = d.toLocaleDateString();
    var docid;
    var max=99999999999999;

	 var dRnW = [db.collection("child").doc(docid).collection("Play").where("Categories","==","Read and Write").where("Lesson","==","Lesson 1"),
        db.collection("child").doc(docid).collection("Play").where("Categories","==","Read and Write").where("Lesson","==","Lesson 2"),
        db.collection("child").doc(docid).collection("Play").where("Categories","==","Read and Write").where("Lesson","==","Lesson 3")];

   
    function calcRnW(dRef,popid){

		console.log("HH");
       



       /* var dM = db.collection("child").doc(docid).collection("Play").where("Categories","==","Mathematics");
        var dP = db.collection("child").doc(docid).collection("Play").where("Categories","==","Puzzle");
        var dDl = db.collection("child").doc(docid).collection("Play").where("Categories","==","Daily Life");
        var dE = db.collection("child").doc(docid).collection("Play").where("Categories","==","Emotion");
        */
		
        
    /*    var lM = max;
        var lP = max;
        var lDl = max;
        var lE = max;
    */

        
    /*    var tM;
        var tP;
        var tDl;
        var tE;
    */	
         var htmlline = "";
		 document.getElementById("pop-RnW").innerHTML = "";	

		 var j =0;
		function callagain(){
			var temp = j;
			var tRnW = 0;
			var statusRnW = "";
			var lRnW = max;
			var dateRnW = "";
			
			dRnW[j].get().then(function(querySnapshot){
				var count = 0;
				console.log("This " + j);
				querySnapshot.forEach(function(doc){
					if(lRnW >= todayd - Date.parse(doc.data().Date)){	
						lRnW = Date.parse(doc.data().Date);
						dateRnW = doc.data().Date;
					} 
					
					console.log(j);
					tRnW += doc.data().Duration;
					statusRnW = doc.data().Status;
					count++;
					console.log("---" + tRnW);
					console.log(statusRnW);
					console.log("---" + dateRnW);
				}.then(function(){
					console.log(count);				
					if(count==0){
						htmlline += "<tr><th scope='col'>" + j + " </th>" + "<td> No Attempt Yet</td></tr>"	
						document.getElementById("pop-RnW").innerHTML += htmlline;		
					}
					else{
						console.log("HHHHHHHH");
					
					
						htmlline  += "<tr><th scope='col'>" + j + " </th>" + "<td>" + dateRnW + "</td>" + "<td>" + tRnW + "</td>" + "<td>" + statusRnW + "</td></tr>" ;
					
					

						document.getElementById("pop-RnW").innerHTML += htmlline;

						console.log(document.getElementById("pop-RnW").innerHTML );
					}
					j++;
				}))
		  }).then(callagain());

		}
	callagain();	
					
        
    
    }
    
    function init(){
        docid = getCookie("childdocid");    
		document.getElementById("detail_1").addEventListener('click',calcRnW);
        
    }

    window.onload = function(){
        init();
    }