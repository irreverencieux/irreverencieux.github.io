google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);

function drawChart(datos) {
//   var data = google.visualization.arrayToDataTable([
//     ['Year', 'Sales', 'Expenses'],
//     ['2004',  1000,      400],
//     ['2005',  1170,      460],
//     ['2006',  660,       1120],
//     ['2007',  1030,      540]
//   ]);

    var titulos= ['Fecha y hora', 'Presion'];
    var tabla = [];
    tabla.push(titulos);
    console.log("Titulos: ",titulos);
    datos.forEach(dato => {
        tabla.push(dato);
    });
    console.log("Tabla: ", tabla);
    var data = google.visualization.arrayToDataTable(tabla);

  var options = {
    title: 'Analisis de presion',
    curveType: 'function',
    hAxis: { 
               format: 'dd/MM/yy',
               slantedText: true,
               slantedTextAngle: 90
            },
    vAxis:  {
                baseline: 0,
                baselineColor: 'red',
                maxValue:10,
                minValue:-10
                //gridlines: {interval: [1,2,8]}

            },
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}

function procesar(){
    let texto = document.getElementById('origen').value;
    if (texto === undefined || texto === null) {
        //console.log("Error: Se intenta procesar una pagina cargada parcialmente o un control incorrecto (textarea:'origen')");
        return;
      } 
       var renglones=texto.split(/\r?\n/);
       var muestras = [];
       //console.log(renglones.log);
       renglones.forEach(renglon => {
        //console.log("Renglon: " +renglones.indexOf(renglon).toString());
        //console.log(renglon);
        if(esMuestra(renglon)){
            muestras.push(leeMuestra(renglon));
        }
       });
       drawChart(muestras);
       //console.log(muestras);      
}
function limpiaTexto()
{
    let textarea = document.getElementById('origen');
    textarea.value="";
}
function leeMuestra(linea){
            var campos;
            var fechayhora;
            var presion;
            campos = linea.split("     ");
            fechayhora = new Date(campos[0]);
            if(fechayhora===undefined || fechayhora===null || fechayhora===NaN){
                return ["Formato de fecha incorrecto","0.0"];
            }
            presion = parseFloat(campos[1].replace("+", ""));
            return [fechayhora, presion];
        }

function esMuestra(linea){
            //console.log("longitud de linea: ",linea.length);
            if (linea.length == 34){
                if ((linea[0] == '0' || linea[1] == '1')
                        && (linea[2] == '/' && linea[11] == ':' && linea[24] == '.')){
                            return true;
                    }else   return false;
                }
        }
        
        function previsualizaArchivo() {
            const preview = document.querySelector('origen');
            const file = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();
          
            reader.addEventListener("load", () => {
              // convert image file to base64 string
              preview.value = reader.result;
            }, false);
          
            if (file) {
              reader.readAsDataURL(file);
            }
          }