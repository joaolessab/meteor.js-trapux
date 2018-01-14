Template.DevDashboard.helpers({
	//Cada usuário
	users: function(){
		return Meteor.users.find({_id: Meteor.userId()});
	},
	lastConcOrders: function(){
		return Uxorders.find({developer: Meteor.userId(), status: "conc"}, { sort: { createdAt: 'desc' }, limit: 5 });
	},
	checkConcOrders: function(verify){
		var uxo = Uxorders.find({developer: Meteor.userId(), status: "conc"}, { sort: { createdAt: 'desc' }});
		
		if (uxo.fetch() == 0){
			return verify === 'nenhum';
		}
		else{
			return verify === 'tem';
		} 
	},
	lastPenOrders: function(){
		return Uxorders.find({developer: Meteor.userId(), status: "pend"}, { sort: { createdAt: 'desc' }, limit: 5 });
	},
	checkPenOrders: function(verify){
		var uxo = Uxorders.find({developer: Meteor.userId(), status: "pend"}, { sort: { createdAt: 'desc' }});
		
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

Template.DevDashboard.events({
	'click .see-more-a': ()=> {
		$(".panels").hide();
		$("#seeDevUxorders").show();
	},	
	'click .closeBtn': ()=> {
		$(".panels").hide();
	},
	'click .eachLocated, click .eachNonLocated, click .eachOrder, click .eachAtend, click .eachPend': ()=> {
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
		$("#modify-edit, #limpar-edit", "#concluir-edit").hide();
		$(".panels").hide();
		$("#alocated-div").hide();
		$("#editViewUxorder").show();
	}
});