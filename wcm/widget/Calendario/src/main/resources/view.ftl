<script src="/webdesk/vcXMLRPC.js" type="text/javascript"></script>
<script src="/webdesk/vcXMLRPC-mobile.js"></script>
<div id="Calendario_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="Calendario.instance({editarata: '${editarata!}',editarreporte: '${editarreporte!}',editMode: true,templatecal: '${templatecal!}'})">
	<div class='left' style="display:none;">
		<div id='theme-system-selector' class='selector'>
        	Theme System:
	        <select>
	          	<option value='bootstrap' selected>Bootstrap 4</option>
	        </select>
      	</div>
      	<div data-theme-system="bootstrap" class='selector'>
        	Theme Name:
        	<select value="${templatecal!}">
          		<option value='journal' selected>Journal</option>
        	</select>
      	</div>
      	<span id='loading' style='display:none'>loading theme...</span>
	</div>
	<div class="row justify-content-end" id="filtros" style="display:none;">
		<div class="col-3">
			<label for="filter-filial">Filial</label>
			<div class="input-group">
				<input id="filter-filial" type="text" name="filter-filial" class="form-control" style="width: 100%;"> <!--The input text element, to be transformed in a filter.-->
			</div>		
		</div>
		<div class="col-3">
			<label for="filter-user">Usúario</label>
			<div class="input-group">
				<input id="filter-user" type="text" name="filter-user" class="form-control" style="width: 100%;"> <!--The input text element, to be transformed in a filter.-->
			</div>
		</div>
	</div>
	<div id='calendar'>
	</div>
</div>
