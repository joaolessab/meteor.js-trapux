Meteor.methods({
	toggleAdmin(id) {
		//Agora o id vai mudar
		if(Roles.userIsInRole(id, 'admin')){
			Roles.removeUsersFromRoles(id, 'admin');
		}
		else{
			Roles.addUsersToRoles(id, 'admin');
		}
	},
	teste(){
		//Esse console é o console do servidor
		console.log('teste');
	}
})