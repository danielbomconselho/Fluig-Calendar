<script src="/webdesk/vcXMLRPC.js" type="text/javascript"></script>
<script src="/webdesk/vcXMLRPC-mobile.js"></script>
<div id="Calendario_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide edit  fs-lg-space" data-params="Calendario.instance({editarata: '${editarata!}',editarreporte: '${editarreporte!}',editMode: true,templatecal: '${templatecal!}'})">
	<div class="row">
		<div data-theme-system="bootstrap" class='selector col-lg-4'>
	    	Nome do Tema:
	        <select name="theme_${instanceId}" id="theme_${instanceId}" class="form-control" value="${templatecal!}">
				<option value='' selected>Default</option>
	          	<option value='cerulean'>Cerulean</option>
	          	<option value='cosmo'>Cosmo</option>
	          	<option value='cyborg'>Cyborg</option>
	          	<option value='darkly'>Darkly</option>
	          	<option value='flatly'>Flatly</option>
	          	<option value='journal'>Journal</option>
	          	<option value='litera'>Litera</option>
	          	<option value='lumen'>Lumen</option>
	          	<option value='lux'>Lux</option>
	          	<option value='materia'>Materia</option>
	          	<option value='minty'>Minty</option>
	          	<option value='pulse'>Pulse</option>
	          	<option value='sandstone'>Sandstone</option>
	          	<option value='simplex'>Simplex</option>
	          	<option value='sketchy'>Sketchy</option>
	          	<option value='slate'>Slate</option>
	          	<option value='solar'>Solar</option>
	          	<option value='spacelab'>Spacelab</option>
	          	<option value='superhero'>Superhero</option>
	          	<option value='united'>United</option>
	          	<option value='yeti'>Yeti</option>
			</select>
		</div>
	</div>				
	<div class="row">
		<div class="col-xs-10 col-lg-10 col-md-10 col-sm-10">
			<div class="form-group">
				<input type="text" class="form-control"	id="fluigGroupView_${instanceId}" name="fluigGroupView_${instanceId}" value="${editarata!}"/>
		    </div>
		</div>
		<div class="col-xs-2 col-lg-2 col-md-2 col-sm-2">
			<div class="form-group">
				<button class="btn btn-primary" data-find-fluiggroup style="width:100%;">Editar ata</button>
		    </div>
		</div>			
	</div>
	<div class="row">
		<div class="col-xs-10 col-lg-10 col-md-10 col-sm-10">
			<div class="form-group">
				<input type="text" class="form-control"	id="fluigGroupView2_${instanceId}" name="fluigGroupView2_${instanceId}" value="${editarreporte!}"/>
		    </div>
		</div>
		<div class="col-xs-2 col-lg-2 col-md-2 col-sm-2">
			<div class="form-group">
				<button class="btn btn-primary" data-find-fluiggroup style="width:100%;">Editar reporte</button>
		    </div>
		</div>			
	</div>
	<div class="row">
		<div class="col-lg-4">
			<br/>
			<button type="button" class="btn btn-success" data-saveedit>Salvar</button>
		</div>
	</div>		
</div>

