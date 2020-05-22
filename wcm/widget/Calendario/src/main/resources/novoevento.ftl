<div class="fluig-style-guide">
	<ul class="nav nav-tabs clearfix" role="tablist">
	    <li class="active"><a data-toggle="tab" href="#evento">Evento</a></li>
	    <li><a data-toggle="tab" href="#divata">Ata do gerente</a></li>
	    <li><a data-toggle="tab" href="#divreporte">Reporte do gerente</a></li>
	</ul>
	<div class="tab-content">
	    <div id="evento" class="tab-pane fade in active">
			<div class="row">
				<div class="col-xs-12 col-lg-12 col-md-12 col-sm-12">
					<div class="form-group">
				        <label for="event">Descrição do evento <span class="requiredField">*</span></label>
				        <input data-requiredfield type="text" class="form-control" id="event" name="event">
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-lg-6 col-md-6 col-sm-6">
					<div class="form-group">
						<label for="localevent">Local</label>
						<div class="input-group">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-map-marker"></span>
				            </div>
							<div class="select-group">
								<select name="localevent" data-requiredfield id="localevent" class="form-control">
								</select>
							</div>						
						</div>
					</div>
				</div>			
				<div class="col-xs-6 col-lg-6 col-md-6 col-sm-6">
					<div class="form-group">
						<label for="localevent">Departamento</label>
						<div class="input-group">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-map-marker"></span>
				            </div>
							<div class="select-group">
								<select name="departamento" id="departamento" class="form-control">
								</select>
							</div>						
						</div>
					</div>
				</div>
			</div>		
			<div class="row">
				<div class="col-xs-12 col-lg-12 col-md-12 col-sm-12">
					<div class="form-group">
						<label for="linkcalendarevent">Link para chamado Facilities</label>
						<div class="input-group">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-link"></span>
				            </div>
						    <input type="text" id="linkcalendarevent" name="linkcalendarevent" class="form-control"/>
						</div>
					</div>
				</div>
			</div>		
			<div class="row">
				<div class="col-xs-6 col-lg-6 col-md-6 col-sm-6">
					<div class="form-group">
						<label for="startDate">Início <span class="requiredField">*</span></label>
						<div class="input-group double-input">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-calendar"></span>
				            </div>
						    <input data-requiredfield placeholder="Data" class="form-control" type="date" id="startDate" name="startDate" onchange="$('#endDate').prop('min',$(this).val());$('#endDate').val($(this).val());"/>
						    <input data-requiredfield placeholder="Horário" class="form-control" type="time" id="startHour" name="startHour" mask="99:99" data-validahora/>
						</div>
					</div>					
				</div>
				<div class="col-xs-6 col-lg-6 col-md-6 col-sm-6">
					<div class="form-group">
						<label for="startDate">Término <span class="requiredField">*</span></label>
						<div class="input-group double-input">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-calendar"></span>
				            </div>
						    <input data-requiredfield placeholder="Data" class="form-control" type="date" id="endDate" name="endDate" onchange="$(startDate).prop('max',$(this).val())"/>
						    <input data-requiredfield placeholder="Horário" class="form-control" type="time" id="endHour" name="endHour" mask="99:99" data-validahora />
						</div>
					</div>					
				</div>
			</div>
			<br>
			<br>
	    </div>
	    <div id="divata" class="tab-pane fade">
			<div class="row">
				<div class="col-xs-12 col-lg-12 col-md-12 col-sm-12">
					<div class="form-group">
				    	<label for="ata">Ata do evento</label>
				    	<textarea placehold="Espaços em branco contam como caractere." class="form-control" rows="6" name="ata" id="ata"></textarea>				    	
				    </div>
				</div>
			</div>
			
		</div>
						
	    <div id="divreporte" class="tab-pane fade">
			<div class="row">
				<div class="col-xs-12 col-lg-12 col-md-12 col-sm-12">
					<div class="form-group">
				    	<label for="description">Reporte Gerente</label>
				    	<textarea placehold="Espaços em branco contam como caractere." class="form-control" rows="6" name="reporte" id="reporte"></textarea>				    
				    </div>
				</div>
			</div>
		</div>
    </div>
    
	<input type="hidden" id="bgColor" name="bgcolor"/>
	<input type="hidden" id="documentId" name="documentId"/>
	<input type="hidden" id="creator" name="creator">

</div>