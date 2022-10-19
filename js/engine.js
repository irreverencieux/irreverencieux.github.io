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
    //console.log("Titulos: ",titulos);
    datos.forEach(dato => {
        tabla.push(dato);
    });
    //console.log("Tabla: ", tabla);
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

  var chart = new google.visualization.LineChart(document.getElementById('grafica'));

  chart.draw(data, options);
}

function procesar(){
  //document.getElementById('grafica')
  const grafica=document.getElementById('grafica');
  grafica.innerHTML="";
  
  
 //this line is to watch the result in console , you can remove it later	
  console.log("Refreshed"); 
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
        
        function previsualizarArchivo() {
            let preview = document.getElementById('origen');
            let file =   document.getElementById('archivo').files[0];//   document.querySelector('input[type=file]').files[0];
            //let file =   document.querySelector('input[type=file]').files[0];

            let reader = new FileReader();
          
            reader.addEventListener("load", () => {
              // convert image file to base64 string
              preview.value = reader.result;
              //alert(reader.result);
            }, false);
          
            if (file) {
              reader.readAsText(file);
            }
          }
function logueado(response){
       // decodeJwtResponse() is a custom function defined by you
     // to decode the credential response.
  const responsePayload = decodeJwtResponse(response.credential);
    //const dominio=responsePayload.email.split("@")[1];

            const nombre=responsePayload.given_name;
            const urlImagen=responsePayload.picture;
            const email = responsePayload.email;

    
    
    
    
    
    
  //console.log("Callback invocado...");
  //console.log(response);
  //console.log("ID: " + responsePayload.sub);
  //console.log('Nombre completo: ' + responsePayload.name);
  //console.log('Nombre: ' + responsePayload.given_name);
  //console.log('Apellidos: ' + responsePayload.family_name);
  //console.log("Image URL: " + responsePayload.picture);
  //console.log("Email: " + responsePayload.email);
  //console.log("Dominio: " + dominio);
       let g = nextIteration();
    

}
function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


///Ocultar elementos del DOM
/*
    <div id="myDIV">
      This is my DIV element.
    </div>
    var x = document.getElementById("myDIV");
    x.style.display = "block";
    x.style.display = "none";
*/

///Cargar chunks de HTML con ` Cadena larga ` (backtick)
/*

const container = document.querySelector('.container');
container.innerHTML = `

<p>This is the first paragraph we're injecting into the page</p>

<p>This is the second paragraph we're injecting into the page</p>

<p>This is the third paragraph we're injecting into the page</p>

`


*/


function nextIteration(target)
{
    let sumpC = `
             <h2>Analizador de datos RAP</h2>
            <br/>
            <form action="" method="get">
                <input id="archivo" type="file" accept=".txt, .log"/><br />
                <input type="button" name="cargarButton" value="Cargar" onclick="previsualizarArchivo()"/>
                <br/>
                <textarea
                name="origenTextBox" 
                id="origen"
                placeholder="Pega aqu&iacute; los datos de presión colectados con Putty"
                rows="20"
                style="width:100%; height:400px; vertical-align:top;"
                onload="limpiaTexto()"
                ></textarea>
                <br/>
                <input type="button" name="procesarButton" value="Procesar" onclick="procesar()"/>
            </form>
            <div id="grafica" style="width:100%; height:600px; vertical-align:top;"></div>
`;
    console.log(sumpC);
    var au = document.getElementById("Autenticacion");
    au.style.display = "none";
    
    
    var ttt = document.getElementById("Sump");//document.querySelector('.Sump');
    console.log(ttt);
    ttt.innerHTML =sumpC;
    

}
/*

<h2>Analizador de datos RAP</h2>
        <br/>
        <form action="" method="get">
            
            <input id="archivo" type="file" accept=".txt, .log"/><br />
            <input type="button" name="cargarButton" value="Cargar" onclick="previsualizarArchivo()"/>


            <br/>
            <textarea
            name="origenTextBox" 
            id="origen"
            placeholder="Pega aqu&iacute; los datos de presión colectados con Putty"
            rows="20"
            style="width:100%; height:400px; vertical-align:top;"
            onload="limpiaTexto()"
            ></textarea>
            <br/>
            <input type="button" name="procesarButton" value="Procesar" onclick="procesar()"/>
        </form>
        <div id="grafica" style="width:100%; height:600px; vertical-align:top;"></div>



*/