require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials');

// Servir contenido estático
// middleware
app.use( express.static('./public') ); // Queda como  path = '/'


// no se ejecuta porque se sirve lo que se encuentra en el
// middlewate
/*
app.get('/', (req, res) => {
  res.send('Home Page');
});
*/

const templateHeader = {
  titulo: 'Node',
  nombre: 'LLX'
}

// app.get('/', (req, res) => {
//   res.render('home', templateHeader);
// });

// app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/public/index.html')
// });

app.get('/generic', (req, res) => {
  // res.sendFile(__dirname + '/public/generic.html')
  res.render('generic', templateHeader);
});

app.get('/elements', (req, res) => {
  // res.sendFile(__dirname + '/public/elements.html')
  res.render('elements', templateHeader);
});
 
app.all('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  res.send('404 | Page not found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});