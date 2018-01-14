Template.LeftMenu.events({
	'click #avaliar-dev': ()=> {
		$(".panels").hide();
		$("#createRating").show();
	},
	'click #avaliar-dev-gestor': ()=> {
		$(".panels").hide();
		$("#createRating").show();
	},
	'click #ver-chamados': ()=> {
		$(".panels").hide();
		$("#seeUxorders").show();
	},
	'click #ver-chamados-gestor': ()=> {
		$(".panels").hide();
		$("#seeGestorUxorders").show();
	},
	'click #ver-chamados-dev': ()=> {
		$(".panels").hide();
		$("#seeDevUxorders").show();
	}
});

Template.LeftMenu.helpers({
	//Chama each users
	users: function(){
		return Meteor.users.find({_id: Meteor.userId()});
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