Template.ClientDonut.topGenresChart = function() {
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
        type: 'pie',
        height: 330,
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {

        text: ' '
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
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
    series: 
        [{
            name: 'Delivered amount',
            data: finalResult
        }]
    };
};