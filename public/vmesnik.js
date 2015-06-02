$.getJSON( "data/urnik.json", function( data ) {
	//console.log(data); 
	
	predavanja = data.predavanja;
	vaje = data.vaje;
	
	/* ---------- APS2 ---------- */
	aps2P = predavanja.APS2[0];
	aps2ucilnicaP = aps2P.ucilnica;
	aps2predavatelj = aps2P.predavatelj;
	
	brezsum = aps2predavatelj.toLowerCase(aps2predavatelj);
	brezsum = brezsum.replace("č", "c");
	brezsum = brezsum.replace("š", "s");
	brezsum = brezsum.replace("ž", "z");
	brezsum = brezsum.replace("ć", "c");

	splitted=brezsum.split(", ");
	wbpage="http://www.fri.uni-lj.si/"+splitted[1]+"-"+splitted[0];

	aps2terminP = aps2P.termin;
	aps2V = vaje.APS2;
	
	$("#izvajalci1").append('<tr><th>Predavatelj</th><td><a href="' + wbpage + '">'+ aps2predavatelj +'</a></td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
	$("#izvajalci1").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti1" class="collapsed" aria-expanded="false">Prikaži/Skrij Asistente</a></th></tr>');
	
	
	aps2asistent = Array();
	var idx = 0
	for (i in aps2V){ 

		if(aps2asistent.indexOf(aps2V[i].asistent)<0){
			aps2asistent[idx] = aps2V[i].asistent;
			idx++;
			$("#izvajalci1").append('<tr id="as2" class="panel-collapse collapse collapseAsistenti1" aria-expanded="false" style="height: 0px;"><th>Asistent</th><td>'+ aps2asistent[idx-1] +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
		}
	}

	
	var termin = aps2terminP.split(" ");
	termin[0] = termin[0].substring(0,3)+",";
	term = termin.join(" ");
	
	$("#termini1").append('<tr><th>predavanja</th><td>' + term + '</td><td>' + aps2ucilnicaP+ '</td></tr>');
	$("#termini1").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje1" class="collapsed" aria-expanded="false">Prikaži/Skrij termine vaj</a></th></tr>');
	
	
	for (i in aps2V){
		var termin = aps2V[i].termin.split(" ");
		console.log(termin)
		termin[0] = termin[0].substring(0,3)+",";
		term = termin.join(" ");
		$("#termini1").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje1" aria-expanded="false" style="height: 0px;"><th>'+ aps2V[i].asistent+'</th><td>' + term + '</td><td>' +  aps2V[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- APS2 ---------- */
	

	/* ---------- ORS ---------- */
	
	orsP = predavanja.ORS;
	orsP0 = orsP[0];
	orsP1 = orsP[1];
	orsucilnicaP0 = orsP0.ucilnica;
	orsucilnicaP1 = orsP1.ucilnica;
	
	orspredavatelj = orsP0.predavatelj;
	
	tmp = orsP0.termin;
	orsP0.termin = orsP1.termin;
	orsP1.termin = tmp;
	orsterminP0 = orsP0.termin;
	orsterminP1 = orsP1.termin;
	orsV = vaje.ORS;
	
	brezsum = orspredavatelj.toLowerCase(orspredavatelj);
	brezsum = brezsum.replace("č", "c");
	brezsum = brezsum.replace("š", "s");
	brezsum = brezsum.replace("ž", "z");
	brezsum = brezsum.replace("ć", "c");

	splitted=brezsum.split(", ");
	wbpage="http://www.fri.uni-lj.si/"+splitted[1]+"-"+splitted[0];
	
	$("#izvajalci2").append('<tr><th>Predavatelj</th><td><a href="' + wbpage + '">'+ orspredavatelj +'</a></td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
	$("#izvajalci2").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti2" class="collapsed" aria-expanded="false">Prikaži/Skrij Asistente</a></th></tr>');

	
	orsasistent = Array();
	var idx = 0
	for (i in orsV){ 

		if(orsasistent.indexOf(orsV[i].asistent)<0){
			orsasistent[idx] = orsV[i].asistent;
			idx++;
			$("#izvajalci2").append('<tr id="as2" class="panel-collapse collapse collapseAsistenti2" aria-expanded="false" style="height: 0px;"><th>Asistent</th><td>'+ orsasistent[idx-1] +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
		}
	}

	var terminP0 = orsterminP0.split(" ");
	console.log(terminP0)
	terminP0[0] = terminP0[0].substring(0,3)+",";
	term0 = terminP0.join(" ");
	
	var terminP1 = orsterminP1.split(" ");
	console.log(terminP1)
	terminP1[0] = terminP1[0].substring(0,3)+",";
	term1 = terminP1.join(" ");

	$("#termini2").append('<tr><th>predavanja</th><td>' + term0 + '</td><td>' + orsucilnicaP0+ '</td></tr>');
	$("#termini2").append('<tr><th>predavanja</th><td>' + term1 + '</td><td>' + orsucilnicaP1+ '</td></tr>');
	$("#termini2").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje2" class="collapsed" aria-expanded="false">Prikaži/Skrij termine vaj</a></th></tr>');

	for (i in orsV){
		var termin = orsV[i].termin.split(" ");
		console.log(termin)
		termin[0] = termin[0].substring(0,3)+",";
		term = termin.join(" ");
		$("#termini2").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje2" aria-expanded="false" style="height: 0px;"><th>'+ orsV[i].asistent+'</th><td>' + term + '</td><td>' +  orsV[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- ORS ---------- */
	
	/* ---------- PPJ ---------- */
	ppjP = predavanja.PPJ[0];
	
	ppjucilnicaP = ppjP.ucilnica;
	ppjpredavatelj = ppjP.predavatelj;
	ppjterminP = ppjP.termin;
	
	ppjV = vaje.PPJ;
	
	brezsum = ppjpredavatelj.toLowerCase(ppjpredavatelj);
	brezsum = brezsum.replace("č", "c");
	brezsum = brezsum.replace("š", "s");
	brezsum = brezsum.replace("ž", "z");
	brezsum = brezsum.replace("ć", "c");

	splitted=brezsum.split(", ");
	wbpage="http://www.fri.uni-lj.si/"+splitted[1]+"-"+splitted[0];
	
	$("#izvajalci3").append('<tr><th>Predavatelj</th><td><a href="' + wbpage + '">'+ ppjpredavatelj +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
	$("#izvajalci3").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti3" class="collapsed" aria-expanded="false">Prikaži/Skrij Asistente</a></th></tr>');
	

	ppjasistent = Array();
	var idx = 0
	for (i in ppjV){
		if(ppjasistent.indexOf(ppjV[i].asistent)<0){
			ppjasistent[idx] = ppjV[i].asistent;
			idx++;
			$("#izvajalci3").append('<tr id="as2" class="panel-collapse collapse collapseAsistenti3" aria-expanded="false" style="height: 0px;"><th>Asistent</th><td>'+ ppjasistent[idx-1] +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
		}
	}
	var terminP = ppjterminP.split(" ");
		console.log(terminP)
		terminP[0] = terminP[0].substring(0,3)+",";
		term = termin.join(" ");
	$("#termini3").append('<tr><th>predavanja</th><td>' + term + '</td><td>' + ppjucilnicaP+ '</td></tr>');
	$("#termini3").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje3" class="collapsed" aria-expanded="false">Prikaži/Skrij termine vaj</a></th></tr>');

	for (i in ppjV){
		var termin = ppjV[i].termin.split(" ");
		console.log(termin)
		termin[0] = termin[0].substring(0,3)+",";
		term = termin.join(" ");
		$("#termini3").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje3" aria-expanded="false" style="height: 0px;"><th>'+ ppjV[i].asistent+'</th><td>' + term + '</td><td>' +  ppjV[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- PPJ ---------- */

	/* ---------- TIS ---------- */
	
	tisP = predavanja.TIS[0];
	tisucilnicaP = tisP.ucilnica;
	tispredavatelj = tisP.predavatelj;
	tisterminP = tisP.termin;
	tisV = vaje.TIS;
	
	brezsum = tispredavatelj.toLowerCase(aps2predavatelj)
	brezsum = brezsum.replace("č", "c");
	brezsum = brezsum.replace("š", "s");
	brezsum = brezsum.replace("ž", "z");
	brezsum = brezsum.replace("ć", "c");

	splitted=brezsum.split(", ");
	wbpage="http://www.fri.uni-lj.si/"+splitted[1]+"-"+splitted[0];
	
	$("#izvajalci4").append('<tr><th>Predavatelj</th><td><a href="' + wbpage + '">'+ tispredavatelj +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
	$("#izvajalci4").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti4" class="collapsed" aria-expanded="false">Prikaži/Skrij Asistente</a></th></tr>');

	tisasistent = Array();
	var idx = 0
	for (i in tisV){
		if(tisasistent.indexOf(tisV[i].asistent)<0){
			tisasistent[idx] = tisV[i].asistent;
			idx++;
			$("#izvajalci4").append('<tr id="as2" class="panel-collapse collapse collapseAsistenti4" aria-expanded="false" style="height: 0px;"><th>Asistent</th><td>'+ tisasistent[idx-1] +'</td><td><td><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></td></tr>');
		}
	}
	var terminP = tisterminP.split(" ");
		console.log(terminP)
		terminP[0] = terminP[0].substring(0,3)+",";
		term = termin.join(" ");
	$("#termini4").append('<tr><th>predavanja</th><td>' + term + '</td><td>' + tisucilnicaP+ '</td></tr>');
	
	$("#termini4").append('<tr><th colspan="4"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje4" class="collapsed" aria-expanded="false">Prikaži/Skrij termine vaj</a></th></tr>');
	
	
	for (i in tisV){
		var termin = tisV[i].termin.split(" ");
		console.log(termin)
		termin[0] = termin[0].substring(0,3)+",";
		term = termin.join(" ");
		$("#termini4").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje4" aria-expanded="false" style="height: 0px;"><th>'+ tisV[i].asistent+'</th><td>' + term + '</td><td>' +  tisV[i].ucilnica + '</td></tr>' );
	}
});

$.getJSON( "data/studis.json", function( data ) {

	predmeti = data.predmeti;
	
	aps2 = predmeti.APS2;
	ors = predmeti.ORS;
	ppj = predmeti.PPJ;
	tis = predmeti.TIS;
	
	aps2Datumi = aps2.dates.split(",");
	for(i in aps2Datumi)
		$("#roki1").append('<td>'+ aps2Datumi[i] +'</td>');
	
	imeP = aps2.name;
	$("#predmet1").append(imeP);
	
	orsDatumi = ors.dates.split(",");
	for(i in orsDatumi)
		$("#roki2").append('<td>'+ orsDatumi[i] +'</td>');
	
	imeP = ors.name;
	$("#predmet2").append(imeP);
	
	ppjDatumi = ppj.dates.split(",");
	for(i in ppjDatumi)
		$("#roki3").append('<td>'+ ppjDatumi[i] +'</td>');
	
	imeP = ppj.name;
	$("#predmet3").append(imeP);
	
	tisDatumi = tis.dates.split(",");
	for(i in tisDatumi)
		$("#roki4").append('<td>'+ tisDatumi[i] +'</td>');
	
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

	$("#naloge1").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseNaloge1" class="collapsed" aria-expanded="false">Prikaži/Skrij Naloge</a></th></tr>');
	$("#naloge2").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseNaloge2" class="collapsed" aria-expanded="false">Prikaži/Skrij Naloge</a></th></tr>');
	$("#naloge3").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseNaloge3" class="collapsed" aria-expanded="false">Prikaži/Skrij Naloge</a></th></tr>');
	$("#naloge4").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseNaloge4" class="collapsed" aria-expanded="false">Prikaži/Skrij Naloge</a></th></tr>');

	var i1=0, i2=0, i3=0, i4=0;

	for (i in kvizi){
		if(kvizi[i].name == "APS2")
			i1++;
		else if(kvizi[i].name == "ORS")
			i2++;
		else if(kvizi[i].name == "PPJ")
			i3++;
		else if(kvizi[i].name == "TIS")
			i4++;
	}
	
	for (i in naloge){
		if(naloge[i].name == "APS2")
			i1++;

		else if(naloge[i].name == "ORS")
			i2++;

		else if(naloge[i].name == "PPJ")
			i3++;

		else if(naloge[i].name == "TIS")
			i4++;
	}
	
	
	
	if(i1>0)
		$("#naloge1").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge1" aria-expanded="false" style="height: 0px;"><th>Dolznost</th><th>Rok</th><th>Opravljeno</th></tr>');
	else
		$("#naloge1").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge1" aria-expanded="false" style="height: 0px;"><th colspan="3">Ni nalog ali kvizov.</th></tr>');

	if(i2>0)
		$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge2" aria-expanded="false" style="height: 0px;"><th>Dolznost</th><th>Rok</th><th>Opravljeno</th></tr>');
	else
		$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge2" aria-expanded="false" style="height: 0px;"><th colspan="3">Ni nalog ali kvizov.</th></tr>');


	if(i3>0)
		$("#naloge3").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge3" aria-expanded="false" style="height: 0px;"><th>Dolznost</th><th>Rok</th><th>Opravljeno</th></tr>');
	else
		$("#naloge3").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge3" aria-expanded="false" style="height: 0px;"><th colspan="3">Ni nalog ali kvizov.</th></tr>');

	if(i4>0)
		$("#naloge4").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge4" aria-expanded="false" style="height: 0px;"><th>Dolznost</th><th>Rok</th><th>Opravljeno</th></tr>');
	else
		$("#naloge4").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge4" aria-expanded="false" style="height: 0px;"><th colspan="3">Ni nalog ali kvizov.</th></tr>');

	
	
	
	for (i in kvizi){
		if(kvizi[i].name == "APS2"){
			$("#naloge1").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge1" aria-expanded="false" style="height: 0px;"><td>Kviz</td><td><a href=\'' + kvizi[i].link +  '\'>'+kvizi[i].rok+'</a></td><td></td></tr>');
			i1++;
		}
		else if(kvizi[i].name == "ORS"){
			$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge2" aria-expanded="false" style="height: 0px;"><td>Kviz</td><td><a href=\'' + kvizi[i].link +  '\'>'+kvizi[i].rok+'</a></td><td></td></tr>');
			i2++;
		}
		else if(kvizi[i].name == "PPJ"){
			$("#naloge3").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge3" aria-expanded="false" style="height: 0px;"><td>Kviz</td><td><a href=\'' + kvizi[i].link +  '\'>'+kvizi[i].rok+'</a></td><td></td></tr>');
			i3++;
		}
		else if(kvizi[i].name == "TIS"){
			$("#naloge4").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge4" aria-expanded="false" style="height: 0px;"><td>Kviz</td><td><a href=\'' + kvizi[i].link +  '\'>'+kvizi[i].rok+'</a></td><td></td></tr>');
			i4++;
		}
	}
	
	for (i in naloge){
		if(naloge[i].name == "APS2"){
			i1++;

			if(naloge[i].oddano=="da")
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			else
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'

			$("#naloge1").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge1" aria-expanded="false" style="height: 0px;"><td>Naloga</td><td><a href=\'' + naloge[i].link +  '\'>'+naloge[i].rok+'</a></td><td>'+s+'</td></tr>');
		}
		
		else if(naloge[i].name == "ORS"){
			i2++;

			if(naloge[i].oddano=="da")
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			else
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'

			$("#naloge2").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge2" aria-expanded="false" style="height: 0px;"><td>Naloga</td><td><a href=\'' + naloge[i].link +  '\'>'+naloge[i].rok+'</a></td><td>'+s+'</td></tr>');
		}
		
		else if(naloge[i].name == "PPJ"){
			i3++;
			if(naloge[i].oddano=="da")
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			}
			else
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'

			$("#naloge3").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge3" aria-expanded="false" style="height: 0px;"><td>Naloga</td><td><a href=\'' + naloge[i].link +  '\'>'+naloge[i].rok+'</a></td><td>'+s+'</td></tr>');
		}
		
		else if(naloge[i].name == "TIS"){
			i4++;

			if(naloge[i].oddano=="da")
				s='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
			else
				s='<span class="glyphicon glyphicon-flag" aria-hidden="true"></span>'

			$("#naloge4").append('<tr id="nal2" class="panel-collapse collapse collapseNaloge4" aria-expanded="false" style="height: 0px;"><td>Naloga</td><td><a href=\'' + naloge[i].link +  '\'>'+naloge[i].rok+'</a></td><td>'+s+'</td></tr>');
		}
	}
	
});



var socket = io.connect();

$(document).ready(function() {
	socket.on('sporocilo', function (sporocilo) {
		console.log(sporocilo);
	});
});
