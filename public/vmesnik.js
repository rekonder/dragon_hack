$.getJSON( "data/urnik.json", function( data ) {
	console.log(data); 
	
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
	
	$("#izvajalci1").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti1" class="collapsed" aria-expanded="false">Prikazi/Skrij Asistente</a></th></tr>');
	
	
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
	$("#termini1").append('<tr><th>predavanja</th><td>' + aps2terminP + '</td><td>' + aps2ucilnicaP+ '</td></tr>')
	
	$("#termini1").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje1" class="collapsed" aria-expanded="false">Prikazi/Skrij vaje</a></th></tr>');
	
	
	for (i in aps2V){
		$("#termini1").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje1" aria-expanded="false" style="height: 0px;"><th>'+ aps2V[i].asistent+'</th><td>' + aps2V[i].termin + '</td><td>' +  aps2V[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- APS2 ---------- */
	
	
	
	
	orsP = predavanja.ORS;
	orsP0 = orsP[0];
	orsP1 = orsP[1];
	
	
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
	
	$("#izvajalci3").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseAsistenti3" class="collapsed" aria-expanded="false">Prikazi/Skrij Asistente</a></th></tr>');
	
	
	
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
	$("#termini3").append('<tr><th>predavanja</th><td>' + ppjterminP + '</td><td>' + ppjucilnicaP+ '</td></tr>')
	
	$("#termini3").append('<tr><th colspan="3"><a data-toggle="collapse" data-parent="#accordion" href=".collapseVaje3" class="collapsed" aria-expanded="false">Prikazi/Skrij vaje</a></th></tr>');
	
	
	for (i in ppjV){
		$("#termini3").append('<tr id="vaje2" class="panel-collapse collapse collapseVaje3" aria-expanded="false" style="height: 0px;"><th>'+ ppjV[i].asistent+'</th><td>' + ppjV[i].termin + '</td><td>' +  ppjV[i].ucilnica + '</td></tr>' );
	}
	
	/* ---------- PPJ ---------- */
	
	
	
	
	
	
	
	
	
	
	
	tisP = predavanja.TIS[0];
	
	
	
	/*
	console.log(aps2P);
	//console.log(orsP);
	console.log(orsP0);
	console.log(orsP1);
	console.log(ppjP);
	console.log(tisP);
	*/
	
	
	
	
	
	
});
