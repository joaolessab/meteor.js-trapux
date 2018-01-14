Uxorders = new Mongo.Collection('uxorders');

// DANDO AUTORIZAÇÃO PARA MEXER COM O UXORDERS
Uxorders.allow({
	insert: function(userId, doc){
		// Se userId existir, então você está logado, então você pode inserir um recipe
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
});

//Métodos da Collection Uxorders
Meteor.methods({
	createOrder: function(project, title, type, description){
		if(!Meteor.userId()){
			toastr.error('Erro', 'Impossível criar! Você não está logado');
			return false;
		}
		Uxorders.insert({
			project: project,
			title: title,
			type: type,
			description: description,
			developer: '',
			relatorio: '',
			status: 'open',
			createdAt: new Date(),
			userId: Meteor.userId()
		});
	},
	editOrder: function(uxId, project, title, type, description){
		Uxorders.update({
			_id: uxId
		},
		{
			$set:
				{
					project: project,
					title: title,
					type: type,
					description: description
				}
		});
	},
	cancelUxorder: function(uxId){
		Uxorders.update({
			_id: uxId
		},
		{
			$set:
				{
					status: 'canc'
				}
		});
	},
	alocateDev: function(uxId, devId){
		Uxorders.update({
			_id: uxId
		},
		{
			$set:
				{
					developer: devId,
					status: "pend"
				}
		});
	},
	concUxo: function(uxId, relatorio){
		Uxorders.update({
			_id: uxId
		},
		{
			$set:
				{
					relatorio: relatorio,
					status: "conc"
				}
		});
	}
});