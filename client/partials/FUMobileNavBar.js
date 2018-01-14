Template.FUMobileNavBar.events({
	'click #avaliar-dev-mobile': ()=> {
		$(".panels").hide();
		$("#createRating").show();
	},
	'click #ver-chamados-mobile': ()=> {
		$(".panels").hide();
		$("#seeUxorders").show();
	},
	'click #logoutBtn': () => {
		AccountsTemplates.logout();
	},
	'keyup .search-use': function(event) {
    	var valor = $(".search-use").val().toLowerCase();
    	
    	$(".eachOrder").each(function() {
  			if (valor == ""){
  				$(this).css("display", "block");
  			}
  			else{
	  			var em = $(this).find("em").text().toLowerCase();
	  			var p = $(this).find("p").text().slice('9').toLowerCase();

	  			if (em.indexOf(valor) == -1 && p.indexOf(valor) == -1){
	  				$(this).css("display", "none");
	  			}
	  			else{
	  				$(this).css("display", "block");
	  			}
			}
		});
	}
});