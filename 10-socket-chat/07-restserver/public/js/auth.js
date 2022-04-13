const myForm = document.querySelector('form'); // Custom login

const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:3000/api/auth/'
            : 'https://restserver-llx.herokuapp.com/api/auth/'

myForm.addEventListener('submit', event => {
  event.preventDefault(); // Prevent default behavior (refresh the page)
  const formData = {};

  for( let element of myForm.elements ) {
    if ( element.name.length > 0 ) {
      formData[element.name] = element.value;
    }
  }

  fetch( url + 'login', {
    method: 'POST',
    body: JSON.stringify( formData ), // Serialize it as JSON
    headers: { 'Content-Type': 'application/json' }
  })
  .then( resp => resp.json() )
  // I'm not sure if it return msg when an error occurs
  .then( ({ msg, token }) => {
    if( msg ) {
      return console.error( msg );
    }

    localStorage.setItem('token', token);
    window.location = 'chat.html';

  })
  .catch( err => {
    console.log(err);
  })
});

// Google credentials management
function handleCredentialResponse(response) {

  // Google Token : ID_TOKEN

  const body = { id_token: response.credential }

   fetch( url + 'google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
     },
    body: JSON.stringify(body)
   })
    .then( resp => resp.json() )
    .then( ({ token }) => { // Token is destructured from info
      localStorage.setItem( 'token', token );
      window.location = 'chat.html';
    })
    .catch( console.warn )
}

const button = document.getElementById('google_signout');
button.onclick = () => {
  console.log(google.accounts.id)
  google.accounts.id.disableAutoSelect()
  google.accounts.id.revoke( localStorage.getItem( 'token'), done => {
    localStorage.clear();
    location.reload();
  } )
}
