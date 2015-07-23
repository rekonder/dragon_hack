/*
*	@author Ziga C
*/

// capitalize first letter
String.prototype.capitalizeFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var kraticeGlobal = [];
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
    console.log(userData);
    if (userData !== "") {
    	var ud = userData.split(","); 
    	alert("tabela: " + ud);
    	for(var key in ud){
    		hideBlocks('#' + ud[key]);
    	}
    } else {
           setCookie("hideSubjects", hiddenSubjects, 30);
    }
}

function changeSubjects(){
	// zaenkrat samo v alertu pokaze vpisno + vse predmete (skupaj v arrayu)
	checkCookie();
}

/* ---------- KONEC ---------- ZA KUKIJE ---------- */



/* ---------- ZACETEK ---------- NOV ZA PREDMETE ---------- */

function hide(idToHide){
	$(idToHide).toggle();
}

function hideBlocks(idToHide){
	$(idToHide).toggle();

	if( !($(idToHide).is(":visible")) ){
		hiddenSubjects.push(idToHide.id);
	}
	else{
		hiddenSubjects.pop(idToHide.id);
	}
	console.log(hiddenSubjects);
	
	if (hiddenSubjects === undefined || hiddenSubjects.length == 0) {
    	// empty
	}
	setCookie("hideSubjects", hiddenSubjects, 30);
}

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
	var predmeti = data.predmeti;
	var i = 0;
	for(var key in predmeti){
		kraticeGlobal[i] = key;
		setFrame(key);
		fillPredmet(predmeti, key);

		fillChangeSubjects(key);

		i++;
	}

	//changeSubjects();

	var student = data.student;
	var ime = student.name;
	var priimek = student.surname;
	$("#imeStudent").append('<a href="javascript:alert(\'prijavljeni ste kot: ' + ime + ' ' + priimek + '\')">' + ime + " " + priimek + '</a>');
	var program = student.program;
	$("#program").append('<a href="javascript:alert(\'program: ' + program + '\')">' + program + '</a>');

});

function fillPredmet(podatki, x){
	var imeP = podatki[x].name;
	$("#imePredmet" + x).append("<b><a href='javascript:hide(vsebinaPredmet"+x+")'>"+ x + " | " + imeP+"</a></b>");

	$("#izpiti" + x).append("<table class='table table-hover'> <tr id='stev" + x + "'> <tr id='roki" + x + "'> ");
	var datumi = podatki[x].dates.split(",");
	for(var i in datumi){
		if(datumi[i] !== ""){
			$("#stev" + x).append('<th>' + (parseInt(i)+1) +'.rok</th>');
			$("#roki" + x).append('<td>' + datumi[i] +'</td>');
		}
	}
}

function fillChangeSubjects(x){
	$('#subjectChkBox').append(
		'<a href="javascript:hideBlocks(frame' + x + ')">'+
		'<input type="checkbox" name="' + x + '" value="' + x + '" checked> ' + x + 
		'</a></br>');
}


$.getJSON( "data/urnik.json", function( data ) {
	var predavanja = data.predavanja;
	var vaje = data.vaje;
	//console.log(predavanja + " " + vaje );

	for(var key in predavanja){
		fillPredavanja(predavanja, key);
	}
	for(var key in vaje){
		fillVaje(vaje, key);
	}
});

function fillPredavanja(pred, x){
	var predX = pred[x];
	//console.log(predX);
	$("#predavanja" + x).append("<table id=predavanjaTabela" + x + " class='table table-hover'>");

	for (var key in predX){
		//console.log(predX[key].ucilnica + " " + predX[key].termin + " " + predX[key].predavatelj);
		$("#predavanjaTabela" + x).append("<tr>" +
			"<td>" + predX[key].ucilnica + "</td>" + 
			"<td>" + predX[key].termin + "</td>" + 
			"<td>" + predX[key].predavatelj + "</td>" + 
			"</tr>"
		);
	}

	$("#izvajalci" + x).append("<table id='izvajalciTabela" + x + "' class='table table-hover'>");
	$("#izvajalciTabela" + x).append('<tr id=predavatelj' + x + '> <th>Predavatelj</th> <td><a href="">' + predX[0].predavatelj + '</a></td> <td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td> </tr>');
}

function fillVaje(vaje, x){
	var vajeX = vaje[x];
	//console.log(vajeX);
	$("#vaje" + x).append("<table id=vajeTabela" + x + " class='table table-hover'>");
	
	var key;
	var asistentArr = [], idx=0;
	for (key in vajeX){
		$("#vajeTabela" + x).append("<tr>" +
			"<td>" + vajeX[key].ucilnica + "</td>" + 
			"<td>" + vajeX[key].termin + "</td>" + 
			"<td>" + vajeX[key].asistent + "</td>" + 
			"</tr>"
		);

		if(asistentArr.indexOf(vajeX[key].asistent)<0){
			asistentArr[idx] = vajeX[key].asistent;
			idx++;
			$("#izvajalciTabela" + x).append('<tr id="asistent' + x + idx + '"> <th>Asistent</th> <td>' + asistentArr[idx-1] +'</td> <td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td> </tr>');
		}
	}
}

$.getJSON( "data/naloge.json", function( data ) {
	//console.log(data);
	//console.log(kraticeGlobal);

	var kvizi = data.kvizi;
	var naloge = data.naloge;

	var poPredmKvizi = [];
	for (var i = kraticeGlobal.length - 1; i >= 0; i--) {
		poPredmKvizi[i]=[];
	}
	for(var key1 in kraticeGlobal){
		var i = 0;
		for(var key2 in kvizi){
			if(kvizi[key2].name === kraticeGlobal[key1]){
				poPredmKvizi[key1][i] = kvizi[key2];
				i++;
			}
		}
	}
	//console.log(poPredmKvizi);

	var poPredmNaloge = [];
	for (var i = kraticeGlobal.length - 1; i >= 0; i--) {
		poPredmNaloge[i] = [];
	}

	for(var key1 in kraticeGlobal){
		var i = 0;
		for(var key2 in naloge){
			if(naloge[key2].name === kraticeGlobal[key1]){
				poPredmNaloge[key1][i] = naloge[key2];
				i++;
			}
		}
	}
	//console.log(poPredmNaloge);

	for(var key in poPredmKvizi){
		fillKvizi(poPredmKvizi, key);
	}
	for(var key in poPredmNaloge){
		fillNaloge(poPredmNaloge, key);
	}
});


function fillKvizi(kvizi, x){
	var kviziX = kvizi[x];

	if(typeof kviziX[0] !== "undefined"){
		//console.log("fillKvizi" + kviziX[0].name);
		$("#obveznosti" + kviziX[0].name).append("<table id=kviziTabela" + kviziX[0].name + " class='table table-hover'>");

		for(var key in kviziX){
			$("#kviziTabela" + kviziX[0].name).append("<tr>" +
				"<td>kviz</td>" + 
				"<td><a href='" + kviziX[key].link+"' target='_blank'>" + kviziX[key].rok + "</td>" +
				"</tr>"
			);
		}
	}
	else{
		$("#obveznosti" + kraticeGlobal[x]).append("Ni kvizov</br>");
		// slucajno dela, ni pa zagotovo, da bo delalo v vseh primerih
	}
}

function fillNaloge(nal, x){
	var nalX = nal[x];

	if(typeof nalX[0] !== "undefined"){
		//console.log("fillNaloge" + nalX[0].name);
		$("#obveznosti" + nalX[0].name).append("<table id=nalogeTabela" + nalX[0].name + " class='table table-hover'>");
		
		var key;
		for(key in nalX){
			if(nalX[key].oddano === "da"){
				var s = '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			}
			else{
				var s = '<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'
			}

			$("#nalogeTabela" + nalX[0].name).append("<tr>" +
				"<td>naloga</td>" + 
				"<td><a href='" + nalX[key].link + "' target='_blank'>" + nalX[key].rok + "</td>" +
				"<td>"+s+"</td>" +
				"</tr>"
			);
		}
	}
	else{
		$("#obveznosti" + kraticeGlobal[x]).append("Ni nalog</br>");
		// slucajno dela, ni pa zagotovo, da bo delalo v vseh primerih
	}
}

/* ---------- KONEC ---------- NOV ZA PREDMETE ---------- */