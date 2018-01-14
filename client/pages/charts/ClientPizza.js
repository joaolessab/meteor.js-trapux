Template.ClientPizza.topGenresChart = function() {
    var query = Uxorders.find({}, {fields: {'project': 1}}).fetch();
    var projetos = [];
    
    // Lendo item por item da array
    $(query).each(function(){
        projetos.push($(this)[0].project);
    });

    // Função para remover duplicadas e fazer contagem
    function foo(arr) {
        var a = [], b = [], prev;
    
        arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }
    
        return [a, b];
    }

    var parcialResult = foo(projetos);
    var finalResult = [];
    
    //Criando a array multi-dimensional    
    for (j = 0; j < parcialResult[0].length; j++){
        finalResult.push([parcialResult[0][j], parcialResult[1][j]]);
    }
    

    // RETORNO DO GRÁFICO
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            height: 330,
            plotShadow: true
        },
        title: {
            text: ''
            //text: this.profile.firstName + "'s top genres"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'blue'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'genre',
            data: finalResult
        }]
    };
};