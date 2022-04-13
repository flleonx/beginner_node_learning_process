//HTML References
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('button');

const socket = io(); // TDOO: Take a look of this

socket.on('connect', () => {
  btnCreate.disabled = false;
});

socket.on('disconnect', () => {
  btnCreate.disabled = true;
});

socket.on('last-ticket', ( lastTicket ) => {
  lblNewTicket.innerText = `Ticket ${ lastTicket }`;
});

btnCreate.addEventListener( 'click', () => {

  socket.emit( 'next-ticket', null, ( ticket ) => {
    lblNewTicket.innerText = ticket; // TODO: Take a look of this
  });

});
