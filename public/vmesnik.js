$.getJSON( "data/urnik.json", function( data ) {
	//console.log(data); 
	
	predavanja = data.predavanja;
	vaje = data.vaje;
	
	/* ---------- APS2 ---------- */
	aps2P = predavanja.APS2[0];
	
	aps2ucilnicaP = aps2P.ucilnica;
	aps2predavatelj = aps2P.predavatelj;
	aps2terminP = aps2P.termin;
	
	aps2V = vaje.APS2;
	
	/*aps2asistent = Array();
	
	for (i in aps2V){ 
		aps2asistent[i] = aps2V[i].asistent; 
	}*/
	
	
	//aps2asistent = Array();
	
	$("#izvajalci1").append("<tr><th>Predavatelj</th><td>"+ aps2predavatelj +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
	
	$("#izvajalci1").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti1" class="collapsed" aria-expanded="false">Prikazi/Skrij Asistente</a></th></tr>');
	
	
	aps2asistent = Array();
	var idx = 0
	for (i in aps2V){ 
		
		//console.log(aps2asistent.indexOf(aps2V[i].asistent) + aps2V[i].asistent);
		if(aps2asistent.indexOf(aps2V[i].asistent)<0){
			aps2asistent[idx] = aps2V[i].asistent;
			idx++;
			$("#izvajalci1").append('<tr id="as2" class="panel-collapse collapse collapseAsistenti1" aria-expanded="false" style="height: 0px;"><th>Asistent</th><td>'+ aps2asistent[idx-1] +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
		}

	}
/*
	<tr id="vaje2" class="panel-collapse collapse collapseVaje1" aria-expanded="false" style="height: 0px;">
		<th>vaje</th>
		<td>dan, ura ...</td>
		<td>kje</td>
	</tr>
*/
	$("#termini1").append('<tr><th>predavanja</th><td>' + aps2terminP + '</td><td>' + aps2ucilnicaP+ '</td></tr>');
	
	$("#termini1").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje1" class="collapsed" aria-expanded="false">Prikazi/Skrij vaje</a></th></tr>');
	
	
	for (i in aps2V){
		$("#termini1").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje1" aria-expanded="false" style="height: 0px;"><th>'+ aps2V[i].asistent+'</th><td>' + aps2V[i].termin + '</td><td>' +  aps2V[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- APS2 ---------- */
	
	
	
	
	
	/* ---------- ORS ---------- */
	
	orsP = predavanja.ORS;
	orsP0 = orsP[0];
	orsP1 = orsP[1];
	
	orsucilnicaP0 = orsP0.ucilnica;
	orsucilnicaP1 = orsP1.ucilnica;
	
	orspredavatelj = orsP0.predavatelj;
	// ker je najprej pet. in nato pon, sem zamenjal
	
	tmp = orsP0.termin;
	orsP0.termin = orsP1.termin;
	orsP1.termin = tmp;
	
	orsterminP0 = orsP0.termin;
	orsterminP1 = orsP1.termin;
	
	
	orsV = vaje.ORS;
	
	/*ppjasistent = Array();
	
	for (i in ppjV){ 
		ppjasistent[i] = ppjV[i].asistent; 
	}*/
	
	
	//ppjasistent = Array();
	
	$("#izvajalci2").append("<tr><th>Predavatelj</th><td>"+ orspredavatelj +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
	
	$("#izvajalci2").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti2" class="collapsed" aria-expanded="false">Prikazi/Skrij Asistente</a></th></tr>');
	
	
	
	orsasistent = Array();
	var idx = 0
	for (i in orsV){ 
		
		//console.log(aps2asistent.indexOf(aps2V[i].asistent) + aps2V[i].asistent);
		if(orsasistent.indexOf(orsV[i].asistent)<0){
			orsasistent[idx] = orsV[i].asistent;
			idx++;
			$("#izvajalci2").append('<tr id="as2" class="panel-collapse collapse collapseAsistenti2" aria-expanded="false" style="height: 0px;"><th>Asistent</th><td>'+ orsasistent[idx-1] +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
		}

	}
/*
	<tr id="vaje2" class="panel-collapse collapse collapseVaje1" aria-expanded="false" style="height: 0px;">
		<th>vaje</th>
		<td>dan, ura ...</td>
		<td>kje</td>
	</tr>
*/
	$("#termini2").append('<tr><th>predavanja</th><td>' + orsterminP0 + '</td><td>' + orsucilnicaP0+ '</td></tr>');
	$("#termini2").append('<tr><th>predavanja</th><td>' + orsterminP1 + '</td><td>' + orsucilnicaP1+ '</td></tr>');
	
	
	$("#termini2").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje2" class="collapsed" aria-expanded="false">Prikazi/Skrij vaje</a></th></tr>');
	
	
	for (i in orsV){
		$("#termini2").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje2" aria-expanded="false" style="height: 0px;"><th>'+ orsV[i].asistent+'</th><td>' + orsV[i].termin + '</td><td>' +  orsV[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- ORS ---------- */
	
	
	
	
	
	
	
	/* ---------- PPJ ---------- */
	ppjP = predavanja.PPJ[0];
	
	ppjucilnicaP = ppjP.ucilnica;
	ppjpredavatelj = ppjP.predavatelj;
	ppjterminP = ppjP.termin;
	
	ppjV = vaje.PPJ;
	
	/*ppjasistent = Array();
	
	for (i in ppjV){ 
		ppjasistent[i] = ppjV[i].asistent; 
	}*/
	
	
	//ppjasistent = Array();
	
	$("#izvajalci3").append("<tr><th>Predavatelj</th><td>"+ ppjpredavatelj +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
	
	$("#izvajalci3").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti3" class="collapsed" aria-expanded="false">Prikazi/Skrij Asistente</a></th></tr>');
	
	
	
	ppjasistent = Array();
	var idx = 0
	for (i in ppjV){ 
		
		//console.log(aps2asistent.indexOf(aps2V[i].asistent) + aps2V[i].asistent);
		if(ppjasistent.indexOf(ppjV[i].asistent)<0){
			ppjasistent[idx] = ppjV[i].asistent;
			idx++;
			$("#izvajalci3").append('<tr id="as2" class="panel-collapse collapse collapseAsistenti3" aria-expanded="false" style="height: 0px;"><th>Asistent</th><td>'+ ppjasistent[idx-1] +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
		}

	}
/*
	<tr id="vaje2" class="panel-collapse collapse collapseVaje1" aria-expanded="false" style="height: 0px;">
		<th>vaje</th>
		<td>dan, ura ...</td>
		<td>kje</td>
	</tr>
*/
	$("#termini3").append('<tr><th>predavanja</th><td>' + ppjterminP + '</td><td>' + ppjucilnicaP+ '</td></tr>');
	
	$("#termini3").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje3" class="collapsed" aria-expanded="false">Prikazi/Skrij vaje</a></th></tr>');
	
	
	for (i in ppjV){
		$("#termini3").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje3" aria-expanded="false" style="height: 0px;"><th>'+ ppjV[i].asistent+'</th><td>' + ppjV[i].termin + '</td><td>' +  ppjV[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- PPJ ---------- */
	
	
	
	
	
	
	
	
	
	/* ---------- TIS ---------- */
	
	tisP = predavanja.TIS[0];
	
	tisucilnicaP = tisP.ucilnica;
	tispredavatelj = tisP.predavatelj;
	tisterminP = tisP.termin;
	
	tisV = vaje.TIS;
	
	/*ppjasistent = Array();
	
	for (i in ppjV){ 
		ppjasistent[i] = ppjV[i].asistent; 
	}*/
	
	
	//ppjasistent = Array();
	
	$("#izvajalci4").append("<tr><th>Predavatelj</th><td>"+ tispredavatelj +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
	
	$("#izvajalci4").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti4" class="collapsed" aria-expanded="false">Prikazi/Skrij Asistente</a></th></tr>');
	
	
	
	tisasistent = Array();
	var idx = 0
	for (i in tisV){ 
		
		//console.log(aps2asistent.indexOf(aps2V[i].asistent) + aps2V[i].asistent);
		if(tisasistent.indexOf(tisV[i].asistent)<0){
			tisasistent[idx] = tisV[i].asistent;
			idx++;
			$("#izvajalci4").append('<tr id="as2" class="panel-collapse collapse collapseAsistenti4" aria-expanded="false" style="height: 0px;"><th>Asistent</th><td>'+ tisasistent[idx-1] +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
		}

	}
/*
	<tr id="vaje2" class="panel-collapse collapse collapseVaje1" aria-expanded="false" style="height: 0px;">
		<th>vaje</th>
		<td>dan, ura ...</td>
		<td>kje</td>
	</tr>
*/
	$("#termini4").append('<tr><th>predavanja</th><td>' + tisterminP + '</td><td>' + tisucilnicaP+ '</td></tr>');
	
	$("#termini4").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje4" class="collapsed" aria-expanded="false">Prikazi/Skrij vaje</a></th></tr>');
	
	
	for (i in tisV){
		$("#termini4").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje4" aria-expanded="false" style="height: 0px;"><th>'+ tisV[i].asistent+'</th><td>' + tisV[i].termin + '</td><td>' +  tisV[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- TIS ---------- */
	
	
	/*
	console.log(aps2P);
	//console.log(orsP);
	console.log(orsP0);
	console.log(orsP1);
	console.log(ppjP);
	console.log(tisP);
	*/
	
	
	
	
	
	
});

$.getJSON( "data/studis.json", function( data ) {
	//console.log(data);
	
	predmeti = data.predmeti;
	
	aps2 = predmeti.APS2;
	ors = predmeti.ORS;
	ppj = predmeti.PPJ;
	tis = predmeti.TIS;
	
	aps2Datumi = aps2.dates.split(",");
	for(i in aps2Datumi){
		$("#roki1").append('<td>'+ aps2Datumi[i] +'</td>');	
	}
	
	imeP = aps2.name;
	$("#predmet1").append(imeP);
	
	orsDatumi = ors.dates.split(",");
	for(i in orsDatumi){
		$("#roki2").append('<td>'+ orsDatumi[i] +'</td>');	
	}
	
	imeP = ors.name;
	$("#predmet2").append(imeP);
	
	ppjDatumi = ppj.dates.split(",");
	for(i in ppjDatumi){
		$("#roki3").append('<td>'+ ppjDatumi[i] +'</td>');	
	}
	
	imeP = ppj.name;
	$("#predmet3").append(imeP);
	
	tisDatumi = tis.dates.split(",");
	for(i in tisDatumi){
		$("#roki4").append('<td>'+ tisDatumi[i] +'</td>');	
	}
	
	imeP = tis.name;
	$("#predmet4").append(imeP);

	student = data.student;
	
	ime = student.name;
	priimek = student.surname;
	$("#imeStudent").append('<a href="">'+ ime + " " + priimek +'</a>');
	
	program = student.program;
	$("#program").append('<a href="">'+ program +'</a>');
	
});

$.getJSON( "data/naloge.json", function( data ) {
	console.log(data);
	
	kvizi = data.kvizi;
	naloge = data.naloge;
	
	
/*	
	<tr id="nal2" class="panel-collapse collapse collapseNaloge1" aria-expanded="false" style="height: 0px;">
		<td>Naloga1</td>
		<td>1. junij, 23:59</td>
		<td>
			<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>
		</td>
	</tr>
	*/
	
	$("#naloge1").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseNaloge1" class="collapsed" aria-expanded="false">Prikazi/Skrij Naloge</a></th></tr>');	
	$("#naloge2").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseNaloge2" class="collapsed" aria-expanded="false">Prikazi/Skrij Naloge</a></th></tr>');
	$("#naloge3").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseNaloge3" class="collapsed" aria-expanded="false">Prikazi/Skrij Naloge</a></th></tr>');
	$("#naloge4").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseNaloge4" class="collapsed" aria-expanded="false">Prikazi/Skrij Naloge</a></th></tr>');

	$("#naloge1").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge1" aria-expanded="false" style="height: 0px;"><th>Dolznost</th><th>Rok</th><th>Opravljeno</th></tr>');	
	$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge2" aria-expanded="false" style="height: 0px;"><th>Dolznost</th><th>Rok</th><th>Opravljeno</th></tr>');	
	$("#naloge3").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge3" aria-expanded="false" style="height: 0px;"><th>Dolznost</th><th>Rok</th><th>Opravljeno</th></tr>');	
	$("#naloge4").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge4" aria-expanded="false" style="height: 0px;"><th>Dolznost</th><th>Rok</th><th>Opravljeno</th></tr>');	

	

	
	for (i in kvizi){
		if(kvizi[i].name == "APS2"){
			$("#naloge1").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge1" aria-expanded="false" style="height: 0px;"><td>Kviz</td><td>' + kvizi[i].rok + '</td><td></td></tr>');
		}
		else if(kvizi[i].name == "ORS"){
			$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge2" aria-expanded="false" style="height: 0px;"><td>Kviz</td><td>' + kvizi[i].rok + '</td><td></td></tr>');
		}
		else if(kvizi[i].name == "PPJ"){
			$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge3" aria-expanded="false" style="height: 0px;"><td>Kviz</td><td>' + kvizi[i].rok + '</td><td></td></tr>');
		}
		else if(kvizi[i].name == "TIS"){
			$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge4" aria-expanded="false" style="height: 0px;"><td>Kviz</td><td>' + kvizi[i].rok + '</td><td></td></tr>');
		}
	}
	
	for (i in naloge){
		if(naloge[i].name == "APS2"){
			//kvizi[i].rok
			if(naloge[i].oddano=="da"){
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			}
			else{
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'
			}
			$("#naloge1").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge1" aria-expanded="false" style="height: 0px;"><td>Naloga</td><td>' + naloge[i].rok + '</td><td>'+s+'</td></tr>');
		}
		
		else if(naloge[i].name == "ORS"){
			//kvizi[i].rok
			if(naloge[i].oddano=="da"){
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			}
			else{
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'
			}
			$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge2" aria-expanded="false" style="height: 0px;"><td>Naloga</td><td>' + naloge[i].rok + '</td><td>'+s+'</td></tr>');
		}
		
		else if(naloge[i].name == "PPJ"){
			//kvizi[i].rok
			if(naloge[i].oddano=="da"){
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			}
			else{
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'
			}
			$("#naloge3").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge3" aria-expanded="false" style="height: 0px;"><td>Naloga</td><td>' + naloge[i].rok + '</td><td>'+s+'</td></tr>');
		}
		
		else if(naloge[i].name == "TIS"){
			//kvizi[i].rok
			if(naloge[i].oddano=="da"){
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			}
			else{
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'
			}
			$("#naloge4").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge4" aria-expanded="false" style="height: 0px;"><td>Naloga</td><td>' + naloge[i].rok + '</td><td>'+s+'</td></tr>');
		}
	}
	
	
	
});



var socket = io.connect();

$(document).ready(function() {
	socket.on('sporocilo', function (sporocilo) {
		console.log(sporocilo);
	});
});
