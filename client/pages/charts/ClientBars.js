Template.ClientBars.topGenresChart = function() {
    var query = Uxorders.find({}, {fields: {'project': 1, 'type' : 1}}).fetch();

    var nova = 0;
    var reparo = 0;
    var manutencao = 0;
    
    // Lendo item por item da array
    $(query).each(function(){
        if ($(this)[0].type == "manutencao"){
            manutencao = manutencao + 1;
        }
        else if($(this)[0].type == "nova"){
            nova = nova + 1;
        }
        else if($(this)[0].type == "reparo"){
            reparo = reparo + 1;
        }
    });

    return {
        chart: {
            renderTo: 'container',
            type: 'column',
            height: 420,
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 20,
                viewDistance: 25
            }
        },
        colors: [
            '#001f3f',
            '#0074D9',        
            '#FF4136',
            '#7FDBFF',
            '#39CCCC',
            '#3D9970',
            '#2ECC40',
            '#01FF70',
            '#FF851B',        
            '#FFDC00',        
            '#85144b',
            '#F012BE',
            '#B10DC9',
            '#111111',
            '#AAAAAA',
            '#DDDDDD'
        ],
        title: {
            text: ''
        },
        subtitle: {
            text: 'Chamados separados por tipo'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        series: [
            {
                name: 'Novo Chamado',
                data: [nova]
            },
            {
                name: 'Reparo',
                data: [reparo]
            },
            {
                name: 'Manutenção',
                data: [manutencao]
            }
        ]
    };
};