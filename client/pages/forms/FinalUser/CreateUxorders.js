Template.CreateUxorders.onRendered(function () {
	AutoCompletion.init("input#project");
});

Template.CreateUxorders.events({
  'keyup input#project': ()=> {
    AutoCompletion.autocomplete({
        element: 'input#project',       // DOM identifier for the element
        collection: Uxorders,              // MeteorJS collection object
        field: 'project',                    // Document field name to search for
        limit: 0,                       // Max number of elements to show
        sort: { project: 1 }});              // Sort object to filter results with
      //filter: { 'gender': 'female' }}); // Additional filtering
  },
  'click #clearUxorder': ()=> {
    $("#project").val("");
    $("#title").val("");
    $("#type").val("sel");
    $("#description").val("");
    return false;
  },
  //CRIANDO NOVA UXORDER
  'submit #formUxorder': function(event){
    var project = $("#project").val();
    var title = $("#title").val();
    var type = $("#type").val();
    var description = $("#description").val();

    
    if (project == ''){
      $("#projeto-msg").show();
    }
    
    if (title == ''){
      $("#title1-msg").show();
    }   
    
    if (title.length > 30 == true){
      $("#title2-msg").show();
    }
    
    if (type == 'sel'){
      $("#tipo-msg").show();
    }
    
    if (description.length < 10 == true){
      $("#desc-msg").show();
    }
    
    if (project != '' && title != '' && title.length > 30 == false && type != 'sel' && description.length < 10 == false){
      /* Chamando Methods do Uxorders.js */
      Meteor.call('createOrder', project, title, type, description);
      $(".panels").hide();

      /* Campos limpos */
      $("#project").val("");
      $("#title").val("");
      $("#type").val("sel");
      $("#description").val("");
      
      toastr.success('Sucesso', 'Chamado criado com sucesso!');
      /*toastr.info('toastr', 'toastr', {timeOut});
      toastr.success('toastr', 'toastr', {timeOut});
      toastr.warning('toastr', 'toastr', {timeOut});
      toastr.error('toastr', 'toastr', {timeOut});*/
      return false;
    }
    else
    {
      return false;
    }
  }
});