var Calendario = SuperWidget.extend({
    //variáveis da widget
    calendarEl: null,
    calendar: null,
    initialLocaleCode: 'pt-br',
    themeSystem: 'bootstrap',//Simplex
    templatecal:"journal",
    dataIni: null,
    dataFim: null,
    loja: "todas",
    pessoa: "todas",
    eventos: null,
    departamento: null,
    filial: null,
    calendarioModal: null,
    modo: "edit",
    parentDocumentId:"4889",
    gTaga: null,
    gTagr: null,
    editMode: false,
    editarata: null,
    editarreporte: null,
    editorata: null,
    editorreporte: null,
    grupos: null,
    filter1: null,
    filter2: null,
    
    //método iniciado quando a widget é carregada
    init: function() {
    	this.grupos=this.buscaGrupo();
    	var _this = this;
    	this.gTaga=FLUIGC.autocomplete('#fluigGroupView_'+this.instanceId);
    	this.gTagr=FLUIGC.autocomplete('#fluigGroupView2_'+this.instanceId);

    	// remove o título da widget no slot.
		this.DOM.parents('.wcm_corpo_widget_single').siblings('.wcm_title_widget').remove();
		$(".pageTitle").parent().hide();
		if (this.isEditMode) {//Modo de edição da widget (page edit)

    	}else {//Modo visualização da widget view.ftl
    		initThemeChooser({
    			init: function(themeSystem) {
    		    	var settings1 = {
				        source: {
				            url:  '/api/public/2.0/users/listAll',
				            contentType: 'application/json',
				            root: 'content',
				            pattern: '',
				            limit: 10,
				            offset: 0,
				            patternKey: 'pattern',
				            limitkey: 'limit',
				            offsetKey: 'offset'
				        },
				        displayKey: 'fullName',
				        multiSelect: false,
				        style: {
				            autocompleteTagClass: 'tag-gray',
				            tableSelectedLineClass: 'info'
				        },
				        table: {
				            header: [
				                {
				                    'title': 'Nome',
				                    'size': 'col-xs-9',
				                    'dataorder': 'name',
				                    'standard': true
				                }
				            ],
				            renderContent: ['fullName']
				        }
				    }
				    _this.filter1 = FLUIGC.filter('#filter-user', settings1);
					_this.filter1.on('fluig.filter.item.added', function(data) {
					    //Do something
						_this.pessoa=data.target.value;
						_this.calendar.render();
						_this.calendar.refetchEvents();						
					});
					_this.filter1.on('fluig.filter.item.itemRemoved', function(data) {
					    //Do something
						_this.pessoa='todas';
						_this.calendar.render();
						_this.calendar.refetchEvents();						
					});
					
					
					var locais=_this.getDatasetFiliais();
					var settings2 = {
				        source: locais,
				        displayKey: 'FILIAL',
				        multiSelect: false,
				        style: {
				            autocompleteTagClass: 'tag-gray',
				            tableSelectedLineClass: 'info'
				        },
				        table: {
				            header: [
				                {
				                    'title': 'FILIAL',
				                    'size': 'col-xs-9',
				                    'dataorder': 'FILIAL',
				                    'standard': true
				                }
				            ],
				            renderContent: ['FILIAL']
				        }
				    }
					
				    _this.filter2 = FLUIGC.filter('#filter-filial', settings2);
					_this.filter2.on('fluig.filter.item.added', function(data) {
					    //Do something
						_this.loja=data.target.value;
						_this.calendar.render();
						_this.calendar.refetchEvents();
					});
					_this.filter2.on('fluig.filter.item.itemRemoved', function(data) {
					    //Do something
						_this.loja='todas';
						_this.calendar.render();
						_this.calendar.refetchEvents();						
					});
					
    	        	_this.calendarEl = document.getElementById('calendar');
    	        	_this.calendar = new FullCalendar.Calendar(_this.calendarEl, {
    	        		plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list', 'moment'],
    	        		themeSystem: _this.themeSystem,
    	        		customButtons: {
    	        		    filterEvent: {
    	        		    	text:"Y",
    	        		    	click: function() {
    	        		    		$("#filtros").toggle();
    	        		    	},
    	        		    	icon : "fa fa-filter"
    	        		    },
    	        		    addEvent: {
    	        		    	text: 'Novo Evento',
    	        		    	click: function() {
    	        		    		_this.openFormModal("new",null);
    	        		    	}
    	        		    }
    	        		},
    	        		header: {
    	        			left: 'prev,next today',
    	        			center: 'title',
    	        			right: 'filterEvent,addEvent,dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    	        	    },
    	        	    weekNumbers: true,
    	        	    weekNumbersWithinDays: true,
    	        	    weekNumberCalculation: 'ISO',
    	        	    showNonCurrentDates: false,
    	        	    locale: _this.initialLocaleCode,
    	        	    //firstDay: 0,
    	        	    editable: true,
    	        	    //events: eventos,
    	        	    events: function(info, successCallback, failureCallback) {
    	        	    	eventos=_this.loadDataset(info.start,info.end);
    	        	    	successCallback(eventos);
    	        	    },
    	        	    eventClick: function(info) {
    	        	    	info.jsEvent.preventDefault(); // don't let the browser navigate
    	        	    	$.ajax({
    	        				url : "/api/public/2.0/documents/getActive/"+info.event.extendedProps.documentid,
    	        				method : "GET",
    	        				async : false,
    	        				crossDomain : true,
    	        				processData : false,
    	        			  	headers : {
    	        			    	"Content-Type": "application/json",
    	        			    	"Cache-Control": "no-cache",
    	        			    	"Fluig-Token": "8d82419a-a430-47e4-8ee5-48f4350056cd"
    	        			  	},
    	        				data : "",
    	        	    	    success : function(data) {
    	        	    	        console.log("sucesso");
    	        	    	        if(data.content.publisherId==WCMAPI.userCode){
        	    	        	    	_this.openFormModal("edit",info.event);
    	        	    	        }else{
    	        	    	        	_this.openFormModal("view",info.event);
    	        	    	        }
    	        	    	    },
    	        	    	    error : function(data, errorThrown, status) {
    	        	    	        console.log("erro");
    	        	    	        _this.openFormModal("view",info.event);
    	        	    	    }
    	        	    	});
    	        	    },
    	        	    eventLimit: true,

    	        	});
    	        	_this.calendar.render();
    			} 			
    		});
	    }
		$(document).ajaxStop(function () {
			$(".fc-filterEvent-button").html('<i class="fa fa-filter"></i>');
		});
		

    },
    
    //BIND de eventos
    bindings: {
        local: {
        	'saveedit': ['click_saveEdit']
        },
        global: {
        	'closemodal': 	 ['click_closeModal'],
        	'savemodal': 	 ['click_createEvent'],
        	'editmodal': 	 ['click_editEvent'],
        	'deletemodal': 	 ['click_deleteEvent'],
        	'requiredfield': ['blur_requiredField'],
        	'find-fluiggroup': ['click_chooseGroup'],
        	'remove-usuario': ["click_removeUsuario"],
        	'remove-filial': ["click_removeFilial"]
        }
    },

    getContext: function() {
    	if (this.context !== null) {
    		this.context = $("#Calendario_" + this.instanceId);
    	}
    	return this.context;
    },
    
    loadDataset: function(dataIni,dataFim){
    	
    	dataIni=moment(dataIni).format("YYYY-MM-DD");
    	dataFim=moment(dataFim).format("YYYY-MM-DD");
    	var constraints = [];  	
    	constraints.push(DatasetFactory.createConstraint("startdate", dataIni, dataFim, ConstraintType.MUST));    		
    	
    	if(this.pessoa!="todas"){
        	constraints.push(DatasetFactory.createConstraint("name", this.pessoa, this.pessoa, ConstraintType.MUST));    		
    	}
    	
    	if(this.loja!="todas"){
    		constraints.push(DatasetFactory.createConstraint("localevent", this.loja, this.loja, ConstraintType.MUST));
    	}
    	dados = DatasetFactory.getDataset("ds_calendario", null, constraints, null);
    	
    	var campos = ['documentid','allDay','satardate','enddate','title','url','backgroundColor','borderColor','textColor','extendedProps','source'];
    	$.each(dados.values, function (key, item) {
    		this.start = [this.startdate, this.starttime].join(" ");
    		this.end = [this.enddate, this.endtime].join(" ");
    		this.start=moment(this.start, "YYYY-MM/DD HH:mm").format();
    		this.end=moment(this.end, "YYYY-MM-DD HH:mm").format();
        });
    	return dados.values;
    },
    
    toast: function(title, message, type) {
    	FLUIGC.toast({
    		title: title,
    		message: message,
    		type: type
    	});
    },
    
    openFormModal: function(config,evento) {
    	var _this = this;
    	var mtitulo="";
    	var ftl="";
    	switch(config){
    		case "edit":
    	    	var actionsObj = [{
    		        'label': 'Gravar',
    		        'bind': 'data-editmodal',
    		    },{
    		        'label': 'Excluir',
    		        'bind': 'data-deletemodal',
    		    },{
    		        'label': 'Fechar',
    		        'bind': 'data-closemodal'
    		    }];
    	    	mtitulo="Editar evento";
    	    	ftl="editarevento.ftl";
    		break;
    		case "new":
    	    	var actionsObj = [{
    		        'label': 'Salvar',
    		        'bind': 'data-savemodal',
    		    },{
    		        'label': 'Fechar',
    		        'bind': 'data-closemodal',
    		    }];
    	    	mtitulo="Novo evento";
    	    	ftl="novoevento.ftl";
        	break;
    		case "view":
    	    	var actionsObj = [
    	    	{
    		        'label': 'Fechar',
    		        'bind': 'data-closemodal',
    		    }];
    	    	mtitulo="Visualizar evento";
    	    	ftl="editarevento.ftl";
        	break;        	
    	}
    	
    	_this.calendarioModal = FLUIGC.modal({
		    title: mtitulo,
		    content: {
		        widgetCode: 'Calendario', 
		        ftl: ftl,
		        data: (evento!=null)?evento._def:""
		    },
		    id: 'modalincluir',
		    size: 'large',
		    actions: actionsObj
		}, function(err, data) {
			if (!err) {
				var settings = {
				    extraPlugins: 'liststyle,image,fluigimage,fluigvideo',
				    resize_enabled: true,
				    allowedContent: false
				}
		    				
				//monta localevent 	
		    	var $select = $('#localevent');
		    	var filiais= _this.getDatasetFiliais();
		    	//_this.initFilterFilial();

		    	$(filiais).each(function(){
		    		if(evento == null){
		    			var option = new Option(this.FILIAL, this.FILIAL);
		    		}else{
		    			if(evento._def.extendedProps.localevent == this.FILIAL){
			   	 			var option = new Option(this.FILIAL, this.FILIAL,true,true);
			   	 		}else{
			   	 			var option = new Option(this.FILIAL, this.FILIAL);
			   	 		}
		    		}
		   	 		$select.append($(option));
		   	 	});	 
				
				//monta departamento
		    	var $departamento = $('#departamento');
		    	var departamentos= _this.getDatasetDepartamentos();
				$(departamentos).each(function(){
					if(evento == null){
						var option = new Option(this.txtDpt, this.color);
					}else{
			   	 		if(evento.backgroundColor == this.color){
			   	 			var option = new Option(this.txtDpt, this.color,true,true);
			   	 		}else{
			   	 			var option = new Option(this.txtDpt, this.color);
			   	 		}						
					}
					$departamento.append($(option));
		   	 	});
			
				//editar ou visualizar evento
				if(config=="view"){
					$("#event").prop("readonly",true);
					$("#localevent").prop("disabled",true);
					$("#departamento").prop("disabled",true);
					$("#linkcalendarevent").prop("readonly",true);
					$("#startDate").prop("readonly",true);
					$("#startHour").prop("readonly",true);
					$("#endDate").prop("readonly",true);
					$("#endHour").prop("readonly",true);
				}else{

				}
				//Permissão para editar ata
				var podeeditarata=0;
				var grupoata=_this.editarata.split(",");
				$.each(_this.grupos,function(){
					if($.inArray(this.toString(), grupoata) !== -1){
						//_this.editorata = FLUIGC.richeditor('ata',settings);
						_this.editorata = FLUIGC.richeditor('ata');
						_this.editorata.setData($('#ata').val()); //setando o texto que estiver no campo conteudo-rich
						podeeditarata++;
					}
				});
				if(podeeditarata==0){
					$("#ata").hide();
					$("#atahtml").append($("#ata").val());						
				}
				//Permissão para editar reporte
				var podeeditarreporte=0;
				var gruporeporte=_this.editarreporte.split(",");
				$.each(_this.grupos,function(){
					if($.inArray(this.toString(), gruporeporte) !== -1){
						//_this.editorreporte = FLUIGC.richeditor('reporte',settings);
						_this.editorreporte = FLUIGC.richeditor('reporte');
						_this.editorreporte.setData($('#reporte').val()); //setando o texto que estiver no campo conteudo-rich
						podeeditarreporte++;
					}					
				});
				if(podeeditarreporte==0){
					$("#reporte").hide();
					$("#reportehtml").append($("#reporte").val());
										
				}
			}
		});
    },
    
    closeModal: function() {
    	this.calendarioModal.remove();	
    },
    
    createEvent: function(dados){
    	_this=this;
    	dados = {
   			documentDescription : "Evento de calendario", 
    		parentDocumentId: this.parentDocumentId, // código do formulario "pai"
    		version: 1000, //versão
			inheritSecurity: false, 
    		formData: [ // lista dos campos
    	    	{
    	    		"name": "startdate",
    	    		"value": $("#startDate").val()//moment($("#startDate").val(),"YYYY-MM-DD").format("DD/MM/YYYY")
    	    	},
    	    	{
    	    		"name": "enddate",
    	    		"value": $("#endDate").val()//moment($("#endDate").val(),"YYYY-MM-DD").format("DD/MM/YYYY")
    	    	},
    	    	{
    	    		"name": "starttime",
    	    		"value": $("#startHour").val()
    	    	},
    	    	{
    	    		"name": "endtime",
    	    		"value": $("#endHour").val()
    	    	},
    	    	{
    	    		"name": "title",
    	    		"value": $("#event").val()
    	    	},
    	    	{
    	    		"name": "url",
    	    		"value": $("#url").val()
    	    	},
    	    	{
    	    		"name": "rendering",
    	    		"value": ""
    	    	},
    	    	{
    	    		"name": "backgroundColor",
    	    		"value": $("#departamento").val()
    	    	},
    	    	{
    	    		"name": "departamento",
    	    		"value": $("#departamento").val()
    	    	},    	    	
    	    	{
    	    		"name": "borderColor",
    	    		"value": "black"
    	    	},
    	    	{
    	    		"name": "textColor",
    	    		"value": "orange"
    	    	},
    	    	{
    	    		"name": "extendedProps",
    	    		"value": ""
    	    	},
    	    	{
    	    		"name": "source",
    	    		"value": "Calendario"
    	    	},
    	    	{
    	    		"name": "ata",
    	    		"value": this.editorata==undefined?"":this.editorata.getData().replace(/(\r\n|\n|\r|\t)/gm,"") //Aqui retorna o conteudo html do campo
    	    	},
    	    	{
    	    		"name": "localevent",
    	    		"value": $("#localevent").val()
    	    	},    	    	
    	    	{
    	    		"name": "reporte",
    	    		"value": this.editorreporte==undefined?"":this.editorreporte.getData().replace(/(\r\n|\n|\r|\t)/gm,"") //Aqui retorna o conteudo html do campo
    	    	},
    	    	{
    	    		"name": "name",
    	    		"value": WCMAPI.user //Aqui retorna o conteudo html do campo
    	    	}
    	    ]
    	};

    	$.ajax({
			url : "/api/public/2.0/cards/create",//?oauth_consumer_key=minhaconsumerkey&oauth_token=f51e6f36-3b49-4195-a397-65f00522463b&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1535561368&oauth_nonce=LPi5V4sZHMS&oauth_version=1.0&oauth_signature=dBw0CpENHTrCEmn7UkpROchuCwQ=
			method : "POST",
			async : true,
			crossDomain : true,
			processData : false,
		  	headers : {
		    	"Content-Type": "application/json",
		    	"Cache-Control": "no-cache",
		    	"Fluig-Token": "8d82419a-a430-47e4-8ee5-48f4350056cd"
		  	},
			data : JSON.stringify(dados),
    	    success : function(data) {
    	        console.log("sucesso");
    	        _this.calendar.refetchEvents();
    	    },
    	    error : function(data, errorThrown, status) {
    	        console.log("erro");
    	    }
    	});
    	this.closeModal();
    	
    },

    editEvent: function(dados){
    	_this=this;
    	var versao = $("#documentVersion").val();
    	var doc = $("#documentId").val();
    	
    	dados = [
	    	{	
	    		"name": "startdate",
	    		"value": $("#startDate").val()
	    	},
	    	{
	    		"name": "enddate",
	    		"value": $("#endDate").val()
	    	},
	    	{
	    		"name": "starttime",
	    		"value": $("#startHour").val()
	    	},
	    	{
	    		"name": "endtime",
	    		"value": $("#endHour").val()
	    	},
	    	{
	    		"name": "title",
	    		"value": $("#event").val()
	    	},
	    	{
	    		"name": "url",
	    		"value": $("#url").val()
	    	},
	    	{
	    		"name": "rendering",
	    		"value": ""
	    	},
	    	{
	    		"name": "backgroundColor",
	    		"value": $("#departamento").val()
	    	},
	    	{
	    		"name": "departamento",
	    		"value": $("#departamento").val()
	    	},
	    	{
	    		"name": "borderColor",
	    		"value": "black"
	    	},
	    	{
	    		"name": "textColor",
	    		"value": "orange"
	    	},
	    	{
	    		"name": "localevent",
	    		"value": $("#localevent").val()
	    	},
	    	{
	    		"name": "extendedProps",
	    		"value": ""
	    	},
	    	{
	    		"name": "source",
	    		"value": "Calendario"
	    	},
	    	{
	    		"name": "ata",
	    		"value": this.editorata==undefined?"":this.editorata.getData().replace(/[\t\n\r]+/g,"") //Aqui retorna o conteudo html do campo
	    	},
	    	{
	    		"name": "reporte",
	    		"value": this.editorreporte==undefined?"":this.editorreporte.getData().replace(/[\t\n\r]+/g,"") //Aqui retorna o conteudo html do campo
	    	}
	    ];
    	
    	$.ajax({
			url : "/ecm/api/rest/ecm/cardView/editCard/"+doc+"/"+versao,
			method : "POST",
			async : true,
			crossDomain : true,
			processData : false,
		  	headers : {
		    	"Content-Type": "application/json",
		    	"Cache-Control": "no-cache",
		    	"Fluig-Token": "8d82419a-a430-47e4-8ee5-48f4350056cd"
		  	},
			data : JSON.stringify(dados),
    	    success : function(data) {
    	        console.log("sucesso");
    	        _this.calendar.refetchEvents();
    	    },
    	    error : function(data, errorThrown, status) {
    	        console.log("erro");
    	    }
    	});
    	this.closeModal();
    	
    },
    
    deleteEvent: function(dados){
    	_this=this;
    	FLUIGC.message.confirm({
    	    message: 'Deseja excluir este evento?',
    	    title: 'Excluir evento',
    	    labelYes: 'Excluir',
    	    labelNo: 'Cancelar'
    	}, function(result, el, ev) {
    	    if (result) {
    	    	$.ajax({
    				url : "/api/public/2.0/documents/deleteDocument/"+$("#documentId").val(),
    				method : "POST",
    				async : true,
    				crossDomain : true,
    				processData : false,
    			  	headers : {
    			    	"Content-Type": "application/json",
    			    	"Cache-Control": "no-cache",
    			    	"Fluig-Token": "8d82419a-a430-47e4-8ee5-48f4350056cd"
    			  	},
    				data : JSON.stringify(dados),
    	    	    success : function(data) {
    	    	        console.log("sucesso");
    	    	        _this.calendar.refetchEvents();
    	    	    },
    	    	    error : function(data, errorThrown, status) {
    	    	        console.log("erro");
    	    	    }
    	    	});
    	    	_this.closeModal();
    	    }
    	});
    	
    },
    
    initFilterFilial: function() {
    	var filiais = this.getDatasetFiliais();
        var settingsFilterDataset = {
            source: filiais,
            displayKey: 'FILIAL',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [{
                    'title': 'Filial',
                    'size': 'col-xs-9',
                    'dataorder': 'FILIAL',
                    'standard': true
                }],
                renderContent: ['filial']
            }
        };
       this.filial = FLUIGC.filter('#localevent', settingsFilterDataset);
    },
    
    initFilterDepartamentos: function() {
    	var departamentos = this.getDatasetDepartamentos();
    	
        var settingsFilterDataset = {
            source: departamentos,
            displayKey: 'txtDpt',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [{
                    'title': 'Departamento',
                    'size': 'col-xs-9',
                    'dataorder': 'txtDpt',
                    'standard': true
                },{
                    'title': 'color',
                    'size': 'col-xs-3',
                    'dataorder': 'color',
                }],
                renderContent: ['departamento']
            }
        };

    },
     
    getDatasetFiliais: function() {
        try {
            // Busca o dataset de filiais
    		var sortingFields = new Array("FILIAL");
            var dataset = DatasetFactory.getDataset('ds_filiais_torra_linx_reduzida', null, null, null);
            var filiais = dataset.values;
            return filiais;
        } catch(error) {
                console.error(error);
                return [];
        }
    },

    getDatasetDepartamentos: function() {
        try {
            // Busca o dataset de departamentos
    		var sortingFields = new Array("txtDpt");
            var dataset = DatasetFactory.getDataset('ds_cadastro_departamentos', null, null, sortingFields);
            var departamentos = dataset.values;
            return departamentos;
        } catch(error) {
                console.error(error);
                return [];
        }
    },
    
    requiredField: function(showMessage) {
		$("#event, #startDate, #endDate, #startHour, #endHour, #departamento, #local").each(function() {
			if ($(this).val().trim() == "")
				$(this).addClass("requiredField");	
			else 
				$(this).removeClass("requiredField");	
		}); 
    },
    getModalContext: function() {
    	if (this.modalContext !== null) {
    		this.modalContext = $("#evento-modal");
    	}
    	return this.modalContext;
    },
	chooseGroup: function (data) {
		_this=this;
		var groupAddNew = {};
		var cfg = {
			url : "/ecm_user/zoomgroup.ftl",
			width : 850,
			height : "100%",
			title : "Adicionar novo",
			customButtons : new Array("Selecionar")
		};
		groupAddNew.panel = WCMC.panel(cfg);
		groupAddNew.obj = {
			url : WCMAPI.getServerContextURL() + "/api/rest/wcm/service/user/findAllGroups",
			colNames : [ 
				"Codigo",
				"Descrição",
				"Ação" 
			],
			colModel : [ 
				{
					name : "key",
					index : "key",
					search : false,
					sortable : true
				},
				{
					name : "value",
					index : "value",
					search : false,
					sortable : false
				}, 
				{
					name : "action",
					sortable : true,
					formatter : formatterAction
				} 
			],
			jsonReader : {
				id : "key"
			},
			pager : "#ecm-usergroupzoom-paginator",
			sortable : false,
			viewrecords : true,
			sortorder : "asc",
			multiselect : true,
			autowidth : true
		};
		groupAddNew.idDivGrid = "#ecm-usergroupzoom-table";
		groupAddNew.idDivSearch = "#ecm-usergroupzoom-divSearch";
		var groupTableAdd = WCMC.datatable(groupAddNew);
		groupAddNew.panel.bind("panel-button-0",function() {
			var rows = groupTableAdd.selectedRows;
			if (rows.length === 0) {
				WCMC.messageWarn("Selecione pelo menos um grupo para adicionar");
				return
			}
			for (var y = 0; y < rows.length; y++) {
				var group = groupTableAdd.getData(rows[y]);
				if(data.innerText=="Editar ata"){
					_this.gTaga.add(group.key+',');
				}else{
					_this.gTagr.add(group.key+',');
				}
			}
			groupAddNew.panel.close();
		})		
	},	
	saveEdit: function() {
    	var args = {
    		editarata : $('#fluigGroupView_'+ this.instanceId).val(),
   			editarreporte : $('#fluigGroupView2_'+ this.instanceId).val(),
   			templatecal : $("#theme_"+ this.instanceId).val()
		};

		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({async:false}, this.instanceId, args);	
		
	    if (result) {
	        this.toast("", result.message, "success");
	    } 
	    else {
	    	this.toast("", "Não foi possível completar esta operação.", "danger");
	    }
    },
    buscaGrupo: function() {
        var userCode = WCMAPI.userCode; 
        var url      = WCMAPI.serverURL + "/api/public/wcm/group/byuser/"+WCMAPI.userCode;
        var lgrupos= "";
        WCMAPI.Read({
            type: "GET",
            url: url,
            async: false,
            data: '',
            success: function funcao(data) {
                lgrupos=data;
                console.log(data);
            },
            error: function () {
                alert("ERRO. Contate o administrador do sistema!");
            }
        });
        return lgrupos;
    },
    removeFilial: function(){
    	this.loja="todas";
    	this.filter2.removeAll();
		this.calendar.render();
		this.calendar.refetchEvents();		    	
    },
    removeUsuario: function(){
    	this.pessoa="todas";
    	this.filter1.removeAll();
		this.calendar.render();
		this.calendar.refetchEvents();
    }
    
});