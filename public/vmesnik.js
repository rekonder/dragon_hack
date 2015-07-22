/*
*	@author Ziga C
*/

// capitalize first letter
String.prototype.capitalizeFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var kraticeGlobal = new Array();

/* ---------- ZACETEK ---------- ZA KUKIJE ---------- */

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();

    document.cookie = cname + "=" + cvalue + "; "
    					+ expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var userData=getCookie("username");
    if (userData != "") {
    	var ud = userData.split(","); 
        alert("tabela: " + ud);
    } else {
       userData = prompt("nothing important","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}

function spremeniPredmete(){
	// zaenkrat samo v alertu pokaze vpisno + vse predmete (skupaj v arrayu)
	checkCookie();
}

/* ---------- KONEC ---------- ZA KUKIJE ---------- */



/* ---------- ZACETEK ---------- NOV ZA PREDMETE ---------- */

function hide(idToHide){
	$(idToHide).toggle();
}

function setSubFrame(subV, x){
	$("#vsebinaPredmet"+x).append( 
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
	var i;
	for(i in subVs){
		$("#vsebinaPredmet"+x).append( 
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
	//var x=0;
	$("#vizitke").append(
		'<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">' + 
			'<div class="panel panel-default" id="predmet' + x + '">' + 

				'<div id="imePredmet' + x + '" class="panel-heading">' +
				'</div>' + 

				'<div id="vsebinaPredmet' + x + '" class="panel-body">' +
				'</div>' + 

			'</div>' + 
		'</div>'
	);

	setSubFrame2(["izvajalci", "predavanja", "vaje", "obveznosti", "izpiti", "facebook"], x);

	/*
	setSubFrame("izvajalci", x);
	setSubFrame("predavanja", x);
	setSubFrame("vaje", x);
	setSubFrame("obveznosti", x);
	setSubFrame("izpiti", x);
	setSubFrame("facebook", x);
	*/
}

$.getJSON( "data/studis.json", function( data ) {
	predmeti = data.predmeti;
	var key, i=0;
	for(key in predmeti){
		kraticeGlobal[i]=key;
		setFrame(key);
		fillPredmet(predmeti, key);
		i++;
	}

	student = data.student;
	ime = student.name;
	priimek = student.surname;
	$("#imeStudent").append('<a href="javascript:alert(\'prijavljeni ste kot: ' + ime + ' ' + priimek + '\')">' + ime + " " + priimek + '</a>');
	program = student.program;
	$("#program").append('<a href="javascript:alert(\'program: ' + program + '\')">' + program + '</a>');

});

function fillPredmet(podatki, x){
	imeP = podatki[x].name;
	$("#imePredmet"+x).append("<b><a href='javascript:hide(vsebinaPredmet"+x+")'>"+ x + " | " + imeP+"</a></b>");

	$("#izpiti"+x).append("<table class='table table-hover'> <tr id='stev"+x+"'> <tr id='roki"+x+"'> ");
	datumi = podatki[x].dates.split(",");
	var j=1;
	for(i in datumi){
		if(datumi[i] != ""){
			$("#stev"+x).append('<th>'+ j +'.rok</th>');	
			$("#roki"+x).append('<td>'+ datumi[i] +'</td>');	
			j++;
		}
	}
}

$.getJSON( "data/urnik.json", function( data ) {
	predavanja = data.predavanja;
	vaje = data.vaje;
	//console.log(predavanja + " " + vaje );

	var key;
	for(key in predavanja){
		fillPredavanja(predavanja, key);
	}
	for(key in vaje){
		fillVaje(vaje, key);
	}
});

function fillPredavanja(pred, x){
	var predX = pred[x];
	//console.log(predX);
	$("#predavanja"+x).append("<table id=predavanjaTabela"+x+" class='table table-hover'>");
	
	var key;
	for (key in predX){
		//console.log(predX[key].ucilnica + " " + predX[key].termin + " " + predX[key].predavatelj);
		$("#predavanjaTabela"+x).append("<tr>" + 
			"<td>" + predX[key].ucilnica + "</td>" + 
			"<td>" + predX[key].termin + "</td>" + 
			"<td>" + predX[key].predavatelj + "</td>" + 
			"</tr>"
		);
	}

	$("#izvajalci"+x).append("<table id='izvajalciTabela"+x+"' class='table table-hover'>");
	$("#izvajalciTabela"+x).append('<tr id=predavatelj'+x+'> <th>Predavatelj</th> <td><a href="">'+ predX[0].predavatelj +'</a></td> <td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td> </tr>');
}

function fillVaje(vaje, x){
	var vajeX = vaje[x];
	//console.log(vajeX);
	$("#vaje"+x).append("<table id=vajeTabela"+x+" class='table table-hover'>");
	
	var key;
	var asistentArr = new Array(), idx=0;
	for (key in vajeX){
		$("#vajeTabela"+x).append("<tr>" + 
			"<td>" + vajeX[key].ucilnica + "</td>" + 
			"<td>" + vajeX[key].termin + "</td>" + 
			"<td>" + vajeX[key].asistent + "</td>" + 
			"</tr>"
		);

		if(asistentArr.indexOf(vajeX[key].asistent)<0){
			asistentArr[idx] = vajeX[key].asistent;
			idx++;
			$("#izvajalciTabela"+x).append('<tr id="asistent'+x+idx+'"> <th>Asistent</th> <td>'+ asistentArr[idx-1] +'</td> <td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td> </tr>');
		}
	}
}

$.getJSON( "data/naloge.json", function( data ) {
	//console.log(data);
	//console.log(kraticeGlobal);
	
	kvizi = data.kvizi;
	naloge = data.naloge;

	var poPredmKvizi = new Array();
	for (var i = kraticeGlobal.length - 1; i >= 0; i--) {
		poPredmKvizi[i]=new Array();
	}
	var key1, key2, i=0;
	for(key1 in kraticeGlobal){
		for(key2 in kvizi){
			if(kvizi[key2].name == kraticeGlobal[key1]){
				poPredmKvizi[key1][i]=kvizi[key2];
				i++;
			}
		}
		i=0;
	}
	//console.log(poPredmKvizi);

	var poPredmNaloge = new Array();
	for (var i = kraticeGlobal.length - 1; i >= 0; i--) {
		poPredmNaloge[i]=new Array();
	}
	var key1, key2, i=0;
	for(key1 in kraticeGlobal){
		for(key2 in naloge){
			if(naloge[key2].name == kraticeGlobal[key1]){
				poPredmNaloge[key1][i]=naloge[key2];
				i++;
			}
		}
		i=0;
	}
	//console.log(poPredmNaloge);

	var key;
	for(key in poPredmKvizi){
		fillKvizi(poPredmKvizi, key);
	}
	for(key in poPredmNaloge){
		fillNaloge(poPredmNaloge, key);
	}
});


function fillKvizi(kvizi, x){
	kviziX = kvizi[x];

	if(typeof kviziX[0] != "undefined"){
		//console.log("fillKvizi" + kviziX[0].name);
		$("#obveznosti"+kviziX[0].name).append("<table id=kviziTabela"+kviziX[0].name+" class='table table-hover'>");
		
		var key;
		for(key in kviziX){
			$("#kviziTabela"+kviziX[0].name).append("<tr>" + 
				"<td>kviz</td>" + 
				"<td><a href='"+kviziX[key].link+"' target='_blank'>" + kviziX[key].rok + "</td>" +  
				"</tr>"
			);
		}
	}
	else{
		$("#obveznosti"+kraticeGlobal[x]).append("Ni kvizov</br>"); 
		// slucajno dela, ni pa zagotovo, da bo delalo v vseh primerih
	}
}

function fillNaloge(nal, x){
	nalX = nal[x];

	if(typeof nalX[0] != "undefined"){
		//console.log("fillNaloge" + nalX[0].name);
		$("#obveznosti"+nalX[0].name).append("<table id=nalogeTabela"+nalX[0].name+" class='table table-hover'>");
		
		var key;
		for(key in nalX){
			if(nalX[key].oddano=="da"){
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			}
			else{
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'
			}

			$("#nalogeTabela"+nalX[0].name).append("<tr>" + 
				"<td>naloga</td>" + 
				"<td><a href='"+nalX[key].link+"' target='_blank'>" + nalX[key].rok + "</td>" +
				"<td>"+s+"</td>" +
				"</tr>"
			);
		}
	}
	else{
		$("#obveznosti"+kraticeGlobal[x]).append("Ni nalog</br>"); 
		// slucajno dela, ni pa zagotovo, da bo delalo v vseh primerih
	}
}

/* ---------- KONEC ---------- NOV ZA PREDMETE ---------- */