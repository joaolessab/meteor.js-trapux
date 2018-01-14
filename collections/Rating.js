Rating = new Mongo.Collection('rating');

// DANDO AUTORIZAÇÃO PARA MEXER COM O UXORDERS
Rating.allow({
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
	createRating: function(developerId, devname, clientId, agilidade, eficacia, qualidade){
		if(!Meteor.userId()){
			toastr.error('Erro', 'Impossível criar! Você não está logado');
			return false;
		}
		else{
			Rating.insert({
				developer: developerId,					
				devname: devname,	
				client: clientId,
				agilidade: agilidade,
				eficacia: eficacia,
				qualidade: qualidade,
				createdAt: new Date()
			});
		}
	},
	updateRating: function(developerId, devname, clientId, agilidade, eficacia, qualidade){
		if(!Meteor.userId()){
			toastr.error('Erro', 'Impossível atualizar! Você não está logado');
			return false;
		}
		else{
			Rating.update(
				{
					developer: developerId,
					client: clientId
				},
				{
					$set:
					{
						agilidade: agilidade,
						eficacia: eficacia,
						qualidade: qualidade
					}
				}
			);
		}
	}
});