Template.CreateRating.helpers({
  devs: function(){
    return Meteor.users.find({"profile.profession": "adesenvolvedor"});
  },
  topranking: function(){
   
    var ranking = [];
    var query = Rating.find({}).fetch();

    for (j = 0; j < query.length; j++){
      var media = (query[j].agilidade * 3) + (query[j].eficacia * 5) + (query[j].qualidade * 8);
       
      ranking.push({"nome": query[j].devname, "pont": media, "developerId": query[j].developer});
    }

    //FUNÇÃO ZICA PARA ISOLAR OS DUPLICADOS
    //meteor add ramda:ramda@=0.17.1
    var unificate = R.compose(
      R.values(),
      R.mapObj(R.reduce(function(a,b) {return {'nome': b.nome, 'developerId': b.developerId, 'pont':a.pont+b.pont}}, {pont:0})),
      R.groupBy(R.prop('developerId'))
    );

    var ranking = unificate(ranking);


    //Organizando pontuação em ordem crescente
    ranking = ranking.sort(function(a, b) { 
                return a.pont - b.pont;
              })

    //Revertendo a array
    ranking = ranking.reverse();
    
    //Cortando array com os 3 melhores
    ranking = ranking.slice(0, 3);
    ranking[0].medal = "gold";
    ranking[1].medal = "silver";
    ranking[2].medal = "bronze";

    return ranking;
  },
  checkGold: function(a){
    return a === 'gold';
  },
  checkSilver: function(a){
    return a === 'silver';
  },
  checkBronze: function(a){
    return a === 'bronze';
  }
});

//Limpando classes do like
function cleanStar(){
  $("#s1, #s2, #s3, #s4, #s5").removeClass("star-gray");
  $("#s1, #s2, #s3, #s4, #s5").removeClass("star");
}
//Limpando classes do relógio
 function cleanClock(){
  $("#c1, #c2, #c3, #c4, #c5").removeClass("clock-gray");
  $("#c1, #c2, #c3, #c4, #c5").removeClass("clock");
}
//Limpando classes do like
function cleanLike(){
  $("#l1, #l2, #l3, #l4, #l5").removeClass("like-gray");
  $("#l1, #l2, #l3, #l4, #l5").removeClass("like");
}


////////////////////////////////////////////////////////////////////////////
/* Métodos Javascript puro */
/* Checando a relação */
function checkRelation(developerId){
  if (developerId == "sel"){
    return false;
  }
  var query = Rating.find({"developer": developerId, "client": Meteor.userId()}).count();
  return (query == 1) ? "update" : "insert";
}

/* Fazendo inserção ou upload no banco de acordo com a relação */
function goRating(relation, developerId, devname, clientId, agilidade, eficacia, qualidade){
  if (relation == "insert"){
    Meteor.call('createRating', developerId, devname, Meteor.userId(), agilidade, eficacia, qualidade);
  }
  else{
    Meteor.call('updateRating', developerId, devname, Meteor.userId(), agilidade, eficacia, qualidade);
  }        
}


function transformClock(indice){
  var indReal;
  if (indice != "none"){
    cleanClock();
    //Modificando as classes do relógio
    switch(indice){
      case "c1":
        $("#c1").addClass("clock");
        $("#c2, #c3, #c4, #c5").addClass("clock-gray");
        indReal = 1;        
        break;

      case "c2":
        $("#c1, #c2").addClass("clock");
        $("#c3, #c4, #c5").addClass("clock-gray");
        indReal = 2;
        break;

      case "c3":
        $("#c1, #c2, #c3").addClass("clock");
        $("#c4, #c5").addClass("clock-gray");
        indReal = 3;
        break;

      case "c4":
        $("#c1, #c2, #c3, #c4").addClass("clock");
        $("#c5").addClass("clock-gray");
        indReal = 4;
        break;

      case "c5":        
        $("#c1, #c2, #c3, #c4, #c5").addClass("clock");
        indReal = 5;
        break;
    }
  }
  else{
    var numero = 0;
    var clocks = [];

    clocks.push($("#c1").attr('class'));
    clocks.push($("#c2").attr('class'));
    clocks.push($("#c3").attr('class'));
    clocks.push($("#c4").attr('class'));
    clocks.push($("#c5").attr('class'));

    for (i = 0; i < clocks.length; i++){
      if (clocks[i] == "clock"){numero = numero + 1;}
    }
    indReal = numero;
  }
  return indReal;
}

function transformLike(indice){
  var indReal;
  if (indice != "none"){
    cleanLike();
    //Modificando as classes do like
    switch(indice){
      case "l1":
        $("#l1").addClass("like");
        $("#l2, #l3, #l4, #l5").addClass("like-gray");
        indReal = 1;        
        break;

      case "l2":
        $("#l1, #l2").addClass("like");
        $("#l3, #l4, #l5").addClass("like-gray");
        indReal = 2;
        break;

      case "l3":
        $("#l1, #l2, #l3").addClass("like");
        $("#l4, #l5").addClass("like-gray");
        indReal = 3;
        break;

      case "l4":
        $("#l1, #l2, #l3, #l4").addClass("like");
        $("#l5").addClass("like-gray");
        indReal = 4;
        break;

      case "l5":
        $("#l1, #l2, #l3, #l4, #l5").addClass("like");
        indReal = 5;
        break;
    }
  }
  else{
    var numero = 0;
    var likes = [];

    likes.push($("#l1").attr('class'));
    likes.push($("#l2").attr('class'));
    likes.push($("#l3").attr('class'));
    likes.push($("#l4").attr('class'));
    likes.push($("#l5").attr('class'));

    for (i = 0; i < likes.length; i++){
      if (likes[i] == "like"){numero = numero + 1;}
    }
    indReal = numero;
  }
  return indReal;
}

function transformStar(indice){
  var indReal;
  if (indice != "none"){
    cleanStar();
    //Modificando as classes do star
    switch(indice){
      case "s1":
        $("#s1").addClass("star");
        $("#s2, #s3, #s4, #s5").addClass("star-gray");
        indReal = 1;        
        break;

      case "s2":
        $("#s1, #s2").addClass("star");
        $("#s3, #s4, #s5").addClass("star-gray");
        indReal = 2;
        break;

      case "s3":
        $("#s1, #s2, #s3").addClass("star");
        $("#s4, #s5").addClass("star-gray");
        indReal = 3;
        break;

      case "s4":
        $("#s1, #s2, #s3, #s4").addClass("star");
        $("#s5").addClass("star-gray");
        indReal = 4;
        break;

      case "s5":
        $("#s1, #s2, #s3, #s4, #s5").addClass("star");
        indReal = 5;
        break;
    }
  }
  else{
    var numero = 0;
    var stars = [];

    stars.push($("#s1").attr('class'));
    stars.push($("#s2").attr('class'));
    stars.push($("#s3").attr('class'));
    stars.push($("#s4").attr('class'));
    stars.push($("#s5").attr('class'));

    for (i = 0; i < stars.length; i++){
      if (stars[i] == "star"){numero = numero + 1;}
    }
    indReal = numero;
  }
  return indReal;
}

//////////////////////////////////////////////////////////////////////////
Template.CreateRating.events({
  'click .go-clocks button' : function(event){
    //Developer id
    var developerId = $("#devs").val();
    var relation = checkRelation(developerId);    

    if (relation == false){
      toastr.error('Erro', 'Selecione o nome do Desenvolvedor');
      return false;
    }

    else{
      //Botão capturado
      var selected = $(event.target).attr('id');      
      var devname = $("#devs option:selected").text();

      var clock = transformClock(selected);
      var like = transformLike("none");
      var star =  transformStar("none");

      var teste = "";
      goRating(relation, developerId, devname, Meteor.userId(), clock, like, star);
    }
  },
  'click .go-likes button' : function(event){
    //Developer id
    var developerId = $("#devs").val();
    var relation = checkRelation(developerId);    

    if (relation == false){
      toastr.error('Erro', 'Selecione o nome do Desenvolvedor');
      return false;
    }

    else{
      //Botão capturado
      var selected = $(event.target).attr('id');
      var devname = $("#devs option:selected").text();

      var clock = transformClock("none");
      var like = transformLike(selected);
      var star =  transformStar("none");

      var teste = "";
      goRating(relation, developerId, devname, Meteor.userId(), clock, like, star);
    }
  },
  'click .go-stars button' : function(event){
    //Developer id
    var developerId = $("#devs").val();
    var relation = checkRelation(developerId);    

    if (relation == false){
      toastr.error('Erro', 'Selecione o nome do Desenvolvedor');
      return false;
    }

    else{
      //Botão capturado
      var selected = $(event.target).attr('id'); 
      var devname = $("#devs option:selected").text();

      var clock = transformClock("none");
      var like = transformLike("none");
      var star =  transformStar(selected);

      var teste = "";
      goRating(relation, developerId, devname, Meteor.userId(), clock, like, star);
    }
  },
  //Limpando ou preenchendo as classes dos botões
  'change #devs': function(event){
    //Limpar tudo
    function cleanAll(){
      $("#c1, #c2, #c3, #c4, #c5").removeClass("clock");
      $("#l1, #l2, #l3, #l4, #l5").removeClass("like");
      $("#s1, #s2, #s3, #s4, #s5").removeClass("star");

      $("#c1, #c2, #c3, #c4, #c5").addClass("clock-gray");
      $("#l1, #l2, #l3, #l4, #l5").addClass("like-gray");
      $("#s1, #s2, #s3, #s4, #s5").addClass("star-gray");
    }

    var devId = $(event.target).val();
    var counter = Rating.find({"developer": devId, "client": Meteor.userId()}).count();
    
    if (devId == "sel" || counter == 0){
      cleanAll();
    }
    else{
      var look = Rating.find({"developer": devId, "client": Meteor.userId()}).fetch();
      
      var agilidade = look[0].agilidade;
      var eficacia = look[0].eficacia;
      var qualidade = look[0].qualidade;

      for (i = 0; i < 5; i++){
        
        cleanClock();
        cleanLike();
        cleanStar();

        //Agilidade
        switch(agilidade){
          case 1:
            $("#c1").addClass("clock");
            $("#c2, #c3, #c4, #c5").addClass("clock-gray");
            break;
          case 2:
            $("#c1, #c2").addClass("clock");
            $("#c3, #c4, #c5").addClass("clock-gray");
            break;
          case 3:
            $("#c1, #c2, #c3").addClass("clock");
            $("#c4, #c5").addClass("clock-gray");
            break;
          case 4:
            $("#c1, #c2, #c3, #c4").addClass("clock");
            $("#c5").addClass("clock-gray");
            break;
          case 5:
            $("#c1, #c2, #c3, #c4, #c5").addClass("clock");
            break;
        }
        //Eficacia
        switch(eficacia){
          case 1:
            $("#l1").addClass("like");
            $("#l2, #l3, #l4, #l5").addClass("like-gray");
            break;
          case 2:
            $("#l1, #l2").addClass("like");
            $("#l3, #l4, #l5").addClass("like-gray");
            break;
          case 3:
            $("#l1, #l2, #l3").addClass("like");
            $("#l4, #l5").addClass("like-gray");
            break;
          case 4:
            $("#l1, #l2, #l3, #l4").addClass("like");
            $("#l5").addClass("like-gray");
            break;
          case 5:
            $("#l1, #l2, #l3, #l4, #l5").addClass("like");
            break;
        }
        //Qualidade
        switch(qualidade){
          case 1:
            $("#s1").addClass("star");
            $("#s2, #s3, #s4, #s5").addClass("star-gray");
            break;
          case 2:
            $("#s1, #s2").addClass("star");
            $("#s3, #s4, #s5").addClass("star-gray");
            break;
          case 3:
            $("#s1, #s2, #s3").addClass("star");
            $("#s4, #s5").addClass("star-gray");
            break;
          case 4:
            $("#s1, #s2, #s3, #s4").addClass("star");
            $("#s5").addClass("star-gray");
            break;
          case 5:
            $("#s1, #s2, #s3, #s4, #s5").addClass("star");
            break;
        }
      }
    }
  }
});