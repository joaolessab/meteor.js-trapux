Template.EditViewUxorder.helpers({
	users: function(){
		return Meteor.users.find({_id: Meteor.userId()});
	},
	alocated: function(){
		return Meteor.users.find({"profile.profession": "adesenvolvedor"});
	},
	checkCliente: function(a){
		return a === 'cliente';
	},
	checkGestor: function(a){
		return a === 'gestor';
	},
	checkDev: function(a){
		return a === 'adesenvolvedor';
	}
});

Template.EditViewUxorder.events({
	'keyup input#project-view': ()=> {
    	AutoCompletion.autocomplete({
        element: 'input#project',       // DOM identifier for the element
        collection: Uxorders,              // MeteorJS collection object
        field: 'project',                    // Document field name to search for
        limit: 0,                       // Max number of elements to show
        sort: { project: 1 }});              // Sort object to filter results with
    },
	'click .cancelux': ()=> {	
		var uxId = $("#uxId").text().substring(1);
		var query = Uxorders.find({_id: uxId}).fetch();

		switch(query[0].status){
			case 'open':
				toastr.success('Sucesso', 'O chamado foi cancelado!');
				Meteor.call('cancelUxorder', uxId);
      			$(".panels").hide();
				break;
			case 'pend':
				toastr.warning('O chamado já está sendo processado. Impossível cancelar!');
				break;
			case 'conc':
				toastr.warning('O chamado já está concluído. Impossível cancelar!');
				break;
			case 'canc':
				toastr.warning('O chamado já está cancelado!');
				break;
		}
	},
	'click .editux': ()=> {
		var uxId = $("#uxId").text().substring(1);
		var query = Uxorders.find({_id: uxId}).fetch();

		switch(query[0].status){
			case 'open':
				$("#project-view, #title-view, #type-view, #description-view").removeAttr('disabled');
				$("#modify-edit, #limpar-edit").show();
				break;
			case 'pend':
				toastr.warning('Impossível editar! O chamado já está sendo processado.');
				break;
			case 'conc':
				toastr.warning('Impossível editar! O chamado já está concluído.');
				break;
			case 'canc':
				toastr.warning('Impossível editar! O chamado já está cancelado!');
				break;
		}
	},
	'click .alocux': ()=> {
		var uxId = $("#uxId").text().substring(1);
		var query = Uxorders.find({_id: uxId}).fetch();

		switch(query[0].status){
			case 'open':
			case 'pend':
				$("#alocated-div").show();
				break;
			case 'conc':
				toastr.warning('O chamado já está concluído!');
				break;
			case 'canc':
				toastr.warning('O chamado já está cancelado!');
				break;
		}
	},
	'click .rigux': ()=> {		
		var uxId = $("#uxId").text().substring(1);
		var devId = $("#dev-select").val();

		if (devId == "..."){
			toastr.error('Erro', 'Selecione o desenvolvedor');
		}
		else{
			Meteor.call('alocateDev', uxId, devId);

	      	toastr.success('Sucesso', 'Desenvolvedor Alocado!');
	      	$("#alocated-div").hide();
	      	$(".panels").hide();
      	}
	},
	'click .concux': ()=> {
		var uxId = $("#uxId").text().substring(1);
		var query = Uxorders.find({_id: uxId}).fetch();

		switch(query[0].status){
			case 'pend':
				$("#concluir-edit").show();
				
				$('html, body').animate({
    				scrollTop: $("#relatorio-view").offset().top - 50
				});

				$("#relatorio-view").removeAttr('disabled');
				$("#relatorio-view").focus();
				break;
			case 'conc':
				toastr.warning('O chamado já está concluído!');
				break;
			case 'canc':
				toastr.warning('O chamado já está cancelado!');
				break;
		}
	},
	'click #concluir-edit': ()=> {
		var uxId = $("#uxId").text().substring(1);
		var relatorio = $("#relatorio-view-select").val();

		if (relatorio == ""){
			toastr.error('Erro', 'Insira seu relatório');
		}
		else{
			Meteor.call('concUxo', uxId, relatorio);
			toastr.success('Sucesso', 'Chamado concluído!');
	    	$(".panels").hide();

	    	$('html, body').animate({
    			scrollTop: 0
			});
      	}
	},
	'click #limpar-edit': ()=> {
		$("#project-view, #title-view, #description-view").val('');
	},
	'submit #formEditUxorder': ()=> {
		var uxId = $("#uxId").text().substring(1);

		var project = $("#project-view").val();
    	var title = $("#title-view").val();
    	var type = $("#type-view").val();
    	var description = $("#description-view").val();

    	if (project == ''){
      		toastr.error('Erro', 'Escolha o nome do projeto');
      		return false;
    	}
	    else if (title == ''){
	    	toastr.error('Erro', 'Título da Requisição não pode estar em branco');
	    	return false;
	    }   
	    else if (title.length > 30 == true){
	    	toastr.error('Erro', 'Título da Requisição muito longo');
	    	return false;
	    }
	    else if (type == 'sel'){
	    	toastr.error('Erro', 'Selecione um valor para o tipo');
	    	return false;
	    }
	    else if (description.length < 10 == true){
	    	toastr.error('Erro', 'Descrição não pode conter menos de 10 caracteres');
	    	return false;
	    }
    	else{
      		Meteor.call('editOrder', uxId, project, title, type, description);
      		$(".panels").hide();      
      		toastr.success('Sucesso', 'Chamado editado com sucesso!');
      		return false;
    	}
	}
});