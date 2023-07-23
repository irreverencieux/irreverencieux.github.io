
```javascript
// Cargar el módulo de Google Sheets API
const {google} = require('googleapis');

// Cargar el módulo de bcrypt para cifrar las contraseñas
const bcrypt = require('bcrypt');

// Cargar el módulo de express para crear el servidor web
const express = require('express');

// Crear una instancia de express
const app = express();

// Usar el middleware de body-parser para parsear los datos del formulario
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Usar el middleware de express-session para manejar las sesiones de usuario
const session = require('express-session');
app.use(session({
  secret: 'secret', // cambiar por una clave secreta propia
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 3600000} // una hora de duración
}));

// Usar el middleware de express-static para servir los archivos estáticos
app.use(express.static('public'));

// Crear una variable global para almacenar la hoja de cálculo de Google
let sheet;

// Autenticarse con la API de Google usando el token proporcionado
const auth = new google.auth.GoogleAuth({
  keyFile: 'token.json', // cambiar por el nombre del archivo del token
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// Obtener el cliente autenticado
auth.getClient().then(client => {
  // Crear una instancia de la API de Google Sheets
  const sheets = google.sheets({version: 'v4', auth: client});

  // Obtener la hoja de cálculo de Google por su ID
  sheets.spreadsheets.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms' // cambiar por el ID de la hoja de cálculo
  }).then(response => {
    // Asignar la hoja de cálculo a la variable global
    sheet = response.data.sheets[0];
    // Iniciar el servidor web en el puerto 3000
    app.listen(3000, () => {
      console.log('Servidor escuchando en el puerto 3000');
    });
  }).catch(error => {
    // Mostrar el error si no se pudo obtener la hoja de cálculo
    console.error(error);
  });
}).catch(error => {
  // Mostrar el error si no se pudo autenticar con la API de Google
  console.error(error);
});

// Definir la ruta GET para mostrar el formulario de inicio de sesión
app.get('/', (req, res) => {
  // Si el usuario ya tiene una sesión iniciada, redirigirlo a la página principal
  if (req.session.user) {
    res.redirect('/home');
  } else {
    // Si no, enviar el archivo HTML del formulario
    res.sendFile(__dirname + '/login.html');
  }
});

// Definir la ruta POST para procesar el inicio de sesión
app.post('/login', (req, res) => {
  // Obtener los datos del usuario y la contraseña del cuerpo de la petición
  let user = req.body.user;
  let password = req.body.password;

  // Validar que no estén vacíos
  if (user && password) {
    // Leer los datos de la hoja de cálculo de Google usando la API
    sheet.data[0].data[0].rowData.forEach(row => {
      // Obtener el usuario y la contraseña cifrada de cada fila
      let rowUser = row.values[0].formattedValue;
      let rowPassword = row.values[1].formattedValue;
      // Comparar el usuario ingresado con el de la fila
      if (user === rowUser) {
        // Comparar la contraseña ingresada con la cifrada de la fila usando bcrypt
        bcrypt.compare(password, rowPassword, (err, result) => {
          if (err) {
            // Mostrar el error si hubo un problema al comparar las contraseñas
            console.error(err);
          } else if (result) {
            // Si las contraseñas coinciden, crear una sesión para el usuario y redirigirlo a la página principal
            req.session.user = user;
            res.redirect('/home');
          } else {
            // Si las contraseñas no coinciden, enviar un mensaje de error al usuario
            res.send('Contraseña incorrecta');
          }
        });
      }
    });
    // Si el usuario no se encontró en la hoja de cálculo, enviar un mensaje de error al usuario
    res.send('Usuario no encontrado');
  } else {
    // Si el usuario o la contraseña están vacíos, enviar un mensaje de error al usuario
    res.send('Por favor ingrese un usuario y una contraseña');
  }
});

// Definir la ruta GET para mostrar la página principal
app.get('/home', (req, res) => {
  // Si el usuario tiene una sesión iniciada, enviar el archivo HTML de la página principal
  if (req.session.user) {
    res.sendFile(__dirname + '/home.html');
  } else {
    // Si no, redirigirlo al formulario de inicio de sesión
    res.redirect('/');
  }
});

// Definir la ruta GET para cerrar la sesión del usuario
app.get('/logout', (req, res) => {
  // Destruir la sesión del usuario y redirigirlo al formulario de inicio de sesión
  req.session.destroy();
  res.redirect('/');
});
```