Template.SeeGestorUxorders.helpers({
	//Filtrando todas as orders
	uxorder: function(){
		return Uxorders.find({}, { sort: { createdAt: 'desc' }});
	},
	//Filtrando as últimas 5 orders
	lastOrders: function(){
		return Uxorders.find({userId: Meteor.userId()}, { sort: { createdAt: 'desc' }, limit: 5 });
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

Template.SeeGestorUxorders.events({
	'click .closeBtn': ()=> {
		$(".panels").hide();
	},
	'change .filsel': function(event){
		var status = $(event.target).val();
		//Trocando cor
		switch(status){
			case 'none':
				$(".filsel").css('background-color', '#4F84FA');
				break;
			case 'open':
				$(".filsel").css('background-color', '#6abf56');
				break;
			case 'pend':
				$(".filsel").css('background-color', '#ce4545');
				break;
			case 'conc':
				$(".filsel").css('background-color', '#0E1935');
				break;
			case 'canc':
				$(".filsel").css('background-color', '#76777b');
				break;
		}

		var counter = 0;
		//Verificando cada order
		$("#allOrders .eachOrder").each(function() {
			if (status != "none"){
				if ($(this).children().hasClass('uxo-all-' + status) == true){
					$(this).show();
					counter = counter + 1;
				}
				else{
					$(this).hide();
				}
			}
			else{
				$(this).show();
				counter = counter + 1;
			}
		});
		//Exceção
		if (counter == 0){
			$("#ux-not-found").show();
		}
		else{
			$("#ux-not-found").hide();	
		}
	},
	'keyup .search-use-full': function(event) {
    	var valor = $(".search-use-full").val().toLowerCase();
    	
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
				$("#ux-not-found").show();
			}
			else{
				$("#ux-not-found").hide();	
			}
		});
	}
});