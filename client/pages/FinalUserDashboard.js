Template.FinalUserDashboard.helpers({
	//Cada usuário
	users: function(){
		return Meteor.users.find({_id: Meteor.userId()});
	},
	//Filtrando as últimas 5 orders
	lastOrders: function(){
		return Uxorders.find({userId: Meteor.userId()}, { sort: { createdAt: 'desc' }, limit: 5 });
	},
	//Filtrando todas as orders
	uxorder: function(){
		return Uxorders.find({userId: Meteor.userId()}, { sort: { createdAt: 'desc' }});
	},
	checkSomeUxorder: function(verify){
		var uxo = Uxorders.find({userId: Meteor.userId()}, { sort: { createdAt: 'desc' }});
		
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

Template.FinalUserDashboard.events({
	'click .add-uxo, click .add-uxo-mobile': ()=> {
		$(".panels").hide();
		$(".err-msg").hide();
		$("#createUxorders").show();
	},	
	'click .see-more-a': ()=> {
		$(".panels").hide();
		$("#seeUxorders").show();
	},	
	'click .closeBtn': ()=> {
		$(".panels").hide();
	},
	'click .eachOrder': ()=> {
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
	},
	'keyup .search-use': function(event) {
    	var valor = $(".search-use").val().toLowerCase();
    	
    	var counter = 0;
    	$("#allOrders .eachOrder").each(function() {
  			if (valor == ""){
  				$(this).css("display", "block");
  				counter = counter + 1;
  			}
  			else{
	  			var em = $(this).find("em").text().toLowerCase();
	  			var p = $(this).find("p").text().slice('9').toLowerCase();

	  			if (em.indexOf(valor) == -1 && p.indexOf(valor) == -1){
	  				$(this).css("display", "none");
	  			}
	  			else{
	  				$(this).css("display", "block");
	  				counter = counter + 1;
	  			}
			}
			//Exceção
			if (counter == 0){
				$("#notify-us").show();
			}
			else{
				$("#notify-us").hide();	
			}
		});
	}	
});