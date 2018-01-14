Template.ClientStackedColumn.topGenresChart = function() {
    var query = Uxorders.find({}, {fields: {'project': 1, 'type' : 1}}).fetch();
    var projetos = [];

    // Lendo item por item da array
    $(query).each(function(){
        projetos.push($(this)[0].project);
    });

    // Limpando itens duplicados
    var finalProjetos = [];
    for (i = 0; i < projetos.length; i++){
        var teste = "";
        if (jQuery.inArray(projetos[i], finalProjetos) == -1){
            finalProjetos.push(projetos[i]);
        }
    }

    // Último tratamento
    var finalResult = [];
    var nova = 0;
    var reparo = 0;
    var manutencao = 0;

    for (j = 0; j < finalProjetos.length; j++){
        for (k = 0; k < query.length; k++){
            
            // Manipulando as variáveis
            if (finalProjetos[j] == query[k].project){
                
                if (query[k].type == "manutencao"){
                    manutencao = manutencao + 1;
                }
                else if (query[k].type == "reparo"){
                    reparo = reparo + 1;
                }
                else if (query[k].type == "nova"){
                    nova = nova + 1;
                }
            }            
        }

        // Adicionando no resultado final
        finalResult.push(
            {
                name: finalProjetos[j],
                data: [nova, reparo, manutencao]
            }
        );

        // Zerando as variáveis
        nova = 0;
        reparo = 0;
        manutencao = 0;
    }

    return {
        chart: {
            type: 'column',
            height: 500
        },
        title: {
            text: 'Separados por tipo de chamados'
        },
        xAxis: {
            categories: ['Nova Função', 'Reparos', 'Manutenção']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Número de Chamados'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'center',
            x: 30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: finalResult
    };
};