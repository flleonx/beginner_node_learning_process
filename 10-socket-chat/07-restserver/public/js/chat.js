const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:3000/api/auth/'
            : 'https://restserver-llx.herokuapp.com/api/auth/'

let user = null;
let socket = null;

// HTML references
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnGetOut = document.querySelector('#btnGetOut');

// Validate token from local storage
const validateJWT = async () => {

  const token = localStorage.getItem('token') || '';

  if ( token.length <= 10 ) {
    window.location = 'index.html';
    throw new Error('There is not token in the server');
  }

  // error handler is missing
  const res = await fetch( url, {
    headers: { 'x-token': token }
  });

  const { user: userDB, token: tokenDB } = await res.json();

  // set the renewed token
  localStorage.setItem('token', tokenDB);
  user = userDB;
  document.title = user.name;

  await connectSocket();

};

const connectSocket = async () => {

  socket = io({
    'extraHeaders': {
      'x-token': localStorage.getItem('token')
    }
  });

  socket.on('connect', () => {
    console.log('Sockets online');
  });

  socket.on('disconnect', () => {
    console.log('Sockets offline');
  });

  socket.on('get-messages', printMessages );

  socket.on('active-users', printUsers );

  socket.on('private-message', ( payload ) => {
    console.log('Private:', payload );
  });

};

txtMessage.addEventListener('keyup', ({ keyCode }) => {

  const message = txtMessage.value;
  const uid = txtUid.value;

  if( keyCode !== 13 ) return;

  if( message.length === 0 ) return;

  socket.emit('send-message', { message, uid });

  txtMessage.value = '';

});

const printUsers = ( users = [] ) => {

  let usersHTML = '';
  users.forEach( ({ name, uid }) => {
    usersHTML += `
      <li>
        <p>
          <h5 class="text-success">${ name }</h5>
          <span class="fs-6 text-muted">${ uid }</span>
        </p>
      </li>
    `;
  });

  ulUsers.innerHTML = usersHTML;

};

const printMessages = ( messages = [] ) => {

  let messagesHTML = '';
  messages.forEach( ({ name, message }) => {
    messagesHTML += `
      <li>
        <p>
          <span class="text-success">${ name }:</span>
          <span>${ message }</span>
        </p>
      </li>
    `;
  });

  ulMessages.innerHTML = messagesHTML;

};

const main = async () => {

  // validate JWT
  await validateJWT();

};

main();

// const socket = io();
