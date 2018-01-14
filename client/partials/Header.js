Template.Header.events({
	'click #logonBtn': ()=> {
		$("#login-form").show();
		$("#homeDiv").hide();
		$(".topMenus").removeClass('actived');
		$("#logonBtn").addClass('actived');
	},

	'click #homeBtn': ()=> {
		$("#login-form").hide();
		$("#homeDiv").show();
		$(".topMenus").removeClass('actived');
		$("#homeBtn").addClass('actived');
	},

	'click #mydashBtn': ()=> {
		$(".topMenus").removeClass('actived');
		$("#mydashBtn").addClass('actived');
	}
});