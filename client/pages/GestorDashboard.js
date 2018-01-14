Template.GestorDashboard.helpers({
	//Cada usuário
	users: function(){
		return Meteor.users.find({_id: Meteor.userId()});
	},
	lastAlocatedOrders: function(){
		return Uxorders.find({status: "pend"}, { sort: { createdAt: 'desc' }, limit: 5 });
	},
	checkAlocatedOrders: function(verify){
		var uxo = Uxorders.find({status: "pend"}, { sort: { createdAt: 'desc' }});
		
		if (uxo.fetch() == 0){
			return verify === 'nenhum';
		}
		else{
			return verify === 'tem';
		} 
	},
	lastOpenOrders: function(){
		return Uxorders.find({status: "open"}, { sort: { createdAt: 'desc' }, limit: 5 });
	},
	checkOpenOrders: function(verify){
		var uxo = Uxorders.find({status: "open"}, { sort: { createdAt: 'desc' }});
		
		if (uxo.fetch() == 0){
			return verify === 'nenhum';
		}
		else{
			return verify === 'tem';
		} 
	},
	checkSomeUxorder: function(verify){
		var uxo = Uxorders.find({}, { sort: { createdAt: 'desc' }});
		
		if (uxo.fetch() == 0){
			return verify === 'nenhum';
		}
		else{
			return verify === 'tem';
		} 
	}
});

function cleanPanelColor(){
	$(".status-div").removeClass("open-st");
	$(".status-div").removeClass("pend-st");
	$(".status-div").removeClass("conc-st");
	$(".status-div").removeClass("canc-st");
}

Template.GestorDashboard.events({
	'click .see-more-a': ()=> {
		$(".panels").hide();
		$("#seeGestorUxorders").show();
	},	
	'click .closeBtn': ()=> {
		$(".panels").hide();
	},
	'click .eachLocated, click .eachNonLocated, click .eachOrder': ()=> {
		var uxId = $(event.target).attr('id');
		if (uxId == undefined){
			uxId = $(event.target).parent().attr('id');
		}

		var query = Uxorders.find({_id: uxId}).fetch();

		$("#uxId").text("#" + uxId);
		$("#project-view").val(query[0].project);
		$("#title-view").val(query[0].title);
		$("#type-view").val(query[0].type);
		
		if (query[0].developer != ""){
			var devname = Meteor.users.find({_id: query[0].developer}).fetch();
			devname = devname[0].profile.firstName;
			$("#dev-view").val(devname);
		}
		else{
			$("#dev-view").val('');
		}
		
		$("#description-view").val(query[0].description);
		$("#relatorio-view").val(query[0].relatorio);

		//Cores do painel
		switch(query[0].status){
			case 'open':
				cleanPanelColor();
				$(".status-div").addClass("open-st");
				break;
			case 'pend':
				cleanPanelColor();
				$(".status-div").addClass("pend-st");
				break;
			case 'conc':
				cleanPanelColor();
				$(".status-div").addClass("conc-st");
				break;
			case 'canc':
				cleanPanelColor();
				$(".status-div").addClass("canc-st");
				break;
		}

		$("#project-view, #title-view, #type-view, #description-view").attr('disabled', 'disabled');
		$("#modify-edit, #limpar-edit").hide();
		$(".panels").hide();
		$("#alocated-div").hide();
		$("#editViewUxorder").show();
	}
});