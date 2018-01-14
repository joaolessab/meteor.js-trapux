Template.DevMobileNavBar.events({
	'click .devUxo': ()=> {
		$(".panels").hide();
		$("#seeDevUxorders").show();
	},
	'click #logoutBtn': () => {
		AccountsTemplates.logout();
	},
	'keyup .search-use': function(event) {
    	var valor = $(".search-use").val().toLowerCase();
    	
    	var aloc = 0;
    	$(".eachAtend").each(function() {
  			if (valor == ""){
  				$(this).css("display", "block");
  				aloc = aloc + 1;
  			}
  			else{
	  			var em = $(this).find("em").text().toLowerCase();
	  			var p = $(this).find("p").text().slice('9').toLowerCase();

	  			if (em.indexOf(valor) == -1 && p.indexOf(valor) == -1){
	  				$(this).css("display", "none");
	  			}
	  			else{
	  				$(this).css("display", "block");
	  				aloc = aloc + 1;
	  			}
			}
		});
    	if (aloc == 0){
    		$("#notify-loc").css("display", "block");	
    	}
    	else{
    		$("#notify-loc").css("display", "none");
    	}


    	var nonloc = 0;
    	$(".eachPend").each(function() {
  			if (valor == ""){
  				$(this).css("display", "block");
  				nonloc = nonloc + 1;
  			}
  			else{
	  			var em = $(this).find("em").text().toLowerCase();
	  			var p = $(this).find("p").text().slice('9').toLowerCase();

	  			if (em.indexOf(valor) == -1 && p.indexOf(valor) == -1){
	  				$(this).css("display", "none");
	  			}
	  			else{
	  				$(this).css("display", "block");
	  				nonloc = nonloc + 1;
	  			}
			}
		});
		if (nonloc == 0){
    		$("#notify-non").css("display", "block");	
    	}
    	else{
    		$("#notify-non").css("display", "none");
    	}
	}
});