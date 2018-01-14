//LOGIN E LOGOUT
if (Meteor.isClient){
    Accounts.onLogin(function(){
        FlowRouter.go('mydash');   
    });

    Accounts.onLogout(function(){
        FlowRouter.go('home');  
    });
}
///////////////////////////////////////////

// ESTA É A HOMEPAGE DO MEU WEBSITE
FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render("SystemLayout", {main: "Homepage"});
    }
});

//PÁGINA DO MEU NOVO DASHBOARD
FlowRouter.route('/mydash', {
    name: 'mydash',
    action(){
        BlazeLayout.render("SystemLayout", {main: "MyDashboard"});
    }
});

//PÁGINA DO MEU NOVO DASHBOARD
FlowRouter.route('/testes', {
    name: 'testes',
    action(){
        BlazeLayout.render("SystemLayout", {main: "testes"});
    }
});