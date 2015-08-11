/*
*	@author Ziga C
*/

// capitalize first letter
String.prototype.capitalizeFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var allSubjects = [];
var hiddenSubjects = [];
/* ---------- ZACETEK ---------- ZA KUKIJE ---------- */

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();

    document.cookie = cname + "=" + cvalue + "; "
    					+ expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var userData=getCookie("hideSubjects");
    
    //console.log(userData);
    //console.log("prej " + hiddenSubjects);
    
    if (userData !== "") {
    	var ud = userData.split(","); 
    	//alert("tabela: " + ud);
    	
    	for(var key in ud) {
    		hiddenSubjects[key] = ud[key];
    		var uudd = ud[key].split(":");
    		//console.log(uudd);
    		if(uudd[1] === "true") {
    			//console.log(uudd[0]);
    			hideBlocksC('#' + uudd[0]);
    		}
    	}
    	//console.log("potem " + hiddenSubjects);
    } else {
           setCookie("hideSubjects", hiddenSubjects, 30);
    }
}

/*
function changeSubjects(){
	// zaenkrat samo v alertu pokaze vpisno + vse predmete (skupaj v arrayu)
	checkCookie();
}
*/

function checkCout() {
	var userData=getCookie("hideSubjects");
    
    //console.log(userData);
    //console.log("prej " + hiddenSubjects);
    
    if (userData !== "") {
    	var ud = userData.split(","); 
    	alert("tabela: " + ud);
    	
    	for(var key in ud) {
    		hiddenSubjects[key] = ud[key];
    		var uudd = ud[key].split(":");
    		//console.log(uudd);
    		if(uudd[1] === "true") {
    			//console.log(uudd[0]);
    			hideBlocksC('#' + uudd[0]);
    		}
    	}
    	//console.log("potem " + hiddenSubjects);
    } else {
           setCookie("hideSubjects", hiddenSubjects, 30);
    }
}

/* ---------- KONEC ---------- ZA KUKIJE ---------- */



/* ---------- ZACETEK ---------- NOV ZA PREDMETE ---------- */

function hide(idToHide){
	$(idToHide).toggle();
}

function hideBlocks(idToHide){
	$(idToHide).toggle();
	//console.log(idToHide.id);

	for (var key in hiddenSubjects) {
		if(hiddenSubjects[key].indexOf(idToHide.id) > -1) {
			if(hiddenSubjects[key].indexOf("true") > -1) {
				hiddenSubjects[key] = idToHide.id + ":" + false;
			}
			else {
				hiddenSubjects[key] = idToHide.id + ":" + true;
			}
		}
	}
	
	//console.log(hiddenSubjects);

	setCookie("hideSubjects", hiddenSubjects, 30);
}

function hideBlocksC(idToHide){
	$(idToHide).hide();
}

/*
function setSubFrame(subV, x){
	$("#vsebinaPredmet" + x).append(
		'<div class="panel panel-default">' + 
			'<div class="panel-heading">' +
				'<b> <a href="javascript:hide(' + subV + x + ')">' + subV.capitalizeFirst() + " " + x + '</a> </b>' +
			'</div>' + 

			'<div id="' + subV + x + '" class="panel-body">' + 
				//'tabela' + 
			'</div>' + 
		'</div>'
	);
}
*/

function setSubFrame2(subVs, x){
	for(var i in subVs){
		$("#vsebinaPredmet" + x).append(
			'<div class="panel panel-default">' + 
				'<div class="panel-heading">' +
					'<b> <a href="javascript:hide(' + subVs[i] + x + ')">' + subVs[i].capitalizeFirst() + " " + x + '</a> </b>' +
				'</div>' + 

				'<div id="' + subVs[i] + x + '" class="panel-body">' + 
					//'tabela' + 
				'</div>' + 
			'</div>'
		);
	}
}

function setFrame(x){
	$("#vizitke").append(
		'<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" id="frame' + x + '">' + 
			'<div class="panel panel-default" id="predmet' + x + '" >' + 

				'<div id="imePredmet' + x + '" class="panel-heading">' +
				'</div>' + 

				'<div id="vsebinaPredmet' + x + '" class="panel-body">' +
				'</div>' + 

			'</div>' + 
		'</div>'
	);

	setSubFrame2(["izvajalci", "predavanja", "vaje", "obveznosti", "izpiti", "facebook"], x);
}

$.getJSON( "data/studis.json", function( data ) {
	var subjects = data.predmeti;
	var i = 0;
	for(var key in subjects){
		allSubjects[i] = key;
		setFrame(key);
		fillSubject(subjects, key);

		fillChangeSubjects(key);
		hiddenSubjects[i] = 'frame' + key + ":" + false;

		i++;
	}

	var student = data.student;
	var stName = student.name;
	var stSurname = student.surname;
	$("#imeStudent").append('<a href="javascript:alert(\'prijavljeni ste kot: ' + stName + ' ' + stSurname + '\')">' + stName + " " + stSurname + '</a>');
	var stProgram = student.program;
	$("#program").append('<a href="javascript:alert(\'program: ' + stProgram + '\')">' + stProgram + '</a>');

});

function fillSubject(data, x){
	var subjName = data[x].name;
	$("#imePredmet" + x).append("<b><a href='javascript:hide(vsebinaPredmet"+x+")'>"+ x + " | " + subjName+"</a></b>");

	$("#izpiti" + x).append("<table class='table table-hover'> <tr id='stev" + x + "'> <tr id='roki" + x + "'> ");
	var examDates = data[x].dates.split(",");
	for(var i in examDates){
		if(examDates[i] !== ""){
			$("#stev" + x).append('<th>' + (parseInt(i)+1) +'.rok</th>');
			$("#roki" + x).append('<td>' + examDates[i] +'</td>');
		}
	}
}

function fillChangeSubjects(x){
	$('#subjectChkBox').append('<a href="javascript:hideBlocks(frame' + x + ')">' + x + '</a></br>');
}


$.getJSON( "data/urnik.json", function( data ) {
	var lectures = data.predavanja;
	var practice = data.vaje;
	//console.log(predavanja + " " + vaje );

	for(var key in lectures){
		fillLectures(lectures, key);
	}
	for(var key in practice){
		fillPractice(practice, key);
	}
});

function fillLectures(lectures, x){
	var lectureX = lectures[x];
	//console.log(predX);
	$("#predavanja" + x).append("<table id=predavanjaTabela" + x + " class='table table-hover'>");

	for (var key in lectureX){
		//console.log(predX[key].ucilnica + " " + predX[key].termin + " " + predX[key].predavatelj);
		$("#predavanjaTabela" + x).append("<tr>" +
			"<td>" + lectureX[key].ucilnica + "</td>" +
			"<td>" + lectureX[key].termin + "</td>" +
			"<td>" + lectureX[key].predavatelj + "</td>" +
			"</tr>"
		);
	}

	$("#izvajalci" + x).append("<table id='izvajalciTabela" + x + "' class='table table-hover'>");
	$("#izvajalciTabela" + x).append('<tr id=predavatelj' + x + '> <th>Predavatelj</th> <td><a href="">' + lectureX[0].predavatelj + '</a></td> <td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td> </tr>');
}

function fillPractice(practice, x){
	var practiceX = practice[x];
	//console.log(vajeX);
	$("#vaje" + x).append("<table id=vajeTabela" + x + " class='table table-hover'>");
	
	var key;
	var assistantArr = [], idx=0;
	for (key in practiceX){
		$("#vajeTabela" + x).append("<tr>" +
			"<td>" + practiceX[key].ucilnica + "</td>" +
			"<td>" + practiceX[key].termin + "</td>" +
			"<td>" + practiceX[key].asistent + "</td>" +
			"</tr>"
		);

		if(assistantArr.indexOf(practiceX[key].asistent)<0){
			assistantArr[idx] = practiceX[key].asistent;
			idx++;
			$("#izvajalciTabela" + x).append('<tr id="asistent' + x + idx + '"> <th>Asistent</th> <td>' + assistantArr[idx-1] +'</td> <td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td> </tr>');
		}
	}
}

$.getJSON( "data/naloge.json", function( data ) {
	//console.log(data);
	//console.log(allSubjects);

	var quizzes = data.kvizi;
	var tasks = data.naloge;

	var quizzesSubjects = [];
	for (var i = allSubjects.length - 1; i >= 0; i--) {
		quizzesSubjects[i]=[];
	}
	for(var key1 in allSubjects){
		var i = 0;
		for(var key2 in quizzes){
			if(quizzes[key2].name === allSubjects[key1]){
				quizzesSubjects[key1][i] = quizzes[key2];
				i++;
			}
		}
	}
	//console.log(poPredmKvizi);

	var tasksSubjects = [];
	for (var i = allSubjects.length - 1; i >= 0; i--) {
		tasksSubjects[i] = [];
	}

	for(var key1 in allSubjects){
		var i = 0;
		for(var key2 in tasks){
			if(tasks[key2].name === allSubjects[key1]){
				tasksSubjects[key1][i] = tasks[key2];
				i++;
			}
		}
	}
	//console.log(poPredmNaloge);

	for(var key in quizzesSubjects){
		fillQuizzes(quizzesSubjects, key);
	}
	for(var key in tasksSubjects){
		fillTasks(tasksSubjects, key);
	}
});


function fillQuizzes(quizzes, x){
	var quizzesX = quizzes[x];

	if(typeof quizzesX[0] !== "undefined"){
		//console.log("fillQuizzes" + kviziX[0].name);
		$("#obveznosti" + quizzesX[0].name).append("<table id=kviziTabela" + quizzesX[0].name + " class='table table-hover'>");

		for(var key in quizzesX){
			$("#kviziTabela" + quizzesX[0].name).append("<tr>" +
				"<td>kviz</td>" + 
				"<td><a href='" + quizzesX[key].link+"' target='_blank'>" + quizzesX[key].rok + "</td>" +
				"</tr>"
			);
		}
	}
	else{
		$("#obveznosti" + allSubjects[x]).append("Ni kvizov</br>");
		// slucajno dela, ni pa zagotovo, da bo delalo v vseh primerih
	}
}

function fillTasks(tasks, x){
	var tasksX = tasks[x];

	if(typeof tasksX[0] !== "undefined"){
		//console.log("fillTasks" + nalX[0].name);
		$("#obveznosti" + tasksX[0].name).append("<table id=nalogeTabela" + tasksX[0].name + " class='table table-hover'>");
		
		var key;
		for(key in tasksX){
			if(tasksX[key].oddano === "da"){
				var s = '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			}
			else{
				var s = '<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'
			}

			$("#nalogeTabela" + tasksX[0].name).append("<tr>" +
				"<td>naloga</td>" + 
				"<td><a href='" + tasksX[key].link + "' target='_blank'>" + tasksX[key].rok + "</td>" +
				"<td>"+s+"</td>" +
				"</tr>"
			);
		}
	}
	else{
		$("#obveznosti" + allSubjects[x]).append("Ni nalog</br>");
		// slucajno dela, ni pa zagotovo, da bo delalo v vseh primerih
	}
}

/* ---------- KONEC ---------- NOV ZA PREDMETE ---------- */